"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

type PurchaseSelectionContextValue = {
  selectedQty: number;
  setSelectedQty: (qty: number) => void;
};

const PurchaseSelectionContext =
  createContext<PurchaseSelectionContextValue | null>(null);

export function PurchaseSelectionProvider({
  children,
  initialQty = 3,
}: {
  children: ReactNode;
  // Variant B opens on a single box; the live PDP keeps the 3-box default.
  initialQty?: number;
}) {
  const [selectedQty, setSelectedQty] = useState(initialQty);
  const value = useMemo(
    () => ({ selectedQty, setSelectedQty }),
    [selectedQty],
  );

  return (
    <PurchaseSelectionContext.Provider value={value}>
      {children}
    </PurchaseSelectionContext.Provider>
  );
}

export function usePurchaseSelection() {
  const context = useContext(PurchaseSelectionContext);
  if (context) return context;
  return { selectedQty: 3, setSelectedQty: () => {} };
}
