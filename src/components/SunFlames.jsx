import { useEffect, useRef } from "react";
import p5 from "p5";

const RAY_COUNT = 36;

export default function SunFlames() {
  const hostRef = useRef(null);

  useEffect(() => {
    if (!hostRef.current) return;

    const sketch = (p) => {
      let w = 0, h = 0, cx = 0, cy = 0, sunR = 0, outerR = 0;
      let strokeColor = "#ffb020";

      const readColor = () => {
        const s = getComputedStyle(document.documentElement);
        strokeColor = s.getPropertyValue("--sun-amber").trim() || "#ffb020";
      };

      const resize = () => {
        const host = hostRef.current;
        if (!host) return;
        const rect = host.getBoundingClientRect();
        w = rect.width; h = rect.height;
        cx = w / 2; cy = h / 2;
        sunR = Math.min(w, h) * 0.30;
        outerR = Math.min(w, h) * 0.5;
        p.resizeCanvas(w, h);
      };

      p.setup = () => {
        readColor();
        const rect = hostRef.current.getBoundingClientRect();
        w = rect.width; h = rect.height;
        cx = w / 2; cy = h / 2;
        sunR = Math.min(w, h) * 0.30;
        outerR = Math.min(w, h) * 0.5;
        const c = p.createCanvas(w, h);
        c.elt.style.width = "100%";
        c.elt.style.height = "100%";
        p.pixelDensity(Math.min(window.devicePixelRatio || 1, 2));
        window.addEventListener("resize", resize);
      };

      p.draw = () => {
        p.clear();
        const t = p.frameCount * 0.012;
        const col = p.color(strokeColor);
        const maxLen = outerR - sunR;

        for (let i = 0; i < RAY_COUNT; i++) {
          const baseAng = (i / RAY_COUNT) * p.TWO_PI;
          const n = p.noise(i * 0.37, t);
          const pulse = 0.45 + n * 0.75;
          const len = maxLen * pulse;
          const thick = i % 2 === 0 ? 1.6 : 0.9;
          const alpha = (i % 2 === 0 ? 210 : 130) * (0.55 + n * 0.45);

          const c1 = p.color(strokeColor); c1.setAlpha(alpha);
          p.stroke(c1);
          p.strokeWeight(thick);
          p.strokeCap(p.SQUARE);

          const x1 = cx + Math.cos(baseAng) * sunR;
          const y1 = cy + Math.sin(baseAng) * sunR;
          const x2 = cx + Math.cos(baseAng) * (sunR + len);
          const y2 = cy + Math.sin(baseAng) * (sunR + len);
          p.line(x1, y1, x2, y2);
        }

        for (let i = 0; i < RAY_COUNT; i++) {
          const baseAng = ((i + 0.5) / RAY_COUNT) * p.TWO_PI;
          const n = p.noise(i * 0.5 + 100, t * 1.4);
          const pulse = 0.25 + n * 0.55;
          const len = maxLen * pulse;
          const c2 = p.color(strokeColor); c2.setAlpha(70 * (0.4 + n * 0.6));
          p.stroke(c2);
          p.strokeWeight(0.5);
          const x1 = cx + Math.cos(baseAng) * sunR * 1.05;
          const y1 = cy + Math.sin(baseAng) * sunR * 1.05;
          const x2 = cx + Math.cos(baseAng) * (sunR + len);
          const y2 = cy + Math.sin(baseAng) * (sunR + len);
          p.line(x1, y1, x2, y2);
        }
      };
    };

    const inst = new p5(sketch, hostRef.current);

    const observer = new MutationObserver(() => {
      const s = getComputedStyle(document.documentElement);
      const next = s.getPropertyValue("--sun-amber").trim();
      if (inst && next) inst.strokeColor = next;
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "data-palette"] });

    return () => {
      observer.disconnect();
      inst.remove();
    };
  }, []);

  return <div ref={hostRef} className="w-full h-full pointer-events-none" />;
}
