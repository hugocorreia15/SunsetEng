export default function SectionHead({ num, title, meta }) {
  return (
    <div className="reveal grid grid-cols-[auto_1fr] gap-8 items-end mb-16 pb-8 border-b border-[color:var(--line-strong)]">
      <div>
        <div className="font-mono text-[0.9rem] tracking-[0.25em] opacity-50">{num}</div>
        <h2 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.88]">{title}</h2>
      </div>
      <div className="justify-self-end text-right font-mono text-[0.75rem] tracking-[0.15em] opacity-60 max-w-[260px]">
        {meta}
      </div>
    </div>
  );
}
