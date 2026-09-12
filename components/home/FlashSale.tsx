"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Zap } from "lucide-react";
import { Product } from "@/lib/types";
import ProductCard from "@/components/product/ProductCard";

function useCountdown(hours: number) {
  const [target] = useState(() => Date.now() + hours * 60 * 60 * 1000);
  const [remaining, setRemaining] = useState(target - Date.now());

  useEffect(() => {
    const t = setInterval(() => setRemaining(Math.max(target - Date.now(), 0)), 1000);
    return () => clearInterval(t);
  }, [target]);

  const h = Math.floor(remaining / 3_600_000);
  const m = Math.floor((remaining % 3_600_000) / 60_000);
  const s = Math.floor((remaining % 60_000) / 1000);
  return { h, m, s };
}

export default function FlashSale({ products }: { products: Product[] }) {
  const { h, m, s } = useCountdown(9);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="rounded-2xl border border-sand bg-white p-5 sm:p-7">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Zap size={20} className="fill-gold-400 text-gold-400" />
          <h2 className="font-display text-2xl font-medium text-ink">Flash Sale</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 font-mono text-sm">
            {[pad(h), pad(m), pad(s)].map((v, i) => (
              <span key={i} className="rounded-md bg-ink px-2 py-1 text-porcelain">
                {v}
              </span>
            ))}
          </div>
          <Link href="/offers" className="text-sm font-medium text-teal-600 hover:text-teal-700">
            See all →
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
