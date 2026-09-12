"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star, Eye, Truck } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice, discountPercent } from "@/lib/utils";
import { useCartStore } from "@/lib/store";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const discount = discountPercent(product.price, product.compareAtPrice);
  const defaultVariant = product.variants[0];

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-sand bg-white transition-shadow hover:shadow-lift">
      <Link href={`/product/${product.slug}`} className="focus-ring relative block aspect-square overflow-hidden bg-sand/40">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {discount > 0 && (
          <span className="price-ticket on-sale absolute left-3 top-3 text-[11px]">-{discount}%</span>
        )}
        <button
          aria-label="Add to wishlist"
          className="focus-ring absolute right-3 top-3 rounded-full bg-white/90 p-2 text-ink-muted opacity-0 shadow-card transition-opacity group-hover:opacity-100 hover:text-teal-500"
          onClick={(e) => e.preventDefault()}
        >
          <Heart size={16} />
        </button>
        <button
          aria-label="Quick view"
          className="focus-ring absolute inset-x-3 bottom-3 flex translate-y-2 items-center justify-center gap-2 rounded-full bg-ink/90 py-2 text-xs font-medium text-porcelain opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
          onClick={(e) => e.preventDefault()}
        >
          <Eye size={14} /> Quick view
        </button>
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        <p className="text-[11px] uppercase tracking-wide text-slate-400">{product.brand}</p>
        <Link href={`/product/${product.slug}`} className="focus-ring line-clamp-2 text-sm font-medium text-ink hover:text-teal-600">
          {product.title}
        </Link>

        <div className="flex items-center gap-1 text-xs text-ink-muted">
          <Star size={13} className="fill-gold-400 text-gold-400" />
          <span>{product.rating}</span>
          <span className="text-slate-400">({product.reviewCount})</span>
          {product.freeShipping && (
            <span className="ml-auto flex items-center gap-1 text-teal-600">
              <Truck size={13} /> Free
            </span>
          )}
        </div>

        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="price-ticket text-sm">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-xs text-slate-400 line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
          </div>
        </div>

        <button
          onClick={() =>
            addItem({ productId: product.id, variantId: defaultVariant.id, quantity: 1 })
          }
          className="focus-ring mt-2 rounded-full border border-ink py-2 text-xs font-semibold text-ink transition-colors hover:bg-ink hover:text-porcelain"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
