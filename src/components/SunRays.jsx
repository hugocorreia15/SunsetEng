export default function SunRays() {
  const rays = [];
  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * 360;
    rays.push(
      <line
        key={i}
        x1="50" y1="50"
        x2="50" y2="2"
        stroke="currentColor"
        strokeWidth={i % 2 === 0 ? 0.4 : 0.2}
        transform={`rotate(${angle} 50 50)`}
        opacity={i % 2 === 0 ? 0.8 : 0.4}
      />
    );
  }
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "100%", color: "var(--sun-amber)" }}>
      {rays}
    </svg>
  );
}
