import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Anima todos os grupos [data-reveal-group] dentro do container:
 * - .line-mask > span sobem
 * - .reveal aparecem com fade + translateY
 */
export function useReveal(ref: RefObject<HTMLElement | null>, enabled = true) {
  useEffect(() => {
    const root = ref.current;
    if (!root || !enabled) return;

    const ctx = gsap.context(() => {
      const groups = root.matches("[data-reveal-group]")
        ? [root]
        : Array.from(root.querySelectorAll<HTMLElement>("[data-reveal-group]"));

      groups.forEach((group) => {
        const lines = group.querySelectorAll(".line-mask > span");
        const items = group.querySelectorAll(".reveal");
        const delay = parseFloat(group.dataset.revealDelay || "0");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: group, start: "top 88%", once: true },
          delay,
        });
        if (lines.length) {
          tl.fromTo(lines, { yPercent: 115 }, { yPercent: 0, duration: 1.25, ease: "power4.out", stagger: 0.09 });
        }
        if (items.length) {
          tl.to(
            items,
            { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", stagger: 0.08 },
            lines.length ? "-=0.9" : 0,
          );
        }
      });
    }, root);

    return () => ctx.revert();
  }, [ref, enabled]);
}
