"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, X } from "lucide-react";
import { useAudio } from "@/context/AudioContext";
import { formatTime, parseDuration, scrollToId } from "@/lib/utils";
import { TrackCover } from "./TrackCover";

/** Docks at the bottom of the viewport while a track plays and the demos section is off-screen. */
export function GlobalPlayerBar() {
  const { currentTrack, isPlaying, currentTime, duration, pause, resume, seek, stop, setActiveCategory } = useAudio();
  const [demosVisible, setDemosVisible] = useState(true);

  useEffect(() => {
    const el = document.getElementById("demos");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setDemosVisible(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const show = Boolean(currentTrack) && !demosVisible;
  const total = duration || (currentTrack ? parseDuration(currentTrack.duration) : 0);
  const pct = total ? Math.min(100, (currentTime / total) * 100) : 0;

  return (
    <AnimatePresence>
      {show && currentTrack && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 mx-auto max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-obsidian/95 text-white shadow-2xl backdrop-blur-md"
          role="region"
          aria-label="Now playing"
        >
          <div className="flex items-center gap-3 p-3 sm:gap-4">
            <button
              onClick={() => {
                setActiveCategory(currentTrack.category);
                scrollToId("demos");
              }}
              className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg"
              aria-label="Go to demos"
            >
              <TrackCover track={currentTrack} sizes="48px" />
            </button>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{currentTrack.title}</p>
              <p className="truncate text-xs capitalize text-gray-400">{currentTrack.category}</p>
            </div>

            <span className="hidden font-mono text-xs text-gray-400 sm:block">
              {formatTime(currentTime)} / {formatTime(total)}
            </span>

            <button
              onClick={() => (isPlaying ? pause() : resume())}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-crimson transition hover:scale-105"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
            </button>
            <button onClick={stop} aria-label="Close player" className="rounded-full p-2 text-gray-400 transition hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            className="h-1.5 w-full cursor-pointer bg-white/10"
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              seek(((e.clientX - r.left) / r.width) * total);
            }}
            role="progressbar"
            aria-valuenow={Math.round(pct)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="h-full bg-crimson transition-[width] duration-200" style={{ width: `${pct}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
