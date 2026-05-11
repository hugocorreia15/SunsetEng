import { useMemo } from "react";

export default function GearSvg({ className = "", teeth = 12, color = "currentColor" }) {
  const path = useMemo(() => {
    const cx = 50, cy = 50;
    const rOuter = 48, rInner = 38, rHub = 18;
    const steps = teeth * 4;
    let d = "";
    for (let i = 0; i < steps; i++) {
      const t = i / steps;
      const angle = t * Math.PI * 2 - Math.PI / 2;
      const phase = (i % 4);
      const r = phase < 2 ? rOuter : rInner;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      d += (i === 0 ? "M" : "L") + x.toFixed(2) + " " + y.toFixed(2) + " ";
    }
    d += "Z";
    d += ` M${cx - rHub} ${cy} a${rHub} ${rHub} 0 1 0 ${rHub * 2} 0 a${rHub} ${rHub} 0 1 0 ${-rHub * 2} 0 Z`;
    return d;
  }, [teeth]);

  return (
    <svg viewBox="0 0 100 100" className={className} fill={color} fillRule="evenodd">
      <path d={path} opacity="0.9" />
      <circle cx="50" cy="50" r="6" fill="currentColor" opacity="0.4" />
    </svg>
  );
}
