import { Banknote, ShieldCheck, Truck } from 'lucide-react';
import { Section } from './Section';

const reasons = [
  { title: 'توصيل سريع', icon: Truck, body: 'استلام مريح حسب الولاية والبلدية.' },
  { title: 'الدفع عند الاستلام', icon: Banknote, body: 'ادفع نقدا فقط بعد وصول الطلب.' },
  { title: 'جودة مضمونة', icon: ShieldCheck, body: 'منتج BBF عملي ومناسب للاستعمال المتكرر.' },
];

export function WhyBuy() {
  return (
    <Section className="bg-zinc-50 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-3">
          {reasons.map(({ title, body, icon: Icon }) => (
            <div key={title} className="rounded-3xl bg-white p-5 text-right shadow-sm ring-1 ring-zinc-100">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-zinc-950 text-white">
                <Icon size={23} />
              </div>
              <h3 className="text-lg font-black text-zinc-950">{title}</h3>
              <p className="mt-2 text-sm font-medium leading-7 text-zinc-600">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
