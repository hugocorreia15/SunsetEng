export default function MainSponsor({ tier, soon, lang }) {
  return (
    <div className="relative overflow-hidden border border-[color:var(--line-strong)]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 10%, color-mix(in oklab, var(--sun-amber) 40%, transparent), transparent 55%), radial-gradient(circle at 90% 90%, color-mix(in oklab, var(--sun-magenta) 35%, transparent), transparent 50%)",
        }}
      />
      <div
        className="absolute top-0 left-0 h-1 w-full"
        style={{ background: "linear-gradient(90deg, var(--sun-coral), var(--sun-amber), var(--sun-magenta))" }}
      />

      <div className="relative grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-center px-8 md:px-12 py-10 md:py-14">
        <div className="flex flex-col gap-3 md:pr-10 md:border-r md:border-[color:var(--line)]">
          <div className="font-mono text-[0.7rem] tracking-[0.25em] uppercase opacity-70">
            {lang === "pt" ? "Apresentado por" : "Presented by"}
          </div>
          <div className="font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-none">{tier.name}</div>
          <div className="font-mono text-[0.7rem] tracking-[0.2em] uppercase opacity-60 mt-1">
            {tier.tag}
          </div>
        </div>

        <div className="relative flex items-center justify-center min-h-[140px] md:min-h-[180px]">
          <a
            href="https://www.linkedin.com/in/cpmenergy-consulting-71524710b/"
            target="_blank"
            rel="noreferrer"
            title="CPM Energy Consulting"
            className="relative w-full max-w-[540px] aspect-[16/5] border border-[color:var(--line-strong)] bg-[color:var(--bg)] flex items-center justify-center p-4 transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0_var(--line-strong)]"
          >
            <img
              src="/sponsors/main/logo01.png"
              alt={tier.name}
              className="sponsor-logo sponsor-logo--light max-h-[75%] max-w-[80%] object-contain"
            />
            <img
              src="/sponsors/main/logo01-dark.png"
              alt={tier.name}
              aria-hidden="true"
              className="sponsor-logo sponsor-logo--dark max-h-[75%] max-w-[80%] object-contain"
            />
            <span className="absolute -top-3 left-4 px-2 py-0.5 bg-[color:var(--fg)] text-[color:var(--bg)] font-mono text-[0.6rem] tracking-[0.2em] uppercase">
              Main
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
