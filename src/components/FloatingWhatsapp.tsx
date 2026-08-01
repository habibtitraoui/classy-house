import { MessageCircle } from 'lucide-react';
import { trackMetaPixel } from '../lib/metaPixel';

export function FloatingWhatsapp() {
  return (
    <a
      href="https://wa.me/"
      aria-label="واتساب"
      onClick={() => trackMetaPixel('Contact')}
      className="fixed bottom-24 right-4 z-40 grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-green-700/25 transition hover:scale-105"
    >
      <MessageCircle size={23} />
    </a>
  );
}
