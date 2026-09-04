import { useState } from "react";
import { ytThumb } from "@/lib/wix";

type Props = {
  youtubeId: string;
  poster?: string;
  title: string;
  caption?: string;
  ratio?: number;
  className?: string;
};

/** Player YouTube com poster próprio — o iframe só carrega no clique. */
export function VideoEmbed({ youtubeId, poster, title, caption, ratio = 16 / 9, className = "" }: Props) {
  const [playing, setPlaying] = useState(false);
  const src = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

  return (
    <div className={`video ${className}`} style={{ aspectRatio: `${ratio}` }}>
      {playing ? (
        <iframe
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className="video-poster tap-scale"
          onClick={() => setPlaying(true)}
          aria-label={`Assistir: ${title}`}
          data-cursor="play"
        >
          <img src={poster || ytThumb(youtubeId)} alt="" loading="lazy" decoding="async" />
          <span className="video-play" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M5 3l16 9-16 9V3z" />
            </svg>
          </span>
          {caption && <span className="video-caption label">{caption}</span>}
        </button>
      )}
    </div>
  );
}
