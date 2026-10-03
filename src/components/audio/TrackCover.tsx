import Image from "next/image";
import { Clapperboard, Headphones, Megaphone } from "lucide-react";
import { AudioTrack } from "@/types";

const gradients: Record<AudioTrack["category"], string> = {
  commercial: "linear-gradient(135deg,#5B142F 0%,#C92A4E 100%)",
  narration: "linear-gradient(135deg,#1E1B4B 0%,#5B142F 100%)",
  dubbing: "linear-gradient(135deg,#7C3AED 0%,#C92A4E 100%)",
};

const icons = { commercial: Megaphone, narration: Headphones, dubbing: Clapperboard };

/** Square cover: the track's image if provided, otherwise a generated gradient. */
export function TrackCover({ track, sizes = "96px" }: { track: AudioTrack; sizes?: string }) {
  if (track.coverImage) {
    return <Image src={track.coverImage} alt="" fill sizes={sizes} className="object-cover" />;
  }
  const Icon = icons[track.category];
  return (
    <div className="flex h-full w-full items-center justify-center" style={{ background: gradients[track.category] }}>
      <Icon className="h-1/3 w-1/3 text-white/80" strokeWidth={1.5} />
    </div>
  );
}
