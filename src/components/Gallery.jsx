import { useState, useEffect, useCallback } from "react";
import SectionHead from "./SectionHead.jsx";

const badgeCls = "absolute top-3 left-3 z-[3] font-mono text-[0.65rem] tracking-[0.15em] uppercase bg-[color:var(--fg)] text-[color:var(--bg)] px-[0.6rem] py-[0.3rem]";
const metaCls = "absolute bottom-3 right-3 z-[3] font-mono text-[0.65rem] tracking-[0.15em] uppercase text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]";

export default function Gallery({ t }) {
  const [active, setActive] = useState(null);
  const items = t.gallery.items;

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(() => setActive((i) => (i === null ? null : (i + 1) % items.length)), [items.length]);
  const prev = useCallback(() => setActive((i) => (i === null ? null : (i - 1 + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, next, prev]);

  const current = active !== null ? items[active] : null;

  return (
    <section className="py-24 relative bg-[color:var(--bg-2)]" id="gallery" data-screen-label="Gallery">
      <div className="container-x">
        <SectionHead num={t.gallery.num} title={t.gallery.title} meta={t.gallery.meta} />
        <div className="reveal gallery__grid">
          {items.map((item, i) => (
            <button
              type="button"
              onClick={() => setActive(i)}
              className={`relative overflow-hidden cursor-pointer bg-black gallery-item--${item.type} group focus:outline-none`}
              key={i}
            >
              <div className={badgeCls}>{item.type === "drone" ? "▶ VIDEO" : "PHOTO"}</div>
              {item.type === "drone" ? (
                <video
                  src={item.src}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.label}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              )}
              <div className={metaCls}>{item.meta}</div>
            </button>
          ))}
        </div>
      </div>

      {current && (
        <div
          className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-4 md:p-12"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); close(); }}
            aria-label="Close"
            className="absolute top-4 right-4 z-[3] w-11 h-11 flex items-center justify-center border border-white/40 text-white font-mono hover:bg-white hover:text-black transition-colors"
          >
            ✕
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous"
            className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center border border-white/40 text-white font-mono hover:bg-white hover:text-black transition-colors"
          >
            ←
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next"
            className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center border border-white/40 text-white font-mono hover:bg-white hover:text-black transition-colors"
          >
            →
          </button>

          <div
            className="relative max-w-[1200px] w-full max-h-[80vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {current.type === "drone" ? (
              <video
                src={current.src}
                className="max-w-full max-h-[80vh] object-contain"
                autoPlay
                controls
                loop
                playsInline
              />
            ) : (
              <img
                src={current.src}
                alt={current.label}
                className="max-w-full max-h-[80vh] object-contain"
              />
            )}
          </div>

          <div className="mt-4 flex items-center justify-end w-full max-w-[1200px] text-white font-mono text-[0.7rem] tracking-[0.2em] uppercase opacity-80">
            <span>
              {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
          </div>

          <div className="md:hidden mt-4 flex gap-3">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="px-4 py-2 border border-white/40 text-white font-mono text-[0.7rem] tracking-[0.2em] uppercase"
            >← Prev</button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="px-4 py-2 border border-white/40 text-white font-mono text-[0.7rem] tracking-[0.2em] uppercase"
            >Next →</button>
          </div>
        </div>
      )}
    </section>
  );
}
