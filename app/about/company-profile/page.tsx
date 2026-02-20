import type { Metadata } from "next";
import { Factory, Users, Globe, Cog, TrendingUp, Award } from "lucide-react";
import HeroSection from "@/components/hero-section";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion";

export const metadata: Metadata = {
  title: "Company Profile",
  description: "Discover Ningbo Siyang's history, factory capabilities, production capacity, and corporate milestones.",
};

const stats = [
  { label: "Founded", value: "2008", icon: Award },
  { label: "Factory Area", value: "50,000 sqm", icon: Factory },
  { label: "Employees", value: "500+", icon: Users },
  { label: "Export Countries", value: "60+", icon: Globe },
  { label: "Product Lines", value: "6 Categories", icon: Cog },
  { label: "Annual Revenue", value: "$45M+", icon: TrendingUp },
];

const milestones = [
  { year: "2008", title: "Company Founded", description: "Established in Ningbo, Zhejiang as a small power tool component workshop with 20 employees." },
  { year: "2010", title: "First Export Order", description: "Secured first international B2B contract with a European distributor for corded drills." },
  { year: "2012", title: "ISO 9001 Certification", description: "Achieved ISO 9001:2008 quality management certification, opening doors to premium markets." },
  { year: "2014", title: "Factory Expansion", description: "Moved to a new 25,000 sqm facility with automated CNC machining and assembly lines." },
  { year: "2016", title: "OEM Partnerships", description: "Launched OEM/ODM services, partnering with 15+ international brands for private-label tools." },
  { year: "2018", title: "Cordless Technology", description: "Introduced lithium-ion cordless tool line with brushless motor technology." },
  { year: "2020", title: "R&D Center", description: "Opened dedicated R&D center with 40 engineers focused on motor design and battery technology." },
  { year: "2022", title: "50,000 sqm Expansion", description: "Doubled factory capacity to 50,000 sqm with new production lines and testing laboratory." },
  { year: "2024", title: "60+ Countries", description: "Expanded distribution network to cover 60+ countries across 6 continents." },
  { year: "2026", title: "Digital Platform", description: "Launched comprehensive digital B2B platform with online quoting and order management." },
];

export default function CompanyProfilePage() {
  return (
    <>
      <HeroSection title="Company" highlight="Profile" subtitle="Over 15 years of manufacturing excellence in professional industrial power tools." showCta={false} compact />

      {/* Stats Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <StaggerChildren className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <StaggerItem key={stat.label}>
                  <div className="rounded-lg border border-border-primary bg-bg-card p-6 text-center transition-all hover:border-border-accent hover:shadow-[0_0_30px_rgba(244,196,48,0.05)]">
                    <Icon className="mx-auto mb-3 h-6 w-6 text-accent" />
                    <div className="text-2xl font-bold text-text-primary">{stat.value}</div>
                    <div className="mt-1 text-xs font-bold uppercase tracking-wider text-text-muted">{stat.label}</div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-y border-border-primary bg-bg-card py-20">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn>
            <div className="mb-12 text-center">
              <span className="mb-3 inline-block text-xs font-bold tracking-widest uppercase text-accent">Our Journey</span>
              <h2 className="text-2xl font-bold uppercase tracking-tight text-text-primary md:text-3xl">Corporate Milestones</h2>
            </div>
          </FadeIn>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 h-full w-px bg-border-primary md:left-1/2" />

            {milestones.map((milestone, i) => (
              <FadeIn key={milestone.year} delay={i * 0.05} direction={i % 2 === 0 ? "left" : "right"}>
                <div className={`relative mb-8 flex items-start gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`hidden flex-1 md:block ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                    <div className="rounded-lg border border-border-primary bg-bg-primary p-5 transition-colors hover:border-border-accent">
                      <span className="text-lg font-bold text-accent">{milestone.year}</span>
                      <h3 className="mt-1 text-sm font-bold uppercase tracking-wide text-text-primary">{milestone.title}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-text-secondary">{milestone.description}</p>
                    </div>
                  </div>
                  {/* Dot */}
                  <div className="absolute left-4 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full bg-accent md:left-1/2" />
                  <div className="flex-1 md:hidden" />
                  {/* Mobile card */}
                  <div className="ml-8 flex-1 md:hidden">
                    <div className="rounded-lg border border-border-primary bg-bg-primary p-5">
                      <span className="text-lg font-bold text-accent">{milestone.year}</span>
                      <h3 className="mt-1 text-sm font-bold uppercase tracking-wide text-text-primary">{milestone.title}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-text-secondary">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="hidden flex-1 md:block" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
