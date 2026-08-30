import { useState, useEffect, useRef } from "react";
import SunFlames from "./SunFlames.jsx";
import GearSvg from "./GearSvg.jsx";

const COUNTDOWN_TARGET = new Date("2026-05-13T17:00:00+01:00").getTime();

function useCountdown(targetDate) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, targetDate - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  return { days, hours, mins, secs };
}

/* The sun and gears carry looping CSS animations on `transform`, and animations
   outrank inline styles in the cascade — so the parallax offset is published as
   custom properties that the keyframes compose in, never written to `transform`. */
function setParallax(el, x, y) {
  if (!el) return;
  el.style.setProperty("--px", `${x}px`);
  el.style.setProperty("--py", `${y}px`);
}

export default function Hero({ t }) {
  const cd = useCountdown(COUNTDOWN_TARGET);
  const pad = (n) => String(n).padStart(2, "0");

  const sunRef = useRef(null);
  const gearRef = useRef(null);
  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    let frame = 0;
    const onMove = (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        setParallax(sunRef.current, x * 20, y * 20);
        setParallax(gearRef.current, x * -15, y * -10);
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="hero" id="top" data-screen-label="Hero">
      {/* Sticky, so the horizon holds still while the content scrolls over it.
          Without this the sun and the horizon scroll away together and no
          amount of descent reads as a sunset. */}
      <div className="hero__sky">
        <div className="hero__rays-layer">
          <div className="hero__rays"><SunFlames /></div>
        </div>
        {/* The track carries the scroll-driven descent so the sun itself keeps
            its own pulse and pointer parallax on an uncontested transform. */}
        <div className="hero__sun-track">
          <div ref={sunRef} className="hero__sun" />
        </div>
        <div className="hero__horizon" />
        <div className="hero__stripes" />
        <div ref={gearRef} className="gear gear--hero">
          <GearSvg teeth={14} />
        </div>
        <div className="gear gear--small">
          <GearSvg teeth={10} />
        </div>
      </div>

      <div className="hero__content grid grid-cols-1 gap-8 px-[clamp(1rem,4vw,3rem)] py-8">
        <div className="flex justify-between items-start gap-8 flex-wrap">
          <div>
            <div className="eyebrow mb-4 opacity-80">{t.hero.edition}</div>
            <h1 className="hero__title text-left">
              SUNSET<br/>D&apos;ENGE—<br/>NHARIAS
            </h1>
          </div>
          <div className="max-w-[320px] text-right mt-2">
            <div className="font-display text-[clamp(1.2rem,2vw,1.8rem)] tracking-[0.15em] opacity-80">
              {t.hero.tagline_top}
            </div>
            <div className="font-display text-[clamp(1.2rem,2vw,1.8rem)] tracking-[0.15em] text-[color:var(--sun-coral)]">
              {t.hero.tagline_bottom}
            </div>
          </div>
        </div>

        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 p-6 border border-[color:var(--line)] backdrop-blur-md relative z-[3]"
          style={{ background: "color-mix(in oklab, var(--bg) 80%, transparent)" }}
        >
          <MetaItem label={t.hero.date_label}  value={t.hero.date} />
          <MetaItem label={t.hero.hours_label} value={t.hero.hours} />
          <MetaItem label={t.hero.place_label} value={t.hero.place} />
          <MetaItem label={t.hero.city_label}  value={t.hero.city} />
        </div>

        <div className="flex justify-between items-end gap-8 flex-wrap mt-auto">
          <div>
            <div className="eyebrow mb-3 opacity-60">{t.hero.countdown_label}</div>
            <div className="flex gap-4 flex-wrap">
              <CountdownUnit value={pad(cd.days)}  label={t.hero.days} />
              <CountdownUnit value={pad(cd.hours)} label={t.hero.hours_c} />
              <CountdownUnit value={pad(cd.mins)}  label={t.hero.mins} />
              <CountdownUnit value={pad(cd.secs)}  label={t.hero.secs} />
            </div>
          </div>
          <div className="flex gap-3 flex-wrap">
            <a href="#location" className="btn btn-accent">{t.hero.cta_primary} →</a>
            <a href="#lineup"   className="btn">{t.hero.cta_secondary}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetaItem({ label, value }) {
  return (
    <div>
      <span className="eyebrow opacity-60 mb-2 block">{label}</span>
      <div className="font-display text-[clamp(1.2rem,2vw,1.8rem)] uppercase whitespace-normal lg:whitespace-nowrap">
        {value}
      </div>
    </div>
  );
}

function CountdownUnit({ value, label }) {
  return (
    <div
      className="min-w-[90px] backdrop-blur-[10px] border border-[color:var(--line-strong)] px-4 py-3 text-center"
      style={{ background: "color-mix(in oklab, var(--bg) 70%, transparent)" }}
    >
      <div className="font-display text-[clamp(2rem,4vw,3rem)] leading-none tabular-nums">{value}</div>
      <div className="font-mono text-[0.65rem] tracking-[0.2em] uppercase opacity-60 mt-1">{label}</div>
    </div>
  );
}
