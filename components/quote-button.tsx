"use client";

import { useRouter } from "next/navigation";
import { FileText } from "lucide-react";

interface QuoteButtonProps {
  isAuthenticated?: boolean;
  size?: "default" | "large";
  className?: string;
}

export default function QuoteButton({
  isAuthenticated = false,
  size = "default",
  className = "",
}: QuoteButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (!isAuthenticated) {
      router.push("/auth/login?redirect=quote");
      return;
    }

    // When Unchained storefront is connected, redirect there
    const storefrontUrl = process.env.NEXT_PUBLIC_STOREFRONT_URL;
    if (storefrontUrl) {
      window.location.href = storefrontUrl;
    } else {
      // Fallback to contact page
      router.push("/contact");
    }
  };

  const sizeClasses =
    size === "large"
      ? "px-8 py-4 text-sm gap-2.5"
      : "px-5 py-2.5 text-xs gap-2";

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center rounded-md bg-accent font-bold tracking-wider uppercase text-bg-primary transition-colors hover:bg-accent-hover ${sizeClasses} ${className}`}
    >
      <FileText className={size === "large" ? "h-5 w-5" : "h-4 w-4"} />
      <span>Request Quote</span>
    </button>
  );
}
