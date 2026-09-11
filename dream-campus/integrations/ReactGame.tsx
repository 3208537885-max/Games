'use client';

import { useEffect, useRef } from 'react';

export type RunEnd = {
  won: boolean;
  score: number;
  inspiration: number;
  seed: string;
  seconds: number;
};

type Props = {
  /** Adapt this URL to the existing host's basePath; do not replace host routing. */
  src?: string;
  onRunEnd?: (result: RunEnd) => void;
  height?: string;
};

type GameWindow = Window & {
  DREAM_CAMPUS_CONFIG?: { parentOrigin?: string | null };
};

/** Optional wrapper; the static game does NOT require React or Next.js. */
export default function ReactGame({
  src = '/games/dream-campus/index.html',
  onRunEnd,
  height = 'calc(100dvh - 72px)',
}: Props) {
  const frame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const allowedOrigin = new URL(src, window.location.href).origin;
    const receive = (event: MessageEvent) => {
      if (event.source !== frame.current?.contentWindow || event.origin !== allowedOrigin) return;
      const data = event.data;
      if (data?.game !== 'dream-campus' || data.event !== 'run:end') return;
      const r = data.payload;
      if (!r || typeof r.won !== 'boolean' || !Number.isFinite(r.score)
        || !Number.isFinite(r.inspiration) || !Number.isFinite(r.seconds)
        || typeof r.seed !== 'string') return;
      onRunEnd?.(r as RunEnd); // UI feedback only; this is NOT a verified server score.
    };
    window.addEventListener('message', receive);
    return () => window.removeEventListener('message', receive);
  }, [src, onRunEnd]);

  const connect = () => {
    try {
      const child = frame.current?.contentWindow as GameWindow | null;
      // Same-origin static hosting: enable only this host as the recipient.
      // For a cross-origin game, set parentOrigin in the game's config.js instead.
      if (child?.DREAM_CAMPUS_CONFIG && window.location.origin !== 'null') {
        child.DREAM_CAMPUS_CONFIG.parentOrigin = window.location.origin;
      }
    } catch {
      // Cross-origin embedding still plays; it simply needs explicit event setup.
    }
  };

  return (
    <iframe
      ref={frame}
      src={src}
      onLoad={connect}
      title="水课梦魇 · 校园梦境冒险"
      allow="autoplay"
      referrerPolicy="same-origin"
      style={{ display: 'block', width: '100%', height, minHeight: 420, border: 0 }}
    />
  );
}
