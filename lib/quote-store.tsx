"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { QuoteItem } from "./types";

interface QuoteContextType {
  items: QuoteItem[];
  addItem: (item: QuoteItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearQuote: () => void;
  totalItems: number;
  isDrawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}

const QuoteContext = createContext<QuoteContextType | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const addItem = useCallback((item: QuoteItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 50) return;
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
    );
  }, []);

  const clearQuote = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <QuoteContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearQuote, totalItems, isDrawerOpen, setDrawerOpen }}
    >
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error("useQuote must be used within a QuoteProvider");
  }
  return context;
}
