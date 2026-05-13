"use client";

import { ProductVariant } from "lib/shopify/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const VARIANT_CONFIG: Record<string, { days: number; popular: boolean }> = {
  "1 Month": { days: 30, popular: false },
  "2 Months": { days: 60, popular: false },
  "3 Months": { days: 90, popular: true },
};

export function StunnVariantSelector({
  variants,
}: {
  variants: ProductVariant[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedDuration = searchParams.get("duration") || "3 Months";

  useEffect(() => {
    if (!searchParams.get("duration")) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("duration", "3 Months");
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, []);

  const select = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("duration", value);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
        Choose your supply
      </p>
      <div className="grid grid-cols-3 gap-2">
        {variants.map((variant) => {
          const duration =
            variant.selectedOptions.find((o) => o.name === "Duration")?.value ||
            "";
          const config = VARIANT_CONFIG[duration];
          const isSelected = selectedDuration === duration;
          const perDay = config
            ? (parseFloat(variant.price.amount) / config.days).toFixed(2)
            : null;

          return (
            <button
              key={variant.id}
              type="button"
              onClick={() => select(duration)}
              className={`relative flex flex-col items-center rounded-xl border-2 px-2 py-4 text-center transition-all ${
                isSelected
                  ? "border-[#5A3493] bg-white"
                  : "border-gray-200 bg-white hover:border-purple-300"
              }`}
            >
              {config?.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#5A3493] px-3 py-0.5 text-[10px] font-bold uppercase text-white">
                  Most Popular
                </span>
              )}
              <span className="text-xs font-semibold text-gray-500">
                {duration}
              </span>
              <span className="mt-1 text-base font-bold text-gray-900">
                ${parseFloat(variant.price.amount).toFixed(2)}
              </span>
              {perDay && (
                <span className="text-xs text-[#5A3493]">${perDay}/day</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
