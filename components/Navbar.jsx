"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toogle"; 
import { useFavorite } from "@/components/context/Favorite-Context"; 
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

// Pastikan variabel ini bernama 'baseLinks' dan berada DI LUAR komponen Navbar
const baseLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/profile", label: "Profile" },
  { href: "/contact", label: "Contact" },
  { href: "/users", label: "User" },
  { href: "/messages", label: "Messages" }
];

export default function Navbar() {
  const pathname = usePathname();
  const { favorites = [] } = useFavorite() || {}; 

  const links = [
    ...baseLinks, 
    { href: "/favorites", label: `Favorite (${favorites?.length || 0})` }
  ];

  return (
    <header className="sticky top-4 z-50 mx-auto w-full max-w-4xl px-4">
      <nav className="flex items-center justify-between gap-4 rounded-full border border-white/10 bg-background/70 px-4 py-2 shadow-lg shadow-black/20 backdrop-blur-xl">
        <Link
          href="/"
          className="shrink-0 text-sm font-bold tracking-tight"
        >
          MyWebsite
        </Link>

        {/* Bagian link menu */}
        <div className="hidden items-center gap-1 text-sm text-muted-foreground sm:flex">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3 py-1.5 transition-colors hover:text-foreground",
                  isActive && "bg-foreground/10 text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Bagian aksi */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          <Link
            href="/contact"
            className={cn(buttonVariants({ size: "sm" }), "rounded-full shrink-0")}
          >
            Get in touch
          </Link>
        </div>
      </nav>
    </header>
  );
}