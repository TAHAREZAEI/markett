"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Heart, ShoppingBag, Menu, User, MapPin } from "lucide-react";
import MegaMenu from "./MegaMenu";
import { useCartStore } from "@/lib/store";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const lines = useCartStore((s) => s.lines);
  const openDrawer = useCartStore((s) => s.openDrawer);
  const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0);

  return (
    <header className="sticky top-0 z-50 border-b border-sand bg-porcelain/95 backdrop-blur supports-[backdrop-filter]:bg-porcelain/80">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2 text-xs text-ink-muted sm:px-6">
        <MapPin size={14} />
        <span>Deliver to Istanbul</span>
        <span className="ml-auto hidden gap-4 sm:flex">
          <Link href="/orders" className="hover:text-ink">Track order</Link>
          <Link href="/faq" className="hover:text-ink">Help</Link>
        </span>
      </div>

      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 pb-3 sm:px-6">
        <button
          className="focus-ring rounded-md p-1 lg:hidden"
          aria-label="Open menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <Menu size={22} />
        </button>

        <Link href="/" className="shrink-0 font-display text-2xl font-semibold tracking-tight text-ink">
          Verra
        </Link>

        <form
          role="search"
          action="/search"
          className="hidden flex-1 items-center rounded-full border border-sand bg-white px-4 py-2.5 shadow-card focus-within:border-teal-500 sm:flex"
        >
          <Search size={18} className="text-slate-400" />
          <input
            name="q"
            type="search"
            placeholder="Search products, brands and categories"
            className="ml-3 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </form>

        <nav className="ml-auto flex items-center gap-1 sm:gap-2">
          <Link href="/profile" className="focus-ring flex flex-col items-center rounded-md px-2 py-1 text-ink hover:bg-sand/50">
            <User size={20} />
            <span className="hidden text-[11px] sm:block">Account</span>
          </Link>
          <Link href="/wishlist" className="focus-ring flex flex-col items-center rounded-md px-2 py-1 text-ink hover:bg-sand/50">
            <Heart size={20} />
            <span className="hidden text-[11px] sm:block">Wishlist</span>
          </Link>
          <button
            onClick={openDrawer}
            className="focus-ring relative flex flex-col items-center rounded-md px-2 py-1 text-ink hover:bg-sand/50"
            aria-label={`Cart, ${itemCount} items`}
          >
            <ShoppingBag size={20} />
            <span className="hidden text-[11px] sm:block">Cart</span>
            {itemCount > 0 && (
              <span className="price-ticket absolute -right-1 -top-1 !rounded-full !px-1.5 !py-0 text-[10px] before:hidden after:hidden">
                {itemCount}
              </span>
            )}
          </button>
        </nav>
      </div>

      <div className="hidden border-t border-sand bg-white lg:block">
        <MegaMenu />
      </div>

      {menuOpen && (
        <div className="border-t border-sand bg-white p-4 lg:hidden">
          <MegaMenu mobile onNavigate={() => setMenuOpen(false)} />
        </div>
      )}
    </header>
  );
}
