import PolicyPage from "components/policy-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return Policy",
  description: "STUNN return, refund, and satisfaction support policy.",
};

export default function RefundPolicyPage() {
  return (
    <PolicyPage
      eyebrow="Returns"
      title="Return policy."
      intro="If something is not right with your order, contact us and we will help make it right."
      sections={[
        {
          title: "30-day support",
          copy: "STUNN offers a 30-day money-back guarantee for first orders. If you are not happy with the product, contact support within 30 days of delivery.",
        },
        {
          title: "Damaged or missing orders",
          copy: "If your shipment arrives damaged, incorrect, or missing items, send us your order details and photos where relevant so we can resolve it quickly.",
        },
        {
          title: "Subscriptions",
          copy: "Subscriptions can be paused, edited, or cancelled before the next order processes. Once an order has shipped, we may not be able to stop it in transit.",
        },
        {
          title: "Refund timing",
          copy: "Approved refunds are returned to the original payment method. Bank and card processing times can vary after the refund is issued.",
        },
      ]}
    />
  );
}
