"use client";

import Link from "next/link";
import type { Category } from "@/lib/types";

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
}

export default function CategoryFilter({
  categories,
  activeCategory,
}: CategoryFilterProps) {
  return (
    <div className="mb-8 flex flex-wrap gap-2">
      <Link
        href="/products"
        className={`rounded-md px-4 py-2 text-xs font-bold tracking-wider uppercase transition-colors ${
          activeCategory === "all"
            ? "bg-accent text-bg-primary"
            : "border border-border-primary bg-bg-card text-text-secondary hover:border-border-accent hover:text-text-primary"
        }`}
      >
        All Products
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat._id}
          href={`/products?category=${cat.slug}`}
          className={`rounded-md px-4 py-2 text-xs font-bold tracking-wider uppercase transition-colors ${
            activeCategory === cat.slug
              ? "bg-accent text-bg-primary"
              : "border border-border-primary bg-bg-card text-text-secondary hover:border-border-accent hover:text-text-primary"
          }`}
        >
          {cat.title}
        </Link>
      ))}
    </div>
  );
}
