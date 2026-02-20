"use client";

import { useState } from "react";
import { Save, Loader2, CheckCircle2 } from "lucide-react";

export default function ProfilePage() {
  const [formData, setFormData] = useState({ firstName: "Demo", lastName: "User", company: "Demo Company", phone: "" });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-xl font-bold uppercase tracking-tight text-text-primary">Profile Settings</h1>
        <p className="mt-1 text-sm text-text-secondary">Update your account information.</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="flex flex-col gap-4 rounded-lg border border-border-primary bg-bg-card p-6">
          {[
            { name: "firstName", label: "First Name" },
            { name: "lastName", label: "Last Name" },
            { name: "company", label: "Company" },
            { name: "phone", label: "Phone" },
          ].map((field) => (
            <div key={field.name}>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-text-muted">{field.label}</label>
              <input
                type="text"
                value={formData[field.name as keyof typeof formData]}
                onChange={(e) => setFormData((prev) => ({ ...prev, [field.name]: e.target.value }))}
                className="w-full rounded-md border border-border-primary bg-bg-input px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-accent"
              />
            </div>
          ))}

          <button type="submit" disabled={loading} className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wider text-bg-primary transition-colors hover:bg-accent-hover disabled:opacity-50">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : saved ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            <span>{loading ? "Saving..." : saved ? "Saved" : "Save Changes"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
