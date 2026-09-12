import Link from "next/link";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "Electronics", href: "/category/electronics" },
      { label: "Fashion", href: "/category/fashion" },
      { label: "Home & Living", href: "/category/home-living" },
      { label: "Beauty", href: "/category/beauty" }
    ]
  },
  {
    title: "Account",
    links: [
      { label: "Orders", href: "/orders" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Wallet", href: "/wallet" },
      { label: "Addresses", href: "/addresses" }
    ]
  },
  {
    title: "Company",
    links: [
      { label: "About Verra", href: "/about" },
      { label: "Sell on Verra", href: "/seller" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" }
    ]
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Shipping & Returns", href: "/faq#shipping" },
      { label: "Track an order", href: "/orders" },
      { label: "Coupons", href: "/coupons" }
    ]
  }
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-sand bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <p className="font-display text-xl font-semibold text-ink">Verra</p>
            <p className="mt-2 text-sm text-ink-muted">Everything, chosen well.</p>
            <form className="mt-4">
              <label htmlFor="newsletter" className="text-xs font-medium text-ink-muted">
                Get deals in your inbox
              </label>
              <div className="mt-1.5 flex overflow-hidden rounded-full border border-sand">
                <input
                  id="newsletter"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-transparent px-3 py-2 text-sm outline-none"
                />
                <button className="focus-ring bg-ink px-4 text-sm font-medium text-porcelain">Join</button>
              </div>
            </form>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-ink">{col.title}</p>
              <ul className="mt-3 space-y-2 text-sm text-ink-muted">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-teal-500">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-sand pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Verra Marketplace. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/legal/terms" className="hover:text-ink">Terms</Link>
            <Link href="/legal/privacy" className="hover:text-ink">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
