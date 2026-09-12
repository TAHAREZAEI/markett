import type { Metadata } from "next";
import { products } from "@/lib/mock-data";
import ProductCard from "@/components/product/ProductCard";

export const metadata: Metadata = {
  title: "Search results",
  robots: { index: false, follow: true }
};

export default function SearchPage({ searchParams }: { searchParams: { q?: string; sort?: string } }) {
  const query = (searchParams.q ?? "").toLowerCase().trim();
  let results = query
    ? products.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.categorySlug.includes(query)
      )
    : products;

  if (searchParams.sort === "bestselling") results = [...results].sort((a, b) => b.soldCount - a.soldCount);
  if (searchParams.sort === "newest") results = [...results].reverse();

  const popularSearches = ["headphones", "laptop", "running shoes", "kettle", "leather bag"];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="font-display text-2xl font-medium text-ink">
        {query ? `Results for "${searchParams.q}"` : "All products"}
      </h1>
      <p className="mt-1 text-sm text-ink-muted">{results.length} products found</p>

      {!query && (
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-sm text-ink-muted">Popular:</span>
          {popularSearches.map((term) => (
            <a
              key={term}
              href={`/search?q=${encodeURIComponent(term)}`}
              className="rounded-full border border-sand px-3 py-1 text-xs text-ink hover:bg-sand/40"
            >
              {term}
            </a>
          ))}
        </div>
      )}

      {results.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-sand p-12 text-center">
          <p className="font-display text-xl text-ink">No matches</p>
          <p className="mt-1 text-sm text-ink-muted">Try a different term or browse categories from the menu.</p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
