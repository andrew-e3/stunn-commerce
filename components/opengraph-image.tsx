import { ImageResponse } from "next/og";
import { join } from "path";
import { readFile } from "fs/promises";

export type Props = {
  title?: string;
  description?: string;
};

async function fileToDataUrl(path: string, mimeType: string) {
  const file = await readFile(join(process.cwd(), path));
  return `data:${mimeType};base64,${file.toString("base64")}`;
}

export default async function OpengraphImage(
  props?: Props,
): Promise<ImageResponse> {
  const { title, description } = {
    ...{
      title: process.env.SITE_NAME || "STUNN",
      description: "Real coffee ritual. 0mg caffeine.",
    },
    ...props,
  };

  const file = await readFile(join(process.cwd(), "./fonts/Inter-Bold.ttf"));
  const font = Uint8Array.from(file).buffer;
  const heroImage = await fileToDataUrl(
    "./public/images/stunn-home-hero-banner-v2.png",
    "image/png",
  );

  return new ImageResponse(
    (
      <div tw="relative flex h-full w-full overflow-hidden bg-[#F5EFE7] text-[#111111]">
        <div tw="absolute right-0 top-0 flex h-full w-[58%] overflow-hidden">
          <img
            src={heroImage}
            alt=""
            tw="h-full w-full"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <div tw="absolute inset-0 bg-[#F5EFE7]" style={{ opacity: 0.16 }} />
        </div>
        <div
          tw="absolute left-0 top-0 h-full w-[64%]"
          style={{
            background:
              "linear-gradient(90deg, #F5EFE7 0%, #F5EFE7 72%, rgba(245,239,231,0) 100%)",
          }}
        />
        <div tw="relative flex h-full w-[64%] flex-col justify-between p-16">
          <div tw="flex items-center">
            <p tw="text-5xl font-bold text-[#5A3493]">STUNN+</p>
          </div>
          <div tw="flex flex-col">
            <p
              tw="mb-7 text-3xl font-bold uppercase text-[#5A3493]"
              style={{ letterSpacing: "0.18em" }}
            >
              Off The Drip
            </p>
            <p
              tw="m-0 text-7xl font-bold"
              style={{ lineHeight: 0.92, letterSpacing: "-0.02em" }}
            >
              {title}
            </p>
            <p tw="mt-8 max-w-[620px] text-3xl font-bold leading-[1.25] text-[#111111]/70">
              {description}
            </p>
          </div>
          <div
            tw="flex items-center text-2xl font-bold uppercase text-[#111111]/55"
            style={{ letterSpacing: "0.12em" }}
          >
            <span>0mg caffeine</span>
            <span tw="mx-5 text-[#5A3493]">/</span>
            <span>Functional dose</span>
            <span tw="mx-5 text-[#5A3493]">/</span>
            <span>Coffee taste</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: font,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
