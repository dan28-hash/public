"use client";

import { useEffect } from "react";
import { X, Minus, Plus, Trash2, ShoppingCart, Send } from "lucide-react";
import { useQuote } from "@/lib/quote-store";
import Link from "next/link";

export default function QuoteDrawer() {
  const { items, removeItem, updateQuantity, clearQuote, isDrawerOpen, setDrawerOpen, totalItems } = useQuote();

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isDrawerOpen]);

  if (!isDrawerOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-bg-primary/60 backdrop-blur-sm"
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-border-primary bg-bg-primary shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-primary px-6 py-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-accent" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-text-primary">
              Quote Request
            </h2>
            <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-bg-primary">
              {items.length}
            </span>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-bg-elevated hover:text-text-primary"
            aria-label="Close drawer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <ShoppingCart className="mb-4 h-12 w-12 text-text-muted/30" />
              <p className="text-sm text-text-secondary">Your quote is empty.</p>
              <p className="mt-1 text-xs text-text-muted">Add products from the catalog to build a quote request.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.productId} className="rounded-lg border border-border-primary bg-bg-card p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={() => setDrawerOpen(false)}
                        className="text-sm font-bold text-text-primary transition-colors hover:text-accent"
                      >
                        {item.title}
                      </Link>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="flex h-7 w-7 items-center justify-center rounded text-text-muted transition-colors hover:bg-error/10 hover:text-error"
                      aria-label={`Remove ${item.title}`}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 10)}
                      className="flex h-8 w-8 items-center justify-center rounded border border-border-primary bg-bg-primary text-text-secondary transition-colors hover:text-text-primary"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="min-w-[60px] text-center text-sm font-bold text-text-primary">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 10)}
                      className="flex h-8 w-8 items-center justify-center rounded border border-border-primary bg-bg-primary text-text-secondary transition-colors hover:text-text-primary"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                    <span className="ml-auto text-[10px] text-text-muted">units</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border-primary px-6 py-4">
            <div className="mb-3 flex items-center justify-between text-xs text-text-secondary">
              <span>{items.length} product(s)</span>
              <span>{totalItems.toLocaleString()} total units</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={clearQuote}
                className="flex-1 rounded-md border border-border-primary px-4 py-3 text-xs font-bold uppercase tracking-wider text-text-secondary transition-colors hover:border-error hover:text-error"
              >
                Clear
              </button>
              <Link
                href="/dashboard/quotes"
                onClick={() => setDrawerOpen(false)}
                className="flex flex-1 items-center justify-center gap-2 rounded-md bg-accent px-4 py-3 text-xs font-bold uppercase tracking-wider text-bg-primary transition-colors hover:bg-accent-hover"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Submit Quote</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
