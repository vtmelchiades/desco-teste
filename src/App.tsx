import { useEffect, useLayoutEffect } from "react";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AppProvider, useApp } from "@/context/AppProvider";
import { Cursor } from "@/components/Cursor";
import { Nav } from "@/components/Nav";
import Home from "@/pages/Home";
import CasePage from "@/pages/CasePage";

/** A cada troca de rota: volta ao topo instantaneamente e recalcula os triggers. */
function RouteManager() {
  const { pathname } = useLocation();
  const { lenis } = useApp();

  useLayoutEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, [pathname, lenis]);

  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}

/** Remonta a página quando o slug muda (reinicia animações e texturas). */
function CaseRoute() {
  const { slug = "" } = useParams();
  return <CasePage key={slug} />;
}

export default function App() {
  return (
    <AppProvider>
      <RouteManager />
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cases/:slug" element={<CaseRoute />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </AppProvider>
  );
}
