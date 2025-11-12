"use client";

import { cn } from "@/lib/utils";
import { useCurrentLocale } from "@/locales/client";
import { BicepsFlexed, Home, TrendingUp, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNavBar() {
  const pathname = usePathname() ?? "";
  const locale = useCurrentLocale();
  const baseDashboard = `/${locale}/dashboard`;

  const links = [
    { href: `${baseDashboard}`, icon: Home, label: "Home" },
    { href: `${baseDashboard}/workout`, icon: BicepsFlexed, label: "Workout" },
    { href: `${baseDashboard}/progress`, icon: TrendingUp, label: "Progress" },
    { href: `${baseDashboard}/profile`, icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
      {" "}
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {links.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== baseDashboard &&
              pathname.startsWith(`${link.href}/`));
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
