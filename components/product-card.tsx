import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { ArrowRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border-primary bg-bg-card transition-all duration-300 hover:border-border-accent hover:shadow-[0_0_20px_rgba(255,215,0,0.05)]"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-bg-elevated">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <span className="mb-1.5 text-[10px] font-bold tracking-widest uppercase text-accent">
          {product.category}
        </span>
        <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-text-primary transition-colors group-hover:text-accent">
          {product.title}
        </h3>
        <p className="mb-4 line-clamp-2 flex-1 text-xs leading-relaxed text-text-secondary">
          {product.description}
        </p>

        {/* Specs preview */}
        <div className="mb-4 flex flex-wrap gap-2">
          {Object.entries(product.specs)
            .slice(0, 2)
            .map(([key, value]) => (
              <span
                key={key}
                className="rounded bg-bg-elevated px-2 py-1 text-[10px] text-text-muted"
              >
                {key}: {value}
              </span>
            ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-accent">
          <span>View Details</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
