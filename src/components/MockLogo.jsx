export default function MockLogo({ n, tier }) {
  const seed = (n * 37 + tier.charCodeAt(0)) % 8;
  const names = ["Volta", "Aveiro Tech", "Nimbus", "Gravitas", "Orbita", "Catalyst", "Vertex", "Solara", "Prisma", "Haven", "Lumen", "Forge", "Kairos", "Meridian"];
  const suffixes = ["", " Co.", " Studios", " Labs", " Group", "", " ", ""];
  const name = names[(n + seed) % names.length];
  const suffix = suffixes[seed];
  const palette = [
    ["#e8357d", "#ffb020"],
    ["#2563eb", "#5ec3d8"],
    ["#1a1a1a", "#ff5a47"],
    ["#6b3a1a", "#ffd23f"],
    ["#8b2ec8", "#b07bff"],
    ["#0d6e4a", "#3be58a"],
    ["#c21e3a", "#ff6a1a"],
    ["#333", "#888"],
  ];
  const [c1, c2] = palette[seed];
  const shapes = ["circle", "square", "triangle", "hex", "dot", "bar", "arc"];
  const shape = shapes[seed % shapes.length];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--ff-display)", textTransform: "uppercase", color: c1, letterSpacing: "0.02em" }}>
      <svg width="32" height="32" viewBox="0 0 32 32" style={{ flexShrink: 0 }}>
        {shape === "circle" && <circle cx="16" cy="16" r="12" fill={c1} />}
        {shape === "circle" && <circle cx="16" cy="16" r="5" fill={c2} />}
        {shape === "square" && <rect x="4" y="4" width="24" height="24" fill={c1} />}
        {shape === "square" && <rect x="11" y="11" width="10" height="10" fill={c2} />}
        {shape === "triangle" && <polygon points="16,4 28,26 4,26" fill={c1} />}
        {shape === "triangle" && <polygon points="16,14 22,24 10,24" fill={c2} />}
        {shape === "hex" && <polygon points="16,3 27,10 27,22 16,29 5,22 5,10" fill={c1} />}
        {shape === "dot" && (<>
          <circle cx="8" cy="16" r="4" fill={c1} />
          <circle cx="16" cy="16" r="4" fill={c2} />
          <circle cx="24" cy="16" r="4" fill={c1} />
        </>)}
        {shape === "bar" && (<>
          <rect x="4" y="8" width="24" height="4" fill={c1} />
          <rect x="4" y="20" width="16" height="4" fill={c2} />
        </>)}
        {shape === "arc" && <path d="M 4 16 A 12 12 0 0 1 28 16" stroke={c1} strokeWidth="4" fill="none" />}
        {shape === "arc" && <circle cx="16" cy="20" r="4" fill={c2} />}
      </svg>
      <span style={{ fontSize: tier === "main" ? "1.6rem" : "1.1rem", lineHeight: 1 }}>
        {name}<span style={{ opacity: 0.6 }}>{suffix}</span>
      </span>
    </div>
  );
}
