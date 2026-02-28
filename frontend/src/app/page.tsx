import { Navbar } from "@/src/components/landing/Navbar";
import { HeroSection } from "@/src/components/landing/HeroSection";
import { HowItWorks } from "@/src/components/landing/HowItWorks";
import { FeaturesSection } from "@/src/components/landing/FeaturesSection";
import { CTABanner } from "@/src/components/landing/CtaBanner";
import { Footer } from "@/src/components/landing/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      <CTABanner />
      <Footer />
    </main>
  );
}