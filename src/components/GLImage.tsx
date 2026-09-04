import { useEffect, useRef, type CSSProperties } from "react";
import { useApp } from "@/context/AppProvider";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  ratio?: number;
  className?: string;
  style?: CSSProperties;
  /** Carrega imediatamente (imagens acima da dobra). */
  priority?: boolean;
};

export function GLImage({ src, alt, width, height, ratio, className = "", style, priority }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scene, ready } = useApp();

  useEffect(() => {
    const el = ref.current;
    if (!el || !ready || !scene) return;
    scene.register(el, src, width, height);
    return () => scene.unregister(el);
  }, [scene, ready, src, width, height]);

  return (
    <div
      ref={ref}
      className={`gl-image ${className}`}
      style={{ aspectRatio: ratio ? `${ratio}` : `${width} / ${height}`, ...style }}
      data-gl
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
      />
    </div>
  );
}
