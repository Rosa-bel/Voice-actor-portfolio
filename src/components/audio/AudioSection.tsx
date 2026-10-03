import { audioTracks } from "@/data/portfolioData";
import { Reveal } from "@/components/ui/Reveal";
import { AudioWindow } from "./AudioWindow";

export function AudioSection() {
  return (
    <section id="demos" className="bg-gradient-to-b from-chalk to-white px-5 py-16 sm:px-6 sm:py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-burgundy">Demos</p>
          <h2 className="mt-3 font-serif text-3xl text-gray-900 sm:text-4xl lg:text-5xl">
            Press play. <span className="italic text-burgundy">Hear the range.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <AudioWindow tracks={audioTracks} />
        </Reveal>
      </div>
    </section>
  );
}
