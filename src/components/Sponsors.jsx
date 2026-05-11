import SponsorCarousel from "./SponsorCarousel.jsx";
import MainSponsor from "./MainSponsor.jsx";
import SectionHead from "./SectionHead.jsx";

export default function Sponsors({ t, lang, onContact }) {
  const mainTier = t.sponsors.tiers.find((x) => x.kind === "main");
  const otherTiers = t.sponsors.tiers.filter((x) => x.kind !== "main");

  return (
    <section className="py-24 relative" id="sponsors" data-screen-label="Sponsors">
      <div className="container-x">
        <SectionHead num={t.sponsors.num} title={t.sponsors.title} meta={t.sponsors.meta} />

        {mainTier && (
          <div className="reveal mb-12">
            <MainSponsor tier={mainTier} soon={t.sponsors.soon} lang={lang} />
          </div>
        )}

        <div className="reveal flex flex-col gap-6 mb-14">
          {otherTiers.map((tier, i) => (
            <SponsorCarousel key={i} tier={tier} soon={t.sponsors.soon} />
          ))}
        </div>

        <div className="reveal grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-8 p-10 max-md:p-7 border border-[color:var(--line-strong)] bg-[color:var(--fg)] text-[color:var(--bg)]">
          <div>
            <h3 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] leading-none mb-3">{t.sponsors.cta_title}</h3>
            <p className="font-mono text-[0.85rem] tracking-[0.1em] opacity-70 max-w-[520px]">{t.sponsors.cta_body}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <a href="mailto:nei@aauav.pt" className="btn btn-accent">{t.sponsors.cta_button} →</a>
            <a
              href="https://wa.me/351911141824"
              target="_blank"
              rel="noreferrer"
              className="btn border border-[color:var(--bg)] text-[color:var(--bg)] hover:bg-[color:var(--bg)] hover:text-[color:var(--fg)] transition-colors inline-flex items-center justify-center gap-2"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M20.52 3.48A11.93 11.93 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.84c0 2.09.55 4.13 1.6 5.93L0 24l6.4-1.68a11.85 11.85 0 0 0 5.64 1.44h.01c6.54 0 11.84-5.3 11.84-11.84 0-3.16-1.23-6.13-3.37-8.44ZM12.05 21.6h-.01a9.74 9.74 0 0 1-4.97-1.36l-.36-.21-3.8 1 1.02-3.7-.23-.38a9.7 9.7 0 0 1-1.5-5.16c0-5.39 4.39-9.78 9.84-9.78 2.63 0 5.1 1.02 6.96 2.88a9.7 9.7 0 0 1 2.88 6.92c0 5.4-4.39 9.79-9.83 9.79Zm5.4-7.32c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.15-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.18-.24-.58-.49-.5-.66-.51l-.56-.01c-.2 0-.51.07-.78.37-.27.3-1.02 1-1.02 2.44 0 1.44 1.05 2.83 1.2 3.03.15.2 2.07 3.17 5.02 4.45.7.3 1.25.48 1.68.61.7.22 1.34.19 1.85.12.56-.08 1.75-.71 2-1.4.25-.69.25-1.27.17-1.4-.07-.13-.27-.2-.57-.35Z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
