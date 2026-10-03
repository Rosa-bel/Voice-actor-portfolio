"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, Mic, Music } from "lucide-react";
import { profile } from "@/data/portfolioData";
import { scrollToId } from "@/lib/utils";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const HEADLINE = ["The", "Voice", "for", "Your"];

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  // Pointer tilt on the portrait
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 120, damping: 18 });

  // Light scroll parallax on the background rings
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const ringsY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={ref} id="about" className="relative overflow-hidden">
      {/* Background: sound rings + soft glow */}
      <motion.div style={{ y: ringsY }} className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute -right-40 top-10 h-[360px] w-[360px] sm:h-[640px] sm:w-[640px] rounded-full bg-gradient-to-br from-rose via-white to-transparent opacity-80 blur-3xl" />
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="absolute right-[8%] top-[22%] rounded-full border border-burgundy/10"
            style={{ width: 220 + i * 150, height: 220 + i * 150, transform: "translate(50%, -50%)" }}
          />
        ))}
      </motion.div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-10 sm:px-6 sm:py-16 md:px-12 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-12 lg:py-20">
        {/* Left */}
        <motion.div variants={container} initial="hidden" animate="show" className="lg:col-span-7">
          <h1 className="font-serif text-4xl leading-[1.1] text-gray-900 sm:text-5xl lg:text-6xl xl:text-7xl">
            {HEADLINE.map((w, i) => (
              <span key={w} className="mr-[0.25em] inline-block overflow-hidden align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.25 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
            <br className="hidden sm:block" />
            <span className="inline-block overflow-hidden align-bottom">
              <motion.span
                className="inline-block pr-2 italic text-burgundy"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                Next Story.
              </motion.span>
            </span>
          </h1>

          <motion.div variants={item} className="mt-7">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-burgundy to-crimson px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-burgundy/25">
                Voice actor
                <motion.span
                  className="inline-block"
                  animate={{ rotate: [0, -12, 12, -8, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 3 }}
                  aria-hidden
                >
                  🎙️
                </motion.span>
              </span>
              <span className="hidden h-6 w-px bg-gradient-to-b from-transparent via-burgundy/40 to-transparent sm:block" aria-hidden />
              <ul className="flex flex-wrap items-center gap-2" aria-label="Languages">
                {["French", "English", "Arabic" , "Kabyle"].map((l, i) => (
                  <motion.li
                    key={l}
                    initial={{ opacity: 0, scale: 0.7, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18, delay: 1 + i * 0.1 }}
                    whileHover={{ y: -3, scale: 1.05 }}
                    className="rounded-full border border-burgundy/20 bg-white/80 px-3.5 py-1.5 text-sm font-semibold tracking-wide text-burgundy shadow-sm backdrop-blur"
                  >
                    {l}
                  </motion.li>
                ))}
              </ul>
            </div>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-700 sm:text-lg">
              Commercials, animation &amp; dubbing,{" "}
            </p>
            <motion.span
              className="mt-3 block h-px max-w-xs origin-left bg-gradient-to-r from-burgundy via-crimson/60 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden
            />
          </motion.div>

          <motion.p variants={item} className="mt-7 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
            {profile.intro}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollToId("demos")}
              className="focus-ring group inline-flex items-center gap-2.5 rounded-full bg-burgundy px-7 py-3.5 font-semibold text-white shadow-lg shadow-burgundy/20 transition hover:-translate-y-0.5 hover:bg-burgundy-light hover:shadow-xl hover:shadow-burgundy/30"
            >
              Listen to Demos
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </button>
          </motion.div>
        </motion.div>

        {/* Right: portrait */}
        <motion.div
          className="mx-auto w-full max-w-[17rem] sm:max-w-sm lg:col-span-5 lg:max-w-md"
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ perspective: 1000 }}
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            mx.set((e.clientX - r.left) / r.width - 0.5);
            my.set((e.clientY - r.top) / r.height - 0.5);
          }}
          onPointerLeave={() => {
            mx.set(0);
            my.set(0);
          }}
        >
          <motion.div style={{ rotateX, rotateY }} className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-burgundy/20 via-rose to-transparent blur-2xl" aria-hidden />
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border-4 border-white shadow-2xl shadow-burgundy/20">
              <Image
                src={profile.headshotImage}
                alt={`Portrait of ${profile.name}`}
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 40vw"
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-5 -left-3 flex h-14 w-14 animate-float items-center justify-center rounded-full border border-gray-100 bg-white/95 text-burgundy shadow-xl backdrop-blur sm:-left-6">
              <Music className="h-6 w-6" />
            </div>

            <div className="absolute -right-3 -top-4 flex h-14 w-14 animate-float items-center justify-center rounded-full bg-burgundy text-white shadow-xl sm:-right-5">
              <Mic className="h-6 w-6" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
