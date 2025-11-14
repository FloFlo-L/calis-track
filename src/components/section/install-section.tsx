"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallSection() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  // Initialisation lazy: vérifie si l'app est déjà installée
  const [isStandalone] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(display-mode: standalone)").matches
      : false
  );

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Store the event for use with our custom button
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    // display the install prompt
    await deferredPrompt.prompt();

    // Wait for the user's choice
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("PWA installed successfully");
    } else {
      console.log("PWA installation dismissed");
    }

    // Reset the prompt
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  return (
    <section className="py-20 md:py-32 bg-muted">
      <div className="container mx-auto px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Install CalisTrack on your device
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Get instant access to your workouts anytime, anywhere. Install our
            app on your phone, tablet, or desktop for the best experience.
          </p>

          <div className="pt-4">
            <Button
              size="lg"
              className="text-base h-12 px-8 cursor-pointer"
              onClick={handleInstallClick}
              disabled={isStandalone || !isInstallable}
            >
              <Download className="size-5" />
              Install CalisTrack app now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
