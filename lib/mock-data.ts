// Temporary in-memory catalog used until the backend API (see /backend) is
// wired up. Shapes match the API's response contracts exactly, so swapping
// these calls for `fetch`/axios calls to the Express API is a drop-in change.
import { Category, Product, Review } from "./types";

export const categories: Category[] = [
  {
    id: "c1",
    slug: "electronics",
    name: "Electronics",
    image: "https://picsum.photos/seed/electronics/400/300",
    subcategories: [
      { slug: "mobile-phones", name: "Mobile Phones" },
      { slug: "laptops", name: "Laptops" },
      { slug: "headphones", name: "Headphones" }
    ]
  },
  {
    id: "c2",
    slug: "fashion",
    name: "Fashion",
    image: "https://picsum.photos/seed/fashion/400/300",
    subcategories: [
      { slug: "mens", name: "Men's" },
      { slug: "womens", name: "Women's" },
      { slug: "shoes", name: "Shoes" }
    ]
  },
  {
    id: "c3",
    slug: "home-living",
    name: "Home & Living",
    image: "https://picsum.photos/seed/home/400/300",
    subcategories: [
      { slug: "furniture", name: "Furniture" },
      { slug: "kitchen", name: "Kitchen" },
      { slug: "decor", name: "Decor" }
    ]
  },
  {
    id: "c4",
    slug: "beauty",
    name: "Beauty",
    image: "https://picsum.photos/seed/beauty/400/300",
    subcategories: [
      { slug: "skincare", name: "Skincare" },
      { slug: "makeup", name: "Makeup" },
      { slug: "fragrance", name: "Fragrance" }
    ]
  }
];

export const products: Product[] = [
  {
    id: "p1",
    slug: "aurora-wireless-headphones",
    title: "Aurora Wireless Over-Ear Headphones",
    brand: "Nordic Audio",
    categorySlug: "headphones",
    images: [
      "https://picsum.photos/seed/p1a/800/800",
      "https://picsum.photos/seed/p1b/800/800",
      "https://picsum.photos/seed/p1c/800/800"
    ],
    price: 179,
    compareAtPrice: 229,
    rating: 4.6,
    reviewCount: 842,
    soldCount: 3120,
    freeShipping: true,
    fastDelivery: true,
    variants: [
      { id: "v1", color: "Charcoal", colorHex: "#2B2E36", stock: 24, sku: "AUR-CHR" },
      { id: "v2", color: "Porcelain", colorHex: "#EDEAE2", stock: 11, sku: "AUR-POR" }
    ],
    description:
      "Studio-tuned drivers, adaptive noise cancellation, and 40 hours of battery life in an aluminum-and-memory-foam build designed for all-day listening.",
    features: [
      "Adaptive active noise cancellation",
      "40-hour battery, 5-minute quick charge for 4 hours",
      "Multipoint Bluetooth 5.3 pairing",
      "Aluminum hinge, memory-foam ear cushions"
    ],
    specifications: [
      { label: "Driver size", value: "40mm dynamic" },
      { label: "Weight", value: "268g" },
      { label: "Battery", value: "40 hrs (ANC on)" },
      { label: "Connectivity", value: "Bluetooth 5.3, USB-C, 3.5mm" }
    ],
    stock: 35
  },
  {
    id: "p2",
    slug: "meridian-14-laptop",
    title: "Meridian 14\" Ultralight Laptop",
    brand: "Meridian",
    categorySlug: "laptops",
    images: [
      "https://picsum.photos/seed/p2a/800/800",
      "https://picsum.photos/seed/p2b/800/800"
    ],
    price: 1249,
    compareAtPrice: 1399,
    rating: 4.8,
    reviewCount: 411,
    soldCount: 980,
    freeShipping: true,
    fastDelivery: false,
    variants: [
      { id: "v3", color: "Space Grey", colorHex: "#3A3D42", stock: 8, sku: "MER-SG-16" },
      { id: "v4", color: "Silver", colorHex: "#D9DCDF", stock: 5, sku: "MER-SV-16" }
    ],
    description:
      "A 14-inch ultralight built for people who carry their whole workday in a bag: 18-hour battery, fanless silence, and a 2.8K display calibrated out of the box.",
    features: [
      "18-hour battery life",
      "2.8K 120Hz display",
      "Fanless, silent operation",
      "1.1kg magnesium-alloy chassis"
    ],
    specifications: [
      { label: "Processor", value: "10-core, 3.5GHz" },
      { label: "Memory", value: "16GB unified" },
      { label: "Storage", value: "512GB SSD" },
      { label: "Display", value: "14\" 2.8K 120Hz" }
    ],
    stock: 13
  },
  {
    id: "p3",
    slug: "sable-leather-tote",
    title: "Sable Leather Tote",
    brand: "Maison Faye",
    categorySlug: "womens",
    images: [
      "https://picsum.photos/seed/p3a/800/800",
      "https://picsum.photos/seed/p3b/800/800"
    ],
    price: 249,
    rating: 4.4,
    reviewCount: 156,
    soldCount: 502,
    freeShipping: true,
    fastDelivery: true,
    variants: [
      { id: "v5", color: "Sable", colorHex: "#6B4A34", stock: 14, sku: "SLT-SBL" },
      { id: "v6", color: "Onyx", colorHex: "#1B1B1D", stock: 9, sku: "SLT-ONX" }
    ],
    description:
      "Full-grain leather tote with a structured base, interior zip pocket, and a strap drop long enough to wear on the shoulder or carry by hand.",
    features: ["Full-grain leather", "Structured base", "Interior zip + slip pockets", "Adjustable shoulder strap"],
    specifications: [
      { label: "Material", value: "Full-grain leather" },
      { label: "Dimensions", value: "38 x 28 x 14 cm" },
      { label: "Lining", value: "Cotton twill" }
    ],
    stock: 23
  },
  {
    id: "p4",
    slug: "orbit-smart-kettle",
    title: "Orbit Smart Temperature Kettle",
    brand: "Orbit Home",
    categorySlug: "kitchen",
    images: [
      "https://picsum.photos/seed/p4a/800/800",
      "https://picsum.photos/seed/p4b/800/800"
    ],
    price: 89,
    compareAtPrice: 109,
    rating: 4.5,
    reviewCount: 623,
    soldCount: 2210,
    freeShipping: false,
    fastDelivery: true,
    variants: [{ id: "v7", color: "Brushed Steel", colorHex: "#B9BEC4", stock: 40, sku: "ORB-BS" }],
    description:
      "Precision temperature control for pour-over coffee, green tea, or a rolling boil — with a one-hour keep-warm mode and a matte-steel body.",
    features: ["5 preset temperatures", "1-hour keep-warm", "1.2L capacity", "Boil-dry protection"],
    specifications: [
      { label: "Capacity", value: "1.2 L" },
      { label: "Power", value: "1850W" },
      { label: "Material", value: "Brushed stainless steel" }
    ],
    stock: 61
  },
  {
    id: "p5",
    slug: "fielder-running-shoe",
    title: "Fielder Trail Running Shoe",
    brand: "Fielder",
    categorySlug: "shoes",
    images: [
      "https://picsum.photos/seed/p5a/800/800",
      "https://picsum.photos/seed/p5b/800/800"
    ],
    price: 139,
    rating: 4.7,
    reviewCount: 298,
    soldCount: 1340,
    freeShipping: true,
    fastDelivery: true,
    variants: [
      { id: "v8", size: "US 9", stock: 6, sku: "FLD-9" },
      { id: "v9", size: "US 10", stock: 12, sku: "FLD-10" },
      { id: "v10", size: "US 11", stock: 0, sku: "FLD-11" }
    ],
    description:
      "A grippy lugged outsole and a breathable knit upper built for mixed-terrain trail runs, with a rock plate underfoot for protection.",
    features: ["4mm lugged outsole", "Rock plate", "Breathable knit upper", "8mm drop"],
    specifications: [
      { label: "Drop", value: "8mm" },
      { label: "Weight", value: "268g (US 9)" },
      { label: "Upper", value: "Engineered knit" }
    ],
    stock: 18
  },
  {
    id: "p6",
    slug: "hearth-ceramic-vase-set",
    title: "Hearth Ceramic Vase Set (3-piece)",
    brand: "Hearth Studio",
    categorySlug: "decor",
    images: ["https://picsum.photos/seed/p6a/800/800", "https://picsum.photos/seed/p6b/800/800"],
    price: 64,
    rating: 4.3,
    reviewCount: 87,
    soldCount: 410,
    freeShipping: false,
    fastDelivery: false,
    variants: [{ id: "v11", color: "Sand", colorHex: "#D8CBB4", stock: 22, sku: "HRT-SND" }],
    description: "Hand-thrown stoneware vases in three complementary sizes, each finished with a matte sand glaze.",
    features: ["Hand-thrown stoneware", "Matte glaze finish", "Set of 3 sizes"],
    specifications: [{ label: "Material", value: "Stoneware" }, { label: "Set", value: "3 pieces" }],
    stock: 22
  }
];

export const reviews: Review[] = [
  {
    id: "r1",
    productId: "p1",
    author: "Daniela K.",
    rating: 5,
    title: "Best headphones I've owned",
    body: "The noise cancellation is genuinely excellent on flights, and battery life easily gets me through a full week of commuting.",
    date: "2026-06-02",
    verified: true
  },
  {
    id: "r2",
    productId: "p1",
    author: "Marcus T.",
    rating: 4,
    title: "Great sound, slightly snug fit",
    body: "Sound quality is fantastic and the case is compact. They're a touch tight on the first few wears but break in nicely.",
    date: "2026-05-14",
    verified: true
  }
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getProductsByCategory(categorySlug: string) {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getReviewsForProduct(productId: string) {
  return reviews.filter((r) => r.productId === productId);
}
