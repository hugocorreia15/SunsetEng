import GearSvg from "./GearSvg.jsx";

/* Ambient drafting marks behind the page. They are not abstract decoration:
   each one is an instrument from one of the engineering disciplines the ten
   núcleos actually study — mechanical, electronic, civil, chemical, biomedical,
   environmental — drawn in the same blueprint vocabulary as the hero gears. */

const svg = (ratio, children) => ({ ratio, children });
const range = (n, fn) => Array.from({ length: n }, (_, i) => fn(i));

/* ---- mechanical ---------------------------------------------------------- */

const Bearing = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" aria-hidden="true">
    <circle cx="50" cy="50" r="46" strokeWidth="0.8" />
    <circle cx="50" cy="50" r="38" strokeWidth="0.35" opacity="0.55" />
    <circle cx="50" cy="50" r="21" strokeWidth="0.35" opacity="0.55" />
    <circle cx="50" cy="50" r="13" strokeWidth="0.8" />
    {range(9, (i) => {
      const a = (i / 9) * Math.PI * 2;
      return <circle key={i} cx={50 + Math.cos(a) * 29.5} cy={50 + Math.sin(a) * 29.5} r="7" strokeWidth="0.55" />;
    })}
    <path d="M50 40 V60 M40 50 H60" strokeWidth="0.3" opacity="0.6" />
  </svg>
);

const Spring = () => (
  <svg viewBox="0 0 100 46" fill="none" stroke="currentColor" aria-hidden="true">
    <path d="M2 23 H10 M90 23 H98" strokeWidth="0.7" />
    {range(7, (i) => (
      <ellipse key={i} cx={16 + i * 11.5} cy="23" rx="5.5" ry="19" strokeWidth="0.65" />
    ))}
    <path d="M2 6 V40 M98 6 V40" strokeWidth="0.4" opacity="0.5" />
  </svg>
);

/* ---- electronic ---------------------------------------------------------- */

const Circuit = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" aria-hidden="true">
    <path d="M2 22 H26 V52 H54 V16 H98" strokeWidth="0.7" />
    <path d="M2 68 H38 V88 H98" strokeWidth="0.7" />
    <path d="M26 52 V88" strokeWidth="0.5" opacity="0.6" />
    <path d="M54 52 H80 V68 H98" strokeWidth="0.5" opacity="0.6" />
    {[[26, 22], [54, 52], [38, 68], [80, 68], [26, 88]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="3" strokeWidth="0.6" />
    ))}
    <rect x="60" y="28" width="20" height="10" strokeWidth="0.6" />
    {range(4, (i) => <path key={i} d={`M${63 + i * 5} 28 V22`} strokeWidth="0.4" opacity="0.7" />)}
  </svg>
);

const Waveform = () => {
  const pts = range(61, (i) => {
    const x = i * (100 / 60);
    const y = 25 - 17 * Math.sin((i / 60) * Math.PI * 4);
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 100 50" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M0 25 H100" strokeWidth="0.3" strokeDasharray="2 2.5" opacity="0.5" />
      <path d={pts} strokeWidth="0.8" />
      {range(11, (i) => <path key={i} d={`M${i * 10} 25 V${i % 5 === 0 ? 19 : 22}`} strokeWidth="0.35" opacity="0.55" />)}
    </svg>
  );
};

/* ---- civil / structural -------------------------------------------------- */

const Truss = () => (
  <svg viewBox="0 0 100 38" fill="none" stroke="currentColor" aria-hidden="true">
    <path d="M3 6 H97 M3 32 H97" strokeWidth="0.8" />
    <path d={range(8, (i) => `M${3 + i * 13.4} ${i % 2 ? 32 : 6} L${3 + (i + 1) * 13.4} ${i % 2 ? 6 : 32}`).join(" ")} strokeWidth="0.5" opacity="0.75" />
    {range(8, (i) => <circle key={i} cx={3 + i * 13.4} cy={i % 2 ? 32 : 6} r="1.8" strokeWidth="0.5" />)}
  </svg>
);

/* ---- chemical ------------------------------------------------------------ */

const HexLattice = () => {
  const hex = (cx, cy, r) =>
    range(6, (i) => {
      const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
      return `${i === 0 ? "M" : "L"}${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)}`;
    }).join(" ") + " Z";
  const r = 17, dx = r * Math.sqrt(3), dy = r * 1.5;
  const cells = [[50, 50], [50 - dx, 50], [50 + dx, 50], [50 - dx / 2, 50 - dy], [50 + dx / 2, 50 - dy], [50 - dx / 2, 50 + dy], [50 + dx / 2, 50 + dy]];
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" aria-hidden="true">
      {cells.map(([x, y], i) => <path key={i} d={hex(x, y, r)} strokeWidth={i === 0 ? 0.8 : 0.5} opacity={i === 0 ? 1 : 0.7} />)}
      {cells.map(([x, y], i) => <circle key={`n${i}`} cx={x} cy={y} r="1.6" strokeWidth="0.5" />)}
    </svg>
  );
};

const Flask = () => (
  <svg viewBox="0 0 70 100" fill="none" stroke="currentColor" aria-hidden="true">
    <path d="M28 6 H42 M30 6 V38 L10 88 H60 L40 38 V6" strokeWidth="0.8" />
    <path d="M17 71 H53" strokeWidth="0.5" strokeDasharray="2.5 2" opacity="0.8" />
    {range(4, (i) => <path key={i} d={`M${20 + i * 1.6} ${62 - i * 7} H${28 - i * 1.6}`} strokeWidth="0.4" opacity="0.6" />)}
    <circle cx="35" cy="79" r="2" strokeWidth="0.4" opacity="0.6" />
    <circle cx="42" cy="83" r="1.4" strokeWidth="0.4" opacity="0.6" />
  </svg>
);

/* ---- biomedical ---------------------------------------------------------- */

const Helix = () => {
  const strand = (phase) =>
    range(41, (i) => {
      const t = i / 40;
      const x = 30 + 21 * Math.sin(t * Math.PI * 3 + phase);
      const y = t * 100;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(" ");
  return (
    <svg viewBox="0 0 60 100" fill="none" stroke="currentColor" aria-hidden="true">
      <path d={strand(0)} strokeWidth="0.8" />
      <path d={strand(Math.PI)} strokeWidth="0.8" opacity="0.75" />
      {range(13, (i) => {
        const t = (i + 0.5) / 13;
        const y = t * 100;
        return <path key={i} d={`M${(30 + 21 * Math.sin(t * Math.PI * 3)).toFixed(1)} ${y.toFixed(1)} L${(30 + 21 * Math.sin(t * Math.PI * 3 + Math.PI)).toFixed(1)} ${y.toFixed(1)}`} strokeWidth="0.4" opacity="0.55" />;
      })}
    </svg>
  );
};

/* ---- environmental ------------------------------------------------------- */

const Contour = () => {
  const ring = (scale, wobble) =>
    range(49, (i) => {
      const a = (i / 48) * Math.PI * 2;
      const r = scale * (1 + 0.12 * Math.sin(a * 3 + wobble) + 0.07 * Math.sin(a * 5 - wobble));
      return `${i === 0 ? "M" : "L"}${(50 + Math.cos(a) * r).toFixed(1)} ${(50 + Math.sin(a) * r).toFixed(1)}`;
    }).join(" ") + " Z";
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" aria-hidden="true">
      {[44, 34, 25, 16, 8].map((s, i) => (
        <path key={i} d={ring(s, i * 0.8)} strokeWidth={i === 0 ? 0.7 : 0.45} opacity={1 - i * 0.11} />
      ))}
      <path d="M50 45 V55 M45 50 H55" strokeWidth="0.35" opacity="0.7" />
    </svg>
  );
};

/* ---- measurement --------------------------------------------------------- */

const Protractor = () => (
  <svg viewBox="0 0 100 56" fill="none" stroke="currentColor" aria-hidden="true">
    <path d="M4 52 A 46 46 0 0 1 96 52" strokeWidth="0.8" />
    <path d="M4 52 H96" strokeWidth="0.6" />
    <path d="M16 52 A 34 34 0 0 1 84 52" strokeWidth="0.35" strokeDasharray="2.5 2.5" opacity="0.6" />
    {range(19, (i) => {
      const a = Math.PI - (i / 18) * Math.PI;
      const long = i % 3 === 0;
      const r1 = 46, r2 = long ? 38 : 42;
      return <path key={i} d={`M${(50 + Math.cos(a) * r1).toFixed(1)} ${(52 + -Math.sin(a) * r1).toFixed(1)} L${(50 + Math.cos(a) * r2).toFixed(1)} ${(52 + -Math.sin(a) * r2).toFixed(1)}`} strokeWidth="0.4" opacity={long ? 0.9 : 0.55} />;
    })}
    <circle cx="50" cy="52" r="2.5" strokeWidth="0.6" />
  </svg>
);

const Caliper = () => (
  <svg viewBox="0 0 100 60" fill="none" stroke="currentColor" aria-hidden="true">
    <path d="M6 30 H94" strokeWidth="0.5" />
    <path d="M6 20 V40 M94 20 V40" strokeWidth="0.7" />
    <path d="M6 30 L14 26 L14 34 Z M94 30 L86 26 L86 34 Z" strokeWidth="0.4" fill="currentColor" opacity="0.7" />
    {range(9, (i) => <path key={i} d={`M${14 + i * 9} 30 V${i % 2 ? 24 : 26.5}`} strokeWidth="0.35" opacity="0.55" />)}
  </svg>
);

const BoltCircle = ({ holes = 8 }) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" aria-hidden="true">
    <circle cx="50" cy="50" r="34" strokeWidth="0.35" strokeDasharray="2.6 2.2" opacity="0.5" />
    <circle cx="50" cy="50" r="46" strokeWidth="0.7" />
    <circle cx="50" cy="50" r="16" strokeWidth="0.7" />
    {range(holes, (i) => {
      const a = (i / holes) * Math.PI * 2 - Math.PI / 2;
      return <circle key={i} cx={50 + Math.cos(a) * 34} cy={50 + Math.sin(a) * 34} r="4" strokeWidth="0.6" />;
    })}
    <path d="M50 38 V62 M38 50 H62" strokeWidth="0.3" opacity="0.6" />
  </svg>
);

const Arc = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" aria-hidden="true">
    <path d="M4 84 A 80 80 0 0 1 84 4" strokeWidth="0.7" />
    <path d="M18 88 A 70 70 0 0 1 88 18" strokeWidth="0.35" strokeDasharray="3 3" opacity="0.6" />
    <path d="M4 84 L84 4" strokeWidth="0.3" opacity="0.35" />
    <circle cx="4" cy="84" r="2.5" strokeWidth="0.6" />
    <circle cx="84" cy="4" r="2.5" strokeWidth="0.6" />
  </svg>
);

const MARKS = {
  gear:       svg(1,      (p) => <GearSvg teeth={p.teeth ?? 12} spokes={p.spokes ?? 4} />),
  bearing:    svg(1,      () => <Bearing />),
  bolts:      svg(1,      (p) => <BoltCircle holes={p.holes ?? 8} />),
  spring:     svg(100/46, () => <Spring />),
  circuit:    svg(1,      () => <Circuit />),
  waveform:   svg(2,      () => <Waveform />),
  truss:      svg(100/38, () => <Truss />),
  hex:        svg(1,      () => <HexLattice />),
  flask:      svg(0.7,    () => <Flask />),
  helix:      svg(0.6,    () => <Helix />),
  contour:    svg(1,      () => <Contour />),
  protractor: svg(100/56, () => <Protractor />),
  caliper:    svg(100/60, () => <Caliper />),
  arc:        svg(1,      () => <Arc />),
};

/* Each section gets its own arrangement, so no two frames of the page repeat.
   `spin` rotates; anything without it drifts instead, which suits the marks
   that have an obvious up. */
const PRESETS = {
  about: [
    { mark: "gear", teeth: 16, size: "30vmin", top: "-6vmin", right: "-9vmin", spin: 70, tone: "amber" },
    { mark: "contour", size: "26vmin", bottom: "-4vmin", left: "-7vmin", tone: "coral", opacity: 0.32 },
    { mark: "waveform", size: "30vmin", top: "34%", left: "6%", tone: "magenta", opacity: 0.26 },
  ],
  lineup: [
    { mark: "bolts", holes: 10, size: "26vmin", top: "10%", left: "-10vmin", spin: 90, reverse: true, tone: "magenta" },
    { mark: "spring", size: "30vmin", bottom: "4%", right: "-6vmin", tone: "amber", opacity: 0.3 },
    { mark: "waveform", size: "34vmin", top: "6%", right: "8%", tone: "coral", opacity: 0.24 },
    { mark: "gear", teeth: 9, spokes: 3, size: "13vmin", bottom: "22%", left: "12%", spin: 44, tone: "amber" },
  ],
  gallery: [
    { mark: "arc", size: "32vmin", top: "-4vmin", right: "-6vmin", tone: "coral", opacity: 0.32 },
    { mark: "protractor", size: "28vmin", bottom: "2%", left: "-5vmin", tone: "amber", opacity: 0.28 },
  ],
  sponsors: [
    { mark: "gear", teeth: 14, size: "24vmin", top: "4%", left: "-8vmin", spin: 62, reverse: true, tone: "amber" },
    { mark: "hex", size: "22vmin", bottom: "8%", right: "-5vmin", spin: 120, tone: "coral", opacity: 0.3 },
    { mark: "truss", size: "36vmin", top: "44%", right: "10%", tone: "magenta", opacity: 0.24 },
  ],
  team: [
    { mark: "bearing", size: "30vmin", top: "14%", right: "-11vmin", spin: 96, tone: "magenta" },
    { mark: "circuit", size: "26vmin", bottom: "6%", left: "-6vmin", tone: "amber", opacity: 0.28 },
    { mark: "helix", size: "20vmin", top: "4%", left: "8%", tone: "coral", opacity: 0.3 },
    { mark: "caliper", size: "24vmin", bottom: "34%", right: "14%", tone: "amber", opacity: 0.22 },
  ],
  location: [
    { mark: "contour", size: "30vmin", bottom: "-6vmin", left: "-8vmin", tone: "amber", opacity: 0.34 },
    { mark: "gear", teeth: 11, size: "16vmin", top: "6%", right: "3%", spin: 54, reverse: true, tone: "coral" },
    { mark: "flask", size: "18vmin", top: "40%", left: "4%", tone: "magenta", opacity: 0.26 },
    { mark: "truss", size: "30vmin", top: "8%", left: "22%", tone: "coral", opacity: 0.2 },
  ],
};

export default function Ornaments({ preset }) {
  const items = PRESETS[preset];
  if (!items) return null;

  return (
    <div className="ornaments" aria-hidden="true">
      {items.map((o, i) => {
        const mark = MARKS[o.mark];
        return (
          <div
            key={i}
            className={`ornament ornament--${o.tone} ${o.spin ? "ornament--spin" : "ornament--drift"}`}
            style={{
              width: o.size,
              aspectRatio: mark.ratio,
              top: o.top,
              right: o.right,
              bottom: o.bottom,
              left: o.left,
              opacity: o.opacity,
              animationDuration: o.spin ? `${o.spin}s` : undefined,
              animationDirection: o.reverse ? "reverse" : undefined,
              animationDelay: `${-i * 3.5}s`,
            }}
          >
            {mark.children(o)}
          </div>
        );
      })}
    </div>
  );
}
