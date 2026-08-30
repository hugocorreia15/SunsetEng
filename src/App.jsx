import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SITE_CONTENT } from "./content.js";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import About from "./components/About.jsx";
import Lineup from "./components/Lineup.jsx";
import Gallery from "./components/Gallery.jsx";
import Sponsors from "./components/Sponsors.jsx";
import Team from "./components/Team.jsx";
import Location from "./components/Location.jsx";
import Footer from "./components/Footer.jsx";

/* Storage access throws outright in some privacy modes, so neither read nor
   write is allowed to take the page down with it. */
const readStored = (key, fallback) => {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
};

const writeStored = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* preference simply will not persist */
  }
};

export default function App() {
  const [lang, setLang] = useState(() => readStored("sunset-lang", "pt"));
  const [theme, setTheme] = useState(() => readStored("sunset-theme", "light"));

  useEffect(() => {
    writeStored("sunset-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    writeStored("sunset-theme", theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  /* The day/night ramp is pure CSS, but a handful of things cannot be
     interpolated — the dual-asset sponsor logos, the map's invert filter, the
     grain's blend mode. Those key off data-lit, which tracks which end of the
     cycle is currently showing. The theme toggle only decides where you start:
     light begins at day and scrolls into night, dark does the reverse. */
  useEffect(() => {
    const root = document.documentElement;
    const animated =
      CSS.supports("animation-timeline: scroll()") &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!animated) {
      root.dataset.lit = theme === "dark" ? "night" : "day";
      return;
    }

    let frame = 0;
    const apply = () => {
      frame = 0;
      const past = window.scrollY > window.innerHeight * 0.62;
      root.dataset.lit = (theme === "dark" ? !past : past) ? "night" : "day";
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(apply); };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [theme]);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("is-visible"); });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [lang]);

  const t = SITE_CONTENT[lang];

  return (
    <>
      <Nav t={t} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />
      <Hero t={t} />
      <Marquee />
      <About t={t} />
      <Lineup t={t} />
      <Gallery t={t} />
      <Sponsors t={t} />
      <Team t={t} />
      <Location t={t} />
      <Footer t={t} />
      <Analytics />
    </>
  );
}
