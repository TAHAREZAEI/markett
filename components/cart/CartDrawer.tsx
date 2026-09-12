"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { products } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const { lines, isDrawerOpen, closeDrawer, removeItem, setQuantity } = useCartStore();

  const items = lines
    .map((line) => {
      const product = products.find((p) => p.id === line.productId);
      const variant = product?.variants.find((v) => v.id === line.variantId);
      return product ? { line, product, variant } : null;
    })
    .filter(Boolean) as { line: typeof lines[number]; product: (typeof products)[number]; variant: any }[];

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.line.quantity, 0);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/40"
            onClick={closeDrawer}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.28, ease: "easeOut" }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-porcelain shadow-lift"
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-sand p-4">
              <h2 className="font-display text-lg font-medium">Your cart</h2>
              <button onClick={closeDrawer} aria-label="Close cart" className="focus-ring rounded-md p-1 hover:bg-sand/60">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center text-ink-muted">
                  <p className="font-display text-xl text-ink">Your cart is empty</p>
                  <p className="mt-1 text-sm">Add something you'll actually use.</p>
                  <Link
                    href="/"
                    onClick={closeDrawer}
                    className="focus-ring mt-5 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-porcelain"
                  >
                    Continue shopping
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map(({ line, product, variant }) => (
                    <li key={`${line.productId}-${line.variantId}`} className="flex gap-3">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-sand/40">
                        <Image src={product.images[0]} alt={product.title} fill className="object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <p className="line-clamp-1 text-sm font-medium text-ink">{product.title}</p>
                        <p className="text-xs text-slate-500">
                          {variant?.color ?? variant?.size ?? "Standard"}
                        </p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-full border border-sand px-2 py-1">
                            <button
                              aria-label="Decrease quantity"
                              onClick={() =>
                                setQuantity(line.productId, line.variantId, Math.max(1, line.quantity - 1))
                              }
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-4 text-center text-xs">{line.quantity}</span>
                            <button
                              aria-label="Increase quantity"
                              onClick={() => setQuantity(line.productId, line.variantId, line.quantity + 1)}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="price-ticket text-xs">{formatPrice(product.price * line.quantity)}</span>
                        </div>
                      </div>
                      <button
                        aria-label="Remove item"
                        onClick={() => removeItem(line.productId, line.variantId)}
                        className="focus-ring self-start rounded-md p-1 text-slate-400 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-sand p-4">
                <div className="mb-3 flex items-center justify-between text-sm">
                  <span className="text-ink-muted">Subtotal</span>
                  <span className="font-semibold text-ink">{formatPrice(subtotal)}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeDrawer}
                  className="focus-ring block rounded-full bg-ink py-3 text-center text-sm font-semibold text-porcelain hover:bg-ink-soft"
                >
                  Checkout
                </Link>
                <Link
                  href="/cart"
                  onClick={closeDrawer}
                  className="focus-ring mt-2 block rounded-full border border-sand py-3 text-center text-sm font-medium text-ink hover:bg-sand/40"
                >
                  View cart
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
