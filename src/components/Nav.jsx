import { useState, useEffect } from "react";

export default function Nav({ t, lang, setLang, theme, setTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const linkCls = "font-mono text-[0.75rem] tracking-[0.2em] uppercase opacity-70 hover:opacity-100 transition-opacity";
  const sideLinkCls = "font-display text-[2rem] uppercase tracking-[0.02em] leading-none hover:text-[color:var(--accent)] transition-colors";
  const toolCls = "border border-[color:var(--line-strong)] font-mono text-[0.7rem] tracking-[0.15em] uppercase px-[0.7rem] py-[0.4rem] transition-colors hover:bg-[color:var(--fg)] hover:text-[color:var(--bg)]";

  const navLinks = [
    { href: "#about",    label: t.nav.about },
    { href: "#lineup",   label: t.nav.lineup },
    { href: "#gallery",  label: t.nav.gallery },
    { href: "#sponsors", label: t.nav.sponsors },
    { href: "#team",     label: t.nav.team },
    { href: "#location", label: t.nav.location },
  ];

  return (
    <>
      <nav
        className="fixed top-0 inset-x-0 z-[100] backdrop-blur-[20px] backdrop-saturate-[1.4] border-b border-[color:var(--line)] transition-all"
        style={{
          background: "color-mix(in oklab, var(--bg) 75%, transparent)",
          boxShadow: scrolled ? "0 1px 0 var(--line-strong)" : "none",
        }}
      >
        <div className="flex items-center justify-between max-w-[1440px] mx-auto px-[clamp(1rem,4vw,3rem)] py-3">
          <a href="#top" className="flex items-center" onClick={() => setMenuOpen(false)}>
            <img src="/logo.png" alt="Sunset 26" className="h-14 md:h-16 w-auto" />
          </a>

          <ul className="hidden lg:flex gap-8">
            {navLinks.map(l => (
              <li key={l.href}><a href={l.href} className={linkCls}>{l.label}</a></li>
            ))}
          </ul>

          <div className="flex gap-2 items-center">
            <button className={toolCls} onClick={() => setLang(lang === "pt" ? "en" : "pt")} title="Language">
              {lang.toUpperCase()}
            </button>
            <button className={toolCls} onClick={() => setTheme(theme === "light" ? "dark" : "light")} title="Theme">
              {theme === "light" ? "◐" : "◑"}
            </button>
            <button
              className={`${toolCls} lg:hidden`}
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`lg:hidden fixed inset-0 z-[150] bg-black/50 backdrop-blur-sm transition-opacity ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMenuOpen(false)}
      />

      <aside
        className={`lg:hidden fixed top-0 right-0 bottom-0 z-[160] w-[min(80vw,360px)] bg-[color:var(--bg)] border-l border-[color:var(--line-strong)] shadow-2xl transition-transform duration-300 flex flex-col ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        aria-hidden={!menuOpen}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[color:var(--line)]">
          <img src="/logo.png" alt="Sunset 26" className="h-10 w-auto" />
          <button
            className={toolCls}
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-8">
          <ul className="flex flex-col gap-6">
            {navLinks.map((l, i) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={sideLinkCls}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="font-mono text-[0.7rem] tracking-[0.2em] opacity-50 mr-3">0{i + 1}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-6 py-6 border-t border-[color:var(--line)] font-mono text-[0.7rem] tracking-[0.2em] uppercase opacity-60">
          Sunset D'Engenharias · 2026
        </div>
      </aside>
    </>
  );
}
