"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, Tag } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { products } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { lines, removeItem, setQuantity } = useCartStore();

  const items = lines
    .map((line) => {
      const product = products.find((p) => p.id === line.productId);
      const variant = product?.variants.find((v) => v.id === line.variantId);
      return product ? { line, product, variant } : null;
    })
    .filter(Boolean) as { line: typeof lines[number]; product: (typeof products)[number]; variant: any }[];

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.line.quantity, 0);
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 6.99;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-medium text-ink">Your cart is empty</h1>
        <p className="mt-2 text-ink-muted">Browse the catalog and add something you'll actually use.</p>
        <Link href="/" className="focus-ring mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-porcelain">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="font-display text-3xl font-medium text-ink">Your cart</h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
        <ul className="divide-y divide-sand rounded-xl border border-sand">
          {items.map(({ line, product, variant }) => (
            <li key={`${line.productId}-${line.variantId}`} className="flex gap-4 p-4">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-sand/40">
                <Image src={product.images[0]} alt={product.title} fill className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col">
                <Link href={`/product/${product.slug}`} className="text-sm font-medium text-ink hover:text-teal-600">
                  {product.title}
                </Link>
                <p className="text-xs text-slate-500">{variant?.color ?? variant?.size ?? "Standard"}</p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-3 rounded-full border border-sand px-3 py-1.5">
                    <button
                      aria-label="Decrease quantity"
                      onClick={() => setQuantity(line.productId, line.variantId, Math.max(1, line.quantity - 1))}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-5 text-center text-sm">{line.quantity}</span>
                    <button
                      aria-label="Increase quantity"
                      onClick={() => setQuantity(line.productId, line.variantId, line.quantity + 1)}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="price-ticket text-sm">{formatPrice(product.price * line.quantity)}</span>
                </div>
              </div>
              <button
                aria-label="Remove item"
                onClick={() => removeItem(line.productId, line.variantId)}
                className="focus-ring self-start rounded-md p-1.5 text-slate-400 hover:text-red-500"
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-xl border border-sand p-5">
          <h2 className="font-display text-lg font-medium text-ink">Order summary</h2>
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-sand p-2">
            <Tag size={16} className="ml-1 text-slate-400" />
            <input placeholder="Coupon code" className="w-full bg-transparent px-1 text-sm outline-none" />
            <button className="focus-ring rounded-md bg-ink px-3 py-1.5 text-xs font-medium text-porcelain">Apply</button>
          </div>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-ink-muted">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-ink-muted">Shipping</dt><dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd></div>
            <div className="flex justify-between"><dt className="text-ink-muted">Tax</dt><dd>{formatPrice(tax)}</dd></div>
            <div className="flex justify-between border-t border-sand pt-2 text-base font-semibold text-ink">
              <dt>Total</dt><dd>{formatPrice(total)}</dd>
            </div>
          </dl>
          <Link
            href="/checkout"
            className="focus-ring mt-4 block rounded-full bg-ink py-3 text-center text-sm font-semibold text-porcelain hover:bg-ink-soft"
          >
            Proceed to checkout
          </Link>
        </aside>
      </div>
    </div>
  );
}
