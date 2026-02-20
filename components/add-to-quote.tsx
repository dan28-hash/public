"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Minus, Plus, Check } from "lucide-react";
import { useQuote } from "@/lib/quote-store";
import type { Product } from "@/lib/types";

interface AddToQuoteProps {
  product: Product;
  isAuthenticated: boolean;
}

export default function AddToQuote({ product, isAuthenticated }: AddToQuoteProps) {
  const router = useRouter();
  const { addItem, setDrawerOpen } = useQuote();
  const [quantity, setQuantity] = useState(Math.max(50, product.moq));
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");

  const minQty = 50;
  const step = 10;

  const handleIncrement = () => {
    setQuantity((q) => q + step);
    setError("");
  };

  const handleDecrement = () => {
    setQuantity((q) => {
      const next = q - step;
      if (next < minQty) {
        setError(`Minimum order quantity is ${minQty} units`);
        return q;
      }
      setError("");
      return next;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val)) return;
    if (val < minQty) {
      setError(`Minimum order quantity is ${minQty} units`);
    } else {
      setError("");
    }
    setQuantity(val);
  };

  const handleBlur = () => {
    if (quantity < minQty) {
      setQuantity(minQty);
      setError("");
    } else {
      const rounded = Math.round(quantity / step) * step;
      setQuantity(Math.max(minQty, rounded));
    }
  };

  const handleAdd = () => {
    if (!isAuthenticated) {
      router.push(`/auth/login?redirect=/products/${product.slug}`);
      return;
    }
    if (quantity < minQty) {
      setError(`Minimum order quantity is ${minQty} units`);
      return;
    }
    addItem({
      productId: product._id,
      slug: product.slug,
      title: product.title,
      quantity,
      imageUrl: product.imageUrl,
      moq: product.moq,
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setDrawerOpen(true);
    }, 800);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Quantity selector */}
      <div>
        <label className="mb-2 block text-xs font-bold tracking-widest uppercase text-text-muted">
          Quantity (units)
        </label>
        <div className="flex items-center gap-0">
          <button
            onClick={handleDecrement}
            className="flex h-12 w-12 items-center justify-center rounded-l-md border border-border-primary bg-bg-card text-text-secondary transition-colors hover:bg-bg-hover hover:text-text-primary"
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </button>
          <input
            type="number"
            value={quantity}
            onChange={handleInputChange}
            onBlur={handleBlur}
            min={minQty}
            step={step}
            className="h-12 w-24 border-y border-border-primary bg-bg-input text-center text-sm font-bold text-text-primary outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <button
            onClick={handleIncrement}
            className="flex h-12 w-12 items-center justify-center rounded-r-md border border-border-primary bg-bg-card text-text-secondary transition-colors hover:bg-bg-hover hover:text-text-primary"
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        {error && <p className="mt-1.5 text-xs text-error">{error}</p>}
        <p className="mt-1.5 text-[10px] text-text-muted">
          Min: {minQty} units | Increments of {step}
        </p>
      </div>

      {/* Add button */}
      <button
        onClick={handleAdd}
        disabled={added}
        className={`inline-flex items-center justify-center gap-2.5 rounded-md px-8 py-4 text-sm font-bold tracking-wider uppercase transition-all ${
          added
            ? "bg-success text-bg-primary"
            : "bg-accent text-bg-primary hover:bg-accent-hover"
        }`}
      >
        {added ? (
          <>
            <Check className="h-5 w-5" />
            <span>Added to Quote</span>
          </>
        ) : (
          <>
            <ShoppingCart className="h-5 w-5" />
            <span>{isAuthenticated ? "Add to Quote" : "Sign In to Quote"}</span>
          </>
        )}
      </button>
      <p className="text-xs text-text-muted">
        {isAuthenticated
          ? "Item will be added to your quote request."
          : "Sign in or register to build a quote request."}
      </p>
    </div>
  );
}
