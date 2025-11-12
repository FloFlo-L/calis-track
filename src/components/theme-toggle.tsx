"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

interface ThemeToggleProps {
  className?: string;
  variant?: "ghost" | "outline";
  withLabel?: boolean;
  modes: {
    light: string;
    dark: string;
  };
}

export function ThemeToggle({
  className,
  variant,
  withLabel,
  modes,
}: ThemeToggleProps) {
  const { setTheme } = useTheme();

  return (
    <>
      <Button
        variant={variant || "ghost"}
        size={withLabel ? "lg" : "icon"}
        onClick={() => setTheme("light")}
        className={`m-0 hidden dark:inline-flex cursor-pointer ${className}`}
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className={`${withLabel ? "" : "sr-only"}`}>{modes.light}</span>
      </Button>
      <Button
        variant={variant || "ghost"}
        size={withLabel ? "lg" : "icon"}
        onClick={() => setTheme("dark")}
        className={`inline-flex dark:hidden cursor-pointer ${className}`}
      >
        <Moon className="h-[1.2rem] w-[1.2rem]" />
        <span className={`${withLabel ? "" : "sr-only"}`}>{modes.dark}</span>
      </Button>
    </>
  );
}
