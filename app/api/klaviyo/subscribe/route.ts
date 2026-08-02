import { NextRequest, NextResponse } from "next/server";

const KLAVIYO_API_REVISION = "2026-04-15";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  const privateKey = process.env.KLAVIYO_PRIVATE_API_KEY;
  const listId = process.env.KLAVIYO_QUIET_CLUB_LIST_ID;

  if (!privateKey || !listId) {
    return NextResponse.json(
      { error: "Klaviyo is not configured" },
      { status: 500 },
    );
  }

  let body: {
    email?: unknown;
    source?: unknown;
    page?: unknown;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const source = typeof body.source === "string" ? body.source : "quiet-club";

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const response = await fetch(
    "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs",
    {
      method: "POST",
      headers: {
        Authorization: `Klaviyo-API-Key ${privateKey}`,
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        revision: KLAVIYO_API_REVISION,
      },
      body: JSON.stringify({
        data: {
          type: "profile-subscription-bulk-create-job",
          attributes: {
            custom_source: source,
            profiles: {
              data: [
                {
                  type: "profile",
                  attributes: {
                    email,
                    subscriptions: {
                      email: {
                        marketing: {
                          consent: "SUBSCRIBED",
                        },
                      },
                    },
                  },
                },
              ],
            },
          },
          relationships: {
            list: {
              data: {
                type: "list",
                id: listId,
              },
            },
          },
        },
      }),
    },
  );

  if (!response.ok) {
    const error = await response.text();
    console.error("Klaviyo subscribe failed", {
      status: response.status,
      body: error,
    });

    return NextResponse.json(
      { error: "Klaviyo subscribe failed" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
