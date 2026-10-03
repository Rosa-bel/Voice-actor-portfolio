"use client";

import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { useAudio } from "@/context/AudioContext";
import { AudioCategory, AudioTrack } from "@/types";
import { AudioTrackItem } from "./AudioTrackItem";

const CATEGORIES: { key: AudioCategory; label: string; short?: string }[] = [
  { key: "commercial", label: "Commercial" },
  { key: "narration", label: "Narration" },
  { key: "dubbing", label: "Dubbing & Character", short: "Dubbing" },
];

export function AudioWindow({ tracks }: { tracks: AudioTrack[] }) {
  const { activeCategory, setActiveCategory } = useAudio();
  const filtered = tracks.filter((t) => t.category === activeCategory);

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = CATEGORIES[(i + (e.key === "ArrowRight" ? 1 : -1) + CATEGORIES.length) % CATEGORIES.length];
    setActiveCategory(next.key);
    document.getElementById(`tab-${next.key}`)?.focus();
  };

  return (
    <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-xl shadow-gray-900/5">
      <div className="flex items-center justify-center gap-4 border-b border-gray-200 bg-[#FAF9FB] px-3 py-3 sm:px-6 sm:py-4">
        <div role="tablist" aria-label="Demo categories" className="flex w-full max-w-full rounded-xl bg-gray-100/80 p-1 sm:w-auto">
          {CATEGORIES.map((c, i) => {
            const active = activeCategory === c.key;
            const count = tracks.filter((t) => t.category === c.key).length;
            return (
              <button
                key={c.key}
                id={`tab-${c.key}`}
                role="tab"
                aria-selected={active}
                aria-controls="demo-panel"
                tabIndex={active ? 0 : -1}
                onClick={() => setActiveCategory(c.key)}
                onKeyDown={(e) => onTabKey(e, i)}
                className={clsx(
                  "focus-ring relative flex-1 whitespace-nowrap rounded-lg px-2 py-2 text-xs sm:flex-none font-medium transition-colors sm:px-4 sm:text-sm",
                  active ? "text-white" : "text-gray-500 hover:text-gray-900",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-lg bg-burgundy shadow-sm"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative">
                  {c.short ? (<><span className="sm:hidden">{c.short}</span><span className="hidden sm:inline">{c.label}</span></>) : c.label}{" "}
                  <span className="text-xs opacity-60">({count})</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div id="demo-panel" role="tabpanel" aria-labelledby={`tab-${activeCategory}`} className="p-2 sm:p-5">
        <AnimatePresence mode="wait">
          <motion.ul
            key={activeCategory}
            initial="hidden"
            animate="show"
            exit="exit"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } }, exit: {} }}
            className="space-y-2"
          >
            {filtered.length ? (
              filtered.map((t) => <AudioTrackItem key={t.id} track={t} />)
            ) : (
              <li className="p-8 text-center text-sm text-gray-500">Demos coming soon.</li>
            )}
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  );
}
