export default function Marquee() {
  const items = "SUNSET 26 · 3ª EDIÇÃO · 13 MAIO · AVEIRO · UNIDOS PELO PÔR-DO-SOL · ENGENHARIAS UA · ".repeat(3);
  return (
    <div
      className="overflow-hidden py-4 border-y border-[color:var(--line-strong)] bg-[color:var(--fg)] text-[color:var(--bg)]"
      data-screen-label="Marquee"
    >
      <div className="marquee__track">
        <span>{items}</span>
        <span>{items}</span>
      </div>
    </div>
  );
}
