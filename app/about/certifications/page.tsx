import type { Metadata } from "next";
import { Shield, Download, Calendar } from "lucide-react";
import HeroSection from "@/components/hero-section";
import { StaggerChildren, StaggerItem } from "@/components/motion";
import { fetchCertifications } from "@/lib/api";

export const metadata: Metadata = {
  title: "Certifications",
  description: "View Ningbo Siyang's quality certifications including ISO, CE, GS, UL, RoHS, and REACH compliance.",
};

export default async function CertificationsPage() {
  const certifications = await fetchCertifications();

  return (
    <>
      <HeroSection title="Quality" highlight="Certifications" subtitle="Our products meet the highest international safety and quality standards across all major markets." showCta={false} compact />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => (
              <StaggerItem key={cert._id}>
                <div className="flex flex-col rounded-lg border border-border-primary bg-bg-card p-6 transition-all hover:border-border-accent">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-accent-muted">
                    <Shield className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-base font-bold text-text-primary">{cert.name}</h3>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-accent">{cert.issuer}</p>
                  <p className="mt-3 flex-1 text-xs leading-relaxed text-text-secondary">{cert.description}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-border-primary pt-4">
                    <div className="flex items-center gap-1.5 text-[10px] text-text-muted">
                      <Calendar className="h-3 w-3" />
                      <span>Valid until {new Date(cert.validUntil).toLocaleDateString("en-US", { year: "numeric", month: "short" })}</span>
                    </div>
                    <button className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-accent transition-colors hover:text-accent-hover">
                      <Download className="h-3 w-3" />
                      <span>PDF</span>
                    </button>
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
