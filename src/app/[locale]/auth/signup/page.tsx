import { SignupForm } from "@/components/form/signup-form";
import { BicepsFlexed } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="bg-[linear-gradient(to_top_left,color-mix(in_srgb,var(--primary)_50%,transparent)_0%,transparent_60%)] dark:bg-[linear-gradient(to_top_left,color-mix(in_srgb,var(--primary)_50%,transparent)_0%,transparent_60%)] md:bg-none md:dark:bg-none md:bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl flex flex-col gap-6 md:gap-10 lg:gap-12">
        <Link
          href="/"
          className="flex items-center gap-2 md:gap-3 lg:gap-5 self-center font-medium text-3xl md:text-4xl lg:text-5xl"
        >
          <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-primary rounded-lg flex items-center justify-center">
            <BicepsFlexed
              strokeWidth={1.5}
              className="text-primary-foreground"
            />
          </div>
          CalisTrack
        </Link>
        <SignupForm />
      </div>
    </div>
  );
}
