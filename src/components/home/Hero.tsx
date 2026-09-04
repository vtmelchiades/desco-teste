import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";
import { GLImage } from "@/components/GLImage";
import { wixFill, wixRaw } from "@/lib/wix";
import { DESCO_LOGO } from "@/data/site";
import { useScrollToHash } from "@/components/Nav";

const HERO_IMAGE = "30f9f1_bcd23c46d12e4fd9b79de86e66dd24cb~mv2.jpg";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const scrollToHash = useScrollToHash();

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden"
      data-reveal-group
      data-reveal-delay="0.1"
    >
      {/*
        Imagem de abertura alinhada ao grid: a borda direita coincide com o gutter
        do container (antes ficava colada na borda da viewport, fora do grid).
      */}
      <div className="absolute inset-x-0 top-[12vh] md:top-[9vh] container pointer-events-none flex justify-end">
        <div className="w-full md:w-[58.333%]">
          <GLImage
            src={wixFill(HERO_IMAGE, 1600, 900)}
            alt="E.C. Noroeste — campanha Paixão pelo que somos, por Desco"
            width={1600}
            height={900}
            ratio={16 / 9}
            className="opacity-90"
            priority
          />
        </div>
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.55) 45%, rgba(8,8,8,0.15) 100%), linear-gradient(0deg, rgba(8,8,8,1) 0%, rgba(8,8,8,0) 40%)",
        }}
      />

      <div className="container relative pt-32 md:pt-40 pb-8 md:pb-10 w-full">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8 md:mb-12">
          <span className="reveal label label-accent">Manifesto / 01</span>
          <span className="reveal label">Laboratório de estratégia, design e ruptura visual</span>
          <span className="reveal label hidden md:inline">Est. 2015 — Interior de São Paulo</span>
        </div>

        <h1 className="display t-hero max-w-[14ch]">
          <span className="line-mask">
            <span>Marcas não</span>
          </span>
          <span className="line-mask">
            <span>precisam de</span>
          </span>
          <span className="line-mask">
            <span>mais barulho.</span>
          </span>
          <span className="line-mask">
            <span>
              Precisam de um <em>ponto de vista.</em>
            </span>
          </span>
        </h1>

        <div className="mt-10 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-end">
          <p className="reveal t-lead md:col-span-6 lg:col-span-5 max-w-[34ch]" style={{ color: "var(--fg)" }}>
            A Desco trata estratégia como argumento, design como evidência e a campanha como o instante em que os dois se
            tornam inevitáveis.
          </p>
          <p className="reveal t-body md:col-span-3 lg:col-span-3 max-w-[36ch]">
            Dez anos operando a partir de Bauru para marcas que decidiram parecer com o que são — e não com o que o mercado
            espera.
          </p>
          <div className="reveal md:col-span-3 lg:col-span-4 flex md:justify-end">
            <a
              href="/#cases"
              onClick={(e) => {
                e.preventDefault();
                scrollToHash("#cases");
              }}
              className="btn-line tap-scale"
              data-cursor="hover"
              data-magnetic
            >
              <span className="dot" />
              Ver os casos
            </a>
          </div>
        </div>

        <div
          className="reveal mt-12 md:mt-16 pt-5 flex items-center justify-between border-t"
          style={{ borderColor: "var(--line)" }}
        >
          <div className="flex items-center gap-4">
            <img
              src={wixRaw(DESCO_LOGO)}
              alt="Desco — 10 anos"
              className="h-5 md:h-6 w-auto"
              style={{ filter: "invert(1)", opacity: 0.85 }}
              loading="eager"
            />
            <span className="label hidden sm:inline">Dez anos de operação contínua</span>
          </div>
          <div className="label flex items-center gap-6">
            <span className="hidden md:inline">22°19'S 49°04'W</span>
            <span className="flex items-center gap-2">
              Rolar
              <svg width="10" height="14" viewBox="0 0 10 14" fill="none" aria-hidden="true">
                <path d="M5 0v12M1 8l4 4 4-4" stroke="#d4ff00" strokeWidth="1" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
