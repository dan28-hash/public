import type { Metadata } from "next";
import { User } from "lucide-react";
import HeroSection from "@/components/hero-section";
import { StaggerChildren, StaggerItem } from "@/components/motion";
import { fetchTeamMembers } from "@/lib/api";

export const metadata: Metadata = {
  title: "Leadership Team",
  description: "Meet the leadership team behind Ningbo Siyang's manufacturing excellence.",
};

export default async function TeamPage() {
  const team = await fetchTeamMembers();

  return (
    <>
      <HeroSection title="Leadership" highlight="Team" subtitle="The people driving innovation and quality in industrial power tool manufacturing." showCta={false} compact />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <StaggerItem key={member._id}>
                <div className="group rounded-lg border border-border-primary bg-bg-card p-6 transition-all hover:border-border-accent hover:shadow-[0_0_30px_rgba(244,196,48,0.05)]">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-bg-elevated">
                    <User className="h-8 w-8 text-text-muted" />
                  </div>
                  <h3 className="text-base font-bold text-text-primary">{member.name}</h3>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wider text-accent">{member.role}</p>
                  <span className="mt-1 inline-block rounded bg-bg-elevated px-2 py-0.5 text-[10px] uppercase tracking-wider text-text-muted">{member.department}</span>
                  <p className="mt-4 text-xs leading-relaxed text-text-secondary">{member.bio}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </>
  );
}
