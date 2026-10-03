import { profile } from "@/data/portfolioData";

export function Footer() {
  return (
    <footer className="bg-obsidian text-gray-400">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:px-6 md:px-12 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-serif text-2xl font-bold uppercase tracking-[0.18em] text-white">{profile.name}</p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.3em]">Voice Talent</p>
        </div>
        <p className="max-w-md text-xs leading-relaxed lg:text-right">
          My voice recordings are protected and may not be used for AI / LLM model training or voice
          synthesis without an explicit license.
        </p>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs sm:px-6 md:flex-row md:justify-between md:px-12">
          <p>© {new Date().getFullYear()} {profile.name}. All Rights Reserved.</p>
          <a href={`mailto:${profile.email}`} className="transition-colors hover:text-white">{profile.email}</a>
        </div>
      </div>
    </footer>
  );
}
