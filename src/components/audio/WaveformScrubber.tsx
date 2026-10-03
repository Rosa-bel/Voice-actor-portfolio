"use client";

import { useMemo, useRef } from "react";
import clsx from "clsx";

const BARS = 56;

/** Deterministic pseudo-random bar heights from a string seed. */
function heights(seed: string): number[] {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  const out: number[] = [];
  for (let i = 0; i < BARS; i++) {
    h = Math.imul(h ^ (h >>> 15), 2246822507) + i;
    const r = ((h >>> 0) % 1000) / 1000;
    const envelope = 0.55 + 0.45 * Math.sin((i / BARS) * Math.PI);
    out.push(Math.max(0.18, Math.min(1, (0.25 + r * 0.75) * envelope + 0.1)));
  }
  return out;
}

interface Props {
  seed: string;
  progress: number; // 0..1
  enabled: boolean;
  playing: boolean;
  onSeek: (ratio: number) => void;
  label: string;
}

export function WaveformScrubber({ seed, progress, enabled, playing, onSeek, label }: Props) {
  const bars = useMemo(() => heights(seed), [seed]);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const seekFromEvent = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    onSeek(Math.min(1, Math.max(0, (clientX - r.left) / r.width)));
  };

  return (
    <div
      ref={ref}
      role="slider"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      aria-disabled={!enabled}
      tabIndex={enabled ? 0 : -1}
      onPointerDown={(e) => {
        if (!enabled) return;
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        seekFromEvent(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && seekFromEvent(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onKeyDown={(e) => {
        if (!enabled) return;
        if (e.key === "ArrowRight") onSeek(Math.min(1, progress + 0.05));
        if (e.key === "ArrowLeft") onSeek(Math.max(0, progress - 0.05));
      }}
      className={clsx(
        "focus-ring flex h-10 w-full touch-none select-none items-center gap-[2px] rounded",
        enabled ? "cursor-pointer" : "cursor-not-allowed opacity-50",
      )}
    >
      {bars.map((b, i) => {
        const played = enabled && i / BARS < progress;
        return (
          <span
            key={i}
            className={clsx(
              "flex-1 rounded-full transition-colors duration-150",
              played ? "bg-crimson" : "bg-gray-300 hover:bg-gray-400",
              playing && played && i / BARS > progress - 0.06 && "animate-eq origin-center",
            )}
            style={{ height: `${b * 100}%`, animationDelay: `${(i % 6) * 0.08}s` }}
          />
        );
      })}
    </div>
  );
}
