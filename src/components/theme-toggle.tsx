"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme("light")}
        className="hidden dark:inline-flex cursor-pointer"
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Mode sombre</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme("dark")}
        className="inline-flex dark:hidden cursor-pointer"
      >
        <Moon className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Mode clair</span>
      </Button>
    </>
  );
}
