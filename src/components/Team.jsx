import { useState } from "react";
import SectionHead from "./SectionHead.jsx";
import { NUCLEOS, TEAM_DATA } from "../content.js";

const filterBtn = "font-mono text-[0.7rem] tracking-[0.2em] uppercase px-4 py-2 border border-[color:var(--line-strong)] transition-colors hover:bg-[color:var(--fg)] hover:text-[color:var(--bg)]";
const memberCls = "member p-5 border border-[color:var(--line)] bg-[color:var(--bg)]";
const memberRole = "font-mono text-[0.65rem] tracking-[0.2em] uppercase opacity-60 mb-2";
const memberName = "member__name font-display text-[1.15rem] leading-[1.1] tracking-[0.02em] uppercase mb-2";
const memberNucleo = "font-mono text-[0.7rem] tracking-[0.1em] opacity-70";

export default function Team({ t, lang }) {
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(false);
  const { strategic, operational } = TEAM_DATA;

  const filterMember = (m) => filter === "all" || m[1] === filter;
  const expandLabel = expanded
    ? (lang === "pt" ? "Mostrar menos" : "Show less")
    : (lang === "pt" ? "Ver equipa completa" : "View full team");

  return (
    <section className="pt-12 pb-24 relative" id="team" data-screen-label="Team">
      <div className="container-x">
        <SectionHead num={t.team.num} title={t.team.title} meta={t.team.meta} />

        <div className="reveal flex gap-2 flex-wrap mb-12">
          <button className={`${filterBtn} ${filter === "all" ? "bg-[color:var(--fg)] text-[color:var(--bg)]" : ""}`} onClick={() => setFilter("all")}>
            {t.team.filter_all}
          </button>
          {NUCLEOS.map(n => (
            <button key={n} className={`${filterBtn} ${filter === n ? "bg-[color:var(--fg)] text-[color:var(--bg)]" : ""}`} onClick={() => setFilter(n)}>
              {n}
            </button>
          ))}
        </div>

        <div className={`relative ${expanded ? "" : "max-h-[720px] lg:max-h-[900px] overflow-hidden"}`}>
          <Group title={lang === "pt" ? "Parte Estratégica" : "Strategic"}
                 count={`08 · ${lang === "pt" ? "Coordenação + Financeiro" : "Coordination + Finance"}`}>
            {strategic.map((g, gi) => (
              <div key={gi} className="mb-8">
                <div className="font-mono text-[0.75rem] tracking-[0.2em] opacity-60 mb-4 uppercase">
                  {g.group} · {g.members.filter(filterMember).length}/{g.members.length}
                </div>
                <div className="team__grid grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
                  {g.members.filter(filterMember).map((m, mi) => (
                    <div className={memberCls} key={mi}>
                      <div className={memberRole}>{g.group}</div>
                      <div className={memberName}>{m[0]}</div>
                      <div className={memberNucleo}>{m[1]}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Group>

          <Group title={lang === "pt" ? "Parte Operacional" : "Operational"}
                 count={`30 · ${lang === "pt" ? "Logística · Comunicação · Relações" : "Logistics · Comms · Relations"}`}>
            {operational.map((g, gi) => {
              const visible = g.members.filter(filterMember);
              if (!visible.length) return null;
              return (
                <div key={gi} className="mb-10">
                  <div className="flex justify-between items-baseline mb-4">
                    <div className="font-display text-[1.3rem] uppercase tracking-[0.04em]">{g.group}</div>
                    <div className="font-mono text-[0.7rem] tracking-[0.2em] opacity-50 uppercase">
                      {g.role} · {visible.length}/{g.members.length}
                    </div>
                  </div>
                  <div className="team__grid grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
                    {visible.map((m, mi) => (
                      <div className={memberCls} key={mi}>
                        <div className={memberRole}>{m[2] || (lang === "pt" ? "Membro" : "Member")}</div>
                        <div className={memberName}>{m[0]}</div>
                        <div className={memberNucleo}>{m[1]}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </Group>

          {!expanded && (
            <div
              className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
              style={{ background: "linear-gradient(to bottom, transparent, var(--bg) 85%)" }}
            />
          )}
        </div>

        <div className="flex justify-center mt-6">
          <button
            className={`${filterBtn} ${expanded ? "" : "bg-[color:var(--fg)] text-[color:var(--bg)]"}`}
            onClick={() => setExpanded(v => !v)}
          >
            {expandLabel} {expanded ? "↑" : "↓"}
          </button>
        </div>
      </div>
    </section>
  );
}

function Group({ title, count, children }) {
  return (
    <div className="reveal mb-16">
      <div className="grid grid-cols-[1fr_auto] gap-8 pb-6 border-b border-[color:var(--line-strong)] mb-8 items-baseline">
        <div className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] leading-none">{title}</div>
        <div className="font-mono text-[0.8rem] tracking-[0.2em] opacity-50">{count}</div>
      </div>
      {children}
    </div>
  );
}
