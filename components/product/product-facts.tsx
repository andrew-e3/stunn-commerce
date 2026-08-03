// The two questions every decaf buyer asks before they buy - how much caffeine
// is actually left, and how was it taken out - answered inside the buy box
// rather than three accordions down. drinklowkey.com states both next to their
// price; we stated neither, while running ads that make caffeine claims.
//
// Single source of truth. Correct these here and the buy box, the accordion and
// any future PDP surface all follow.

// Formula per the supplier's order confirmation (1,000 boxes, DDP USA), which
// Andrew supplied on 2026-08-03. This is the authoritative spec.
//
// NOTE ON "750mg": that figure is the total of the four functional actives
// (300 + 250 + 100 + 100), NOT the lion's mane dose. A large batch of generated
// ad creative claims "750mg Lion's Mane", which is wrong - lion's mane is 300mg
// of a 10:1 extract. Do not restate 750 as a single-ingredient dose anywhere.
export const PRODUCT_FACTS = {
  /** Caffeine per sachet, in mg. Per Andrew, 2026-08-03: no caffeine at all. */
  caffeineMg: 0,
  /**
   * How the coffee is decaffeinated - e.g. "Swiss Water Process, chemical-free"
   * or "CO2 process". Still unknown: the supplier order confirmation lists
   * "Decaf Instant Coffee 1500 mg" without naming the process. Must come from
   * the supplier rather than be guessed. The row is skipped while this is null.
   */
  decafMethod: null as string | null,
  sachetsPerBox: 30,
  sachetGrams: 2.25,
  decafCoffeeMg: 1500,
  functionalIngredients: [
    { name: "Lion's Mane", mg: 300, note: "10:1 extract" },
    { name: "Rhodiola", mg: 250, note: "3% rosavins" },
    { name: "Cordyceps", mg: 100, note: "10:1 extract" },
    { name: "L-Theanine", mg: 100 },
  ],
};

/** Total of the functional actives - 750mg. Excludes the decaf coffee base. */
export const FUNCTIONAL_BLEND_MG = PRODUCT_FACTS.functionalIngredients.reduce(
  (sum, i) => sum + i.mg,
  0,
);

function formatCaffeine(mg: number) {
  return mg === 0 ? "0mg caffeine" : `${mg}mg caffeine`;
}

export function ProductFacts() {
  const rows: { label: string; value: string }[] = [
    { label: "Caffeine", value: formatCaffeine(PRODUCT_FACTS.caffeineMg) },
    {
      label: "Functional blend",
      value: `${FUNCTIONAL_BLEND_MG}mg · ${PRODUCT_FACTS.functionalIngredients
        .map((i) => `${i.name} ${i.mg}mg`)
        .join(", ")}`,
    },
    {
      label: "Per sachet",
      value: `${PRODUCT_FACTS.sachetGrams}g · ${PRODUCT_FACTS.sachetsPerBox} sachets per box`,
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
