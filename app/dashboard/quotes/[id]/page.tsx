import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";
import { fetchQuoteById } from "@/lib/api";

const statusColors: Record<string, string> = {
  draft: "bg-text-muted/20 text-text-muted",
  submitted: "bg-info/20 text-info",
  reviewed: "bg-warning/20 text-warning",
  accepted: "bg-success/20 text-success",
  rejected: "bg-error/20 text-error",
};

const statusSteps = ["submitted", "reviewed", "accepted"];

export default async function QuoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const quote = await fetchQuoteById(id);
  if (!quote) notFound();

  const currentStep = statusSteps.indexOf(quote.status);

  return (
    <div className="p-6 lg:p-10">
      <Link href="/dashboard/quotes" className="mb-6 inline-flex items-center gap-1.5 text-xs text-text-muted transition-colors hover:text-text-secondary">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Quotes
      </Link>

      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-tight text-text-primary">Quote {quote._id}</h1>
          <p className="mt-1 text-xs text-text-muted">Created {new Date(quote.createdAt).toLocaleDateString()}</p>
        </div>
        <span className={`rounded px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${statusColors[quote.status] || ""}`}>
          {quote.status}
        </span>
      </div>

      {/* Status Timeline */}
      <div className="mb-8 rounded-lg border border-border-primary bg-bg-card p-6">
        <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-text-muted">Status Timeline</h2>
        <div className="flex items-center gap-2">
          {statusSteps.map((step, i) => (
            <div key={step} className="flex flex-1 items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold ${i <= currentStep ? "bg-accent text-bg-primary" : "bg-bg-elevated text-text-muted"}`}>
                {i + 1}
              </div>
              <span className={`text-xs uppercase tracking-wider ${i <= currentStep ? "font-bold text-accent" : "text-text-muted"}`}>
                {step}
              </span>
              {i < statusSteps.length - 1 && <div className={`h-px flex-1 ${i < currentStep ? "bg-accent" : "bg-border-primary"}`} />}
            </div>
          ))}
        </div>
      </div>

      {/* Items */}
      <div className="mb-8 rounded-lg border border-border-primary bg-bg-card p-6">
        <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-text-muted">Items ({quote.items.length})</h2>
        <div className="flex flex-col gap-3">
          {quote.items.map((item) => (
            <div key={item.productId} className="flex items-center justify-between rounded-md border border-border-primary bg-bg-primary p-4">
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-accent" />
                <div>
                  <Link href={`/products/${item.slug}`} className="text-sm font-bold text-text-primary transition-colors hover:text-accent">{item.title}</Link>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-text-primary">{item.quantity.toLocaleString()}</span>
                <span className="ml-1 text-xs text-text-muted">units</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notes */}
      {quote.notes && (
        <div className="rounded-lg border border-border-primary bg-bg-card p-6">
          <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-text-muted">Notes</h2>
          <p className="text-sm text-text-secondary">{quote.notes}</p>
        </div>
      )}
    </div>
  );
}
