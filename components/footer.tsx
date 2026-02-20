import Link from "next/link";
import { Wrench, Mail, Phone, MapPin } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const productLinks = [
  { href: "/products?category=drills-drivers", label: "Drills & Drivers" },
  { href: "/products?category=saws", label: "Saws" },
  { href: "/products?category=grinders", label: "Grinders" },
  { href: "/products?category=impact-tools", label: "Impact Tools" },
  { href: "/products?category=combo-kits", label: "Combo Kits" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-primary bg-bg-card">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-2.5">
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
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              Professional-grade industrial power tools manufactured in Ningbo,
              Zhejiang, China. Serving B2B clients worldwide with quality and
              reliability.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-xs font-bold tracking-widest uppercase text-accent">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="mb-4 text-xs font-bold tracking-widest uppercase text-accent">
              Product Categories
            </h3>
            <ul className="flex flex-col gap-2.5">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-xs font-bold tracking-widest uppercase text-accent">
              Contact
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span className="text-sm text-text-secondary">
                  No. 88 Industrial Avenue, Beilun District, Ningbo, Zhejiang,
                  China 315800
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <span className="text-sm text-text-secondary">
                  +86 574 8888 6666
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <span className="text-sm text-text-secondary">
                  info@ningbosiyang.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border-primary pt-8 md:flex-row">
          <p className="text-xs text-text-muted">
            {"\u00A9"} {new Date().getFullYear()} Ningbo Siyang. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-xs text-text-muted transition-colors hover:text-text-secondary"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-text-muted transition-colors hover:text-text-secondary"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
