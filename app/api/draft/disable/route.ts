import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

// Exits Draft Mode and returns to the page the editor came from (or home).
export async function GET(req: NextRequest) {
  (await draftMode()).disable();
  const referer = req.headers.get("referer");
  redirect(referer && referer.includes("/lp/") ? referer : "/");
}
