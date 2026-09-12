import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <p className="font-display text-6xl font-medium text-ink">404</p>
      <h1 className="mt-3 text-xl font-medium text-ink">This page wandered off</h1>
      <p className="mt-2 text-ink-muted">The page you're looking for doesn't exist or has moved.</p>
      <Link href="/" className="focus-ring mt-6 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-porcelain">
        Back to home
      </Link>
    </div>
  );
}
