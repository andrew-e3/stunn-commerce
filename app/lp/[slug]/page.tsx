import { BlockRenderer } from "components/lp/block-renderer";
import Footer from "components/layout/footer";
import {
  getLandingPage,
  getLandingPagePreview,
  getLandingPageSlugs,
} from "lib/sanity";
import { urlForImage } from "lib/sanity/image";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = await getLandingPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getLandingPage(slug);
  if (!page) return {};

  const ogImage = page.seo?.ogImage
    ? urlForImage(page.seo.ogImage)?.width(1200).height(630).url()
    : undefined;

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description,
    robots: page.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: ogImage ? { images: [{ url: ogImage }] } : undefined,
  };
}

export default async function LandingPageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { isEnabled: isDraft } = await draftMode();

  const page = isDraft
    ? await getLandingPagePreview(slug)
    : await getLandingPage(slug);

  if (!page) notFound();

  return (
    <>
      {isDraft && (
        <div className="bg-[#EFAF00] px-4 py-2 text-center text-xs font-bold text-[#111111]">
          Draft preview —{" "}
          <Link href="/api/draft/disable" className="underline">
            exit preview
          </Link>
        </div>
      )}
      <BlockRenderer blocks={page.pageBuilder} />
      <Footer />
    </>
  );
}
