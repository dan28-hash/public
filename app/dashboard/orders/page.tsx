import type { Metadata } from "next";
import { Package, Truck, CheckCircle2 } from "lucide-react";
import { getSession } from "@/lib/auth";
import { fetchUserOrders } from "@/lib/api";

export const metadata: Metadata = { title: "Orders" };

const statusConfig: Record<string, { color: string; icon: typeof Package }> = {
  processing: { color: "bg-info/20 text-info", icon: Package },
  confirmed: { color: "bg-warning/20 text-warning", icon: Package },
  production: { color: "bg-accent/20 text-accent", icon: Package },
  shipped: { color: "bg-success/20 text-success", icon: Truck },
  delivered: { color: "bg-success/20 text-success", icon: CheckCircle2 },
};

export default async function OrdersPage() {
  const session = await getSession();
  const orders = await fetchUserOrders(session.user?._id || "");

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-xl font-bold uppercase tracking-tight text-text-primary">Orders</h1>
        <p className="mt-1 text-sm text-text-secondary">Track your order status and shipping information.</p>
      </div>

      <div className="flex flex-col gap-4">
        {orders.map((order) => {
          const config = statusConfig[order.status] || statusConfig.processing;
          return (
            <div key={order._id} className="rounded-lg border border-border-primary bg-bg-card p-5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-sm font-bold text-text-primary">{order._id}</span>
                  <p className="mt-0.5 text-[10px] text-text-muted">Quote Ref: {order.quoteId}</p>
                </div>
                <span className={`rounded px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${config.color}`}>{order.status}</span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {order.trackingNumber && (
                  <div className="rounded-md border border-border-primary bg-bg-primary px-4 py-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Tracking</span>
                    <p className="mt-0.5 text-sm font-bold text-accent">{order.trackingNumber}</p>
                  </div>
                )}
                {order.estimatedDelivery && (
                  <div className="rounded-md border border-border-primary bg-bg-primary px-4 py-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Est. Delivery</span>
                    <p className="mt-0.5 text-sm text-text-primary">{new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Items</span>
                <div className="mt-2 flex flex-col gap-1">
                  {order.items.map((item) => (
                    <div key={item.productId} className="flex items-center justify-between text-xs">
                      <span className="text-text-secondary">{item.title}</span>
                      <span className="text-text-primary">{item.quantity.toLocaleString()} units</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
