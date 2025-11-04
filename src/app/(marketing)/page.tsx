import FeaturesSection from "@/components/section/feaures-section";
import HeroSection from "@/components/section/hero-section";
import ProgressionSection from "@/components/section/progression-section";
import ReviewSection from "@/components/section/review-section";

export default function Home() {
  return (
    <main className="">
      <HeroSection />
      <FeaturesSection />
      <ProgressionSection />
      <ReviewSection />
    </main>
  );
}
