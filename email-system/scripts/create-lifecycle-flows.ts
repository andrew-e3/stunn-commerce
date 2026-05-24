import fs from "fs";

const KLAVIYO_REVISION = "2026-04-15";
const FROM_EMAIL = "hello@stunn.co";
const FROM_LABEL = "STUNN";
const REPLY_TO_EMAIL = "hello@stunn.co";

type FlowAction = {
  temporary_id: string;
  type: "time-delay" | "send-email";
  links: { next: string | null };
  data: Record<string, unknown>;
};

type FlowConfig = {
  name: string;
  metricId: string;
  profileFilter: Record<string, unknown> | null;
  actions: FlowAction[];
  entryActionId: string;
  makeLive: boolean;
};

const templateIds = {
  cartAbandoned1: "S7Rnmb",
  checkoutAbandoned2: "TPL_CHECKOUT_ABANDONED_2",
  browseAbandoned1: "TPL_BROWSE_ABANDONED_1",
  postPurchase1: "TPL_POST_PURCHASE_1",
  postPurchase2: "TPL_POST_PURCHASE_2",
  replenishment1: "TPL_REPLENISHMENT_1",
  winback1: "TPL_WINBACK_1",
};

const metrics = {
  checkoutStarted: "RR72jr",
  placedOrder: "Su84W4",
  viewedProduct: "VYkzBC",
};

function loadEnv() {
  const raw = fs.readFileSync(
    "/Users/andrewjennings/.openclaw/workspace/credentials/secrets.env",
    "utf8",
  );
  for (const line of raw.split("\n")) {
    if (!line || line.trim().startsWith("#") || !line.includes("=")) continue;
    const index = line.indexOf("=");
    const key = line.slice(0, index);
    const value = line.slice(index + 1).replace(/^['"]|['"]$/g, "");
    process.env[key] ||= value;
  }
}

function requireKey() {
  loadEnv();
  const key =
    process.env.STUNN_KLAVIYO_FULL_ACCESS_API_KEY ||
    process.env.STUNN_KLAVIYO_PRIVATE_API_KEY;
  if (!key) throw new Error("Missing STUNN Klaviyo API key");
  return key;
}

async function klaviyo(pathName: string, init: RequestInit, key: string) {
  const response = await fetch(`https://a.klaviyo.com/api/${pathName}`, {
    ...init,
    headers: {
      Authorization: `Klaviyo-API-Key ${key}`,
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      revision: KLAVIYO_REVISION,
      ...(init.headers || {}),
    },
  });
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`${pathName} failed: ${response.status} ${text}`);
  }
  return text ? JSON.parse(text) : null;
}

async function templateIdByName(name: string, key: string) {
  let pathName = "templates/?page[size]=10";
  while (pathName) {
    const response = await klaviyo(pathName, { method: "GET" }, key);
    const found = response.data?.find(
      (item: any) => item.attributes?.name === name,
    );
    if (found?.id) return found.id as string;

    const next = response.links?.next as string | null | undefined;
    pathName = next ? next.replace("https://a.klaviyo.com/api/", "") : "";
  }

  throw new Error(`Template not found: ${name}`);
}

function profileMetricZeroSinceFlow(metricId: string) {
  return {
    type: "profile-metric",
    metric_id: metricId,
    measurement: "count",
    measurement_filter: {
      type: "numeric",
      operator: "equals",
      value: 0,
    },
    timeframe_filter: {
      type: "date",
      operator: "flow-start",
    },
    metric_filters: null,
  };
}

function profileFilter(conditions: Array<Record<string, unknown>>) {
  return {
    condition_groups: [
      {
        conditions,
      },
    ],
  };
}

function delay(
  temporaryId: string,
  next: string | null,
  unit: "hours" | "days",
  value: number,
): FlowAction {
  const data: Record<string, unknown> = {
    unit,
    value,
    secondary_value: 0,
    timezone: "profile",
  };

  if (unit === "days") {
    data.delay_until_time = null;
    data.delay_until_weekdays = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];
  }

  return {
    temporary_id: temporaryId,
    type: "time-delay",
    links: { next },
    data,
  };
}

function email({
  temporaryId,
  next,
  name,
  subject,
  preview,
  templateId,
  status = "live",
}: {
  temporaryId: string;
  next: string | null;
  name: string;
  subject: string;
  preview: string;
  templateId: string;
  status?: "live" | "draft" | "manual";
}): FlowAction {
  return {
    temporary_id: temporaryId,
    type: "send-email",
    links: { next },
    data: {
      message: {
        from_email: FROM_EMAIL,
        from_label: FROM_LABEL,
        reply_to_email: REPLY_TO_EMAIL,
        cc_email: null,
        bcc_email: null,
        subject_line: subject,
        preview_text: preview,
        template_id: templateId,
        smart_sending_enabled: true,
        transactional: false,
        add_tracking_params: true,
        custom_tracking_params: null,
        additional_filters: null,
        name,
      },
      status,
    },
  };
}

async function existingFlow(name: string, key: string) {
  const flows = await klaviyo("flows/?page[size]=50", { method: "GET" }, key);
  return flows.data?.find((flow: any) => flow.attributes?.name === name);
}

async function createFlow(config: FlowConfig, key: string) {
  const existing = await existingFlow(config.name, key);
  if (existing?.id) {
    console.log(`exists ${config.name} (${existing.id})`);
    return existing.id as string;
  }

  const created = await klaviyo(
    "flows/",
    {
      method: "POST",
      body: JSON.stringify({
        data: {
          type: "flow",
          attributes: {
            name: config.name,
            definition: {
              triggers: [
                {
                  type: "metric",
                  id: config.metricId,
                  trigger_filter: null,
                },
              ],
              profile_filter: config.profileFilter,
              actions: config.actions,
              entry_action_id: config.entryActionId,
            },
          },
        },
      }),
    },
    key,
  );

  const flowId = created.data.id as string;
  console.log(`created ${config.name} (${flowId})`);

  if (config.makeLive) {
    await klaviyo(
      `flows/${flowId}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          data: {
            type: "flow",
            id: flowId,
            attributes: {
              status: "live",
            },
          },
        }),
      },
      key,
    );
    console.log(`set live ${config.name} (${flowId})`);
  }

  return flowId;
}

async function main() {
  const key = requireKey();

  templateIds.checkoutAbandoned2 = await templateIdByName(
    "STUNN - Checkout Abandoned 2",
    key,
  );
  templateIds.browseAbandoned1 = await templateIdByName(
    "STUNN - Browse Abandoned 1",
    key,
  );
  templateIds.postPurchase1 = await templateIdByName(
    "STUNN - Post Purchase 1",
    key,
  );
  templateIds.postPurchase2 = await templateIdByName(
    "STUNN - Post Purchase 2",
    key,
  );
  templateIds.replenishment1 = await templateIdByName(
    "STUNN - Replenishment 1",
    key,
  );
  templateIds.winback1 = await templateIdByName("STUNN - Winback 1", key);

  const placedOrderZero = profileMetricZeroSinceFlow(metrics.placedOrder);
  const checkoutStartedZero = profileMetricZeroSinceFlow(metrics.checkoutStarted);

  const flowConfigs: FlowConfig[] = [
    {
      name: "Abandoned Checkout - Off The Drip",
      metricId: metrics.checkoutStarted,
      profileFilter: profileFilter([placedOrderZero]),
      entryActionId: "checkout-delay-1",
      makeLive: true,
      actions: [
        delay("checkout-delay-1", "checkout-email-1", "hours", 4),
        email({
          temporaryId: "checkout-email-1",
          next: "checkout-delay-2",
          name: "Abandoned Checkout Email #1",
          subject: "Your coffee ritual is waiting.",
          preview: "Keep the cup. Lose the caffeine cost.",
          templateId: templateIds.cartAbandoned1,
        }),
        delay("checkout-delay-2", "checkout-email-2", "hours", 20),
        email({
          temporaryId: "checkout-email-2",
          next: null,
          name: "Abandoned Checkout Email #2",
          subject: "Still thinking about the second cup?",
          preview:
            "STUNN is the coffee ritual without caffeine owning the rest of your day.",
          templateId: templateIds.checkoutAbandoned2,
        }),
      ],
    },
    {
      name: "Browse Abandonment - Off The Drip",
      metricId: metrics.viewedProduct,
      profileFilter: profileFilter([placedOrderZero, checkoutStartedZero]),
      entryActionId: "browse-delay-1",
      makeLive: true,
      actions: [
        delay("browse-delay-1", "browse-email-1", "hours", 3),
        email({
          temporaryId: "browse-email-1",
          next: null,
          name: "Browse Abandonment Email #1",
          subject: "Looking for the cup without the crash?",
          preview: "You viewed STUNN. Here is the simple version.",
          templateId: templateIds.browseAbandoned1,
        }),
      ],
    },
    {
      name: "Post Purchase - Off The Drip",
      metricId: metrics.placedOrder,
      profileFilter: null,
      entryActionId: "post-delay-1",
      makeLive: true,
      actions: [
        delay("post-delay-1", "post-email-1", "days", 1),
        email({
          temporaryId: "post-email-1",
          next: "post-delay-2",
          name: "Post Purchase Email #1",
          subject: "How to use STUNN.",
          preview: "Your first cup works best when you know where it fits.",
          templateId: templateIds.postPurchase1,
        }),
        delay("post-delay-2", "post-email-2", "days", 4),
        email({
          temporaryId: "post-email-2",
          next: null,
          name: "Post Purchase Email #2",
          subject: "Welcome to Off The Drip.",
          preview: "A small manifesto for your new coffee ritual.",
          templateId: templateIds.postPurchase2,
        }),
      ],
    },
    {
      name: "Replenishment - Off The Drip",
      metricId: metrics.placedOrder,
      profileFilter: profileFilter([placedOrderZero]),
      entryActionId: "replenishment-delay-1",
      makeLive: true,
      actions: [
        delay("replenishment-delay-1", "replenishment-email-1", "days", 21),
        email({
          temporaryId: "replenishment-email-1",
          next: null,
          name: "Replenishment Email #1",
          subject: "Running low on the cup without caffeine?",
          preview: "Keep the caffeine-free ritual stocked.",
          templateId: templateIds.replenishment1,
        }),
      ],
    },
    {
      name: "Winback - Off The Drip",
      metricId: metrics.placedOrder,
      profileFilter: profileFilter([placedOrderZero]),
      entryActionId: "winback-delay-1",
      makeLive: true,
      actions: [
        delay("winback-delay-1", "winback-email-1", "days", 45),
        email({
          temporaryId: "winback-email-1",
          next: null,
          name: "Winback Email #1",
          subject: "Did caffeine take the ritual back?",
          preview: "Come back to the cup that does not borrow from later.",
          templateId: templateIds.winback1,
        }),
      ],
    },
  ];

  for (const config of flowConfigs) {
    await createFlow(config, key);
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
