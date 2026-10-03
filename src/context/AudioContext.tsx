"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AudioCategory, AudioTrack } from "@/types";

interface AudioContextType {
  currentTrack: AudioTrack | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  togglePlay: (track: AudioTrack) => void;
  pause: () => void;
  resume: () => void;
  seek: (seconds: number) => void;
  stop: () => void;
  /** Category currently shown in the demos window (shared with the header). */
  activeCategory: AudioCategory;
  setActiveCategory: (c: AudioCategory) => void;
}

const Ctx = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeCategory, setActiveCategory] = useState<AudioCategory>("commercial");

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";
    audioRef.current = audio;
    audio.onloadedmetadata = () => setDuration(audio.duration);
    audio.ontimeupdate = () => setCurrentTime(audio.currentTime);
    audio.onplay = () => setIsPlaying(true);
    audio.onpause = () => setIsPlaying(false);
    audio.onerror = () => setIsPlaying(false);
    audio.onended = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const play = useCallback((track: AudioTrack) => {
    const audio = audioRef.current;
    if (!audio || !track.audioUrl) return;
    if (currentTrack?.id !== track.id) {
      audio.src = track.audioUrl;
      setCurrentTrack(track);
      setCurrentTime(0);
      setDuration(0);
    }
    audio.play().catch(() => setIsPlaying(false));
  }, [currentTrack?.id]);

  const pause = useCallback(() => audioRef.current?.pause(), []);
  const resume = useCallback(() => {
    audioRef.current?.play().catch(() => setIsPlaying(false));
  }, []);

  const togglePlay = useCallback(
    (track: AudioTrack) => {
      if (currentTrack?.id === track.id && isPlaying) pause();
      else play(track);
    },
    [currentTrack?.id, isPlaying, pause, play],
  );

  const seek = useCallback((time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    }
    setCurrentTrack(null);
    setCurrentTime(0);
    setDuration(0);
  }, []);

  const value = useMemo(
    () => ({ currentTrack, isPlaying, currentTime, duration, togglePlay, pause, resume, seek, stop, activeCategory, setActiveCategory }),
    [currentTrack, isPlaying, currentTime, duration, togglePlay, pause, resume, seek, stop, activeCategory],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useAudio = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAudio must be used within an AudioProvider");
  return c;
};
