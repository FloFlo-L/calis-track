"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BicepsFlexed, MenuIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "#features", hash: "features", label: "Features" },
    { href: "#about", hash: "about", label: "About" },
    { href: "#pricing", hash: "pricing", label: "Pricing" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 md:py-8">
      <nav className="container mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-16 px-6 bg-background/70 backdrop-blur-sm border rounded-2xl shadow-lg dark:bg-muted/70 dark:border-border">
          {/* Left: mobile trigger, logo */}
          <div className="flex md:hidden">
            {/* Mobile trigger (visible on mobile only) */}
            <div className="md:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Open menu">
                    <MenuIcon className="h-6 w-6" />
                  </Button>
                </SheetTrigger>

                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
                        <BicepsFlexed strokeWidth={1.5} />
                      </div>
                      <span className="font-bold text-xl">CalisTrack</span>
                    </SheetTitle>
                    <SheetDescription>Navigation</SheetDescription>
                  </SheetHeader>

                  <ul className="flex flex-col gap-4 px-2 pt-2">
                    {navLinks.map((link) => (
                      <li key={link.hash}>
                        <Link
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className="text-lg font-medium hover:text-primary transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col gap-3 px-2 pt-2">
                    <Button variant="outline" asChild>
                      <Link href="/auth/login">Sign In</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/auth/signup">Get Started</Link>
                    </Button>
                    {/* ThemeToggle intentionally removed from sheet */}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Logo (text visible on mobile as requested) */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
                <BicepsFlexed strokeWidth={1.5} />
              </div>
              <span className="font-bold text-xl">CalisTrack</span>
            </Link>
          </div>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.hash}>
                <Link
                  href={link.href}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side: actions (desktop) and ThemeToggle (always visible) */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                asChild
              >
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            </div>

            {/* Theme toggle (always on the right) */}
            <div className="flex items-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
