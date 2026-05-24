import { render } from "@react-email/components";
import fs from "fs";
import path from "path";
import React from "react";

const KLAVIYO_REVISION = "2026-04-15";
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");

const emailFiles = [
  "welcome-1",
  "welcome-2",
  "welcome-3",
  "welcome-4",
  "cart-abandoned-1",
  "checkout-abandoned-2",
  "browse-abandoned-1",
  "post-purchase-1",
  "post-purchase-2",
  "replenishment-1",
  "winback-1",
  "order-confirmation",
];

const fixedTemplateIds: Record<string, string> = {
  "welcome-1": "WjJbYL",
  "welcome-2": "WM8XRb",
  "welcome-3": "TJEZ7s",
  "welcome-4": "Rje4Yk",
  "cart-abandoned-1": "S7Rnmb",
  "checkout-abandoned-2": "Xrm2tu",
  "browse-abandoned-1": "SAtadg",
  "post-purchase-1": "RXs7AD",
  "post-purchase-2": "Yw8AZW",
  "replenishment-1": "VtECgd",
  "winback-1": "UQDzDA",
  "order-confirmation": "Thgdf3",
};

const welcomeFlowActions: Record<
  string,
  { actionId: string; name: string; subject: string; preview: string }
> = {
  "welcome-1": {
    actionId: "105723972",
    name: "Welcome Email #1 - Quiet Club",
    subject: "Caffeine had its run.",
    preview: "Welcome to Quiet Club.",
  },
  "welcome-2": {
    actionId: "105725619",
    name: "Welcome Email #2 - Quiet Club",
    subject: "This is not anti-coffee.",
    preview: "The point is not quitting coffee. The point is not needing caffeine.",
  },
  "welcome-3": {
    actionId: "105725626",
    name: "Welcome Email #3 - Quiet Club",
    subject: "Built for calm focus.",
    preview: "Real decaf coffee plus functional support. Caffeine never.",
  },
  "welcome-4": {
    actionId: "105725632",
    name: "Welcome Email #4 - Quiet Club",
    subject: "Own your energy.",
    preview: "Make your next cup the one that does not borrow from later.",
  },
};

const liveFlowIds = [
  "RnF5cv",
  "XBN3eY",
  "QTR38T",
  "RsePq8",
  "UWtk5G",
  "WEfXeM",
];

const flowMessageSources: Record<string, string> = {
  "Welcome Email #1 - Quiet Club": "welcome-1",
  "Welcome Email #2 - Quiet Club": "welcome-2",
  "Welcome Email #3 - Quiet Club": "welcome-3",
  "Welcome Email #4 - Quiet Club": "welcome-4",
  "Abandoned Checkout Email #1": "cart-abandoned-1",
  "Abandoned Checkout Email #2": "checkout-abandoned-2",
  "Browse Abandonment Email #1": "browse-abandoned-1",
  "Post Purchase Email #1": "post-purchase-1",
  "Post Purchase Email #2": "post-purchase-2",
  "Replenishment Email #1": "replenishment-1",
  "Winback Email #1": "winback-1",
};

type RenderedEmail = {
  id: string;
  name: string;
  html: string;
  text: string;
};

function requireKey() {
  const key = process.env.STUNN_KLAVIYO_FULL_ACCESS_API_KEY;
  if (!key) {
    throw new Error(
      "Missing STUNN_KLAVIYO_FULL_ACCESS_API_KEY. Source ~/.openclaw/workspace/credentials/secrets.env first.",
    );
  }
  return key;
}

async function klaviyo(
  pathName: string,
  init: RequestInit,
  key: string,
) {
  for (let attempt = 1; attempt <= 4; attempt += 1) {
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
      if ([429, 500, 502, 503, 504].includes(response.status) && attempt < 4) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 1500));
        continue;
      }

      throw new Error(`${pathName} failed: ${response.status} ${text}`);
    }
    return text ? JSON.parse(text) : null;
  }
}

async function findTemplateByName(name: string, key: string) {
  const response = await klaviyo("templates", { method: "GET" }, key);
  return response.data?.find((item: any) => item.attributes?.name === name);
}

async function renderEmail(emailName: string) {
  const modulePath = path.join(ROOT, "emails", `${emailName}.tsx`);
  const mod = await import(modulePath);
  const Component = mod.default;
  const html = await render(React.createElement(Component));
  const text = `${mod.subject ?? mod.templateName}\n\n${mod.preview ?? ""}`;
  const name = mod.templateName ?? `STUNN - ${emailName}`;

  const outDir = path.join(ROOT, "out");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, `${emailName}.html`), html, "utf8");

  return { html, text, name };
}

async function syncOne(emailName: string, key: string): Promise<RenderedEmail> {
  const rendered = await renderEmail(emailName);
  const { html, text, name } = rendered;

  const existingId = fixedTemplateIds[emailName];
  if (existingId) {
    await klaviyo(
      `templates/${existingId}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          data: {
            type: "template",
            id: existingId,
            attributes: { name, html, text },
          },
        }),
      },
      key,
    );
    console.log(`updated ${name} (${existingId})`);
    return { id: existingId, ...rendered };
  }

  const existing = await findTemplateByName(name, key);
  if (existing?.id) {
    await klaviyo(
      `templates/${existing.id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          data: {
            type: "template",
            id: existing.id,
            attributes: { name, html, text },
          },
        }),
      },
      key,
    );
    console.log(`updated ${name} (${existing.id})`);
    return { id: existing.id, ...rendered };
  }

  const created = await klaviyo(
    "templates",
    {
      method: "POST",
      body: JSON.stringify({
        data: {
          type: "template",
          attributes: { name, html, text, editor_type: "CODE" },
        },
      }),
    },
    key,
  );
  console.log(`created ${name} (${created.data.id})`);
  return { id: created.data.id as string, ...rendered };
}

async function assignWelcomeFlow(
  emailName: string,
  templateId: string,
  key: string,
) {
  const config = welcomeFlowActions[emailName];
  if (!config) return;

  const action = await klaviyo(
    `flow-actions/${config.actionId}`,
    { method: "GET" },
    key,
  );
  const definition = action.data.attributes.definition;
  definition.data.message.template_id = templateId;
  definition.data.message.subject_line = config.subject;
  definition.data.message.preview_text = config.preview;
  definition.data.message.name = config.name;
  definition.data.message.reply_to_email = "hello@stunn.co";

  const updated = await klaviyo(
    `flow-actions/${config.actionId}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        data: {
          type: "flow-action",
          id: config.actionId,
          attributes: { definition },
        },
      }),
    },
    key,
  );

  const assigned =
    updated.data.attributes.definition.data.message.template_id ?? templateId;
  console.log(`assigned ${config.name} to flow (${assigned})`);
}

async function main() {
  const key = requireKey();
  const synced: Record<string, RenderedEmail> = {};
  for (const emailName of emailFiles) {
    synced[emailName] = await syncOne(emailName, key);
    await new Promise((resolve) => setTimeout(resolve, 400));
  }

  for (const emailName of Object.keys(welcomeFlowActions)) {
    await assignWelcomeFlow(emailName, synced[emailName].id, key);
    await new Promise((resolve) => setTimeout(resolve, 400));
  }

  for (const flowId of liveFlowIds) {
    const actions = await klaviyo(
      `flows/${flowId}/flow-actions/`,
      { method: "GET" },
      key,
    );

    for (const action of actions.data ?? []) {
      const definition = action.attributes?.definition;
      if (definition?.type !== "send-email") continue;

      const message = definition.data?.message;
      const sourceName = flowMessageSources[message?.name];
      if (!sourceName) continue;

      const source = synced[sourceName];
      definition.data.message.template_id = source.id;

      await klaviyo(
        `flow-actions/${action.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            data: {
              type: "flow-action",
              id: action.id,
              attributes: { definition },
            },
          }),
        },
        key,
      );
      console.log(`updated live flow action ${message.name} (${action.id})`);
      await new Promise((resolve) => setTimeout(resolve, 400));
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
