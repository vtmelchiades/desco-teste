import { useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useReveal } from "@/hooks/useReveal";
import { GLImage } from "@/components/GLImage";
import { wixFill } from "@/lib/wix";
import { ARCHIVE_CASES, FEATURED_CASES, SITE_CASES_URL, caseHref, type CaseItem } from "@/data/cases";

/** Link interno (página do case) ou externo (índice do site atual). */
function CaseLink({
  item,
  className,
  children,
  ariaLabel,
  cursor = "view",
}: {
  item: CaseItem;
  className: string;
  children: ReactNode;
  ariaLabel?: string;
  cursor?: string;
}) {
  const href = caseHref(item);
  if (href.startsWith("/")) {
    return (
      <Link to={href} className={className} data-cursor={cursor} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className} data-cursor={cursor} aria-label={ariaLabel}>
      {children}
    </a>
  );
}

function CaseCard({ item, variant }: { item: CaseItem; variant: "wide" | "narrow" | "offset" }) {
  const span =
    variant === "wide" ? "md:col-span-8" : variant === "narrow" ? "md:col-span-4 md:mt-24" : "md:col-span-6 md:col-start-4";
  const hasPage = !!item.slug && !!item.detail;

  return (
    <article className={`case-card ${span}`} data-reveal-group>
      <CaseLink item={item} className="block tap-scale" ariaLabel={`${item.client} — ${item.title}`}>
        <div className="reveal">
          <GLImage
            src={wixFill(item.id, item.texW, item.texH)}
            alt={`${item.client} — ${item.title}`}
            width={item.texW}
            height={item.texH}
            ratio={item.ratio}
          />
        </div>
        <div className="mt-4 md:mt-5 grid grid-cols-[auto_1fr_auto] gap-x-4 items-baseline">
          <span className="reveal case-num">{item.index}</span>
          <div>
            <h3 className="reveal display t-case leading-[0.95]">{item.title}</h3>
            <div className="reveal mt-2 flex flex-wrap gap-x-4 gap-y-1">
              <span className="label" style={{ color: "var(--fg)" }}>
                {item.client}
              </span>
              <span className="label">{item.discipline}</span>
            </div>
          </div>
          <span className="reveal label tabular-nums">{item.year}</span>
        </div>
        {item.statement && <p className="reveal t-body mt-4 max-w-[52ch]">{item.statement}</p>}
        <div className="reveal mt-3 flex gap-2 flex-wrap items-center">
          {item.tags.map((t) => (
            <span
              key={t}
              className="label px-2 py-1 border rounded-full"
              style={{ borderColor: "var(--line)", fontSize: "0.58rem" }}
            >
              {t}
            </span>
          ))}
          <span className="label ml-2" style={{ color: hasPage ? "var(--accent)" : "var(--fg-mute)", fontSize: "0.58rem" }}>
            {hasPage ? "Ver o case →" : "No site atual ↗"}
          </span>
        </div>
      </CaseLink>
    </article>
  );
}

export function Cases() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const variants: Array<"wide" | "narrow" | "offset"> = ["wide", "narrow", "narrow", "wide", "offset", "wide", "narrow", "narrow"];

  return (
    <section id="cases" ref={ref} className="relative pt-24 md:pt-40 pb-16 md:pb-24">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end mb-14 md:mb-24" data-reveal-group>
          <div className="md:col-span-8">
            <span className="reveal label label-accent block mb-5">Casos selecionados / 02</span>
            <h2 className="display t-section">
              <span className="line-mask">
                <span>Trabalho que sobreviveu</span>
              </span>
              <span className="line-mask">
                <span>
                  à <em>reunião seguinte.</em>
                </span>
              </span>
            </h2>
          </div>
          <div className="md:col-span-4 md:pb-3">
            <p className="reveal t-body max-w-[38ch]">
              Nenhum destes projetos começou com um layout. Todos começaram com uma frase que o cliente ainda não sabia que
              precisava dizer. O resto é consequência — e está abaixo.
            </p>
            <p className="reveal label mt-5 hidden md:block">Mova o cursor rápido. Role com força. A imagem reage à sua velocidade.</p>
            <p className="reveal label mt-5 md:hidden">Role com força. A imagem reage à sua velocidade.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-16 md:gap-y-28">
          {FEATURED_CASES.map((c, i) => (
            <CaseCard key={c.id + c.index} item={c} variant={variants[i % variants.length]} />
          ))}
        </div>

        <div className="mt-28 md:mt-40" data-reveal-group>
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="reveal label label-accent block mb-3">Arquivo / 02.1</span>
              <h3 className="reveal display" style={{ fontSize: "clamp(1.8rem, 3.6vw, 3.6rem)", lineHeight: 1 }}>
                Mais {ARCHIVE_CASES.length} entradas. Sem hierarquia.
              </h3>
            </div>
            <a
              href={SITE_CASES_URL}
              target="_blank"
              rel="noreferrer"
              className="reveal label u-link hidden md:inline"
              data-cursor="hover"
            >
              Índice completo ↗
            </a>
          </div>
          <div>
            {ARCHIVE_CASES.map((c) => (
              <CaseLink key={c.id + c.index} item={c} className="archive-row reveal tap-scale">
                <span className="label tabular-nums">{c.index}</span>
                <div className="flex items-center gap-4 min-w-0">
                  <div className="archive-thumb">
                    <GLImage
                      src={wixFill(c.id, c.texW, c.texH)}
                      alt={`${c.client} — ${c.title}`}
                      width={c.texW}
                      height={c.texH}
                      ratio={c.ratio}
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="display truncate" style={{ fontSize: "clamp(1.1rem, 2vw, 1.7rem)", lineHeight: 1.05 }}>
                      {c.title}
                    </div>
                    <div className="label md:hidden mt-1">{c.client}</div>
                  </div>
                </div>
                <span className="label hidden md:block" style={{ color: "var(--fg)" }}>
                  {c.client}
                </span>
                <span className="label hidden md:block">{c.discipline}</span>
                <span className="label tabular-nums">
                  {c.year}
                  {c.slug && c.detail && <span style={{ color: "var(--accent)" }}> →</span>}
                </span>
              </CaseLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
