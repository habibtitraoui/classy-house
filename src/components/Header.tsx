export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-100 bg-white/95 shadow-sm shadow-zinc-200/30 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-3 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-3" aria-label="Classy House">
          <img
            src="/icon.svg"
            alt="Classy House logo"
            className="h-10 w-10 rounded-2xl border border-zinc-200 bg-white object-cover shadow-lg shadow-zinc-200/40"
          />
          <span className="text-lg font-extrabold tracking-normal text-zinc-950">Classy House</span>
        </a>
      </div>
    </header>
  );
}
