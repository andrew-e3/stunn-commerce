export const urls = {
  home: "https://stunn.co",
  product: "https://stunn.co/products/focus-without-caffeine",
  movement: "https://stunn.co/about-us",
  contact: "https://stunn.co/contact",
  privacy: "https://stunn.co/privacy-policy",
  refund: "https://stunn.co/refund-policy",
  hero: "https://stunn.co/images/stunn-email-hero.jpg",
  pour: "https://stunn.co/images/stunn-email-pour.jpg",
  ritual: "https://stunn.co/images/stunn-email-ritual.jpg",
  comparison: "https://stunn.co/images/stunn-email-comparison.jpg",
} as const;

export const tags = {
  firstName: `{{ first_name|default:'there' }}`,
  lastName: `{{ last_name|default:'' }}`,
  email: `{{ email }}`,
  orderNumber: `{{ event.extra.order_number|default:event.OrderId|default:'' }}`,
  orderDate: `{{ event.OrderedAt|default:event.extra.created_at|date:'N j, Y' }}`,
  cartUrl: `{{ event.extra.checkout_url|default:event.CheckoutURL|default:'${urls.product}' }}`,
  shippingName: `{{ event.ShippingAddress.name|default:'' }}`,
  shippingAddress1: `{{ event.ShippingAddress.address1|default:'' }}`,
  shippingCity: `{{ event.ShippingAddress.city|default:'' }}`,
  shippingZip: `{{ event.ShippingAddress.zip|default:'' }}`,
} as const;
