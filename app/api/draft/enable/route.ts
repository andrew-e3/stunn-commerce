import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

// Enables Draft Mode so the editor sees unpublished content. Guarded by the
// shared secret. Link pattern (from the Studio or a bookmark):
//   /api/draft/enable?secret=<SANITY_REVALIDATE_SECRET>&slug=<landing-page-slug>
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return new Response("Invalid secret", { status: 401 });
  }

  (await draftMode()).enable();
  redirect(slug ? `/lp/${slug}` : "/");
}
