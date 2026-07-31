import { ArrowUp } from 'lucide-react';
import { useBackToTop } from '../hooks/useBackToTop';

export function BackToTop() {
  const visible = useBackToTop();

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-24 left-4 z-40 grid h-11 w-11 place-items-center rounded-full bg-white text-zinc-950 shadow-xl ring-1 ring-zinc-200 transition hover:-translate-y-1"
      aria-label="العودة إلى الأعلى"
    >
      <ArrowUp size={20} />
    </button>
  );
}
