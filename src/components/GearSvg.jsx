import { useMemo } from "react";

/* Drawn as a drafting sheet rather than a solid cog: the tooth profile sits on
   its construction circles — tip, pitch (dashed, as on a real gear drawing),
   root — with a centre mark and spokes. Stroke-only, so it reads as linework
   against the display type instead of competing with it as a filled shape. */
export default function GearSvg({ className = "", teeth = 12, spokes = 4 }) {
  const { profile, tipR, pitchR, rootR, hubR, spokeLines } = useMemo(() => {
    const cx = 50, cy = 50;
    const tipR = 47, rootR = 37, hubR = 15;
    const pitchR = (tipR + rootR) / 2;

    const steps = teeth * 4;
    let d = "";
    for (let i = 0; i < steps; i++) {
      const angle = (i / steps) * Math.PI * 2 - Math.PI / 2;
      const r = i % 4 < 2 ? tipR : rootR;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      d += `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)} `;
    }
    d += "Z";

    const spokeLines = Array.from({ length: spokes }, (_, i) => {
      const angle = (i / spokes) * Math.PI * 2 - Math.PI / 2;
      return {
        x1: cx + Math.cos(angle) * hubR,
        y1: cy + Math.sin(angle) * hubR,
        x2: cx + Math.cos(angle) * rootR,
        y2: cy + Math.sin(angle) * rootR,
      };
    });

    return { profile: d, tipR, pitchR, rootR, hubR, spokeLines };
  }, [teeth, spokes]);

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {/* construction circles */}
      <circle cx="50" cy="50" r={tipR} strokeWidth="0.3" opacity="0.3" />
      <circle cx="50" cy="50" r={pitchR} strokeWidth="0.35" opacity="0.45" strokeDasharray="2.6 2.2" />
      <circle cx="50" cy="50" r={rootR} strokeWidth="0.3" opacity="0.3" />

      {/* tooth profile */}
      <path d={profile} strokeWidth="0.95" />

      {/* web and hub */}
      {spokeLines.map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} strokeWidth="0.45" opacity="0.55" />
      ))}
      <circle cx="50" cy="50" r={hubR} strokeWidth="0.95" />
      <circle cx="50" cy="50" r="4.5" strokeWidth="0.45" opacity="0.7" />

      {/* centre mark */}
      <path d="M50 41 V59 M41 50 H59" strokeWidth="0.3" opacity="0.65" />
    </svg>
  );
}
