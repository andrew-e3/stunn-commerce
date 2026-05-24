import PolicyPage from "components/policy-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How STUNN collects, uses, and protects customer information.",
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage
      eyebrow="Privacy"
      title="Privacy policy."
      intro="STUNN only asks for the information needed to run the store, support orders, and improve the customer experience."
      sections={[
        {
          title: "Information we collect",
          copy: "We may collect contact details, shipping details, order details, account details, payment status, site usage data, and messages you send to us.",
        },
        {
          title: "How we use it",
          copy: "We use customer information to process orders, deliver products, answer support questions, prevent fraud, send opted-in marketing, and understand how the site is performing.",
        },
        {
          title: "Sharing",
          copy: "We share information only with service providers that help us operate the business, including ecommerce, payment, shipping, analytics, and email platforms.",
        },
        {
          title: "Your choices",
          copy: "You can unsubscribe from marketing emails at any time. For privacy questions or data requests, contact us and we will help with the next step.",
        },
      ]}
    />
  );
}
