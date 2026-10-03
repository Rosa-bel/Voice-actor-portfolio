"use client";

import { motion } from "framer-motion";
import { Languages, Pause, Play } from "lucide-react";
import clsx from "clsx";
import { useAudio } from "@/context/AudioContext";
import { formatTime, parseDuration } from "@/lib/utils";
import { AudioLanguage, AudioTrack } from "@/types";
import { TrackCover } from "./TrackCover";
import { WaveformScrubber } from "./WaveformScrubber";

const LANGUAGE_LABELS: Record<AudioLanguage, { code: string; name: string }> = {
  ar: { code: "AR", name: "Arabic" },
  en: { code: "EN", name: "English" },
  fr: { code: "FR", name: "French" },
  kab: { code: "KAB", name: "Kabyle" },
};

export function AudioTrackItem({ track }: { track: AudioTrack }) {
  const { currentTrack, isPlaying, currentTime, duration, togglePlay, seek } = useAudio();
  const available = Boolean(track.audioUrl);
  const isCurrent = currentTrack?.id === track.id;
  const isThisPlaying = isCurrent && isPlaying;
  const total = isCurrent && duration ? duration : parseDuration(track.duration);
  const progress = isCurrent && total ? currentTime / total : 0;

  return (
    <motion.li
      layout="position"
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
        exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
      }}
      className={clsx(
        "flex flex-col gap-3 rounded-xl border p-3 transition-colors sm:p-4 lg:flex-row lg:items-center lg:gap-6",
        isCurrent ? "border-burgundy/15 bg-[#FDF7F9]" : "border-transparent hover:bg-gray-50/80",
      )}
    >
      <div className="flex items-center gap-4 lg:w-[42%]">
        <button
          onClick={() => togglePlay(track)}
          disabled={!available}
          aria-label={isThisPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
          className="group relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl shadow-sm sm:h-20 sm:w-20"
        >
          <TrackCover track={track} />
          <span
            className={clsx(
              "absolute inset-0 flex items-center justify-center bg-black/35 text-white transition-opacity",
              isThisPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100",
              !available && "hidden",
            )}
          >
            {isThisPlaying ? <Pause className="h-6 w-6" /> : <Play className="ml-0.5 h-6 w-6" />}
          </span>
        </button>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-gray-900 sm:text-lg">{track.title}</h3>
          <p className="truncate text-xs font-medium text-gray-500 sm:text-sm">{track.clientOrProject}</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {!available && (
              <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
                Coming soon
              </span>
            )}
            {track.language && (
              <span
                title={LANGUAGE_LABELS[track.language].name}
                aria-label={`Language: ${LANGUAGE_LABELS[track.language].name}`}
                className="inline-flex items-center gap-1 rounded-md bg-burgundy/10 px-2 py-0.5 text-[11px] font-semibold text-burgundy"
              >
                <Languages className="h-3 w-3" aria-hidden />
                {LANGUAGE_LABELS[track.language].code}
              </span>
            )}
            {track.tags.map((t) => (
              <span key={t} className="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] text-gray-600">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center gap-2 sm:gap-3">
        <button
          onClick={() => togglePlay(track)}
          disabled={!available}
          aria-label={isThisPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
          className={clsx(
            "focus-ring relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full transition-all",
            !available && "cursor-not-allowed bg-gray-100 text-gray-400",
            available && (isThisPlaying
              ? "scale-105 bg-burgundy text-white shadow-md shadow-burgundy/30"
              : "bg-gray-100 text-gray-800 hover:scale-105 hover:bg-burgundy hover:text-white"),
          )}
        >
          {isThisPlaying && <span className="absolute inset-0 animate-pulseRing rounded-full bg-burgundy/40" aria-hidden />}
          {isThisPlaying ? <Pause className="relative h-5 w-5" /> : <Play className="relative ml-0.5 h-5 w-5" />}
        </button>

        <div className="min-w-0 flex-1">
          <WaveformScrubber
            seed={track.id}
            progress={progress}
            enabled={available && isCurrent}
            playing={isThisPlaying}
            onSeek={(r) => seek(r * total)}
            label={`Seek ${track.title}`}
          />
        </div>

        <span className="w-[4.75rem] flex-shrink-0 text-right font-mono text-[11px] text-gray-400 sm:w-[5.5rem] sm:text-xs">
          {formatTime(isCurrent ? currentTime : 0)} / {isCurrent && duration ? formatTime(duration) : track.duration}
        </span>
      </div>
    </motion.li>
  );
}
