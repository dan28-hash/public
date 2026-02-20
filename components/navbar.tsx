"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Wrench, ShoppingCart, ChevronDown, User, LogOut, LayoutDashboard, Shield } from "lucide-react";
import { useQuote } from "@/lib/quote-store";
import QuoteDrawer from "@/components/quote-drawer";

interface UserData {
  firstName: string;
  lastName: string;
  role: "customer" | "admin";
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About", hasDropdown: true },
  { href: "/contact", label: "Contact" },
];

const aboutLinks = [
  { href: "/about", label: "Overview" },
  { href: "/about/company-profile", label: "Company Profile" },
  { href: "/about/team", label: "Leadership Team" },
  { href: "/about/certifications", label: "Certifications" },
  { href: "/about/global-presence", label: "Global Presence" },
  { href: "/about/download-brochure", label: "Download Brochure" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const { items, setDrawerOpen } = useQuote();

  useEffect(() => {
    // Read user from cookie on client side
    const getCookieUser = () => {
      try {
        const cookies = document.cookie.split(";").reduce((acc, c) => {
          const [key, ...vals] = c.trim().split("=");
          acc[key] = vals.join("=");
          return acc;
        }, {} as Record<string, string>);
        if (cookies.sy_auth_user) {
          const parsed = JSON.parse(decodeURIComponent(cookies.sy_auth_user));
          setUser(parsed);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    };
    getCookieUser();
    const interval = setInterval(getCookieUser, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    document.cookie = "sy_auth_token=; path=/; max-age=0";
    document.cookie = "sy_auth_user=; path=/; max-age=0";
    setUser(null);
    window.location.href = "/";
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border-primary bg-bg-primary/95 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-accent">
              <Wrench className="h-5 w-5 text-bg-primary" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold tracking-wider uppercase text-text-primary">
                Ningbo Siyang
              </span>
              <span className="text-[10px] tracking-widest uppercase text-text-muted">
                Industrial Tools
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href === "/about" && pathname.startsWith("/about"));
              return (
                <li key={link.href} className="relative">
                  {link.hasDropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setAboutOpen(true)}
                      onMouseLeave={() => setAboutOpen(false)}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium tracking-wide uppercase transition-colors ${
                          isActive ? "bg-accent-muted text-accent" : "text-text-secondary hover:bg-bg-elevated hover:text-text-primary"
                        }`}
                      >
                        {link.label}
                        <ChevronDown className={`h-3 w-3 transition-transform ${aboutOpen ? "rotate-180" : ""}`} />
                      </Link>
                      {aboutOpen && (
                        <div className="absolute left-0 top-full z-50 mt-1 w-56 rounded-md border border-border-primary bg-bg-card py-1 shadow-xl">
                          {aboutLinks.map((al) => (
                            <Link
                              key={al.href}
                              href={al.href}
                              className="block px-4 py-2.5 text-xs font-medium tracking-wide uppercase text-text-secondary transition-colors hover:bg-bg-hover hover:text-accent"
                            >
                              {al.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className={`rounded-md px-4 py-2 text-sm font-medium tracking-wide uppercase transition-colors ${
                        isActive ? "bg-accent-muted text-accent" : "text-text-secondary hover:bg-bg-elevated hover:text-text-primary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Desktop Auth + Cart */}
          <div className="hidden items-center gap-3 lg:flex">
            {/* Quote Cart */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="relative flex h-10 w-10 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-bg-elevated hover:text-text-primary"
              aria-label="Open quote request"
            >
              <ShoppingCart className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-bg-primary">
                  {items.length}
                </span>
              )}
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="flex h-10 w-10 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-bg-elevated hover:text-accent"
                    aria-label="Admin Panel"
                  >
                    <Shield className="h-4 w-4" />
                  </Link>
                )}
                <Link
                  href="/dashboard"
                  className="flex h-10 w-10 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-bg-elevated hover:text-text-primary"
                  aria-label="Dashboard"
                >
                  <LayoutDashboard className="h-4 w-4" />
                </Link>
                <span className="text-xs font-medium text-text-secondary">
                  {user.firstName}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex h-10 w-10 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-bg-elevated hover:text-error"
                  aria-label="Log out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="rounded-md px-4 py-2 text-sm font-medium tracking-wide uppercase text-text-secondary transition-colors hover:text-text-primary"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="rounded-md bg-accent px-4 py-2 text-sm font-bold tracking-wide uppercase text-bg-primary transition-colors hover:bg-accent-hover"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button + Cart */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setDrawerOpen(true)}
              className="relative flex h-10 w-10 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-bg-elevated hover:text-text-primary"
              aria-label="Open quote request"
            >
              <ShoppingCart className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-bg-primary">
                  {items.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-bg-elevated hover:text-text-primary"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="border-t border-border-primary bg-bg-primary px-6 pb-6 lg:hidden">
            <ul className="flex flex-col gap-1 pt-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block rounded-md px-4 py-3 text-sm font-medium tracking-wide uppercase transition-colors ${
                        isActive ? "bg-accent-muted text-accent" : "text-text-secondary hover:bg-bg-elevated hover:text-text-primary"
                      }`}
                    >
                      {link.label}
                    </Link>
                    {link.hasDropdown && (
                      <div className="ml-4 flex flex-col gap-1">
                        {aboutLinks.slice(1).map((al) => (
                          <Link
                            key={al.href}
                            href={al.href}
                            onClick={() => setMobileOpen(false)}
                            className="block rounded-md px-4 py-2 text-xs font-medium tracking-wide uppercase text-text-muted transition-colors hover:text-text-secondary"
                          >
                            {al.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 flex flex-col gap-2 border-t border-border-primary pt-4">
              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="rounded-md px-4 py-3 text-center text-sm font-medium tracking-wide uppercase text-text-secondary transition-colors hover:text-text-primary">
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className="rounded-md px-4 py-3 text-center text-sm font-medium tracking-wide uppercase text-text-secondary transition-colors hover:text-error">
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="rounded-md px-4 py-3 text-center text-sm font-medium tracking-wide uppercase text-text-secondary transition-colors hover:text-text-primary">
                    Sign In
                  </Link>
                  <Link href="/auth/register" onClick={() => setMobileOpen(false)} className="rounded-md bg-accent px-4 py-3 text-center text-sm font-bold tracking-wide uppercase text-bg-primary transition-colors hover:bg-accent-hover">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <QuoteDrawer />
    </>
  );
}
