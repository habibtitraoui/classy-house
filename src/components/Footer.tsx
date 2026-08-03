export function Footer() {
  return (
    <footer className="bg-zinc-950 px-4 pb-16 pt-10 text-white lg:pb-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <div className="inline-flex items-center gap-3">
            <img
              src="/footer.svg"
              alt="Classy House logo"
              className=" rounded-2xl "
            />
      
          </div>
          <p className="mt-2 max-w-xl text-sm leading-7 text-white/70">
            كلاسي هاوس لبيع أجود أنواع الأواني المنزلية
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 sm:items-end">
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/classyhouse.official_/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" fill="none" strokeWidth="2" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" fill="none" strokeWidth="2" />
                <circle cx="17" cy="7" r="1" fill="currentColor" />
              </svg>
              Instagram
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=213698807099"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M21 12.06a9 9 0 1 0-5.9 8.51l-1.2-1.24a1 1 0 0 0-.68-.28h-.16a.99.99 0 0 0-.7.3l-1.18 1.17A9 9 0 0 0 21 12.06Z" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M15.83 14.68a3.36 3.36 0 0 1-1.37.82c-.3.1-.55.13-.91.05a6.84 6.84 0 0 1-2.74-1.06 4.41 4.41 0 0 1-1.61-1.7c-.3-.57-.4-.9-.41-1.18a1 1 0 0 1 .29-.7c.16-.16.37-.22.58-.22.14 0 .28 0 .4.01.3.04.5.15.72.33.2.17.44.36.64.36.14 0 .28-.05.4-.14a1.38 1.38 0 0 0 .55-.87c.05-.24 0-.44-.14-.6a1.83 1.83 0 0 0-.74-.5 3.25 3.25 0 0 0-1-.1 1.14 1.14 0 0 0-.78.24 2.9 2.9 0 0 0-1.05 1.9 4.62 4.62 0 0 0 .75 2.37 10 10 0 0 0 3.33 3.19 4.58 4.58 0 0 0 2.36.79 2.09 2.09 0 0 0 1.18-.23c.27-.13.5-.33.7-.57.2-.23.27-.42.32-.62a1.16 1.16 0 0 0-.01-.6 1.2 1.2 0 0 0-.52-.81Z" fill="currentColor" />
              </svg>
              WhatsApp
            </a>
            <a
              href="https://www.facebook.com/ClassyHouse30/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M13.5 3H16a1 1 0 0 1 1 1v3h-2.5V6.5a1.5 1.5 0 0 0-1.5-1.5H12V7h1.5v4H12v6H8.5v-6H6.5V9.5h2V7.5a3.5 3.5 0 0 1 3.5-3.5Z" fill="currentColor" />
              </svg>
              Facebook
            </a>
          </div>
          <p className="text-xs text-white/50">© 2026 Classy House</p>
        </div>
      </div>
    </footer>
  );
}
