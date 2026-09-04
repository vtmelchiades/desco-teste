import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { GLScene, supportsWebGL } from "@/lib/webgl";

gsap.registerPlugin(ScrollTrigger);

type AppState = {
  scene: GLScene | null;
  webgl: boolean;
  lenis: Lenis | null;
  ready: boolean;
};

const AppContext = createContext<AppState>({ scene: null, webgl: false, lenis: null, ready: false });
export const useApp = () => useContext(AppContext);

export function AppProvider({ children }: { children: ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<AppState>({ scene: null, webgl: false, lenis: null, ready: false });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      smoothWheel: !reduced,
      syncTouch: false,
    });

    let scene: GLScene | null = null;
    let webgl = false;
    if (canvasRef.current && supportsWebGL()) {
      try {
        scene = new GLScene(canvasRef.current);
        webgl = true;
        document.documentElement.classList.add("webgl");
      } catch (err) {
        console.warn("[Desco] WebGL indisponível, usando fallback CSS.", err);
        scene = null;
        webgl = false;
      }
    }
    if (!webgl) document.documentElement.classList.add("no-webgl");

    lenis.on("scroll", (e: { scroll: number; velocity: number }) => {
      scene?.setScroll(e.scroll, e.velocity);
      ScrollTrigger.update();
    });

    const tick = (time: number) => {
      lenis.raf(time * 1000);
      scene?.render(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    if ("fonts" in document) document.fonts.ready.then(() => ScrollTrigger.refresh());
    window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });

    const canvas = canvasRef.current;
    const onLost = (e: Event) => {
      e.preventDefault();
      document.documentElement.classList.remove("webgl");
      document.documentElement.classList.add("no-webgl");
      if (scene) {
        gsap.ticker.remove(tick);
        gsap.ticker.add((t) => lenis.raf(t * 1000));
      }
    };
    canvas?.addEventListener("webglcontextlost", onLost);

    setState({ scene, webgl, lenis, ready: true });

    return () => {
      gsap.ticker.remove(tick);
      canvas?.removeEventListener("webglcontextlost", onLost);
      lenis.destroy();
      scene?.dispose();
    };
  }, []);

  return (
    <AppContext.Provider value={state}>
      <canvas ref={canvasRef} className="gl-canvas" aria-hidden="true" />
      {children}
    </AppContext.Provider>
  );
}
