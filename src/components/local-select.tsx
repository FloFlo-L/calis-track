"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useChangeLocale, useCurrentLocale } from "@/locales/client";
import { Globe } from "lucide-react";

interface LocalSelectProps {
  className?: string;
  variant?: "ghost" | "outline";
  selectLabel: string;
}

export default function LocalSelect({
  className,
  variant,
  selectLabel,
}: LocalSelectProps) {
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Button variant={variant} size="lg" className={className}>
          <Globe className="h-5 w-5 hidden" />
          <span>
            {locale === "fr" ? (
              <>
                <span className="mr-2">🇫🇷</span> Français
              </>
            ) : (
              <>
                <span className="mr-2">🇬🇧</span> English
              </>
            )}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-(--radix-dropdown-menu-trigger-width)"
      >
        <DropdownMenuLabel>{selectLabel}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => changeLocale("fr")}>
          <span className="mr-2">🇫🇷</span> Français
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLocale("en")}>
          <span className="mr-2">🇬🇧</span> English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
