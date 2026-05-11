export default function Shield({ name, className = "nucleo-badge__shield" }) {
  return (
    <svg viewBox="0 0 40 48" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 2 L36 8 L36 24 C36 36 28 44 20 46 C12 44 4 36 4 24 L4 8 Z" />
      <text x="20" y="26" textAnchor="middle" fontFamily="var(--ff-mono)" fontSize="7" fill="currentColor" stroke="none" letterSpacing="0.5">{name}</text>
    </svg>
  );
}
