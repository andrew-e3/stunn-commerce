import PolicyPage from "components/policy-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms for using the STUNN website and purchasing STUNN products.",
};

export default function TermsPage() {
  return (
    <PolicyPage
      eyebrow="Terms"
      title="Terms & conditions."
      intro="By using this site or purchasing STUNN, you agree to use the store responsibly and provide accurate order information."
      sections={[
        {
          title: "Orders",
          copy: "Product availability, pricing, promotions, and shipping timelines may change. We may refuse or cancel orders when required to protect customers or the business.",
        },
        {
          title: "Health information",
          copy: "Information on this site is for general wellness education and is not medical advice. Always speak with a qualified healthcare provider about personal health questions.",
        },
        {
          title: "Subscriptions",
          copy: "Subscription orders renew according to the cadence selected at purchase. You are responsible for updating account, shipping, and payment details before renewal.",
        },
        {
          title: "Site content",
          copy: "STUNN branding, product imagery, writing, and site content may not be copied or reused without permission.",
        },
      ]}
    />
  );
}
