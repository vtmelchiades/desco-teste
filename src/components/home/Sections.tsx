import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";
import { GLImage } from "@/components/GLImage";
import { wixFill } from "@/lib/wix";
import { DISCIPLINES, FRONTS, LOGO_IDS, PHILOSOPHY_IMAGES, PRINCIPLES } from "@/data/site";

/* ---------------- Logos ---------------- */
function Track({ ids, dur, reverse }: { ids: string[]; dur: string; reverse?: boolean }) {
  return (
    <div className="marquee border-t" style={{ borderColor: "var(--line)" }}>
      {[0, 1].map((k) => (
        <div
          key={k}
          className="marquee-track"
          style={{ ["--dur" as string]: dur, animationDirection: reverse ? "reverse" : "normal" }}
          aria-hidden={k === 1}
        >
          {ids.map((id) => (
            <div key={id + k} className="logo-tile">
              <img src={wixFill(id, 260, 260, 80)} alt="" loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function Logos() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const half = Math.ceil(LOGO_IDS.length / 2);
  const a = LOGO_IDS.slice(0, half);
  const b = LOGO_IDS.slice(half);

  return (
    <section ref={ref} className="relative py-16 md:py-24" data-reveal-group>
      <div className="container flex flex-wrap items-end justify-between gap-6 mb-10">
        <div>
          <span className="reveal label label-accent block mb-3">Quem já assinou embaixo</span>
          <h3 className="reveal display" style={{ fontSize: "clamp(1.8rem, 3.6vw, 3.6rem)", lineHeight: 1 }}>
            {LOGO_IDS.length} marcas que aceitaram a <em>hipótese.</em>
          </h3>
        </div>
        <p className="reveal t-body max-w-[36ch]">
          Tintas, alimentos, energia, futebol, educação e imobiliário. Setores diferentes, o mesmo critério: coragem para
          parecer com o que são.
        </p>
      </div>
      <div className="reveal">
        <Track ids={a} dur="46s" />
        <Track ids={b} dur="58s" reverse />
        <div className="hr" />
      </div>
    </section>
  );
}

/* ---------------- Disciplinas ---------------- */
export function Disciplines() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section id="disciplinas" ref={ref} className="relative pt-24 md:pt-40 pb-20 md:pb-32">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-14 md:mb-20" data-reveal-group>
          <div className="md:col-span-7">
            <span className="reveal label label-accent block mb-5">Disciplinas / 03</span>
            <h2 className="display t-section">
              <span className="line-mask">
                <span>Seis frentes.</span>
              </span>
              <span className="line-mask">
                <span>
                  Uma <em>tese</em> por vez.
                </span>
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-14">
            <p className="reveal t-lead max-w-[30ch]">
              Não vendemos pacotes. Montamos a equipe que o problema exige e desmontamos quando ele acaba.
            </p>
            <p className="reveal t-body mt-5 max-w-[40ch]">
              Cada disciplina abaixo pode ser contratada isoladamente. Nenhuma funciona de verdade sem a primeira.
            </p>
          </div>
        </div>

        <div data-reveal-group>
          {DISCIPLINES.map((d) => (
            <div key={d.n} className="disc-row reveal" data-cursor="hover">
              <span className="label tabular-nums" style={{ color: "var(--accent)" }}>
                {d.n}
              </span>
              <h3 className="disc-name">{d.name}</h3>
              <p className="t-body max-w-[46ch]">{d.line}</p>
              <span className="label md:text-right">{d.meta}</span>
            </div>
          ))}
        </div>

        <div className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "var(--line)" }} data-reveal-group>
          {FRONTS.map((f) => (
            <a
              key={f.t}
              href={f.href}
              target={f.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="reveal block p-7 md:p-9 tap-scale group"
              style={{ background: "var(--bg)" }}
              data-cursor="hover"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="label">Frente</span>
                <span className="w-2 h-2 rounded-full transition-transform duration-500 group-hover:scale-[2.2]" style={{ background: "var(--accent)" }} />
              </div>
              <div className="display" style={{ fontSize: "clamp(1.9rem, 3.4vw, 3rem)", lineHeight: 1 }}>
                {f.t}
              </div>
              <p className="t-body mt-4 max-w-[34ch]">{f.d}</p>
              <span className="label u-link mt-8 inline-block" style={{ color: "var(--fg)" }}>
                {f.cta} ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Filosofia ---------------- */
export function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const { wide, square } = PHILOSOPHY_IMAGES;

  return (
    <section id="filosofia" ref={ref} className="relative pt-24 md:pt-40 pb-20 md:pb-32 overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="sticky-aside" data-reveal-group>
              <span className="reveal label label-accent block mb-5">Filosofia operacional / 04</span>
              <h2 className="display t-section">
                <span className="line-mask">
                  <span>Como a gente</span>
                </span>
                <span className="line-mask">
                  <span>
                    <em>decide.</em>
                  </span>
                </span>
              </h2>
              <p className="reveal t-lead mt-8 max-w-[28ch]">Quatro regras que valem mais que qualquer processo desenhado em slide.</p>
              <div className="reveal mt-10 grid grid-cols-3 gap-4 pt-6 border-t" style={{ borderColor: "var(--line)" }}>
                {[
                  { n: "10", l: "anos" },
                  { n: "25+", l: "marcas" },
                  { n: "01", l: "endereço" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="display" style={{ fontSize: "clamp(2rem, 4vw, 3.6rem)", lineHeight: 1 }}>
                      {s.n}
                    </div>
                    <div className="label mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="reveal mt-10 hidden lg:block w-[70%]">
                <GLImage
                  src={wixFill(square.id, square.w, square.h)}
                  alt="Tintas Maestria × São Paulo Futebol Clube — Desco"
                  width={square.w}
                  height={square.h}
                  ratio={1}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pt-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-reveal-group>
              {PRINCIPLES.map((p) => (
                <div key={p.k} className="principle reveal" data-cursor="hover">
                  <div className="flex items-center justify-between mb-10">
                    <span className="display italic" style={{ fontSize: "1.6rem", color: "var(--accent)" }}>
                      {p.k}
                    </span>
                    <span className="label">Regra</span>
                  </div>
                  <h3 className="display" style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.3rem)", lineHeight: 1.02 }}>
                    {p.title}
                  </h3>
                  <p className="t-body mt-4">{p.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 md:mt-24" data-reveal-group>
              <div className="reveal">
                <GLImage
                  src={wixFill(wide.id, wide.w, wide.h)}
                  alt="Tintas Maestria — Confut Sudamericana, ativação por Desco"
                  width={wide.w}
                  height={wide.h}
                  ratio={16 / 9}
                />
              </div>
              <div className="flex items-start justify-between mt-4 gap-6">
                <span className="reveal label">Tintas Maestria — Confut Sudamericana, 2024</span>
                <span className="reveal label label-accent whitespace-nowrap">Fig. 04</span>
              </div>
              <blockquote className="reveal t-lead mt-12 max-w-[36ch]">
                “A pior campanha é a que ninguém odeia. Se todo mundo concorda, você não disse nada.”
              </blockquote>
              <span className="reveal label mt-4 block">— Nota interna, DescoLabs</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
