import Image from "next/image";

const CDN = "https://cdn.shopify.com/s/files/1/0758/0785/0596/files/";

export default function LogoIcon(props: React.ComponentProps<"div"> & { className?: string }) {
  return (
    <Image
      src={`${CDN}STUNN_LOGO-White.png`}
      alt="STUNN"
      width={120}
      height={32}
      className={props.className ?? "h-7 w-auto"}
    />
  );
}
