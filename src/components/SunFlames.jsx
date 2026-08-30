import { useEffect, useRef } from "react";

const RAY_COUNT = 36;
const FALLBACK_COLOR = "#ffb020";

const readRayColor = () =>
  getComputedStyle(document.documentElement).getPropertyValue("--sun-amber").trim() || FALLBACK_COLOR;

export default function SunFlames() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    let instance = null;
    let observer = null;
    let onResize = null;

    /* p5 is ~950 KB and drives nothing but this decorative sketch, so it is
       loaded as its own chunk once the page has already rendered. */
    import("p5").then(({ default: p5 }) => {
      if (cancelled) return;

      /* Held in an object the sketch closes over, so a theme or palette change
         actually reaches the running draw loop. */
      const rayColor = { value: readRayColor() };

      const sketch = (p) => {
        let w = 0, h = 0, cx = 0, cy = 0, sunR = 0, outerR = 0;

        const measure = () => {
          const rect = host.getBoundingClientRect();
          w = rect.width; h = rect.height;
          cx = w / 2; cy = h / 2;
          sunR = Math.min(w, h) * 0.30;
          outerR = Math.min(w, h) * 0.5;
        };

        p.setup = () => {
          measure();
          const c = p.createCanvas(w, h);
          c.elt.style.width = "100%";
          c.elt.style.height = "100%";
          p.pixelDensity(Math.min(window.devicePixelRatio || 1, 2));
        };

        onResize = () => {
          measure();
          p.resizeCanvas(w, h);
        };
        window.addEventListener("resize", onResize, { passive: true });

        p.draw = () => {
          p.clear();
          const t = p.frameCount * 0.012;
          const maxLen = outerR - sunR;
          const col = p.color(rayColor.value);
          p.strokeCap(p.SQUARE);

          for (let i = 0; i < RAY_COUNT; i++) {
            const baseAng = (i / RAY_COUNT) * p.TWO_PI;
            const n = p.noise(i * 0.37, t);
            const len = maxLen * (0.45 + n * 0.75);

            col.setAlpha((i % 2 === 0 ? 210 : 130) * (0.55 + n * 0.45));
            p.stroke(col);
            p.strokeWeight(i % 2 === 0 ? 1.6 : 0.9);
            p.line(
              cx + Math.cos(baseAng) * sunR,
              cy + Math.sin(baseAng) * sunR,
              cx + Math.cos(baseAng) * (sunR + len),
              cy + Math.sin(baseAng) * (sunR + len),
            );
          }

          for (let i = 0; i < RAY_COUNT; i++) {
            const baseAng = ((i + 0.5) / RAY_COUNT) * p.TWO_PI;
            const n = p.noise(i * 0.5 + 100, t * 1.4);
            const len = maxLen * (0.25 + n * 0.55);

            col.setAlpha(70 * (0.4 + n * 0.6));
            p.stroke(col);
            p.strokeWeight(0.5);
            p.line(
              cx + Math.cos(baseAng) * sunR * 1.05,
              cy + Math.sin(baseAng) * sunR * 1.05,
              cx + Math.cos(baseAng) * (sunR + len),
              cy + Math.sin(baseAng) * (sunR + len),
            );
          }
        };
      };

      instance = new p5(sketch, host);

      observer = new MutationObserver(() => { rayColor.value = readRayColor(); });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme", "data-palette"],
      });
    });

    return () => {
      cancelled = true;
      if (observer) observer.disconnect();
      if (onResize) window.removeEventListener("resize", onResize);
      if (instance) instance.remove();
    };
  }, []);

  return <div ref={hostRef} className="w-full h-full pointer-events-none" />;
}
