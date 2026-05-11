export default function StripePlaceholder({ label, meta, style = {}, className = "" }) {
  return (
    <div className={`stripe-placeholder ${className}`} style={style}>
      <div className="stripe-placeholder__label">{label}</div>
      {meta && <div className="gallery-item__meta">{meta}</div>}
    </div>
  );
}
