"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { contactFormSchema } from "@/lib/validations";
import { submitContactForm } from "@/lib/api";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setStatus("submitting");
    try {
      const response = await submitContactForm(result.data);
      if (response.success) {
        setStatus("success");
        setResponseMessage(response.message);
        setFormData({ name: "", email: "", company: "", phone: "", message: "" });
      } else {
        setStatus("error");
        setResponseMessage("Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setResponseMessage("An error occurred. Please try again later.");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-lg border border-border-accent bg-accent-muted p-8 text-center">
        <h3 className="text-lg font-bold uppercase text-accent">
          Message Sent
        </h3>
        <p className="mt-2 text-sm text-text-secondary">{responseMessage}</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-xs font-bold uppercase tracking-wider text-accent transition-colors hover:text-accent-hover"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-[10px] font-bold tracking-widest uppercase text-text-muted"
        >
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-md border border-border-primary bg-bg-input px-4 py-3 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:border-accent focus:outline-none"
          placeholder="John Smith"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-400">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-[10px] font-bold tracking-widest uppercase text-text-muted"
        >
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-md border border-border-primary bg-bg-input px-4 py-3 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:border-accent focus:outline-none"
          placeholder="john@company.com"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-400">{errors.email}</p>
        )}
      </div>

      {/* Company */}
      <div>
        <label
          htmlFor="company"
          className="mb-1.5 block text-[10px] font-bold tracking-widest uppercase text-text-muted"
        >
          Company Name *
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full rounded-md border border-border-primary bg-bg-input px-4 py-3 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:border-accent focus:outline-none"
          placeholder="Acme Corporation"
        />
        {errors.company && (
          <p className="mt-1 text-xs text-red-400">{errors.company}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="mb-1.5 block text-[10px] font-bold tracking-widest uppercase text-text-muted"
        >
          Phone (Optional)
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full rounded-md border border-border-primary bg-bg-input px-4 py-3 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:border-accent focus:outline-none"
          placeholder="+1 (555) 000-0000"
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-[10px] font-bold tracking-widest uppercase text-text-muted"
        >
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full resize-none rounded-md border border-border-primary bg-bg-input px-4 py-3 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:border-accent focus:outline-none"
          placeholder="Tell us about your requirements, quantities, and timeline..."
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-400">{errors.message}</p>
        )}
      </div>

      {/* Error message */}
      {status === "error" && (
        <p className="text-sm text-red-400">{responseMessage}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="flex items-center justify-center gap-2.5 rounded-md bg-accent px-6 py-3.5 text-sm font-bold tracking-wider uppercase text-bg-primary transition-colors hover:bg-accent-hover disabled:opacity-50"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            <span>Send Message</span>
          </>
        )}
      </button>
    </form>
  );
}
