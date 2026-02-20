"use client";

import { useState } from "react";
import { FileDown, CheckCircle2, Loader2 } from "lucide-react";
import { brochureDownloadSchema } from "@/lib/validations";
import { submitBrochureRequest } from "@/lib/api";

export default function DownloadBrochurePage() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const result = brochureDownloadSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => { fieldErrors[err.path[0] as string] = err.message; });
      setErrors(fieldErrors);
      return;
    }
    setLoading(true);
    await submitBrochureRequest(formData);
    setLoading(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-6">
        <div className="text-center">
          <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-success" />
          <h1 className="text-2xl font-bold uppercase tracking-tight text-text-primary">Brochure Request Sent</h1>
          <p className="mt-3 text-sm text-text-secondary">{"We've sent the download link to your email address."}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="py-20">
        <div className="mx-auto max-w-2xl px-6">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-muted">
              <FileDown className="h-8 w-8 text-accent" />
            </div>
            <h1 className="text-2xl font-bold uppercase tracking-tight text-text-primary md:text-3xl">
              Download Our <span className="text-accent">Product Brochure</span>
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Get our complete product catalog with specifications, pricing tiers, and OEM customization options.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-lg border border-border-primary bg-bg-card p-8">
            {[
              { name: "name", label: "Full Name", type: "text", required: true },
              { name: "email", label: "Business Email", type: "email", required: true },
              { name: "company", label: "Company Name", type: "text", required: true },
              { name: "phone", label: "Phone (Optional)", type: "tel", required: false },
            ].map((field) => (
              <div key={field.name}>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-text-muted">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={(e) => setFormData((prev) => ({ ...prev, [field.name]: e.target.value }))}
                  required={field.required}
                  className="w-full rounded-md border border-border-primary bg-bg-input px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-accent"
                />
                {errors[field.name] && <p className="mt-1 text-xs text-error">{errors[field.name]}</p>}
              </div>
            ))}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-bg-primary transition-colors hover:bg-accent-hover disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileDown className="h-4 w-4" />}
              <span>{loading ? "Submitting..." : "Request Brochure"}</span>
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
