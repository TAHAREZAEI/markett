"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const slides = [
  {
    id: 1,
    eyebrow: "New arrivals",
    title: "The season's edit, curated",
    body: "Fresh drops across electronics, fashion and home — handpicked, not algorithm-stuffed.",
    cta: { label: "Shop new arrivals", href: "/category/fashion" },
    bg: "from-teal-600 to-teal-700"
  },
  {
    id: 2,
    eyebrow: "Up to 40% off",
    title: "Flash Sale is live",
    body: "48 hours only. Verified sellers, real stock, no last-minute price hikes.",
    cta: { label: "Shop the sale", href: "/offers" },
    bg: "from-ink to-ink-soft"
  },
  {
    id: 3,
    eyebrow: "Free shipping over $50",
    title: "More reasons to add one more thing",
    body: "Fast delivery windows and free returns on thousands of items.",
    cta: { label: "Explore electronics", href: "/category/electronics" },
    bg: "from-gold-500 to-gold-400"
  }
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[index];

  return (
    <div className="relative h-[360px] overflow-hidden rounded-2xl sm:h-[440px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`absolute inset-0 bg-gradient-to-br ${slide.bg} flex items-center`}
        >
          <div className="max-w-xl px-8 sm:px-14">
            <motion.p
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/80"
            >
              {slide.eyebrow}
            </motion.p>
            <motion.h1
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.18 }}
              className="font-display text-3xl font-medium leading-tight text-white sm:text-5xl"
            >
              {slide.title}
            </motion.h1>
            <motion.p
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.26 }}
              className="mt-4 max-w-md text-sm text-white/85 sm:text-base"
            >
              {slide.body}
            </motion.p>
            <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.34 }}>
              <Link
                href={slide.cta.href}
                className="focus-ring mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink hover:bg-porcelain"
              >
                {slide.cta.label}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-white" : "w-1.5 bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
}
