import type { MetadataRoute } from "next";
import { products, categories } from "@/lib/mock-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.verra.market";
  const staticRoutes = ["", "/search", "/cart", "/offers", "/brands", "/blog", "/faq", "/about", "/contact"].map(
    (path) => ({ url: `${base}${path}`, lastModified: new Date() })
  );
  const productRoutes = products.map((p) => ({ url: `${base}/product/${p.slug}`, lastModified: new Date() }));
  const categoryRoutes = categories.map((c) => ({ url: `${base}/category/${c.slug}`, lastModified: new Date() }));
  return [...staticRoutes, ...productRoutes, ...categoryRoutes];
}
