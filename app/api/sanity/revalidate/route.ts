import { SANITY_TAGS } from "lib/sanity";
import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

// Sanity publish webhook. Configure in sanity.io/manage (API > Webhooks):
//   URL:        https://stunn.co/api/sanity/revalidate?secret=<SANITY_REVALIDATE_SECRET>
//   Trigger on: Create, Update, Delete
//   Projection: {_type}
// On publish, Sanity POSTs the changed document's _type and we revalidate the
// matching cache tag so the live site updates within seconds.

const TYPE_TO_TAG: Record<string, string> = {
  siteSettings: SANITY_TAGS.siteSettings,
  homepage: SANITY_TAGS.homepage,
};

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  const expected = process.env.SANITY_REVALIDATE_SECRET;

  if (!expected || secret !== expected) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let body: { _type?: string } = {};
  try {
    body = await req.json();
  } catch {
    // Empty/invalid body — fall through to revalidating everything.
  }

  const tag = body._type ? TYPE_TO_TAG[body._type] : undefined;

  if (tag) {
    revalidateTag(tag, "seconds");
    return NextResponse.json({ revalidated: true, tag, now: Date.now() });
  }

  // Unknown or missing type: revalidate all known content tags.
  Object.values(SANITY_TAGS).forEach((t) => revalidateTag(t, "seconds"));
  return NextResponse.json({ revalidated: true, all: true, now: Date.now() });
}
