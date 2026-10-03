export type AudioCategory = "commercial" | "narration" | "dubbing";

export type AudioLanguage = "ar" | "en" | "fr" | "kab";

export interface AudioTrack {
  id: string;
  title: string;
  clientOrProject: string;
  category: AudioCategory;
  /** Language of the recording, shown as a badge on the card. */
  language?: AudioLanguage;
  /** Leave undefined until the audio file exists — the card shows "Coming soon". */
  audioUrl?: string;
  /** Optional cover image; a generated gradient cover is used when omitted. */
  coverImage?: string;
  duration: string;
  tags: string[];
}

export type SocialPlatform = "instagram" | "youtube" | "linkedin" | "soundcloud";

export interface VoiceActorProfile {
  name: string;
  title: string;
  tagline: string;
  intro: string;
  headshotImage: string;
  vocalCharacteristics: string[];
  email: string;
  socialLinks: { platform: SocialPlatform; url: string }[];
}

export interface StudioSpec {
  label: string;
  value: string;
}
