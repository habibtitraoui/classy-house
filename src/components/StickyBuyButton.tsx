import { product } from '../data';

export function StickyBuyButton() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200 bg-white/95 p-3 shadow-2xl backdrop-blur-xl lg:hidden">
      <div className="mx-auto flex max-w-md items-center gap-3">
        <div className="text-right">
          <p className="text-xs font-bold text-zinc-500">السعر</p>
          <p className="text-lg font-black text-zinc-950">{product.priceLabel}</p>
        </div>
        <a
          href="#order"
          className="flex-1 rounded-2xl bg-[#C62828] px-5 py-3 text-center text-sm font-extrabold text-white shadow-lg shadow-red-800/20"
        >
          اشتري الآن
        </a>
      </div>
    </div>
  );
}
