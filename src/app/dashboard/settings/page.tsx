"use client";

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
import { Bell, Info, Palette, Settings, Shield } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-6 pb-8">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <Settings className="h-8 w-8" strokeWidth={1.5} />
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-2 space-y-4 max-w-lg mx-auto pb-6">
        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Palette className="h-5 w-5 text-primary" />
              Appearance
            </CardTitle>
            <CardDescription>Personalize the look of the app</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <ThemeToggle
              variant="outline"
              withLabel={true}
              className="w-full justify-start"
            />
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bell className="h-5 w-5 text-primary" />
              Notifications
            </CardTitle>
            <CardDescription>
              Manage your notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              size="lg"
            >
              <Bell className="size-4" />
              Notification settings
            </Button>
          </CardContent>
        </Card>
        {/* Privacy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="h-5 w-5 text-primary" />
              Privacy
            </CardTitle>
            <CardDescription>Protect your personal data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              size="lg"
            >
              <Shield className="size-4" />
              Privacy policy
            </Button>
          </CardContent>
        </Card>

        {/* À propos */}
        <Card className="gap-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Info className="h-5 w-5 text-primary" />
              About
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Version</span>
              <span className="text-sm font-medium">1.0.0</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Last update</span>
              <span className="text-sm font-medium">November 2025</span>
            </div>
          </CardContent>
        </Card>

        {/* Sign Out */}
        <Card className="border-destructive/50">
          <CardContent>
            <SignOutButton size="lg" className="w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
