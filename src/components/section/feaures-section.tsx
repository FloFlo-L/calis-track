import { Check } from "lucide-react";
import Image from "next/image";
import { Android } from "../ui/android";

export default function FeaturesSection() {
  const features = [
    "Plan your sessions with numerous exercises",
    "Workout with our mascot coach",
    "Complete your workouts",
    "Track your workout progress",
  ];
  return (
    <section
      className="px-6 md:px-10 pt-16 pb-36 lg:pt-24 lg:pb-48 bg-muted"
      id="features"
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        <div className="flex flex-col items-center justify-center order-2 lg:order-1 relative">
          <Android src="" className="w-50 lg:w-60 h-auto mx-auto" />
          <Image
            src="/images/carry-illustration.png"
            alt="Carry illustration"
            width={1000}
            height={1000}
            className="absolute left-[calc(50%-10px)] -translate-x-1/2 w-55 lg:w-72 -bottom-38 lg:-bottom-51 h-auto object-cover"
          />
        </div>
        {/* Features List */}
        <div className="space-y-6 flex flex-col items-center lg:items-start order-1 lg:order-2">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Your calisthenics app
          </h2>
          <p className="text-lg text-muted-foreground text-center md:text-left">
            Transform your training with a complete app to progress in
            calisthenics.
          </p>
          <ul className="space-y-4 mt-4 lg:mt-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="flex w-6 h-6 shrink-0 items-center justify-center rounded-full bg-primary">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-lg leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
