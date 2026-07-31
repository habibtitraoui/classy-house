import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { gallery } from '../data';

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = gallery[activeIndex];

  const thumbnails = useMemo(() => gallery, []);

  const onDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 48) setActiveIndex((index) => Math.max(0, index - 1));
    if (info.offset.x < -48) setActiveIndex((index) => Math.min(gallery.length - 1, index + 1));
  };

  return (
    <div className="space-y-3">
      <motion.div
        className="group overflow-hidden rounded-[1.75rem] bg-zinc-100 shadow-2xl shadow-zinc-950/10 ring-1 ring-zinc-200/70"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={onDragEnd}
        whileTap={{ cursor: 'grabbing' }}
      >
        <img
          src={active.src}
          alt={active.alt}
          className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-[1.045] sm:aspect-[5/4] lg:aspect-[4/5]"
          loading={activeIndex === 0 ? 'eager' : 'lazy'}
          decoding="async"
        />
      </motion.div>

      <div className="grid grid-cols-3 gap-2" aria-label="صور المنتج">
        {thumbnails.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`overflow-hidden rounded-2xl border bg-white p-1 transition ${
              activeIndex === index
                ? 'border-[#C62828] shadow-lg shadow-red-700/15'
                : 'border-zinc-200 opacity-75 hover:opacity-100'
            }`}
            aria-label={`عرض صورة ${index + 1}`}
          >
            <img src={item.src} alt="" className="h-20 w-full rounded-xl object-cover" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}
