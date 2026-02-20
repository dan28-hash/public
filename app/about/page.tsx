import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Factory,
  Shield,
  Globe,
  Users,
  Cog,
  CheckCircle2,
} from "lucide-react";
import HeroSection from "@/components/hero-section";
import SectionHeader from "@/components/section-header";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Ningbo Siyang, a leading manufacturer and exporter of professional industrial power tools based in Ningbo, Zhejiang, China.",
};

const capabilities = [
  {
    icon: Factory,
    title: "Advanced Manufacturing",
    description:
      "Our 25,000 sqm facility houses state-of-the-art CNC machining, automated assembly lines, and precision testing equipment.",
  },
  {
    icon: Cog,
    title: "In-House R&D",
    description:
      "A dedicated engineering team continuously develops new products and improves existing designs for maximum performance.",
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description:
      "ISO 9001:2015 certified with multi-stage inspection protocols. Every tool undergoes rigorous load and endurance testing.",
  },
  {
    icon: Users,
    title: "OEM & ODM Services",
    description:
      "Custom branding, packaging, and product modification available. We partner with global brands to deliver private-label solutions.",
  },
];

const certifications = [
  "ISO 9001:2015 Quality Management",
  "CE Conformity (European Market)",
  "GS Certification (German Safety)",
  "UL Listed (North American Market)",
  "RoHS Compliant",
  "REACH Compliant",
];

const exportRegions = [
  { region: "Europe", countries: "35+ countries" },
  { region: "North America", countries: "USA, Canada, Mexico" },
  { region: "Middle East", countries: "UAE, Saudi Arabia, Qatar" },
  { region: "Southeast Asia", countries: "15+ countries" },
  { region: "South America", countries: "Brazil, Chile, Argentina" },
  { region: "Africa", countries: "South Africa, Nigeria, Kenya" },
];

export default function AboutPage() {
  return (
    <>
      <HeroSection
        title="About"
        highlight="Ningbo Siyang"
        subtitle="Over 15 years of manufacturing excellence in professional industrial power tools. Based in Ningbo, Zhejiang, China."
        showCta={false}
        compact
      />

      {/* Company Story */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 items-center lg:grid-cols-2">
            <div>
              <span className="mb-3 inline-block text-xs font-bold tracking-widest uppercase text-accent">
                Our Story
              </span>
              <h2 className="text-2xl font-bold uppercase tracking-tight text-text-primary md:text-3xl">
                Engineering Power Tools{" "}
                <span className="text-accent">Since 2008</span>
              </h2>
              <div className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-text-secondary">
                <p>
                  Founded in Ningbo, Zhejiang Province, Ningbo Siyang began as a
                  small workshop dedicated to producing reliable power tool
                  components. Through relentless focus on quality and innovation,
                  we have grown into a comprehensive manufacturer serving B2B
                  clients across 60+ countries.
                </p>
                <p>
                  Our factory spans 25,000 square meters of modern production
                  space, equipped with automated CNC machining centers, precision
                  assembly lines, and a dedicated quality testing laboratory.
                  Every tool that leaves our facility has passed through
                  multi-stage quality inspections.
                </p>
                <p>
                  Today, Ningbo Siyang is recognized as a trusted OEM/ODM
                  partner for international brands seeking professional-grade
                  industrial tools at competitive pricing with reliable delivery.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border-primary">
              <Image
                src="/images/factory.jpg"
                alt="Ningbo Siyang manufacturing facility"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing Capabilities */}
      <section className="border-y border-border-primary bg-bg-card py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            label="Capabilities"
            title="Manufacturing Excellence"
            description="From raw material to finished product, we control every stage of the manufacturing process."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="rounded-lg border border-border-primary bg-bg-primary p-6 transition-colors hover:border-border-accent"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-accent-muted">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-text-primary">
                    {cap.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-text-secondary">
                    {cap.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            label="Quality Standards"
            title="Certifications & Compliance"
            description="Our products meet the highest international safety and quality standards."
          />
          <div className="mx-auto max-w-2xl">
            <div className="grid gap-3 sm:grid-cols-2">
              {certifications.map((cert) => (
                <div
                  key={cert}
                  className="flex items-center gap-3 rounded-md border border-border-primary bg-bg-card px-4 py-3"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                  <span className="text-sm text-text-primary">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="border-y border-border-primary bg-bg-card py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            label="Global Reach"
            title="Exporting Worldwide"
            description="Ningbo Siyang products serve professionals on every continent."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {exportRegions.map((exp) => (
              <div
                key={exp.region}
                className="flex items-center justify-between rounded-md border border-border-primary bg-bg-primary p-5"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-accent" />
                    <h3 className="text-sm font-bold uppercase tracking-wide text-text-primary">
                      {exp.region}
                    </h3>
                  </div>
                  <p className="mt-1 text-xs text-text-muted">
                    {exp.countries}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <span className="mb-3 inline-block text-xs font-bold tracking-widest uppercase text-accent">
            Partner With Us
          </span>
          <h2 className="text-balance text-3xl font-bold uppercase tracking-tight text-text-primary md:text-4xl">
            Ready to Work With{" "}
            <span className="text-accent">Ningbo Siyang?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-text-secondary">
            Whether you need OEM services, private-label tools, or bulk orders,
            our team is ready to discuss your requirements.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2.5 rounded-md bg-accent px-8 py-4 text-sm font-bold tracking-wider uppercase text-bg-primary transition-colors hover:bg-accent-hover"
          >
            <span>Get in Touch</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
