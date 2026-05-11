import SectionHead from "./SectionHead.jsx";

export default function Lineup({ t }) {
  return (
    <section className="py-24 relative" id="lineup" data-screen-label="Lineup">
      <div className="container-x">
        <SectionHead num={t.lineup.num} title={t.lineup.title} meta={t.lineup.meta} />

        <div className="flex items-baseline gap-4 mb-8 pb-4 border-b border-[color:var(--line)]">
          <div
            className="font-display text-[clamp(1.8rem,3.5vw,3rem)] leading-none tracking-[0.02em] bg-clip-text text-transparent"
            style={{ background: "linear-gradient(135deg, var(--sun-coral), var(--sun-amber))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            {t.lineup.stage}
          </div>
        </div>

        <div className="flex flex-col">
          {t.lineup.rows.map((r, i) => (
            <div className="lineup-row reveal" key={i}>
              <div className="font-mono text-[0.95rem] opacity-70">{r[0]}</div>
              <div>
                <div className="font-display text-[clamp(1.8rem,3.5vw,3rem)] leading-none tracking-[0.01em]">{r[1]}</div>
                <div className="font-mono text-[0.7rem] tracking-[0.2em] uppercase opacity-60">{r[2]}</div>
              </div>
              <div />
              <div />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
