import Script from "next/script";

const klaviyoCompanyId = process.env.NEXT_PUBLIC_KLAVIYO_COMPANY_ID;

export function KlaviyoOnsite() {
  if (!klaviyoCompanyId) {
    return null;
  }

  return (
    <Script
      id="klaviyo-onsite"
      src={`https://static.klaviyo.com/onsite/js/${klaviyoCompanyId}/klaviyo.js`}
      strategy="afterInteractive"
    />
  );
}
