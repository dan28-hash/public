import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";
import { getSession } from "@/lib/auth";
import { fetchUserQuotes } from "@/lib/api";

export const metadata: Metadata = { title: "My Quotes" };

const statusColors: Record<string, string> = {
  draft: "bg-text-muted/20 text-text-muted",
  submitted: "bg-info/20 text-info",
  reviewed: "bg-warning/20 text-warning",
  accepted: "bg-success/20 text-success",
  rejected: "bg-error/20 text-error",
};

export default async function QuotesPage() {
  const session = await getSession();
  const quotes = await fetchUserQuotes(session.user?._id || "");

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-xl font-bold uppercase tracking-tight text-text-primary">My Quotes</h1>
        <p className="mt-1 text-sm text-text-secondary">Track the status of all your quote requests.</p>
      </div>

      {quotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <FileText className="mb-4 h-12 w-12 text-text-muted/30" />
          <p className="text-sm text-text-secondary">No quotes yet.</p>
          <Link href="/products" className="mt-3 text-xs font-bold uppercase tracking-wider text-accent hover:text-accent-hover">Browse Products</Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {quotes.map((quote) => (
            <Link key={quote._id} href={`/dashboard/quotes/${quote._id}`} className="group flex items-center justify-between rounded-lg border border-border-primary bg-bg-card p-5 transition-all hover:border-border-accent">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-text-primary">{quote._id}</span>
                  <span className={`rounded px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusColors[quote.status] || ""}`}>
                    {quote.status}
                  </span>
                </div>
                <p className="mt-1 text-xs text-text-muted">
                  {quote.items.length} product(s) - {quote.items.reduce((s, i) => s + i.quantity, 0).toLocaleString()} total units
                </p>
                <p className="mt-0.5 text-[10px] text-text-muted">Created {new Date(quote.createdAt).toLocaleDateString()}</p>
                {quote.notes && <p className="mt-2 text-xs text-text-secondary">{quote.notes}</p>}
              </div>
              <ArrowRight className="h-4 w-4 text-text-muted transition-all group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
