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
  initialQty = 1,
}: {
  children: ReactNode;
  // Opens on a single box. Cold paid traffic should not have to click away from
  // a 3-month commitment to find the affordable entry price.
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
  return { selectedQty: 1, setSelectedQty: () => {} };
}
