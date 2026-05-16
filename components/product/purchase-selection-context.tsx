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
}: {
  children: ReactNode;
}) {
  const [selectedQty, setSelectedQty] = useState(3);
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
