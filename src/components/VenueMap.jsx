export default function VenueMap({ t, lang }) {
  const zones = [
    { id: "beer",    color: "#e63946", label_pt: "Bar · Cerveja",        label_en: "Bar · Beer",         x: 34, y: 18, w: 14, h: 7 },
    { id: "beer2",   color: "#1a1a1a", label_pt: "Bar · Cerveja",        label_en: "Bar · Beer",         x: 47, y: 18, w: 6,  h: 7 },
    { id: "stage",   color: "#6b3a1a", label_pt: "Palco Principal",      label_en: "Main Stage",         x: 14, y: 40, w: 7,  h: 16, featured: true },
    { id: "gin",     color: "#5ec3d8", label_pt: "Bar · Gins",           label_en: "Bar · Gin",          x: 44, y: 44, w: 4,  h: 9 },
    { id: "photo",   color: "#ff6a1a", label_pt: "Photo Wall",           label_en: "Photo Wall",         x: 58, y: 26, w: 7,  h: 4,  rotate: -15 },
    { id: "tbd1",    color: "#2563eb", label_pt: "Zona a definir",       label_en: "TBD",                x: 62, y: 42, w: 8,  h: 6 },
    { id: "tbd2",    color: "#8b2ec8", label_pt: "Zona a definir",       label_en: "TBD",                x: 62, y: 50, w: 8,  h: 6 },
    { id: "fun",     color: "#b07bff", label_pt: "Fun Zone",             label_en: "Fun Zone",           x: 74, y: 42, w: 10, h: 14 },
    { id: "pay",     color: "#ff8fb4", label_pt: "Pagamentos",           label_en: "Payments",           x: 34, y: 66, w: 4,  h: 4 },
    { id: "food",    color: "#ffd23f", label_pt: "Food · Comida",        label_en: "Food",               x: 38, y: 66, w: 14, h: 6 },
    { id: "food2",   color: "#ffd23f", label_pt: "Food · Comida",        label_en: "Food",               x: 38, y: 73, w: 8,  h: 4 },
  ];

  return (
    <div className="reveal mt-8 border border-[color:var(--line-strong)] overflow-hidden">
      <div className="flex justify-between items-baseline px-6 py-4 border-b border-[color:var(--line-strong)] bg-[color:var(--bg-2)]">
        <span className="eyebrow">{t.location.map_label}</span>
        <div className="font-mono text-[0.7rem] tracking-[0.2em] uppercase opacity-60">{t.location.map_sub}</div>
      </div>

      <div className="venue-map__canvas">
        <div className="venue-map__terrain" />

        <div className="venue-map__building">
          <div className="venue-map__building-label">{lang === "pt" ? "Depart. de Eng." : "Eng. Dept."}</div>
        </div>

        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M 20 22 L 27 22 L 27 28 L 33 28 L 33 32 L 48 32 L 53 24 L 53 18" stroke="rgba(255,255,255,0.75)" strokeWidth="0.3" fill="none" strokeLinecap="round" />
          <path d="M 20 62 L 28 62 L 28 72 L 52 72 L 56 66" stroke="rgba(255,255,255,0.6)" strokeWidth="0.3" fill="none" strokeLinecap="round" />
          <defs>
            <marker id="arrowhead" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
              <path d="M 0 0 L 4 2 L 0 4 Z" fill="#3be58a" />
            </marker>
          </defs>
        </svg>

        {zones.map((z) => (
          <div key={z.id} className={`zone ${z.featured ? "zone--featured" : ""}`}
            style={{
              left: z.x + "%",
              top: z.y + "%",
              width: z.w + "%",
              height: z.h + "%",
              background: z.color,
              transform: z.rotate ? `rotate(${z.rotate}deg)` : undefined,
            }}
            title={lang === "pt" ? z.label_pt : z.label_en}
          >
            {z.featured && <span className="zone__stage-label">STAGE</span>}
          </div>
        ))}

        <div className="absolute top-4 right-4 text-white flex flex-col items-center gap-1 font-mono text-[0.65rem] tracking-[0.2em] opacity-80">
          <div>N</div>
          <svg viewBox="0 0 40 40" width="40" height="40">
            <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
            <path d="M 20 4 L 23 20 L 20 36 L 17 20 Z" fill="currentColor" opacity="0.8" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3 p-6 bg-[color:var(--bg-2)] border-t border-[color:var(--line-strong)]">
        {[
          { color: "#6b3a1a", pt: "Palco Principal", en: "Main Stage" },
          { color: "#e63946", pt: "Bar · Cerveja",  en: "Bar · Beer" },
          { color: "#5ec3d8", pt: "Bar · Gins",     en: "Bar · Gin" },
          { color: "#ffd23f", pt: "Comida",         en: "Food" },
          { color: "#ff8fb4", pt: "Pagamentos",     en: "Payments" },
          { color: "#ff6a1a", pt: "Photo Wall",     en: "Photo Wall" },
          { color: "#b07bff", pt: "Fun Zone",       en: "Fun Zone" },
          { color: "#2563eb", pt: "A definir",      en: "TBD" },
          { color: "#8b2ec8", pt: "A definir",      en: "TBD" },
        ].map((l, i) => (
          <div className="flex items-center gap-3" key={i}>
            <span className="w-4 h-4 border border-[rgba(0,0,0,0.3)] shrink-0" style={{ background: l.color }} />
            <span className="font-mono text-[0.72rem] tracking-[0.1em] uppercase opacity-80">{lang === "pt" ? l.pt : l.en}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
