import type { ShippingType } from '../types/order';
import { product, shippingOptions } from '../data';

type OrderSummaryProps = {
  quantity: number;
  shippingType: ShippingType;
  onShippingChange: (shippingType: ShippingType) => void;
};

export function OrderSummary({ quantity, shippingType, onShippingChange }: OrderSummaryProps) {
  const shippingPrice = shippingOptions[shippingType].price;
  const subtotal = product.price * quantity;
  const total = subtotal + shippingPrice;

  return (
    <aside className="rounded-[1.5rem] bg-zinc-950 p-5 text-white shadow-2xl shadow-zinc-950/20">
      <h3 className="text-xl font-black">ملخص الطلب</h3>

      <div className="mt-5 space-y-3 text-sm font-bold">
        <div className="flex items-center justify-between gap-4">
          <span className="text-white/65">سعر المنتج</span>
          <span>{product.priceLabel}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-white/65">الكمية</span>
          <span>{quantity}</span>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        {(Object.keys(shippingOptions) as ShippingType[]).map((type) => (
          <label
            key={type}
            className={`flex cursor-pointer items-center justify-between gap-3 rounded-2xl border p-3 transition ${
              shippingType === type ? 'border-[#C62828] bg-white text-zinc-950' : 'border-white/10 bg-white/5'
            }`}
          >
            <span className="flex items-center gap-2 text-sm font-extrabold">
              <input
                type="radio"
                name="shippingType"
                checked={shippingType === type}
                onChange={() => onShippingChange(type)}
                className="accent-[#C62828]"
              />
              {shippingOptions[type].label}
            </span>
            <span className="text-sm font-black">{shippingOptions[type].price.toLocaleString('fr-DZ')} د.ج</span>
          </label>
        ))}
      </div>

      <div className="mt-5 border-t border-white/10 pt-5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-white/65">الإجمالي</span>
          <span className="text-3xl font-black text-white">{total.toLocaleString('fr-DZ')} د.ج</span>
        </div>
      </div>
    </aside>
  );
}
