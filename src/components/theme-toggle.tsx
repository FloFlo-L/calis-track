"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

interface ThemeToggleProps {
  className?: string;
  variant?: "ghost" | "outline";
  withLabel?: boolean;
}

export function ThemeToggle({
  className,
  variant,
  withLabel,
}: ThemeToggleProps) {
  const { setTheme } = useTheme();

  return (
    <>
      <Button
        variant={variant || "ghost"}
        size={withLabel ? "default" : "icon"}
        onClick={() => setTheme("light")}
        className={`m-0 hidden dark:inline-flex cursor-pointer ${className}`}
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className={`${withLabel ? "" : "sr-only"}`}>Light mode</span>
      </Button>
      <Button
        variant={variant || "ghost"}
        size={withLabel ? "default" : "icon"}
        onClick={() => setTheme("dark")}
        className={`inline-flex dark:hidden cursor-pointer ${className}`}
      >
        <Moon className="h-[1.2rem] w-[1.2rem]" />
        <span className={`${withLabel ? "" : "sr-only"}`}>Dark mode</span>
      </Button>
    </>
  );
}
