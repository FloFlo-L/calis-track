import { Button } from "@/components/ui/button";
import { PulsatingButton } from "@/components/ui/pulsating-button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className={
        "overflow-hidden h-auto lg:h-screen flex flex-col items-center justify-center pt-38 " +
        // Mobile: radial vers le bas (circle_at_50%_80%)
        "bg-[radial-gradient(circle_at_50%_80%,color-mix(in_srgb,var(--primary)_25%,transparent)_0%,transparent_60%)] " +
        "dark:bg-[radial-gradient(circle_at_50%_80%,color-mix(in_srgb,var(--primary)_20%,transparent)_0%,transparent_60%)] " +
        // Desktop (lg+): garder le mélange radial + linear existant
        "lg:bg-[radial-gradient(circle_at_70%_40%,color-mix(in_srgb,var(--primary)_25%,transparent)_0%,transparent_60%),linear-gradient(135deg,var(--background)_0%,var(--sidebar)_100%)] " +
        "lg:dark:bg-[radial-gradient(circle_at_70%_40%,color-mix(in_srgb,var(--primary)_20%,transparent)_0%,transparent_60%),linear-gradient(135deg,var(--background)_0%,var(--sidebar)_100%)]"
      }
    >
      <div className="grid lg:grid-cols-[55%_45%] gap-6 md:gap-12 items-center w-full container mx-auto px-6 md:px-10">
        {/* Left Content */}
        <div className="space-y-6">
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold leading-tight text-balance">
            Track your calisthenics progress.{" "}
            <span className="text-primary">Reach your goals !</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty max-w-xl">
            CalisTrack is the smart journal to track your sessions, visualize
            your progress, and stay motivated in your calisthenics journey.
          </p>

          <div className="flex flex-col lg:flex-row gap-4 pt-2">
            <PulsatingButton pulseColor="var(--pulsebtn)">
              <Link href="/auth/login" className="flex items-center">
                Track my progress
                <ArrowRight className="ml-2 size-5" />
              </Link>
            </PulsatingButton>
            <Button
              size="lg"
              variant="outline"
              className="text-base h-12 px-8 bg-transparent"
              asChild
            >
              <Link href="/auth/signup">Start now</Link>
            </Button>
          </div>
        </div>

        {/* Right Image (visible on mobile + desktop) */}
        <div className="w-full">
          <div className="rounded-2xl overflow-hidden">
            <Image
              src="/images/hero-section.png"
              alt="Athlete performing calisthenics"
              width={800}
              height={800}
              className="w-full h-auto object-cover rounded-2xl max-w-[400px] mx-auto lg:max-w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
