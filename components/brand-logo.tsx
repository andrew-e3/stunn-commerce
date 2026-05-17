const LOGO_URL =
  "https://cdn.shopify.com/s/files/1/0758/0785/0596/files/STUNN_LOGO-Purple.png";

export default function BrandLogo() {
  return (
    <span
      aria-hidden="true"
      className="block h-8 w-[132px] bg-[#5A3493]"
      style={{
        WebkitMask: `url(${LOGO_URL}) center / contain no-repeat`,
        mask: `url(${LOGO_URL}) center / contain no-repeat`,
      }}
    />
  );
}
