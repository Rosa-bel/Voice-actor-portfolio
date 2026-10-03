"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Mail } from "lucide-react";
import { profile } from "@/data/portfolioData";
import { Reveal } from "@/components/ui/Reveal";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { ContactForm } from "./ContactForm";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const socials = profile.socialLinks.filter((s) => s.url);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — the mailto link still works */
    }
  };

  return (
    <section id="contact" className="bg-white px-5 py-16 sm:px-6 sm:py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-burgundy">Contact</p>
          <h2 className="mt-3 font-serif text-3xl text-gray-900 sm:text-4xl lg:text-5xl">
            Let&apos;s bring a voice <span className="italic text-burgundy">to your brand.</span>
          </h2>
          <p className="mt-4 text-gray-600">Contact me!</p>
        </Reveal>

        <div className="mx-auto flex max-w-2xl flex-col gap-10">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.12} className="space-y-6">
            <div className="rounded-2xl bg-obsidian p-6 text-white sm:p-8">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
                <Mail className="h-4 w-4" /> Direct email
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <a href={`mailto:${profile.email}`} className="break-all font-serif text-xl underline-offset-4 hover:underline sm:text-2xl">
                  {profile.email}
                </a>
                <button
                  onClick={copy}
                  aria-label="Copy email address"
                  className="relative flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs font-medium transition hover:bg-white/10"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={copied ? "c" : "n"}
                      initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }}
                      className="flex items-center gap-1.5"
                    >
                      {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                      {copied ? "Copied" : "Copy"}
                    </motion.span>
                  </AnimatePresence>
                </button>
              </div>
            </div>

            {socials.length > 0 && (
              <div className="flex justify-center gap-3">
                {socials.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.platform}
                    title={s.platform}
                    className="focus-ring flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition hover:-translate-y-1 hover:border-burgundy hover:bg-burgundy hover:text-white"
                  >
                    <SocialIcon platform={s.platform} className="h-5 w-5" />
                  </a>
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
