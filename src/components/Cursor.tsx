import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [fine, setFine] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setFine(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setFine(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!fine) return;
    const el = ref.current;
    if (!el) return;
    document.documentElement.classList.add("has-cursor");

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let magnetic: HTMLElement | null = null;
    const toX = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const toY = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      pos.x = e.clientX;
      pos.y = e.clientY;
      const target = e.target as HTMLElement | null;
      const cursorEl = target?.closest<HTMLElement>("[data-cursor]");
      const magEl = target?.closest<HTMLElement>("[data-magnetic]");

      if (cursorEl) {
        const kind = cursorEl.dataset.cursor || "";
        el.classList.add("is-hover");
        el.classList.toggle("is-view", kind === "view");
        el.classList.toggle("is-play", kind === "play");
        setLabel(kind === "view" ? "Ver" : kind === "play" ? "Play" : "");
      } else {
        el.classList.remove("is-hover", "is-view", "is-play");
        setLabel("");
      }

      if (magEl !== magnetic) {
        if (magnetic) gsap.to(magnetic, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
        magnetic = magEl ?? null;
      }
      if (magnetic) {
        const r = magnetic.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = (e.clientX - cx) * 0.28;
        const dy = (e.clientY - cy) * 0.28;
        gsap.to(magnetic, { x: dx, y: dy, duration: 0.4, ease: "power3.out" });
        pos.x = cx + dx * 0.6;
        pos.y = cy + dy * 0.6;
      }
      toX(pos.x);
      toY(pos.y);
    };
    const hide = () => gsap.to(el, { opacity: 0, duration: 0.3 });
    const show = () => gsap.to(el, { opacity: 1, duration: 0.3 });
    const down = () => gsap.to(el, { scale: 0.85, duration: 0.2 });
    const up = () => gsap.to(el, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [fine]);

  if (!fine) return null;
  return (
    <div ref={ref} className="cursor" aria-hidden="true">
      <div className="cursor-dot" />
      <div className="cursor-ring">
        <span>{label}</span>
      </div>
    </div>
  );
}
