import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/checkout", "/cart", "/profile", "/orders", "/admin", "/seller"] }
    ],
    sitemap: "https://www.verra.market/sitemap.xml"
  };
}
