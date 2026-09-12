"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Truck, ShieldCheck, Heart, Minus, Plus } from "lucide-react";
import { Product, Review } from "@/lib/types";
import { formatPrice, discountPercent } from "@/lib/utils";
import { useCartStore } from "@/lib/store";
import ProductCard from "./ProductCard";
import { products as allProducts } from "@/lib/mock-data";

export default function ProductDetail({ product, reviews }: { product: Product; reviews: Review[] }) {
  const [activeImage, setActiveImage] = useState(0);
  const [variantId, setVariantId] = useState(product.variants[0]?.id);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const discount = discountPercent(product.price, product.compareAtPrice);
  const hasColors = product.variants.some((v) => v.color);
  const hasSizes = product.variants.some((v) => v.size);
  const related = allProducts.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-4 text-xs text-slate-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li><a href="/" className="hover:text-ink">Home</a> /</li>
          <li><a href={`/category/${product.categorySlug}`} className="hover:text-ink capitalize">{product.categorySlug.replace("-", " ")}</a> /</li>
          <li aria-current="page" className="text-ink">{product.title}</li>
        </ol>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-sand/40">
            <Image src={product.images[activeImage]} alt={product.title} fill priority className="object-cover" />
            {discount > 0 && (
              <span className="price-ticket on-sale absolute left-4 top-4 text-sm">-{discount}% off</span>
            )}
          </div>
          <div className="mt-3 flex gap-2">
            {product.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setActiveImage(i)}
                aria-label={`View image ${i + 1}`}
                className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 ${
                  i === activeImage ? "border-teal-500" : "border-transparent"
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-teal-600">{product.brand}</p>
          <h1 className="mt-1 font-display text-2xl font-medium text-ink sm:text-3xl">{product.title}</h1>

          <div className="mt-2 flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1">
              <Star size={15} className="fill-gold-400 text-gold-400" />
              <span className="font-medium">{product.rating}</span>
            </span>
            <span className="text-slate-400">{product.reviewCount} reviews</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-500">{product.soldCount.toLocaleString()} sold</span>
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="price-ticket text-lg">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-sm text-slate-400 line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
          </div>

          <p className="mt-4 text-sm leading-relaxed text-ink-muted">{product.description}</p>

          {hasColors && (
            <div className="mt-5">
              <p className="mb-2 text-sm font-medium text-ink">Color</p>
              <div className="flex gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setVariantId(v.id)}
                    aria-pressed={v.id === variantId}
                    aria-label={v.color}
                    className={`h-9 w-9 rounded-full border-2 ${v.id === variantId ? "border-teal-500" : "border-sand"}`}
                    style={{ backgroundColor: v.colorHex }}
                  />
                ))}
              </div>
            </div>
          )}

          {hasSizes && (
            <div className="mt-5">
              <p className="mb-2 text-sm font-medium text-ink">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    disabled={v.stock === 0}
                    onClick={() => setVariantId(v.id)}
                    aria-pressed={v.id === variantId}
                    className={`rounded-lg border px-4 py-2 text-sm ${
                      v.id === variantId ? "border-teal-500 bg-teal-50 text-teal-700" : "border-sand text-ink"
                    } ${v.stock === 0 ? "cursor-not-allowed opacity-40 line-through" : ""}`}
                  >
                    {v.size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-5 flex items-center gap-3">
            <div className="flex items-center gap-3 rounded-full border border-sand px-3 py-2">
              <button aria-label="Decrease quantity" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                <Minus size={16} />
              </button>
              <span className="w-5 text-center text-sm">{quantity}</span>
              <button aria-label="Increase quantity" onClick={() => setQuantity((q) => q + 1)}>
                <Plus size={16} />
              </button>
            </div>
            <span className="text-xs text-slate-500">{variant.stock} in stock</span>
          </div>

          <div className="mt-5 flex gap-3">
            <button
              onClick={() => addItem({ productId: product.id, variantId: variant.id, quantity })}
              disabled={variant.stock === 0}
              className="focus-ring flex-1 rounded-full bg-ink py-3.5 text-sm font-semibold text-porcelain hover:bg-ink-soft disabled:opacity-40"
            >
              {variant.stock === 0 ? "Out of stock" : "Add to cart"}
            </button>
            <button
              aria-label="Add to wishlist"
              className="focus-ring rounded-full border border-sand p-3.5 text-ink-muted hover:text-teal-600"
            >
              <Heart size={20} />
            </button>
          </div>

          <div className="mt-6 space-y-2 rounded-xl border border-sand p-4 text-sm text-ink-muted">
            {product.freeShipping && (
              <p className="flex items-center gap-2"><Truck size={16} className="text-teal-600" /> Free shipping on this item</p>
            )}
            <p className="flex items-center gap-2"><ShieldCheck size={16} className="text-teal-600" /> 2-year warranty included</p>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="font-display text-xl font-medium text-ink">Specifications</h2>
          <dl className="mt-4 divide-y divide-sand rounded-xl border border-sand">
            {product.specifications.map((spec) => (
              <div key={spec.label} className="grid grid-cols-2 gap-4 px-4 py-3 text-sm">
                <dt className="text-ink-muted">{spec.label}</dt>
                <dd className="text-ink">{spec.value}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-8 font-display text-xl font-medium text-ink">Features</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-ink-muted">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" /> {f}
              </li>
            ))}
          </ul>

          <h2 className="mt-8 font-display text-xl font-medium text-ink">Reviews</h2>
          <div className="mt-4 space-y-4">
            {reviews.length === 0 && (
              <p className="text-sm text-ink-muted">No reviews yet — be the first to share your experience.</p>
            )}
            {reviews.map((r) => (
              <div key={r.id} className="rounded-xl border border-sand p-4">
                <div className="flex items-center gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className={i < r.rating ? "fill-gold-400 text-gold-400" : "text-sand"} />
                  ))}
                  {r.verified && <span className="text-xs text-teal-600">Verified purchase</span>}
                </div>
                <p className="mt-2 text-sm font-medium text-ink">{r.title}</p>
                <p className="mt-1 text-sm text-ink-muted">{r.body}</p>
                <p className="mt-2 text-xs text-slate-400">{r.author} · {r.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 font-display text-xl font-medium text-ink">You may also like</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
