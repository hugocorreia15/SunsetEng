import GearSvg from "./GearSvg.jsx";

/* Ambient drafting marks behind the page sections — the same blueprint
   vocabulary as the hero gears, so the whole document reads as one sheet
   rather than a hero with decoration and then plain pages. */

function BoltCircle({ holes = 8 }) {
  const marks = Array.from({ length: holes }, (_, i) => {
    const a = (i / holes) * Math.PI * 2 - Math.PI / 2;
    return { cx: 50 + Math.cos(a) * 34, cy: 50 + Math.sin(a) * 34 };
  });
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" aria-hidden="true">
      <circle cx="50" cy="50" r="34" strokeWidth="0.35" strokeDasharray="2.6 2.2" opacity="0.5" />
      <circle cx="50" cy="50" r="46" strokeWidth="0.7" />
      <circle cx="50" cy="50" r="16" strokeWidth="0.7" />
      {marks.map((m, i) => (
        <circle key={i} cx={m.cx} cy={m.cy} r="4" strokeWidth="0.6" />
      ))}
      <path d="M50 38 V62 M38 50 H62" strokeWidth="0.3" opacity="0.6" />
    </svg>
  );
}

function Caliper() {
  return (
    <svg viewBox="0 0 100 60" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M6 30 H94" strokeWidth="0.5" />
      <path d="M6 20 V40 M94 20 V40" strokeWidth="0.7" />
      <path d="M6 30 L14 26 L14 34 Z M94 30 L86 26 L86 34 Z" strokeWidth="0.4" fill="currentColor" opacity="0.7" />
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} d={`M${14 + i * 9} 30 V${i % 2 ? 24 : 26.5}`} strokeWidth="0.35" opacity="0.55" />
      ))}
    </svg>
  );
}

function Arc() {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M4 84 A 80 80 0 0 1 84 4" strokeWidth="0.7" />
      <path d="M18 88 A 70 70 0 0 1 88 18" strokeWidth="0.35" strokeDasharray="3 3" opacity="0.6" />
      <path d="M4 84 L84 4" strokeWidth="0.3" opacity="0.35" />
      <circle cx="4" cy="84" r="2.5" strokeWidth="0.6" />
      <circle cx="84" cy="4" r="2.5" strokeWidth="0.6" />
    </svg>
  );
}

const MARKS = {
  gear: (p) => <GearSvg teeth={p.teeth ?? 12} spokes={p.spokes ?? 4} />,
  bolts: (p) => <BoltCircle holes={p.holes ?? 8} />,
  caliper: () => <Caliper />,
  arc: () => <Arc />,
};

/* Each section gets its own arrangement so the page never repeats a frame. */
const PRESETS = {
  about: [
    { mark: "gear", teeth: 16, size: "30vmin", top: "-6vmin", right: "-9vmin", spin: 70, tone: "amber" },
    { mark: "caliper", size: "22vmin", bottom: "8%", left: "-3vmin", tone: "coral", opacity: 0.4 },
  ],
  lineup: [
    { mark: "bolts", holes: 10, size: "26vmin", top: "12%", left: "-10vmin", spin: 90, reverse: true, tone: "magenta" },
    { mark: "gear", teeth: 9, spokes: 3, size: "14vmin", bottom: "6%", right: "4%", spin: 44, tone: "amber" },
  ],
  gallery: [
    { mark: "arc", size: "34vmin", top: "-4vmin", right: "-6vmin", tone: "coral", opacity: 0.35 },
  ],
  sponsors: [
    { mark: "gear", teeth: 14, size: "24vmin", top: "6%", left: "-8vmin", spin: 62, reverse: true, tone: "amber" },
    { mark: "bolts", holes: 6, size: "16vmin", bottom: "10%", right: "-4vmin", spin: 80, tone: "coral" },
  ],
  team: [
    { mark: "gear", teeth: 20, size: "32vmin", top: "18%", right: "-12vmin", spin: 96, tone: "magenta" },
    { mark: "caliper", size: "18vmin", top: "4%", left: "6%", tone: "amber", opacity: 0.35 },
  ],
  location: [
    { mark: "arc", size: "28vmin", bottom: "-4vmin", left: "-6vmin", tone: "amber", opacity: 0.4 },
    { mark: "gear", teeth: 11, size: "17vmin", top: "8%", right: "3%", spin: 54, reverse: true, tone: "coral" },
  ],
};

export default function Ornaments({ preset }) {
  const items = PRESETS[preset];
  if (!items) return null;

  return (
    <div className="ornaments" aria-hidden="true">
      {items.map((o, i) => (
        <div
          key={i}
          className={`ornament ornament--${o.tone}`}
          style={{
            width: o.size,
            top: o.top,
            right: o.right,
            bottom: o.bottom,
            left: o.left,
            opacity: o.opacity,
            animationDuration: o.spin ? `${o.spin}s` : undefined,
            animationDirection: o.reverse ? "reverse" : undefined,
          }}
        >
          {MARKS[o.mark](o)}
        </div>
      ))}
    </div>
  );
}
