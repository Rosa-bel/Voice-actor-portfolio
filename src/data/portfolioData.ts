import { AudioTrack, StudioSpec, VoiceActorProfile } from "@/types";

export const profile: VoiceActorProfile = {
  name: "Roza",
  title: "Voice Actor",
  tagline: "The Voice for Your Next Story.",
  intro:
    "Hi, Roza here ! A voice actor based in Algeria. I lend my voice to commercials, animation and dubbing projects in French, English, Arabic and Kabyle. From a warm, intimate tone to an energetic, playful one, I adapt my delivery to fit your brand and your audience. Let's bring your script to life ! ",
  headshotImage: "/images/hero/pic.png",
  vocalCharacteristics: ["Warm", "Expressive", "Conversational", "Cinematic", "Versatile"],
  email: "rozabelga@gmail.com",
  // Add your profile URLs here — only entries with a url are displayed.
  socialLinks: [
    { platform: "instagram", url: "https://www.instagram.com/rozaa_voice/" },
    { platform: "youtube", url: "" },
    { platform: "linkedin", url: "" },
    { platform: "soundcloud", url: "" },
  ],
};

/**
 * HOW TO ADD YOUR AUDIO LATER
 * 1. Drop the file in public/audio/<category>/ (e.g. public/audio/commercial/demo-1.mp3)
 * 2. Set `audioUrl` below (e.g. "/audio/commercial/demo-1.mp3")
 * 3. Update title / client / duration / tags. Optionally set `coverImage`.
 * Tracks without `audioUrl` display a "Coming soon" state.
 */
export const audioTracks: AudioTrack[] = [
  {
    id: "comm-1",
    title: "Atlas",
    clientOrProject: "Commercial",
    category: "commercial",
    language: "ar",
    duration: "0:20",
    audioUrl: "/audio/commercial/atlas.wav",
    coverImage: "/images/hero/atlas.png",
    tags: ["Warm", "Energetic"],
  },
  {
    id: "comm-2",
    title: "Parfume",
    clientOrProject: "Commercial",
    category: "commercial",
    language: "fr",
    duration: "0:15",
    audioUrl: "/audio/commercial/parfumeAd.wav",
    coverImage: "/images/hero/parfume.png",
    tags: ["Friendly", "Conversational"],
  },
  {
    id: "comm-3",
    title: "Career Expo",
    clientOrProject: "Commercial",
    category: "commercial",
    language: "en",
    duration: "0:23",
    audioUrl: "/audio/commercial/career_expo.wav",
    coverImage: "/images/hero/career_expo.png",
    tags: ["Confident", "Modern"],
  },
  {
    id: "comm-4",
    title: "E-Learning",
    clientOrProject: "Commercial",
    category: "commercial",
    language: "en",
    duration: "0:17",
    audioUrl: "/audio/commercial/e_learning.wav",
    coverImage: "/images/hero/e_learning.png",
    tags: ["Clear", "Friendly"],
  },
  {
    id: "comm-5",
    title: "Trousse Magik",
    clientOrProject: "Commercial",
    category: "commercial",
    language: "fr",
    duration: "0:19",
    audioUrl: "/audio/commercial/trousse_magik.wav",
    coverImage: "/images/hero/trousse_magik.png",
    tags: ["Playful", "Warm"],
  },
  {
    id: "narr-1",
    title: "Narration (English)",
    clientOrProject: "Narration",
    category: "narration",
    language: "en",
    duration: "0:25",
    audioUrl: "/audio/narration/narration_ENG.wav",
    tags: ["Calm", "Storyteller"],
  },
  {
    id: "narr-2",
    title: "Narration (French)",
    clientOrProject: "Narration",
    category: "narration",
    language: "fr",
    duration: "0:36",
    audioUrl: "/audio/narration/narration_FR.wav",
    tags: ["Atmospheric", "Intimate"],
  },
  {
    id: "dub-1",
    title: "Jasmine",
    clientOrProject: "Animation / dubbing",
    category: "dubbing",
    language: "fr",
    duration: "0:09",
    audioUrl: "/audio/dubbing/Jasmine_dub_FR.wav",
    coverImage: "/images/hero/jasmine.png",
    tags: ["Playful", "Expressive"],
  },
  {
    id: "dub-2",
    title: "Morocco",
    clientOrProject: "Animation / dubbing",
    category: "dubbing",
    language: "ar",
    duration: "0:13",
    audioUrl: "/audio/dubbing/marroco_dub_ARA.wav",
    coverImage: "/images/hero/maroco.png",
    tags: ["Dramatic", "Dynamic"],
  },
];

// Edit these to match your real setup.
export const studioSpecs: StudioSpec[] = [
  { label: "Recording", value: "Quiet, acoustically treated home studio" },
  { label: "Delivery", value: "Clean WAV / MP3, edited & ready to use" },
  { label: "Sessions", value: "Live-directed over Zoom, Cleanfeed or similar" },
  { label: "Turnaround", value: "Fast — auditions and short scripts within 24h" },
];
