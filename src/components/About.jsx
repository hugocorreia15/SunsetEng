import SectionHead from "./SectionHead.jsx";

export default function About({ t }) {
  return (
    <section className="py-24 relative bg-[color:var(--bg-2)]" id="about" data-screen-label="About">
      <div className="container-x">
        <SectionHead num={t.about.num} title={t.about.title} meta={t.about.meta} />

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 items-start">
          <div className="reveal font-display text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.15] normal-case tracking-normal">
            {t.about.lede}
          </div>
          <div className="about__drop-cap reveal [&_p]:mb-[1.2rem] [&_p]:opacity-80">
            <p>{t.about.body_1}</p>
            <p>{t.about.body_2}</p>
          </div>
        </div>

        <div className="reveal grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] mt-20 border-y border-[color:var(--line-strong)]">
          {t.about.stats.map(([num, label], i) => (
            <div key={i} className="p-[2rem_1.5rem] border-r border-[color:var(--line)] last:border-r-0">
              <div className="stat__num">{num}</div>
              <div className="mt-2 font-mono text-[0.7rem] tracking-[0.2em] uppercase opacity-65">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

