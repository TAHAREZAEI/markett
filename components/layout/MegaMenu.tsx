"use client";

import Link from "next/link";
import { categories } from "@/lib/mock-data";

export default function MegaMenu({
  mobile = false,
  onNavigate
}: {
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  if (mobile) {
    return (
      <ul className="space-y-4">
        {categories.map((cat) => (
          <li key={cat.id}>
            <Link href={`/category/${cat.slug}`} onClick={onNavigate} className="font-medium text-ink">
              {cat.name}
            </Link>
            <ul className="mt-2 space-y-2 pl-3 text-sm text-ink-muted">
              {cat.subcategories.map((sub) => (
                <li key={sub.slug}>
                  <Link href={`/category/${cat.slug}/${sub.slug}`} onClick={onNavigate}>
                    {sub.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <ul className="flex items-center gap-7 py-2.5 text-sm font-medium text-ink">
        {categories.map((cat) => (
          <li key={cat.id} className="group relative">
            <Link href={`/category/${cat.slug}`} className="focus-ring rounded-sm py-2 hover:text-teal-500">
              {cat.name}
            </Link>
            <div className="invisible absolute left-0 top-full z-40 w-64 rounded-xl border border-sand bg-white p-4 opacity-0 shadow-lift transition-all duration-150 group-hover:visible group-hover:opacity-100">
              <p className="mb-2 text-xs uppercase tracking-wide text-slate-400">Shop {cat.name}</p>
              <ul className="space-y-1.5">
                {cat.subcategories.map((sub) => (
                  <li key={sub.slug}>
                    <Link
                      href={`/category/${cat.slug}/${sub.slug}`}
                      className="block rounded-md px-2 py-1.5 text-sm text-ink hover:bg-teal-50 hover:text-teal-600"
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
        <li>
          <Link href="/offers" className="rounded-sm py-2 text-gold-500 hover:text-gold-400">
            Flash Deals
          </Link>
        </li>
        <li>
          <Link href="/brands" className="rounded-sm py-2 hover:text-teal-500">
            Brands
          </Link>
        </li>
      </ul>
    </div>
  );
}
