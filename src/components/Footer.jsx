import { NUCLEOS } from "../content.js";

const colHead = "font-display text-[0.95rem] tracking-[0.1em] uppercase mb-4 opacity-60";
const colList = "flex flex-col gap-2 font-mono text-[0.85rem] tracking-[0.05em]";
const colLink = "opacity-80 hover:opacity-100 transition-opacity";

export default function Footer({ t, lang }) {
  return (
    <footer className="pt-24 pb-12 mt-24 bg-[color:var(--fg)] text-[color:var(--bg)]" data-screen-label="Footer">
      <div className="container-x">
        <div className="font-mono text-[0.8rem] tracking-[0.25em] uppercase opacity-70 mb-4">
          {t.footer.tagline}
        </div>
        <div className="footer__big">SUNSET 26</div>

        <div className="mb-16">
          <div className={colHead}>{lang === "pt" ? "Núcleos" : "Student bodies"}</div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(110px,1fr))] gap-4">
            {NUCLEOS.map((n) => (
              <div key={n} className="aspect-square flex items-center justify-center p-4 transition-colors hover:bg-[rgba(255,238,221,0.08)]">
                <img src={`/nucleos/${n}-07.png`} alt={n} className="max-h-full max-w-full object-contain" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div>
            <h4 className={colHead}>{t.footer.org}</h4>
            <div className="font-display text-[1.2rem] uppercase tracking-[0.03em] leading-[1.2]">
              Engenharias<br/>Universidade de Aveiro
            </div>
            <div className="font-mono text-[0.75rem] opacity-60 mt-2 tracking-[0.1em]">
              {lang === "pt" ? "10 núcleos · 30 organizadores" : "10 bodies · 30 organizers"}
            </div>
          </div>
          <div>
            <h4 className={colHead}>{t.footer.contact}</h4>
            <ul className={colList}>
              <li><a className={colLink} href="mailto:nei@aauav.pt">nei@aauav.pt</a></li>
              <li><a className={colLink} href="tel:+351911141824">+351 911 141 824</a></li>
            </ul>
          </div>
          <div>
            <h4 className={colHead}>{t.footer.social}</h4>
            <ul className={colList}>
              <li><a className={colLink} href="#">Instagram →</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-[rgba(255,238,221,0.15)] flex flex-wrap gap-4 justify-between items-center font-mono text-[0.7rem] tracking-[0.15em] uppercase opacity-60">
          <div>{t.footer.copy}</div>
          <div className="flex flex-wrap gap-4 items-center">
            <span>{t.footer.privacy}</span>
            <span className="opacity-50">·</span>
            <a className={colLink} href="https://github.com/hugocorreia15" target="_blank" rel="noreferrer">
              {lang === "pt" ? "Feito por" : "Made by"} @hugocorreia15 →
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
