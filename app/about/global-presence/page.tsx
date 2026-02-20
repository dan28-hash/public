import type { Metadata } from "next";
import { Globe, MapPin } from "lucide-react";
import HeroSection from "@/components/hero-section";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion";

export const metadata: Metadata = {
  title: "Global Presence",
  description: "Ningbo Siyang exports professional power tools to 60+ countries across 6 continents.",
};

const regions = [
  { name: "Europe", countries: ["Germany", "UK", "France", "Italy", "Spain", "Netherlands", "Poland", "Sweden"], count: 35, color: "bg-accent" },
  { name: "North America", countries: ["United States", "Canada", "Mexico"], count: 3, color: "bg-info" },
  { name: "Southeast Asia", countries: ["Vietnam", "Thailand", "Indonesia", "Philippines", "Malaysia", "Singapore"], count: 15, color: "bg-success" },
  { name: "Middle East", countries: ["UAE", "Saudi Arabia", "Qatar", "Kuwait", "Oman", "Bahrain"], count: 12, color: "bg-warning" },
  { name: "South America", countries: ["Brazil", "Chile", "Argentina", "Colombia", "Peru"], count: 7, color: "bg-error" },
  { name: "Africa", countries: ["South Africa", "Nigeria", "Kenya", "Egypt", "Ghana"], count: 5, color: "bg-text-muted" },
];

export default function GlobalPresencePage() {
  return (
    <>
      <HeroSection title="Global" highlight="Presence" subtitle="Delivering professional-grade power tools to builders, manufacturers, and distributors across 60+ countries on 6 continents." showCta={false} compact />

      {/* Key Stats */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="mb-12 grid gap-4 sm:grid-cols-3">
              {[
                { value: "60+", label: "Countries Served" },
                { value: "6", label: "Continents" },
                { value: "500+", label: "Active B2B Partners" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg border border-border-primary bg-bg-card p-6 text-center">
                  <div className="text-3xl font-bold text-accent">{stat.value}</div>
                  <div className="mt-1 text-xs font-bold uppercase tracking-wider text-text-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>

          <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {regions.map((region) => (
              <StaggerItem key={region.name}>
                <div className="rounded-lg border border-border-primary bg-bg-card p-6 transition-all hover:border-border-accent">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-accent" />
                      <h3 className="text-sm font-bold uppercase tracking-wide text-text-primary">{region.name}</h3>
                    </div>
                    <span className="rounded-full bg-accent-muted px-2.5 py-0.5 text-[10px] font-bold text-accent">{region.count}+ countries</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {region.countries.map((country) => (
                      <span key={country} className="flex items-center gap-1 rounded bg-bg-elevated px-2 py-1 text-[10px] text-text-secondary">
                        <MapPin className="h-2.5 w-2.5 text-text-muted" />
                        {country}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </>
  );
}
