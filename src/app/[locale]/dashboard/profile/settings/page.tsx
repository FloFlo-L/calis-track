"use client";

import LocalSelect from "@/components/local-select";
import { SignOutButton } from "@/components/signout-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useScopedI18n } from "@/locales/client";
import { Bell, Globe, Info, Palette, Settings, Shield } from "lucide-react";

export default function SettingsPage() {
  const t = useScopedI18n("settings");

  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-6 pb-8">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <Settings className="h-8 w-8" strokeWidth={1.5} />
            <h1 className="text-2xl font-bold">{t("title")}</h1>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-2 space-y-4 max-w-lg mx-auto pb-6">
        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Palette className="h-5 w-5 text-primary" />
              {t("apparence.label")}
            </CardTitle>
            <CardDescription>{t("apparence.description")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <ThemeToggle
              variant="outline"
              withLabel={true}
              className="w-full justify-start"
              modes={{
                light: t("apparence.modes.light"),
                dark: t("apparence.modes.dark"),
              }}
            />
          </CardContent>
        </Card>

        {/* Language */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Globe className="h-5 w-5 text-primary" />
              {t("language.label")}
            </CardTitle>
            <CardDescription>{t("language.description")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <LocalSelect
              className="w-full justify-start"
              variant="outline"
              selectLabel={t("language.select")}
            />
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bell className="h-5 w-5 text-primary" />
              {t("notifications.label")}
            </CardTitle>
            <CardDescription>{t("notifications.description")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              size="lg"
            >
              <Bell className="size-4" />
              {t("notifications.cta")}
            </Button>
          </CardContent>
        </Card>
        {/* Privacy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="h-5 w-5 text-primary" />
              {t("privacy.label")}
            </CardTitle>
            <CardDescription>{t("privacy.description")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  size="lg"
                >
                  <Shield className="size-4" />
                  {t("privacy.cta")}
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-md p-4 pb-6">
                  <DrawerHeader>
                    <DrawerTitle>{t("privacy.cta")}</DrawerTitle>
                  </DrawerHeader>
                  <div className="space-y-2 text-sm text-justify">
                    <p>{t("privacy.content.0")}</p>
                    <p>{t("privacy.content.1")}</p>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </CardContent>
        </Card>

        {/* About */}
        <Card className="gap-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Info className="h-5 w-5 text-primary" />
              {t("about.label")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Version</span>
              <span className="text-sm font-medium">1.0.0</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">
                {t("about.lastUpdated.label")}
              </span>
              <span className="text-sm font-medium">
                {t("about.lastUpdated.date")}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Sign Out */}
        <Card className="border-destructive/50">
          <CardContent>
            <SignOutButton
              size="lg"
              className="w-full"
              label={[
                t("signOutButton.signingOut"),
                t("signOutButton.signOut"),
              ]}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
