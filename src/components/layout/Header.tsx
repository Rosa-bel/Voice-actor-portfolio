"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { useAudio } from "@/context/AudioContext";
import { profile } from "@/data/portfolioData";
import { scrollToId } from "@/lib/utils";
import { AudioCategory } from "@/types";

type NavItem = { key: string; label: string; section: "about" | "demos" | "contact"; category?: AudioCategory };

const NAV: NavItem[] = [
  { key: "about", label: "About", section: "about" },
  { key: "demos", label: "Demos", section: "demos" },
  { key: "commercial", label: "Commercial", section: "demos", category: "commercial" },
  { key: "narration", label: "Narration", section: "demos", category: "narration" },
  { key: "dubbing", label: "Dubbing", section: "demos", category: "dubbing" },
  { key: "contact", label: "Contact", section: "contact" },
];


export function Header() {
  const { activeCategory, setActiveCategory } = useAudio();
  const [section, setSection] = useState<string>("about");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 });

  // Scroll-spy + header background
  useEffect(() => {
    const ids = ["about", "demos", "contact"];
    const ratios = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0));
        let best = "";
        let max = 0;
        ratios.forEach((r, id) => {
          if (r > max) {
            max = r;
            best = id;
          }
        });
        if (best) setSection(best);
      },
      { rootMargin: "-30% 0px -40% 0px", threshold: [0, 0.1, 0.3, 0.6, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Drawer: lock body scroll + Esc to close
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const activeKey = section === "demos" ? activeCategory : section;

  const go = (item: NavItem) => {
    if (item.category) setActiveCategory(item.category);
    const wasOpen = open;
    setOpen(false);
    // give the drawer a moment to release the body scroll lock
    setTimeout(() => scrollToId(item.section), wasOpen ? 200 : 0);
  };

  return (
    <>
    <header
      className={clsx(
        "sticky top-0 z-50 border-b backdrop-blur-md transition-all duration-300",
        scrolled ? "border-gray-200 bg-white/90 shadow-sm" : "border-transparent bg-white/70",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 md:px-12">
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            scrollToId("about");
          }}
          className="focus-ring group flex flex-col rounded leading-none"
          aria-label={`${profile.name} - back to top`}
        >
          <span className="font-serif text-xl font-bold uppercase tracking-[0.18em] text-gray-900 transition-colors group-hover:text-burgundy">
            {profile.name}
          </span>
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-500">Voice Talent</span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV.map((item) => {
            const active = activeKey === item.key;
            return (
              <button
                key={item.key}
                onClick={() => go(item)}
                aria-current={active ? "true" : undefined}
                className={clsx(
                  "focus-ring relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  active ? "text-burgundy" : "text-gray-600 hover:text-gray-900",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-rose"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            className="focus-ring rounded-full p-2 text-gray-900 lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      <motion.div
        style={{ scaleX: progress }}
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-crimson"
        aria-hidden
      />
    </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 z-50 bg-obsidian/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              key="drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed inset-y-0 right-0 z-[60] flex h-dvh w-[82%] max-w-sm flex-col overflow-y-auto bg-white p-6 shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 36 }}
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-lg font-bold uppercase tracking-[0.18em]">{profile.name}</span>
                <button onClick={() => setOpen(false)} aria-label="Close menu" className="focus-ring rounded-full p-2">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <ul className="mt-10 space-y-1">
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.key}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05 }}
                  >
                    <button
                      onClick={() => go(item)}
                      className={clsx(
                        "flex w-full items-center rounded-xl py-3.5 text-left font-serif transition-colors",
                        item.category ? "pl-8 pr-4 text-xl" : "px-4 text-2xl",
                        activeKey === item.key ? "bg-rose text-burgundy" : "text-gray-900 hover:bg-gray-50",
                      )}
                    >
                      {item.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
