import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Package, ArrowRight, Clock } from "lucide-react";
import { getSession } from "@/lib/auth";
import { fetchUserQuotes, fetchUserOrders } from "@/lib/api";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const session = await getSession();
  const [quotes, orders] = await Promise.all([
    fetchUserQuotes(session.user?._id || ""),
    fetchUserOrders(session.user?._id || ""),
  ]);

  const statusColors: Record<string, string> = {
    draft: "bg-text-muted/20 text-text-muted",
    submitted: "bg-info/20 text-info",
    reviewed: "bg-warning/20 text-warning",
    accepted: "bg-success/20 text-success",
    rejected: "bg-error/20 text-error",
  };

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold uppercase tracking-tight text-text-primary">
          Welcome back, <span className="text-accent">{session.user?.firstName}</span>
        </h1>
        <p className="mt-1 text-sm text-text-secondary">Manage your quotes, orders, and account settings.</p>
      </div>

      {/* Quick Stats */}
      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border-primary bg-bg-card p-5">
          <FileText className="mb-2 h-5 w-5 text-accent" />
          <div className="text-2xl font-bold text-text-primary">{quotes.length}</div>
          <div className="text-xs text-text-muted">Total Quotes</div>
        </div>
        <div className="rounded-lg border border-border-primary bg-bg-card p-5">
          <Package className="mb-2 h-5 w-5 text-accent" />
          <div className="text-2xl font-bold text-text-primary">{orders.length}</div>
          <div className="text-xs text-text-muted">Active Orders</div>
        </div>
        <div className="rounded-lg border border-border-primary bg-bg-card p-5">
          <Clock className="mb-2 h-5 w-5 text-accent" />
          <div className="text-2xl font-bold text-text-primary">{quotes.filter((q) => q.status === "submitted").length}</div>
          <div className="text-xs text-text-muted">Pending Quotes</div>
        </div>
      </div>

      {/* Recent Quotes */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-text-primary">Recent Quotes</h2>
          <Link href="/dashboard/quotes" className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-accent transition-colors hover:text-accent-hover">
            View All <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          {quotes.slice(0, 3).map((quote) => (
            <Link key={quote._id} href={`/dashboard/quotes/${quote._id}`} className="flex items-center justify-between rounded-lg border border-border-primary bg-bg-card p-4 transition-colors hover:border-border-accent">
              <div>
                <span className="text-sm font-bold text-text-primary">{quote._id}</span>
                <p className="mt-0.5 text-[10px] text-text-muted">{quote.items.length} item(s) - {new Date(quote.createdAt).toLocaleDateString()}</p>
              </div>
              <span className={`rounded px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${statusColors[quote.status] || ""}`}>
                {quote.status}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-text-primary">Recent Orders</h2>
          <Link href="/dashboard/orders" className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-accent transition-colors hover:text-accent-hover">
            View All <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          {orders.slice(0, 2).map((order) => (
            <div key={order._id} className="flex items-center justify-between rounded-lg border border-border-primary bg-bg-card p-4">
              <div>
                <span className="text-sm font-bold text-text-primary">{order._id}</span>
                <p className="mt-0.5 text-[10px] text-text-muted">Quote {order.quoteId} - {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <span className={`rounded px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${statusColors[order.status] || "bg-info/20 text-info"}`}>
                {order.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
