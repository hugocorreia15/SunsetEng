export default function SponsorCarousel({ tier, soon }) {
  const filled = tier.sponsors?.length || 0;

  const renderCard = (s, key, ariaHidden = false) => {
    const imgCls = s.big
      ? "max-h-[110%] max-w-[110%] object-contain"
      : "max-h-[78%] max-w-[85%] object-contain";
    const card = (
      <div className="relative w-[180px] sm:w-[200px] md:w-[220px] aspect-[5/4] shrink-0 flex items-center justify-center p-4 transition-transform hover:-translate-y-0.5">
        {s.src ? (
          <>
            <img
              src={s.src}
              alt={ariaHidden ? "" : s.name}
              aria-hidden={ariaHidden || undefined}
              className={`sponsor-logo ${s.srcDark ? "sponsor-logo--light" : ""} ${imgCls}`}
              loading="lazy"
            />
            {s.srcDark && (
              <img
                src={s.srcDark}
                alt=""
                aria-hidden="true"
                className={`sponsor-logo sponsor-logo--dark ${imgCls}`}
              />
            )}
          </>
        ) : (
          <span className="font-display text-[clamp(0.9rem,1.4vw,1.2rem)] uppercase tracking-[0.06em] text-center leading-tight px-2">
            {s.name}
          </span>
        )}
      </div>
    );
    return s.url && !ariaHidden ? (
      <a key={key} href={s.url} target="_blank" rel="noreferrer" title={s.name} className="shrink-0 snap-center">{card}</a>
    ) : (
      <div key={key} className="shrink-0 snap-center" aria-hidden={ariaHidden || undefined}>{card}</div>
    );
  };

  return (
    <div className="sponsor-tier border border-[color:var(--line-strong)] overflow-hidden">
      <div className="flex justify-between items-baseline px-6 py-4 border-b border-[color:var(--line)] bg-[color:var(--bg-2)]">
        <div className="flex items-baseline gap-4">
          <div className="font-display text-[clamp(1.2rem,2.2vw,1.7rem)] leading-none tracking-[0.02em]">{tier.name}</div>
          <div className="font-mono text-[0.65rem] tracking-[0.2em] uppercase opacity-60">{tier.tag}</div>
        </div>
        <div className="font-mono text-[0.65rem] tracking-[0.2em] uppercase opacity-60">
          {String(filled).padStart(2, "0")} / {String(tier.slots).padStart(2, "0")}
        </div>
      </div>

      {filled > 0 ? (
        <div className="relative">
          <div className="overflow-hidden py-8">
            <div className="sponsor-marquee flex gap-4 w-max">
              {tier.sponsors.map((s, i) => renderCard(s, `a-${i}`))}
              {tier.sponsors.map((s, i) => renderCard(s, `b-${i}`, true))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[color:var(--bg-2)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[color:var(--bg-2)] to-transparent" />
        </div>
      ) : (
        <div className="flex items-center justify-center px-6 py-10 gap-3">
          <span className="font-display text-[clamp(1.2rem,2.4vw,1.8rem)] uppercase tracking-[0.08em] opacity-80">{soon}</span>
          <span className="font-mono text-[0.65rem] tracking-[0.2em] uppercase opacity-40">
            · {tier.slots} {tier.slots === 1 ? "vaga" : "vagas"}
          </span>
        </div>
      )}
    </div>
  );
}
