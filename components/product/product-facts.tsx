// The two questions every decaf buyer asks before they buy - how much caffeine
// is actually left, and how was it taken out - answered inside the buy box
// rather than three accordions down. drinklowkey.com states both next to their
// price; we stated neither, while running ads that make caffeine claims.
//
// Single source of truth. Correct these here and the buy box, the accordion and
// any future PDP surface all follow.

export const PRODUCT_FACTS = {
  /** Caffeine per sachet, in mg. Per Andrew, 2026-08-03: no caffeine at all. */
  caffeineMg: 0,
  /**
   * How the coffee is decaffeinated - e.g. "Swiss Water Process, chemical-free"
   * or "CO2 process". Left null deliberately: not documented anywhere in the
   * repo or on the storefront, and it must come from the supplier spec rather
   * than be guessed. The row is skipped while this is null.
   */
  decafMethod: null as string | null,
  sachetsPerBox: 30,
  functionalIngredients: [
    "Lion's Mane",
    "Rhodiola",
    "Cordyceps",
    "L-Theanine",
  ],
};

function formatCaffeine(mg: number) {
  return mg === 0 ? "0mg caffeine" : `${mg}mg caffeine`;
}

export function ProductFacts() {
  const rows: { label: string; value: string }[] = [
    { label: "Caffeine", value: formatCaffeine(PRODUCT_FACTS.caffeineMg) },
    {
      label: "Functional stack",
      value: `${PRODUCT_FACTS.functionalIngredients.length} ingredients · ${PRODUCT_FACTS.functionalIngredients.join(", ")}`,
    },
    {
      label: "Per box",
      value: `${PRODUCT_FACTS.sachetsPerBox} single-serve sachets`,
    },
  ];

  if (PRODUCT_FACTS.decafMethod) {
    rows.splice(1, 0, {
      label: "Decaffeinated by",
      value: PRODUCT_FACTS.decafMethod,
    });
  }

  return (
    <dl className="mb-5 divide-y divide-[#111111]/8 rounded-[12px] border border-[#111111]/10 bg-white/60">
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex items-baseline justify-between gap-4 px-4 py-2.5"
        >
          <dt className="shrink-0 text-[11px] font-bold uppercase tracking-wide text-[#111111]/45">
            {row.label}
          </dt>
          <dd className="text-right text-xs font-semibold text-[#111111]">
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
