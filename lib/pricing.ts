export const RETAIL_PER_BOX = 39.99;

export type SupplyTier = {
  qty: 1 | 2 | 3;
  label: string;
  display: string;
  shipEvery: string;
  shipLabel: string;
  count: number;
  retailPrice: number;
  subDiscountPct: number;
  popular: boolean;
  boxImgName: string;
};

export function roundMoney(value: number) {
  return Math.round(value * 100) / 100;
}

export function priceAfterDiscount(retail: number, discountPct: number) {
  return roundMoney(retail * (1 - discountPct / 100));
}

export function perDay(price: number, days: number) {
  return (price / days).toFixed(2);
}

export function formatPerDay(amount: string | number) {
  const value = typeof amount === "number" ? amount.toFixed(2) : amount;
  return `$${value}/day`;
}

export const SUPPLY_TIERS: SupplyTier[] = [
  {
    qty: 3,
    label: "3 Months",
    display: "3 Boxes",
    shipEvery: "every 3 months",
    shipLabel: "3 boxes (90 sachets) · ships every 3 months",
    count: 90,
    retailPrice: roundMoney(RETAIL_PER_BOX * 3),
    subDiscountPct: 25,
    popular: true,
    boxImgName: "3_e644de60-d3c2-46f8-8f0c-a3ff6cdc08ce.svg",
  },
  {
    qty: 2,
    label: "2 Months",
    display: "2 Boxes",
    shipEvery: "every 2 months",
    shipLabel: "2 boxes (60 sachets) · ships every 2 months",
    count: 60,
    retailPrice: roundMoney(RETAIL_PER_BOX * 2),
    subDiscountPct: 23,
    popular: false,
    boxImgName: "2_285eb8bf-bd05-4b30-9fe2-102fc163df41.svg",
  },
  {
    qty: 1,
    label: "1 Month",
    display: "1 Box",
    shipEvery: "every month",
    shipLabel: "1 box (30 sachets) · ships every month",
    count: 30,
    retailPrice: RETAIL_PER_BOX,
    subDiscountPct: 20,
    popular: false,
    boxImgName: "1_f8453072-0eb1-4a97-b211-2dca94f998b6.svg",
  },
];

export const BEST_VALUE_TIER = SUPPLY_TIERS[0]!;
export const BEST_VALUE_PRICE = priceAfterDiscount(
  BEST_VALUE_TIER.retailPrice,
  BEST_VALUE_TIER.subDiscountPct,
);
export const BEST_VALUE_PER_DAY = perDay(
  BEST_VALUE_PRICE,
  BEST_VALUE_TIER.count,
);
export const BEST_VALUE_PER_DAY_LABEL = formatPerDay(BEST_VALUE_PER_DAY);
