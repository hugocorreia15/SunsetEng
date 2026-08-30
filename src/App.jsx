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
