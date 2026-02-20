import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { LayoutDashboard, FileText, Package, User, FolderOpen } from "lucide-react";

const sidebarLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/quotes", label: "My Quotes", icon: FileText },
  { href: "/dashboard/orders", label: "Orders", icon: Package },
  { href: "/dashboard/documents", label: "Documents", icon: FolderOpen },
  { href: "/dashboard/profile", label: "Profile", icon: User },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session.isAuthenticated) {
    redirect("/auth/login?redirect=/dashboard");
  }

  return (
    <div className="flex min-h-[calc(100vh-73px)]">
      {/* Sidebar */}
      <aside className="hidden w-64 border-r border-border-primary bg-bg-card lg:block">
        <div className="flex flex-col p-6">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-wider text-text-muted">Dashboard</p>
            <p className="mt-1 text-sm font-bold text-text-primary">{session.user?.firstName} {session.user?.lastName}</p>
            <p className="text-[10px] text-text-muted">{session.user?.company}</p>
          </div>
          <nav className="flex flex-col gap-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 rounded-md px-3 py-2.5 text-xs font-medium uppercase tracking-wider text-text-secondary transition-colors hover:bg-bg-hover hover:text-text-primary"
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile nav */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-border-primary bg-bg-card lg:hidden">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-1 flex-col items-center gap-1 py-3 text-text-secondary transition-colors hover:text-accent"
            >
              <Icon className="h-4 w-4" />
              <span className="text-[9px] font-bold uppercase tracking-wider">{link.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto pb-20 lg:pb-0">
        {children}
      </div>
    </div>
  );
}
