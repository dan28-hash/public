import type { Metadata } from "next";
import { Wrench } from "lucide-react";
import Link from "next/link";
import RegisterForm from "@/components/register-form";

export const metadata: Metadata = {
  title: "Register",
  description:
    "Create a Ningbo Siyang account to request quotes, track inquiries, and access B2B pricing.",
};

export default function RegisterPage() {
  return (
    <section className="flex min-h-[calc(100vh-200px)] items-center justify-center py-16">
      <div className="w-full max-w-md px-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link href="/" className="mb-6 inline-flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-accent">
              <Wrench className="h-5 w-5 text-bg-primary" />
            </div>
            <span className="text-sm font-bold tracking-wider uppercase text-text-primary">
              Ningbo Siyang
            </span>
          </Link>
          <h1 className="text-2xl font-bold uppercase tracking-tight text-text-primary">
            Create Account
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            Register to request quotes and access our full B2B catalog.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-lg border border-border-primary bg-bg-card p-6">
          <RegisterForm />
        </div>
      </div>
    </section>
  );
}
