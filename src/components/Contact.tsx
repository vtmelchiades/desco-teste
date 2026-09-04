import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";
import { useApp } from "@/context/AppProvider";
import { CONTACT, DESCO_LOGO } from "@/data/site";
import { wixRaw } from "@/lib/wix";

export function Contact({ compact = false }: { compact?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const { lenis } = useApp();
  const year = new Date().getFullYear();

  const toTop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (lenis) lenis.scrollTo(0, { duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="contato" ref={ref} className={`relative ${compact ? "pt-20 md:pt-32" : "pt-24 md:pt-40"} pb-8 overflow-hidden`}>
      <div className="container">
        <div data-reveal-group>
          <span className="reveal label label-accent block mb-5">Contato direto / 05</span>
          <h2 className="display t-hero">
            <span className="line-mask">
              <span>Vamos discordar</span>
            </span>
            <span className="line-mask">
              <span>
                <em>em público.</em>
              </span>
            </span>
          </h2>

          <div className="mt-10 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6">
            <div className="md:col-span-6">
              <p className="reveal t-lead max-w-[30ch]">
                Sem formulário. Sem funil. Escreva o que está travando a marca — respondemos com uma pergunta melhor.
              </p>
              <a
                href={`mailto:${CONTACT.email}?subject=Desco%20%7C%20Tenho%20um%20problema%20de%20marca`}
                className="reveal display block mt-8 break-all u-link"
                style={{ fontSize: "clamp(1.4rem, 3.4vw, 3.4rem)", lineHeight: 1.05, color: "var(--accent)" }}
                data-cursor="hover"
              >
                {CONTACT.email}
              </a>
              <div className="reveal mt-10 flex flex-wrap gap-4">
                <a href={`mailto:${CONTACT.email}`} className="btn-line tap-scale" data-cursor="hover" data-magnetic>
                  <span className="dot" />
                  Abrir conversa
                </a>
                <a
                  href={`mailto:${CONTACT.talents}?subject=DescoWork%20%7C%20Cadastro`}
                  className="btn-line tap-scale"
                  data-cursor="hover"
                  data-magnetic
                >
                  <span className="dot" />
                  Trabalhar aqui
                </a>
              </div>
            </div>

            <div className="md:col-span-3 md:col-start-8">
              <span className="reveal label block mb-4">Endereço</span>
              <p className="reveal t-body" style={{ color: "var(--fg)" }}>
                {CONTACT.address}
                <br />
                {CONTACT.district}
              </p>
              <p className="reveal label mt-3">{CONTACT.coords}</p>
              <span className="reveal label block mt-8 mb-4">Horário</span>
              <p className="reveal t-body" style={{ color: "var(--fg)" }}>
                Seg – Sex, 9h às 18h
                <br />
                <span style={{ color: "var(--fg-dim)" }}>GMT-3 · Brasília</span>
              </p>
            </div>

            <div className="md:col-span-2">
              <span className="reveal label block mb-4">Canais</span>
              <ul className="space-y-2">
                {[
                  { l: "Instagram", h: CONTACT.instagram },
                  { l: "LinkedIn", h: CONTACT.linkedin },
                  { l: "TikTok", h: CONTACT.tiktok },
                  { l: "Site atual", h: CONTACT.site },
                ].map((c) => (
                  <li key={c.l} className="reveal">
                    <a
                      href={c.h}
                      target="_blank"
                      rel="noreferrer"
                      className="u-link t-body"
                      style={{ color: "var(--fg)" }}
                      data-cursor="hover"
                    >
                      {c.l} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <footer className="mt-24 md:mt-36 pt-6 border-t" style={{ borderColor: "var(--line)" }} data-reveal-group>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="reveal flex items-center gap-4">
              <img
                src={wixRaw(DESCO_LOGO)}
                alt="Desco — 10 anos"
                className="h-5 w-auto"
                style={{ filter: "invert(1)", opacity: 0.85 }}
                loading="lazy"
              />
            </div>
            <span className="reveal label">© {year} Agência Desco · Bauru, SP</span>
            <span className="reveal label">
              WebGL · GLSL · Aberração cromática vetorial<span className="hidden sm:inline"> · 60fps</span>
            </span>
            <a href="#top" onClick={toTop} className="reveal label u-link" data-cursor="hover">
              Voltar ao topo ↑
            </a>
          </div>
          <div className="mt-10 overflow-hidden select-none" aria-hidden="true">
            <div
              className="display outline whitespace-nowrap leading-none"
              style={{ fontSize: "clamp(5rem, 22vw, 26rem)", marginBottom: "-0.12em" }}
            >
              Desco
              <span style={{ WebkitTextStroke: "0", color: "var(--accent)" }}>.</span>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
