import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { HowItWorks } from "../components/HowItWorks";
import { FeaturesSection } from "../components/FeaturesSection";
import { CTABanner } from "../components/CtaBanner";
import { Footer } from "../components/Footer";

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