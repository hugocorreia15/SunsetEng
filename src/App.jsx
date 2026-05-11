import { useState, useEffect } from "react";
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

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem("sunset-lang") || "pt");
  const [theme, setTheme] = useState(() => localStorage.getItem("sunset-theme") || "light");

  useEffect(() => { localStorage.setItem("sunset-lang", lang); }, [lang]);
  useEffect(() => {
    localStorage.setItem("sunset-theme", theme);
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
      <Sponsors t={t} lang={lang} onContact={() => { window.location.href = "mailto:parcerias@sunsetua.pt"; }} />
      <Team t={t} lang={lang} />
      <Location t={t} lang={lang} />
      <Footer t={t} lang={lang} />
    </>
  );
}
