"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { products } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";

const steps = ["Address", "Shipping", "Payment", "Review"] as const;
type Step = (typeof steps)[number];

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, clear } = useCartStore();
  const [stepIndex, setStepIndex] = useState(0);
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cod" | "wallet">("card");
  const [placing, setPlacing] = useState(false);

  const items = lines
    .map((line) => {
      const product = products.find((p) => p.id === line.productId);
      return product ? { line, product } : null;
    })
    .filter(Boolean) as { line: typeof lines[number]; product: (typeof products)[number] }[];

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.line.quantity, 0);
  const shippingCost = shippingMethod === "express" ? 14.99 : subtotal > 50 ? 0 : 6.99;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = subtotal + shippingCost + tax;

  const step: Step = steps[stepIndex];

  function next() {
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  }
  function back() {
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  function placeOrder() {
    setPlacing(true);
    setTimeout(() => {
      clear();
      router.push("/orders?success=1");
    }, 900);
  }

  if (items.length === 0 && !placing) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-medium text-ink">Nothing to check out</h1>
        <p className="mt-2 text-ink-muted">Your cart is empty right now.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="font-display text-3xl font-medium text-ink">Checkout</h1>

      <ol className="mt-6 flex flex-wrap gap-4 text-sm">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-2">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                i < stepIndex ? "bg-teal-500 text-white" : i === stepIndex ? "bg-ink text-white" : "bg-sand text-ink-muted"
              }`}
            >
              {i < stepIndex ? <Check size={13} /> : i + 1}
            </span>
            <span className={i === stepIndex ? "font-medium text-ink" : "text-ink-muted"}>{s}</span>
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="rounded-xl border border-sand p-6">
          {step === "Address" && (
            <div className="space-y-4">
              <h2 className="font-display text-lg font-medium text-ink">Shipping address</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name" placeholder="Jordan Reyes" />
                <Field label="Phone" placeholder="+90 5xx xxx xx xx" />
                <Field label="Address" placeholder="Street, apartment" className="sm:col-span-2" />
                <Field label="City" placeholder="Istanbul" />
                <Field label="Postal code" placeholder="34000" />
              </div>
            </div>
          )}

          {step === "Shipping" && (
            <div className="space-y-3">
              <h2 className="font-display text-lg font-medium text-ink">Shipping method</h2>
              {[
                { id: "standard", label: "Standard (3–5 days)", price: subtotal > 50 ? 0 : 6.99 },
                { id: "express", label: "Express (1–2 days)", price: 14.99 }
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 ${
                    shippingMethod === opt.id ? "border-teal-500 bg-teal-50" : "border-sand"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === opt.id}
                      onChange={() => setShippingMethod(opt.id as "standard" | "express")}
                    />
                    {opt.label}
                  </span>
                  <span className="font-medium">{opt.price === 0 ? "Free" : formatPrice(opt.price)}</span>
                </label>
              ))}
            </div>
          )}

          {step === "Payment" && (
            <div className="space-y-3">
              <h2 className="font-display text-lg font-medium text-ink">Payment method</h2>
              {[
                { id: "card", label: "Credit / Debit card" },
                { id: "wallet", label: "Verra Wallet" },
                { id: "cod", label: "Cash on delivery" }
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 ${
                    paymentMethod === opt.id ? "border-teal-500 bg-teal-50" : "border-sand"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === opt.id}
                    onChange={() => setPaymentMethod(opt.id as "card" | "cod" | "wallet")}
                  />
                  {opt.label}
                </label>
              ))}
              {paymentMethod === "card" && (
                <div className="grid gap-4 pt-2 sm:grid-cols-2">
                  <Field label="Card number" placeholder="4242 4242 4242 4242" className="sm:col-span-2" />
                  <Field label="Expiry" placeholder="MM/YY" />
                  <Field label="CVC" placeholder="123" />
                </div>
              )}
            </div>
          )}

          {step === "Review" && (
            <div className="space-y-4">
              <h2 className="font-display text-lg font-medium text-ink">Review your order</h2>
              <ul className="divide-y divide-sand rounded-lg border border-sand">
                {items.map(({ line, product }) => (
                  <li key={product.id} className="flex justify-between p-3 text-sm">
                    <span>{product.title} × {line.quantity}</span>
                    <span>{formatPrice(product.price * line.quantity)}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-ink-muted">
                Paying with <span className="font-medium text-ink">{paymentMethod === "card" ? "card" : paymentMethod}</span>,
                shipping via <span className="font-medium text-ink">{shippingMethod}</span>.
              </p>
            </div>
          )}

          <div className="mt-6 flex justify-between">
            <button
              onClick={back}
              disabled={stepIndex === 0}
              className="focus-ring rounded-full border border-sand px-5 py-2.5 text-sm font-medium disabled:opacity-40"
            >
              Back
            </button>
            {step !== "Review" ? (
              <button onClick={next} className="focus-ring rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-porcelain">
                Continue
              </button>
            ) : (
              <button
                onClick={placeOrder}
                disabled={placing}
                className="focus-ring rounded-full bg-teal-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-teal-600 disabled:opacity-60"
              >
                {placing ? "Placing order…" : "Place order"}
              </button>
            )}
          </div>
        </div>

        <aside className="h-fit rounded-xl border border-sand p-5">
          <h2 className="font-display text-lg font-medium text-ink">Order summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-ink-muted">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-ink-muted">Shipping</dt><dd>{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</dd></div>
            <div className="flex justify-between"><dt className="text-ink-muted">Tax</dt><dd>{formatPrice(tax)}</dd></div>
            <div className="flex justify-between border-t border-sand pt-2 text-base font-semibold text-ink">
              <dt>Total</dt><dd>{formatPrice(total)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, placeholder, className = "" }: { label: string; placeholder: string; className?: string }) {
  return (
    <label className={`block text-sm ${className}`}>
      <span className="mb-1 block text-ink-muted">{label}</span>
      <input
        placeholder={placeholder}
        className="focus-ring w-full rounded-lg border border-sand px-3 py-2.5 outline-none focus:border-teal-500"
      />
    </label>
  );
}
