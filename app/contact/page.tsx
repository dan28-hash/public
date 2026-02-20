import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import HeroSection from "@/components/hero-section";
import ContactForm from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Ningbo Siyang for inquiries about industrial power tools, bulk orders, OEM services, and partnership opportunities.",
};

const contactDetails = [
  {
    icon: MapPin,
    label: "Address",
    value: "No. 88 Industrial Avenue, Beilun District, Ningbo, Zhejiang, China 315800",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+86 574 8888 6666",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@ningbosiyang.com",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Monday - Friday, 8:00 AM - 5:30 PM (CST, UTC+8)",
  },
];

export default function ContactPage() {
  return (
    <>
      <HeroSection
        title="Contact"
        highlight="Our Team"
        subtitle="Whether you have questions about our products, need a bulk quote, or want to explore OEM partnerships, we are here to help."
        showCta={false}
        compact
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              <span className="mb-2 inline-block text-xs font-bold tracking-widest uppercase text-accent">
                Send a Message
              </span>
              <h2 className="mb-6 text-2xl font-bold uppercase tracking-tight text-text-primary">
                Get a Quote or Ask a Question
              </h2>
              <ContactForm />
            </div>

            {/* Contact Details Sidebar */}
            <div className="lg:col-span-2">
              <span className="mb-2 inline-block text-xs font-bold tracking-widest uppercase text-accent">
                Contact Information
              </span>
              <h2 className="mb-6 text-2xl font-bold uppercase tracking-tight text-text-primary">
                Reach Us Directly
              </h2>

              <div className="flex flex-col gap-4">
                {contactDetails.map((detail) => {
                  const Icon = detail.icon;
                  return (
                    <div
                      key={detail.label}
                      className="rounded-lg border border-border-primary bg-bg-card p-5"
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <Icon className="h-4 w-4 text-accent" />
                        <span className="text-[10px] font-bold tracking-widest uppercase text-text-muted">
                          {detail.label}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-text-primary">
                        {detail.value}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Response time note */}
              <div className="mt-6 rounded-lg border border-border-accent bg-accent-muted p-5">
                <p className="text-xs leading-relaxed text-text-secondary">
                  <span className="font-bold text-accent">
                    Fast Response Guarantee:
                  </span>{" "}
                  We respond to all inquiries within 24 business hours. For
                  urgent requests, contact us by phone during business hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
