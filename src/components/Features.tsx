import { BadgeCheck, CookingPot, ShieldCheck, Sparkles, Timer, WashingMachine } from 'lucide-react';
import { features } from '../data';
import { Section } from './Section';

const icons = [BadgeCheck, Sparkles, WashingMachine, CookingPot, Timer, ShieldCheck];

export function Features() {
  return (
    <Section className="bg-zinc-50 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 text-right">
          <h2 className="text-3xl font-black text-zinc-950">مصممة للطبخ اليومي بثقة</h2>
          <p className="mt-2 text-sm font-medium leading-7 text-zinc-600">
            كل تفصيلة في كوكوط BBF تخدم السرعة، النظافة، والاعتماد عليها في البيت.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = icons[index];
            return (
              <div key={feature} className="rounded-2xl bg-white p-5 text-right shadow-sm ring-1 ring-zinc-100 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-950/8">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-red-50 text-[#C62828]">
                  <Icon size={22} />
                </div>
                <h3 className="text-base font-extrabold text-zinc-950">{feature}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
