"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  FileText,
  Users,
  TrendingUp,
  DollarSign,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";

const stats = [
  {
    title: "Total Products",
    value: "48",
    change: "+4 this month",
    icon: Package,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Active Quotes",
    value: "23",
    change: "+12 this week",
    icon: FileText,
    color: "text-chart-2",
    bg: "bg-chart-2/10",
  },
  {
    title: "Customers",
    value: "156",
    change: "+8 this month",
    icon: Users,
    color: "text-chart-3",
    bg: "bg-chart-3/10",
  },
  {
    title: "Revenue (MTD)",
    value: "$284K",
    change: "+18% vs last month",
    icon: DollarSign,
    color: "text-chart-4",
    bg: "bg-chart-4/10",
  },
];

const recentQuotes = [
  { id: "QR-2024-0047", customer: "BuildMax Corp", items: 5, status: "pending", date: "2 hours ago" },
  { id: "QR-2024-0046", customer: "ProTool Distributors", items: 12, status: "approved", date: "5 hours ago" },
  { id: "QR-2024-0045", customer: "HardwareHub Ltd", items: 3, status: "sent", date: "1 day ago" },
  { id: "QR-2024-0044", customer: "Global Construct Inc", items: 8, status: "pending", date: "1 day ago" },
  { id: "QR-2024-0043", customer: "ToolMaster LLC", items: 20, status: "approved", date: "2 days ago" },
];

const statusColor: Record<string, string> = {
  pending: "bg-yellow-500/15 text-yellow-600 border-yellow-500/20",
  approved: "bg-green-500/15 text-green-600 border-green-500/20",
  sent: "bg-blue-500/15 text-blue-600 border-blue-500/20",
  rejected: "bg-red-500/15 text-red-600 border-red-500/20",
};

export default function AdminOverview() {
  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Dashboard Overview</h2>
            <p className="text-sm text-muted-foreground">
              Welcome back. Here is what is happening today.
            </p>
          </div>
        </div>
      </FadeIn>

      <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StaggerItem key={stat.title}>
            <Card className="border-border bg-card">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="mt-1 text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <TrendingUp size={12} className="text-chart-2" />
                      {stat.change}
                    </p>
                  </div>
                  <div className={`rounded-xl p-3 ${stat.bg}`}>
                    <stat.icon size={22} className={stat.color} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <div className="grid gap-6 lg:grid-cols-2">
        <FadeIn delay={0.2}>
          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base font-semibold text-foreground">
                Recent Quote Requests
              </CardTitle>
              <Link
                href="/admin/quotes"
                className="text-xs font-medium text-primary hover:underline"
              >
                View all
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentQuotes.map((q) => (
                  <div
                    key={q.id}
                    className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">
                          {q.id}
                        </span>
                        <Badge
                          variant="outline"
                          className={`text-[10px] ${statusColor[q.status]}`}
                        >
                          {q.status}
                        </Badge>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {q.customer} - {q.items} items
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock size={12} />
                      {q.date}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.3}>
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-foreground">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Add Product", href: "/admin/products", icon: Package },
                  { label: "View Quotes", href: "/admin/quotes", icon: FileText },
                  { label: "Manage Customers", href: "/admin/customers", icon: Users },
                  { label: "View Analytics", href: "/admin/analytics", icon: TrendingUp },
                ].map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="flex flex-col items-center gap-2 rounded-lg border border-border bg-muted/30 p-4 text-center transition-colors hover:bg-muted"
                  >
                    <action.icon size={20} className="text-primary" />
                    <span className="text-xs font-medium text-foreground">
                      {action.label}
                    </span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
