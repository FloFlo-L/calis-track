import { BicepsFlexed } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#about", label: "About" },
    { href: "#pricing", label: "Pricing" },
  ];

  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-6 md:px-10 py-4 md:py-8">
        <div className="flex flex-col justify-center items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
              <BicepsFlexed strokeWidth={1.5} />
            </div>
            <span className="font-bold text-lg">CalisTrack</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CalisTrack. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
