export interface Money {
  amount: number;
  currency: "USD";
}

export interface ProductVariant {
  id: string;
  color?: string;
  colorHex?: string;
  size?: string;
  stock: number;
  sku: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  brand: string;
  categorySlug: string;
  images: string[];
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  soldCount: number;
  freeShipping: boolean;
  fastDelivery: boolean;
  variants: ProductVariant[];
  description: string;
  features: string[];
  specifications: { label: string; value: string }[];
  stock: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  image: string;
  subcategories: { slug: string; name: string }[];
}

export interface CartLine {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
}
