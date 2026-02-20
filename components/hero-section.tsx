import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  title: string;
  highlight?: string;
  subtitle: string;
  ctaText?: string;
  ctaHref?: string;
  showCta?: boolean;
  backgroundImage?: string;
  compact?: boolean;
}

export default function HeroSection({
  title,
  highlight,
  subtitle,
  ctaText = "Browse Catalog",
  ctaHref = "/products",
  showCta = true,
  backgroundImage = "/images/hero-bg.jpg",
  compact = false,
}: HeroSectionProps) {
  return (
    <section
      className={`relative overflow-hidden ${compact ? "py-20" : "py-28 md:py-36"}`}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-bg-primary/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/50 via-transparent to-bg-primary" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <h1
            className={`text-balance font-bold uppercase tracking-tight text-text-primary ${
              compact ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl lg:text-6xl"
            }`}
          >
            {title}
            {highlight && (
              <>
                {" "}
                <span className="text-accent">{highlight}</span>
              </>
            )}
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-text-secondary md:text-lg">
            {subtitle}
          </p>
          {showCta && (
            <Link
              href={ctaHref}
              className="mt-8 inline-flex items-center gap-2.5 rounded-md bg-accent px-8 py-4 text-sm font-bold tracking-wider uppercase text-bg-primary transition-colors hover:bg-accent-hover"
            >
              <span>{ctaText}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
