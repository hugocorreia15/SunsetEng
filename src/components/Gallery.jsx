import { useState, useEffect, useRef, useCallback } from "react";
import SectionHead from "./SectionHead.jsx";

const badgeCls = "absolute top-3 left-3 z-[3] font-mono text-[0.65rem] tracking-[0.15em] uppercase bg-[color:var(--fg)] text-[color:var(--bg)] px-[0.6rem] py-[0.3rem]";
const metaCls = "absolute bottom-3 right-3 z-[3] font-mono text-[0.65rem] tracking-[0.15em] uppercase text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]";
const thumbCls = "w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]";
const ctrlCls = "flex items-center justify-center border border-white/40 text-white font-mono hover:bg-white hover:text-black transition-colors";

export default function Gallery({ t }) {
  const [active, setActive] = useState(null);
  const items = t.gallery.items;
  const isOpen = active !== null;

  const dialogRef = useRef(null);
  const triggerRef = useRef(null);

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(() => setActive((i) => (i === null ? null : (i + 1) % items.length)), [items.length]);
  const prev = useCallback(() => setActive((i) => (i === null ? null : (i - 1 + items.length) % items.length)), [items.length]);

  const openAt = (i, event) => {
    triggerRef.current = event.currentTarget;
    setActive(i);
  };

  /* Open/close lifecycle only — keyed on `isOpen` rather than `active` so that
     stepping between images does not steal focus back to the dialog. */
  useEffect(() => {
    if (!isOpen) return;
    const restoreTo = triggerRef.current;
    dialogRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      restoreTo?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") return close();
      if (e.key === "ArrowRight") return next();
      if (e.key === "ArrowLeft") return prev();
      if (e.key !== "Tab") return;

      // Keep Tab inside the dialog rather than letting it walk the page behind.
      const focusable = dialogRef.current?.querySelectorAll("button, [href]");
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close, next, prev]);

  const current = isOpen ? items[active] : null;

  return (
    <section className="py-24 relative bg-[color:var(--bg-2)]" id="gallery" data-screen-label="Gallery">
      <div className="container-x">
        <SectionHead num={t.gallery.num} title={t.gallery.title} meta={t.gallery.meta} />
        <div className="reveal gallery__grid">
          {items.map((item, i) => (
            <button
              type="button"
              onClick={(e) => openAt(i, e)}
              className={`relative overflow-hidden cursor-pointer bg-black gallery-item--${item.type} group focus:outline-none`}
              key={item.src}
            >
              <div className={badgeCls}>{item.type === "drone" ? "▶ VIDEO" : "PHOTO"}</div>
              {/* The video itself is only fetched once the lightbox opens. */}
              <img
                src={item.type === "drone" ? item.poster : item.src}
                alt={item.label}
                loading="lazy"
                decoding="async"
                className={thumbCls}
              />
              <div className={metaCls}>{item.meta}</div>
            </button>
          ))}
        </div>
      </div>

      {current && (
        <div
          ref={dialogRef}
          tabIndex={-1}
          className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-4 md:p-12 focus:outline-none"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={current.label}
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); close(); }}
            aria-label="Close"
            className={`${ctrlCls} absolute top-4 right-4 z-[3] w-11 h-11`}
          >
            ✕
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous"
            className={`${ctrlCls} hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12`}
          >
            ←
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next"
            className={`${ctrlCls} hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12`}
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
                poster={current.poster}
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
