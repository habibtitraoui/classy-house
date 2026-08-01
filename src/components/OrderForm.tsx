import { useEffect, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, Minus, Plus, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { product, shippingOptions } from '../data';
import { communesByWilaya, wilayas } from '../locations';
import { submitOrder } from '../services/orders';
import type { ShippingType } from '../types/order';
import { OrderSummary } from './OrderSummary';
import { Section } from './Section';
import { trackMetaPixel } from '../lib/metaPixel';

const schema = z.object({
  name: z.string().min(2, 'الاسم الكامل مطلوب'),
  phone: z.string().min(8, 'رقم الهاتف مطلوب'),
  wilaya: z.string().min(2, 'الولاية مطلوبة'),
  commune: z.string().min(2, 'البلدية مطلوبة'),
  address: z.string().min(5, 'العنوان مطلوب'),
});

type FormValues = z.infer<typeof schema>;

function Field({
  label,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <label className="block text-right">
      <span className="text-sm font-extrabold text-zinc-800">{label}</span>
      <input
        {...props}
        className={`mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-right text-base font-semibold text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-[#C62828] focus:ring-4 focus:ring-red-100 ${
          error ? 'border-[#C62828]' : 'border-zinc-200'
        }`}
      />
      {error && <span className="mt-1 block text-xs font-bold text-[#C62828]">{error}</span>}
    </label>
  );
}

function SelectField({
  label,
  error,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; error?: string }) {
  return (
    <label className="block text-right">
      <span className="text-sm font-extrabold text-zinc-800">{label}</span>
      <select
        {...props}
        className={`mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-right text-base font-semibold text-zinc-950 outline-none transition focus:border-[#C62828] focus:ring-4 focus:ring-red-100 ${
          error ? 'border-[#C62828]' : 'border-zinc-200'
        }`}
      >
        {children}
      </select>
      {error && <span className="mt-1 block text-xs font-bold text-[#C62828]">{error}</span>}
    </label>
  );
}

export function OrderForm() {
  const [quantity, setQuantity] = useState(1);
  const [shippingType, setShippingType] = useState<ShippingType>('home');
  const [showSuccess, setShowSuccess] = useState(false);
  const [toast, setToast] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<FormValues>({ resolver: zodResolver(schema), mode: 'onBlur' });

  const selectedWilayaName = watch('wilaya');
  const selectedWilaya = wilayas.find((wilaya) => wilaya.name === selectedWilayaName);
  const communes = selectedWilaya ? communesByWilaya[selectedWilaya.code] ?? [] : [];

  useEffect(() => {
    setValue('commune', '');
  }, [selectedWilayaName, setValue]);

  const total = useMemo(
    () => product.price * quantity + shippingOptions[shippingType].price,
    [quantity, shippingType],
  );

  const onSubmit = async (values: FormValues) => {
    const shippingPrice = shippingOptions[shippingType].price;
    try {
      await submitOrder({
        ...values,
        quantity,
        shippingType,
        shippingPrice,
        product: product.title,
        price: product.price,
        total,
        date: new Date().toISOString(),
      });
      trackMetaPixel('Purchase', {
        content_name: product.title,
        content_ids: ['cocote-4-litre-bbf'],
        content_type: 'product',
        value: total,
        currency: 'DZD',
      });
      setShowSuccess(true);
      setToast('تم إرسال الطلب بنجاح');
      reset();
      setQuantity(1);
    } catch {
      setToast('تعذر إرسال الطلب. حاول مرة أخرى.');
    }
  };

  return (
    <Section id="order" className="scroll-mt-24 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 text-right">
          <h2 className="text-3xl font-black text-zinc-950">تأكيد الطلب</h2>
          <p className="mt-2 text-sm font-medium text-zinc-600">
            املأ المعلومات وسيتم التواصل معك لتأكيد الطلب.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-[1.75rem] bg-white p-5 shadow-2xl shadow-zinc-950/8 ring-1 ring-zinc-100 sm:p-7"
            noValidate
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="الاسم الكامل *"
                placeholder="مثال: أحمد بن علي"
                error={errors.name?.message}
                {...register('name')}
              />
              <Field
                label="الهاتف *"
                placeholder="0550 00 00 00"
                error={errors.phone?.message}
                inputMode="tel"
                {...register('phone')}
              />
              <SelectField label="الولاية *" error={errors.wilaya?.message} {...register('wilaya')}>
                <option value="">اختر الولاية</option>
                {wilayas.map((wilaya) => (
                  <option key={wilaya.code} value={wilaya.name}>
                    {wilaya.code} - {wilaya.name}
                  </option>
                ))}
              </SelectField>
              <SelectField
                label="البلدية *"
                error={errors.commune?.message}
                disabled={!selectedWilaya}
                {...register('commune')}
              >
                <option value="">{selectedWilaya ? 'اختر البلدية' : 'اختر الولاية أولا'}</option>
                {communes.map((commune) => (
                  <option key={commune} value={commune}>
                    {commune}
                  </option>
                ))}
              </SelectField>
              <div className="sm:col-span-2">
                <Field
                  label="العنوان *"
                  placeholder="العنوان الكامل للتوصيل"
                  error={errors.address?.message}
                  {...register('address')}
                />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
              <span className="text-sm font-extrabold text-zinc-800">الكمية</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white text-zinc-900 shadow-sm ring-1 ring-zinc-200 transition hover:bg-zinc-100"
                  aria-label="إنقاص الكمية"
                >
                  <Minus size={18} />
                </button>
                <span className="min-w-8 text-center text-xl font-black text-zinc-950">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((value) => value + 1)}
                  className="grid h-10 w-10 place-items-center rounded-full bg-[#C62828] text-white shadow-lg shadow-red-700/20 transition hover:bg-[#B71C1C]"
                  aria-label="زيادة الكمية"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-zinc-50 p-4 text-right">
              <p className="text-sm font-black text-zinc-950">Paiement a la livraison</p>
              <p className="mt-1 text-sm font-medium text-zinc-600">Payer en argent comptant a la livraison.</p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#C62828] px-6 py-4 text-base font-extrabold text-white shadow-xl shadow-red-800/25 transition hover:bg-[#B71C1C] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting && <LoaderCircle className="animate-spin" size={20} />}
              تأكيد الطلب
            </button>
          </form>

          <OrderSummary quantity={quantity} shippingType={shippingType} onShippingChange={setShippingType} />
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-24 left-4 z-50 rounded-2xl bg-zinc-950 px-4 py-3 text-sm font-bold text-white shadow-2xl">
          {toast}
        </div>
      )}

      {showSuccess && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-zinc-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-[1.75rem] bg-white p-6 text-center shadow-2xl">
            <button
              type="button"
              onClick={() => setShowSuccess(false)}
              className="mb-3 mr-auto grid h-9 w-9 place-items-center rounded-full bg-zinc-100 text-zinc-700"
              aria-label="إغلاق"
            >
              <X size={18} />
            </button>
            <h3 className="text-2xl font-black text-zinc-950">تم تأكيد الطلب</h3>
            <p className="mt-3 text-sm font-medium leading-7 text-zinc-600">
              شكرا لك. سنقوم بالتواصل معك قريبا لتأكيد معلومات التوصيل.
            </p>
          </div>
        </div>
      )}
    </Section>
  );
}
