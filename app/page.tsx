import Link from "next/link";
import { ArrowRight, Shield, Globe, Package, Award } from "lucide-react";
import HeroSection from "@/components/hero-section";
import SectionHeader from "@/components/section-header";
import ProductCard from "@/components/product-card";
import { fetchFeaturedProducts, fetchCategories } from "@/lib/api";

const stats = [
  {
    icon: Shield,
    title: "ISO 9001 Certified",
    description:
      "Every product meets rigorous international quality standards with full traceability.",
  },
  {
    icon: Package,
    title: "Flexible MOQ",
    description:
      "Minimum order quantities tailored to your needs, from sample orders to bulk shipments.",
  },
  {
    icon: Globe,
    title: "Global Export",
    description:
      "Shipping to 60+ countries with reliable logistics and customs documentation.",
  },
  {
    icon: Award,
    title: "15+ Years Experience",
    description:
      "Over a decade of manufacturing excellence based in Ningbo, Zhejiang, China.",
  },
];

export default async function HomePage() {
  const [featuredProducts, categories] = await Promise.all([
    fetchFeaturedProducts(),
    fetchCategories(),
  ]);

  return (
    <>
      {/* Hero */}
      <HeroSection
        title="Professional Industrial"
        highlight="Power Tools"
        subtitle="Ningbo Siyang delivers manufacturer-direct power tools to B2B clients worldwide. Request a quote on drills, saws, grinders, impact tools, and complete combo kits."
        ctaText="Browse Catalog"
        ctaHref="/products"
      />

      {/* Featured Products */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            label="Featured Inventory"
            title="Top-Performing Tools"
            description="Our most requested products by B2B buyers worldwide. Each tool is built for heavy-duty industrial use."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.slice(0, 6).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-md border border-border-primary px-6 py-3 text-sm font-bold tracking-wider uppercase text-text-secondary transition-colors hover:border-accent hover:text-accent"
            >
              <span>View All Products</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="border-y border-border-primary bg-bg-card py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            label="Why Ningbo Siyang"
            title="Built for Industry"
            description="From factory floor to construction site, our tools are engineered for professionals who demand reliability."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.title}
                  className="rounded-lg border border-border-primary bg-bg-primary p-6 transition-colors hover:border-border-accent"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-accent-muted">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-text-primary">
                    {stat.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-text-secondary">
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            label="Product Categories"
            title="Complete Tool Range"
            description="Explore our full catalog of industrial power tools organized by category."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat._id}
                href={`/products?category=${cat.slug}`}
                className="group flex items-center justify-between rounded-lg border border-border-primary bg-bg-card p-5 transition-all hover:border-border-accent hover:shadow-[0_0_20px_rgba(255,215,0,0.05)]"
              >
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-text-primary transition-colors group-hover:text-accent">
                    {cat.title}
                  </h3>
                  <p className="mt-1 text-xs text-text-muted">
                    {cat.productCount} products
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-text-muted transition-all group-hover:translate-x-1 group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="border-t border-border-primary bg-bg-card py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <span className="mb-3 inline-block text-xs font-bold tracking-widest uppercase text-accent">
            Get Started
          </span>
          <h2 className="text-balance text-3xl font-bold uppercase tracking-tight text-text-primary md:text-4xl">
            Ready to Source Your{" "}
            <span className="text-accent">Industrial Tools?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-text-secondary">
            Contact our team to discuss your requirements, request samples, or
            get a competitive quote for bulk orders.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 rounded-md bg-accent px-8 py-4 text-sm font-bold tracking-wider uppercase text-bg-primary transition-colors hover:bg-accent-hover"
            >
              <span>Contact Us</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-md border border-border-primary px-8 py-4 text-sm font-bold tracking-wider uppercase text-text-secondary transition-colors hover:border-accent hover:text-accent"
            >
              <span>Browse Products</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
