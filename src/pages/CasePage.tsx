import { useEffect, useRef } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useReveal } from "@/hooks/useReveal";
import { GLImage } from "@/components/GLImage";
import { VideoEmbed } from "@/components/VideoEmbed";
import { Contact } from "@/components/Contact";
import { fitTexture, wixFill, wixFit } from "@/lib/wix";
import { getAdjacentCases, getCaseBySlug, SITE_CASES_URL, type CaseItem, type MediaItem } from "@/data/cases";

function spanClass(span?: MediaItem["span"]) {
  switch (span) {
    case "half":
      return "md:col-span-6";
    case "third":
      return "md:col-span-4";
    default:
      return "md:col-span-12";
  }
}

function Media({ item, label }: { item: MediaItem; label: string }) {
  if (item.type === "video") {
    return (
      <VideoEmbed
        youtubeId={item.youtubeId}
        poster={item.poster ? wixFill(item.poster, 1280, 720) : undefined}
        title={item.title}
        caption={item.title}
      />
    );
  }
  const tex = fitTexture(item.w, item.h, item.span === "full" ? 1800 : 1200);
  return (
    <GLImage
      src={wixFit(item.id, tex.w, tex.h)}
      alt={item.alt || label}
      width={tex.w}
      height={tex.h}
      ratio={item.w / item.h}
    />
  );
}

function MediaGrid({ items, label }: { items: MediaItem[]; label: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
      {items.map((m, i) => (
        <div key={i} className={`reveal ${spanClass(m.span)}`}>
          <Media item={m} label={`${label} — ${i + 1}`} />
        </div>
      ))}
    </div>
  );
}

function NextCase({ item, dir }: { item: CaseItem; dir: "prev" | "next" }) {
  return (
    <Link to={`/cases/${item.slug}`} className="next-case tap-scale" data-cursor="view">
      <span className="label block mb-4">{dir === "next" ? "Próximo case →" : "← Case anterior"}</span>
      <div className="flex items-start gap-5">
        <div className="hidden sm:block" style={{ width: "clamp(96px, 12vw, 180px)", flexShrink: 0 }}>
          <GLImage
            src={wixFill(item.id, item.texW, item.texH)}
            alt={`${item.client} — ${item.title}`}
            width={item.texW}
            height={item.texH}
            ratio={item.ratio}
          />
        </div>
        <div className="min-w-0">
          <div className="display" style={{ fontSize: "clamp(1.7rem, 3.4vw, 3.4rem)", lineHeight: 1 }}>
            {item.title}
          </div>
          <div className="label mt-3" style={{ color: "var(--fg)" }}>
            {item.client} <span style={{ color: "var(--fg-dim)" }}>· {item.year}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function CasePage() {
  const { slug = "" } = useParams();
  const item = getCaseBySlug(slug);
  const ref = useRef<HTMLElement>(null);
  useReveal(ref, !!item);

  useEffect(() => {
    if (item) document.title = `${item.client} — ${item.title} · Desco`;
  }, [item]);

  if (!item || !item.detail) return <Navigate to="/" replace />;
  const d = item.detail;
  const { prev, next } = getAdjacentCases(slug);
  const heroTex = fitTexture(item.texW, item.texH, 1800);
  const titleWords = item.title.split(" ");
  const lastWord = titleWords.pop();

  return (
    <main className="site">
      <article ref={ref}>
        {/* ---------- Cabeçalho ---------- */}
        <header className="container pt-32 md:pt-44 pb-10 md:pb-14" data-reveal-group data-reveal-delay="0.1">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8 md:mb-12">
            <Link to="/" state={{ scrollTo: "#cases" }} className="reveal label u-link" data-cursor="hover">
              ← Todos os casos
            </Link>
            <span className="reveal label label-accent">Case / {item.index}</span>
            <span className="reveal label hidden md:inline">{item.client}</span>
          </div>

          <h1 className="display t-case-title max-w-[12ch]">
            {titleWords.length > 0 && (
              <span className="line-mask">
                <span>{titleWords.join(" ")}</span>
              </span>
            )}
            <span className="line-mask">
              <span>
                <em>{lastWord}</em>
              </span>
            </span>
          </h1>

          <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-end">
            <p className="reveal t-lead md:col-span-7 lg:col-span-6 max-w-[36ch]" style={{ color: "var(--fg)" }}>
              {d.lead}
            </p>
            <div className="reveal md:col-span-5 lg:col-span-6 flex md:justify-end">
              <span className="case-num" style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}>
                {item.index}
              </span>
            </div>
          </div>

          <div className="reveal case-meta mt-10 md:mt-14">
            <div>
              <span className="label block mb-2">Cliente</span>
              <span className="t-body" style={{ color: "var(--fg)" }}>
                {item.client}
              </span>
            </div>
            <div>
              <span className="label block mb-2">Disciplina</span>
              <span className="t-body" style={{ color: "var(--fg)" }}>
                {item.discipline}
              </span>
            </div>
            <div>
              <span className="label block mb-2">Ano</span>
              <span className="t-body tabular-nums" style={{ color: "var(--fg)" }}>
                {item.year}
              </span>
            </div>
            <div>
              <span className="label block mb-2">Frentes</span>
              <span className="t-body" style={{ color: "var(--fg)" }}>
                {item.tags.join(" · ")}
              </span>
            </div>
          </div>
        </header>

        {/* ---------- Imagem de abertura ---------- */}
        <div className="container" data-reveal-group>
          <div className="reveal">
            <GLImage
              src={wixFill(item.id, heroTex.w, heroTex.h)}
              alt={`${item.client} — ${item.title}`}
              width={heroTex.w}
              height={heroTex.h}
              ratio={item.ratio}
              priority
            />
          </div>
        </div>

        {/* ---------- Texto + entregas ---------- */}
        <section className="container pt-16 md:pt-28 pb-16 md:pb-24" data-reveal-group>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
            <div className="lg:col-span-4">
              <div className="sticky-aside">
                <span className="reveal label label-accent block mb-5">O projeto</span>
                {item.statement && (
                  <p className="reveal t-lead max-w-[26ch]" style={{ color: "var(--fg)" }}>
                    {item.statement}
                  </p>
                )}
                <div className="reveal mt-10 pt-6 border-t" style={{ borderColor: "var(--line)" }}>
                  <span className="label block mb-4">Entregas</span>
                  <ul className="flex flex-wrap gap-2">
                    {d.deliverables.map((t) => (
                      <li key={t} className="label px-2 py-1 border rounded-full" style={{ borderColor: "var(--line)", fontSize: "0.6rem" }}>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 lg:col-start-6 case-body">
              {d.body.map((p, i) => (
                <p key={i} className="reveal t-body-lg max-w-[62ch]">
                  {p}
                </p>
              ))}
              {d.externalLink && (
                <a
                  href={d.externalLink.href}
                  target="_blank"
                  rel="noreferrer"
                  className="reveal btn-line tap-scale mt-10"
                  data-cursor="hover"
                  data-magnetic
                >
                  <span className="dot" />
                  {d.externalLink.label}
                </a>
              )}
            </div>
          </div>
        </section>

        {/* ---------- Mídia principal ---------- */}
        {d.featured && (
          <section className="container pb-16 md:pb-24" data-reveal-group>
            <div className="flex items-end justify-between mb-5 gap-6">
              <span className="reveal label label-accent">{d.featured.type === "video" ? "Filme principal" : "Peça principal"}</span>
              <span className="reveal label hidden sm:inline">Fig. 01</span>
            </div>
            <div className="reveal">
              <Media item={d.featured} label={`${item.client} — ${item.title}`} />
            </div>
          </section>
        )}

        {/* ---------- Seções adicionais ---------- */}
        {d.sections?.map((s, i) => (
          <section key={i} className="container pb-16 md:pb-28" data-reveal-group>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end mb-8 md:mb-10 pt-8 border-t" style={{ borderColor: "var(--line)" }}>
              <div className="md:col-span-7">
                <span className="reveal label label-accent block mb-3">
                  Seção / {String(i + 2).padStart(2, "0")}
                </span>
                {s.heading && (
                  <h2 className="reveal display" style={{ fontSize: "clamp(1.9rem, 4.2vw, 4.2rem)", lineHeight: 1 }}>
                    {s.heading}
                  </h2>
                )}
              </div>
              <div className="md:col-span-5 md:pb-1">
                {s.paragraphs.map((p, j) => (
                  <p key={j} className={`reveal t-body max-w-[46ch] ${j > 0 ? "mt-3" : ""}`}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
            {s.media && <MediaGrid items={s.media} label={`${item.client} — ${s.heading || item.title}`} />}
          </section>
        ))}

        {/* ---------- Navegação entre cases ---------- */}
        <section className="container pt-8 pb-8" data-reveal-group>
          <div className="flex items-end justify-between mb-10 gap-6">
            <span className="reveal label label-accent">Continuar</span>
            <a href={SITE_CASES_URL} target="_blank" rel="noreferrer" className="reveal label u-link" data-cursor="hover">
              Índice completo ↗
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8">
            <div className="reveal">
              <NextCase item={prev} dir="prev" />
            </div>
            <div className="reveal">
              <NextCase item={next} dir="next" />
            </div>
          </div>
        </section>
      </article>

      <Contact compact />
    </main>
  );
}
