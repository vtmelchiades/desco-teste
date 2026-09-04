import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hero } from "@/components/home/Hero";
import { Cases } from "@/components/home/Cases";
import { Disciplines, Logos, Philosophy } from "@/components/home/Sections";
import { Contact } from "@/components/Contact";
import { useApp } from "@/context/AppProvider";

export default function Home() {
  const location = useLocation();
  const { lenis, ready } = useApp();

  useEffect(() => {
    document.title = "Desco — Laboratório de Estratégia, Design e Ruptura Visual";
  }, []);

  // Voltando de uma página de case com pedido de rolagem até uma seção (#cases etc.)
  useEffect(() => {
    if (!ready) return;
    const state = location.state as { scrollTo?: string } | null;
    const hash = state?.scrollTo || (location.hash && location.hash.length > 1 ? location.hash : null);
    if (!hash) return;
    const t = setTimeout(() => {
      ScrollTrigger.refresh();
      const el = document.querySelector(hash) as HTMLElement | null;
      if (!el) return;
      if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.4, easing: (x) => 1 - Math.pow(1 - x, 4) });
      else el.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState({}, "");
    }, 250);
    return () => clearTimeout(t);
  }, [location, lenis, ready]);

  return (
    <main className="site">
      <Hero />
      <Cases />
      <Logos />
      <Disciplines />
      <Philosophy />
      <Contact />
    </main>
  );
}
