import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/hero/HeroSection";
import { AudioSection } from "@/components/audio/AudioSection";
import { GlobalPlayerBar } from "@/components/audio/GlobalPlayerBar";
import { ContactSection } from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AudioSection />
        <ContactSection />
      </main>
      <Footer />
      <GlobalPlayerBar />
    </>
  );
}
