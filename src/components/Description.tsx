import { Check } from 'lucide-react';
import { specs } from '../data';
import { Section } from './Section';

export function Description() {
  return (
    <Section className="py-12 sm:py-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="rounded-[1.75rem] bg-[#C62828] p-6 text-white shadow-2xl shadow-red-900/20">
          <p className="text-sm font-bold text-white/75">BBF 4L</p>
          <h2 className="mt-3 text-3xl font-black leading-tight">كوكوط واحدة... لآلاف الوصفات</h2>
          <p className="mt-4 text-sm font-medium leading-8 text-white/88">
            من طبخات الأيام العادية حتى عزومات العائلة، خلي تحضير الماكلة أسهل وأسرع مع كوكوط تجمع بين بساطة الاستعمال وقوة الطبخ التقليدي.
          </p>
        </div>
        <div className="text-right">
          <h2 className="text-3xl font-black text-zinc-950">المواصفات</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {specs.map((spec) => (
              <div key={spec} className="flex items-center gap-3 rounded-2xl border border-zinc-100 bg-white px-4 py-3 shadow-sm">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-red-50 text-[#C62828]">
                  <Check size={16} />
                </span>
                <span className="text-sm font-bold text-zinc-800">{spec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
