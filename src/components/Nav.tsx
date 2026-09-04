import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useApp } from "@/context/AppProvider";

const LINKS = [
  { hash: "#cases", label: "Casos" },
  { hash: "#disciplinas", label: "Disciplinas" },
  { hash: "#filosofia", label: "Filosofia" },
  { hash: "#contato", label: "Contato" },
];

export function useScrollToHash() {
  const { lenis } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  return (hash: string) => {
    const go = () => {
      const el = document.querySelector(hash);
      if (!el) return;
      if (lenis) lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
      else (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
    };
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: hash } });
    } else {
      go();
    }
  };
}

export function Nav() {
  const ref = useRef<HTMLElement>(null);
  const [time, setTime] = useState("");
  const [open, setOpen] = useState(false);
  const scrollToHash = useScrollToHash();
  const location = useLocation();
  const { lenis } = useApp();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "America/Sao_Paulo",
      }).format(new Date());
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current.querySelectorAll(".nav-item"),
      { y: -18, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.07, ease: "power3.out", delay: 0.2 },
    );
  }, []);

  // trava o scroll quando o menu mobile está aberto
  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open, lenis]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleHash = (e: React.MouseEvent, hash: string) => {
    e.preventDefault();
    setOpen(false);
    // pequeno atraso para o menu fechar antes de rolar
    setTimeout(() => scrollToHash(hash), open ? 350 : 0);
  };

  const handleHome = (e: React.MouseEvent) => {
    if (!isHome) return; // deixa o Link navegar normalmente
    e.preventDefault();
    setOpen(false);
    if (lenis) lenis.scrollTo(0, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav ref={ref} className="nav container" aria-label="Navegação principal">
        <div className="flex items-center justify-between py-5 md:py-6">
          <Link
            to="/"
            onClick={handleHome}
            className="nav-item display text-2xl md:text-3xl leading-none tracking-tight"
            data-cursor="hover"
            data-magnetic
            style={{ opacity: 0 }}
          >
            Desco<span style={{ color: "#d4ff00" }}>.</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {!isHome && (
              <Link to="/" className="nav-item label u-link" style={{ opacity: 0, color: "#fff" }} data-cursor="hover">
                Início
              </Link>
            )}
            {LINKS.map((l) => (
              <a
                key={l.hash}
                href={`/${l.hash}`}
                onClick={(e) => handleHash(e, l.hash)}
                className={`nav-item label u-link ${!isHome && l.hash === "#cases" ? "is-active" : ""}`}
                style={{ opacity: 0, color: "#fff" }}
                data-cursor="hover"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="nav-item label flex items-center gap-3" style={{ opacity: 0, color: "#fff" }}>
            <span className="hidden sm:inline">Bauru/SP</span>
            <span className="tabular-nums hidden sm:inline">{time}</span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full" style={{ background: "#d4ff00" }} />
            <button
              type="button"
              className={`nav-burger md:hidden ${open ? "is-open" : ""}`}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Menu mobile */}
      <div className={`mobile-menu md:hidden ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div>
          {!isHome && (
            <Link to="/" className="big" onClick={() => setOpen(false)}>
              <small>00</small>Início
            </Link>
          )}
          {LINKS.map((l, i) => (
            <a key={l.hash} href={`/${l.hash}`} className="big" onClick={(e) => handleHash(e, l.hash)}>
              <small>0{i + 1}</small>
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-end justify-between">
          <div>
            <span className="label block">Bauru/SP · {time}</span>
            <a href="mailto:contato@agenciadesco.com" className="label block mt-2" style={{ color: "var(--accent)" }}>
              contato@agenciadesco.com
            </a>
          </div>
          <span className="label">22°19'S 49°04'W</span>
        </div>
      </div>
    </>
  );
}
