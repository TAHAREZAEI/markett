import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import HeroSlider from "@/components/home/HeroSlider";
import FlashSale from "@/components/home/FlashSale";
import ProductCard from "@/components/product/ProductCard";
import { categories, products } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Verra — Everything, chosen well",
  alternates: { canonical: "/" }
};

export default function HomePage() {
  const bestSellers = [...products].sort((a, b) => b.soldCount - a.soldCount);
  const newest = [...products].reverse();

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 py-6 sm:px-6">
      <HeroSlider />

      <section aria-labelledby="categories-heading">
        <h2 id="categories-heading" className="mb-4 font-display text-2xl font-medium text-ink">
          Shop by category
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="focus-ring group overflow-hidden rounded-xl border border-sand bg-white"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="p-3 text-sm font-medium text-ink">{cat.name}</p>
            </Link>
          ))}
        </div>
      </section>

      <FlashSale products={products.filter((p) => p.compareAtPrice)} />

      <section aria-labelledby="bestsellers-heading">
        <div className="mb-4 flex items-center justify-between">
          <h2 id="bestsellers-heading" className="font-display text-2xl font-medium text-ink">
            Best sellers
          </h2>
          <Link href="/search?sort=bestselling" className="text-sm font-medium text-teal-600 hover:text-teal-700">
            See all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section aria-labelledby="newest-heading">
        <div className="mb-4 flex items-center justify-between">
          <h2 id="newest-heading" className="font-display text-2xl font-medium text-ink">
            Newest arrivals
          </h2>
          <Link href="/search?sort=newest" className="text-sm font-medium text-teal-600 hover:text-teal-700">
            See all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {newest.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl bg-ink px-8 py-12 text-center sm:px-16">
        <h2 className="font-display text-2xl font-medium text-porcelain sm:text-3xl">
          Get 10% off your first order
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-porcelain/70">
          Join the newsletter for early access to drops and flash sales.
        </p>
        <form className="mx-auto mt-5 flex max-w-sm overflow-hidden rounded-full">
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full bg-white px-4 py-2.5 text-sm text-ink outline-none"
          />
          <button className="focus-ring bg-gold-400 px-5 text-sm font-semibold text-ink">Subscribe</button>
        </form>
      </section>
    </div>
  );
}
