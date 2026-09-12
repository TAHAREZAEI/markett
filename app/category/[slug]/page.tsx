import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategoryBySlug, getProductsByCategory, products } from "@/lib/mock-data";
import ProductCard from "@/components/product/ProductCard";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const category = getCategoryBySlug(params.slug);
  if (!category) return {};
  return {
    title: category.name,
    description: `Shop ${category.name} at Verra — curated selection, fast shipping.`,
    alternates: { canonical: `/category/${category.slug}` }
  };
}

export default function CategoryPage({ params }: Props) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  // Parent categories show every product tagged to any of their subcategories;
  // in this mock catalog products are tagged directly by subcategory slug, so
  // for the demo we fall back to the full catalog when nothing matches.
  const items = getProductsByCategory(params.slug).length
    ? getProductsByCategory(params.slug)
    : products.filter((p) => category.subcategories.some((s) => s.slug === p.categorySlug));

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-3 text-xs text-slate-500">
        <a href="/" className="hover:text-ink">Home</a> / <span className="text-ink">{category.name}</span>
      </nav>
      <h1 className="font-display text-3xl font-medium text-ink">{category.name}</h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-[220px_1fr]">
        <aside className="space-y-6">
          <div>
            <p className="mb-2 text-sm font-semibold text-ink">Subcategories</p>
            <ul className="space-y-1.5 text-sm text-ink-muted">
              {category.subcategories.map((sub) => (
                <li key={sub.slug}>
                  <a href={`/category/${category.slug}/${sub.slug}`} className="hover:text-teal-600">
                    {sub.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-ink">Price</p>
            <div className="space-y-1.5 text-sm text-ink-muted">
              <label className="flex items-center gap-2"><input type="checkbox" /> Under $50</label>
              <label className="flex items-center gap-2"><input type="checkbox" /> $50 – $150</label>
              <label className="flex items-center gap-2"><input type="checkbox" /> $150 – $500</label>
              <label className="flex items-center gap-2"><input type="checkbox" /> $500+</label>
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-ink">Rating</p>
            <div className="space-y-1.5 text-sm text-ink-muted">
              {[4, 3, 2].map((r) => (
                <label key={r} className="flex items-center gap-2">
                  <input type="checkbox" /> {r}★ & up
                </label>
              ))}
            </div>
          </div>
        </aside>

        <div>
          <div className="mb-4 flex items-center justify-between text-sm text-ink-muted">
            <span>{items.length} products</span>
            <select className="rounded-md border border-sand bg-white px-3 py-1.5 text-ink" defaultValue="featured">
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
          {items.length === 0 ? (
            <p className="rounded-xl border border-dashed border-sand p-10 text-center text-ink-muted">
              No products in this category yet.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
