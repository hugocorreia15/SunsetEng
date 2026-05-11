export const TWEAK_DEFAULTS = {
  palette: "sunset",
  heroVariant: "default",
  teamVariant: "cards",
  sponsorVariant: "list",
  typeScale: 1,
  bgIntensity: 1,
};

const tweakRow = "mb-5";
const tweakLabel = "block font-mono text-[0.7rem] tracking-[0.15em] uppercase opacity-70 mb-2";
const optBtnBase = "px-3 py-2 font-mono text-[0.65rem] tracking-[0.15em] uppercase border border-[color:var(--line-strong)] transition-colors";
const optBtnActive = "bg-[color:var(--fg)] text-[color:var(--bg)]";
const optBtnIdle = "hover:bg-[color:var(--fg)] hover:text-[color:var(--bg)]";

export default function TweaksPanel({ open, state, setState }) {
  if (!open) return null;

  const setKey = (key, value) => {
    setState({ ...state, [key]: value });
  };

  return (
    <div className="tweaks-panel fixed bottom-6 right-6 z-[200] w-80 max-w-[calc(100vw-3rem)] p-6 bg-[color:var(--bg)] text-[color:var(--fg)] border border-[color:var(--line-strong)]">
      <h4 className="font-display text-[1.2rem] uppercase tracking-[0.05em] mb-5">Tweaks</h4>

      <div className={tweakRow}>
        <label className={tweakLabel}>Color palette</label>
        <div className="flex gap-2">
          {[
            { id: "sunset", colors: ["#e8357d", "#ff5a47", "#ffb020"] },
            { id: "dusk", colors: ["#7a3cff", "#ff4d8f", "#ffa94d"] },
            { id: "ember", colors: ["#c21e3a", "#ff4820", "#ffc233"] },
            { id: "lagoon", colors: ["#ff5577", "#ff9a44", "#34d1bf"] },
          ].map(p => (
            <button key={p.id}
              className={`w-10 h-10 rounded-full cursor-pointer border-2 transition-transform hover:scale-110 ${state.palette === p.id ? "border-[color:var(--fg)] scale-110" : "border-[color:var(--line-strong)]"}`}
              style={{ background: `linear-gradient(135deg, ${p.colors.join(", ")})` }}
              onClick={() => setKey("palette", p.id)}
              title={p.id} />
          ))}
        </div>
      </div>

      <div className={tweakRow}>
        <label className={tweakLabel}>Hero layout</label>
        <div className="flex gap-2 flex-wrap">
          {["default", "center", "split"].map(v => (
            <button key={v} className={`${optBtnBase} ${state.heroVariant === v ? optBtnActive : optBtnIdle}`} onClick={() => setKey("heroVariant", v)}>{v}</button>
          ))}
        </div>
      </div>

      <div className={tweakRow}>
        <label className={tweakLabel}>Team layout</label>
        <div className="flex gap-2 flex-wrap">
          {["cards", "list", "dense"].map(v => (
            <button key={v} className={`${optBtnBase} ${state.teamVariant === v ? optBtnActive : optBtnIdle}`} onClick={() => setKey("teamVariant", v)}>{v}</button>
          ))}
        </div>
      </div>

      <div className={tweakRow}>
        <label className={tweakLabel}>Sponsor style</label>
        <div className="flex gap-2 flex-wrap">
          {["list", "cards", "minimal"].map(v => (
            <button key={v} className={`${optBtnBase} ${state.sponsorVariant === v ? optBtnActive : optBtnIdle}`} onClick={() => setKey("sponsorVariant", v)}>{v}</button>
          ))}
        </div>
      </div>

      <div className={tweakRow}>
        <label className={tweakLabel}>Type scale · {state.typeScale}×</label>
        <input type="range" min="0.85" max="1.2" step="0.05" value={state.typeScale} className="w-full"
          onChange={(e) => setKey("typeScale", parseFloat(e.target.value))} />
      </div>

      <div className={tweakRow}>
        <label className={tweakLabel}>Background intensity · {Math.round(state.bgIntensity * 100)}%</label>
        <input type="range" min="0.4" max="1.4" step="0.1" value={state.bgIntensity} className="w-full"
          onChange={(e) => setKey("bgIntensity", parseFloat(e.target.value))} />
      </div>
    </div>
  );
}
