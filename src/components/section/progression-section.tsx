import { ArrowDown, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export default function ProgressionSection() {
  return (
    <section className="py-16 px-6 md:py-24 md:px-10 bg-card">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            See your body progress
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Track your physical transformation step by step with calisthenics
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          <div className="flex items-center justify-center">
            <Image
              src="/images/beginner_level.png"
              alt="Beginner"
              className="w-full h-86 md:h-auto lg:h-96 object-cover"
              width={1000}
              height={1000}
            />
          </div>

          <div className="flex items-center justify-center">
            <ArrowDown className="w-8 h-8 text-primary md:hidden animate-bounce my-6" />
            <ArrowRight className="w-8 h-8 text-primary hidden md:block animate-pulse-text lg:mr-6" />
          </div>

          <div className="flex items-center justify-center">
            <Image
              src="/images/middle_level.png"
              alt="Intermediate"
              className="w-full h-86 md:h-auto lg:h-96 object-cover"
              width={1000}
              height={1000}
            />
          </div>

          <div className="flex items-center justify-center">
            <ArrowDown className="w-8 h-8 text-primary md:hidden animate-bounce" />
            <ArrowRight className="w-8 h-8 text-primary hidden md:block animate-pulse-text lg:ml-6" />
          </div>

          <div className="flex items-center justify-center">
            <Image
              src="/images/advanced_level.png"
              alt="Advanced"
              className="w-full h-86 md:h-auto lg:h-96 object-cover"
              width={1000}
              height={1000}
            />
          </div>
        </div>

        <div className="text-center mt-12 md:mt-16">
          <p className="text-lg font-medium mb-4">
            Ready to start your transformation?
          </p>
          <Button asChild size={"lg"}>
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
