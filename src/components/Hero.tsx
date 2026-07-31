import { Check, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { heroBadges, product } from '../data';
import { Gallery } from './Gallery';

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-4 pb-10 pt-5 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8 lg:pb-16 lg:pt-10">
      <Gallery />

      <motion.div
        className="space-y-5 text-right"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <div className="flex items-center justify-start gap-2 text-sm font-bold text-amber-500">
          <span className="flex" aria-label="تقييم 5 من 5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} size={17} fill="currentColor" />
            ))}
          </span>
          <span className="text-zinc-700">(5.0)</span>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#C62828]">{product.brand}</p>
          <h1 className="text-4xl font-black leading-[1.08] tracking-normal text-zinc-950 sm:text-5xl">
            {product.title}
          </h1>
          <p className="text-sm font-semibold text-zinc-500">{product.category}</p>
        </div>

        <p className="text-4xl font-black text-[#C62828]">{product.priceLabel}</p>

        <div className="grid gap-2">
          {heroBadges.map((badge) => (
            <div key={badge} className="flex items-center gap-2 rounded-2xl bg-zinc-50 px-4 py-3 text-sm font-bold text-zinc-800 ring-1 ring-zinc-100">
              <Check className="text-[#C62828]" size={18} />
              {badge}
            </div>
          ))}
        </div>

        <a
          href="#order"
          className="inline-flex w-full items-center justify-center rounded-2xl bg-[#C62828] px-6 py-4 text-base font-extrabold text-white shadow-xl shadow-red-800/25 transition hover:-translate-y-0.5 hover:bg-[#B71C1C] sm:w-auto sm:min-w-56"
        >
          اشتري الآن
        </a>
      </motion.div>
    </section>
  );
}
