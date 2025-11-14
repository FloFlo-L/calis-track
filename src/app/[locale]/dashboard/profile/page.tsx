import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/lib/auth";
import { getCurrentLocale } from "@/locales/server";
import { Settings } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const locale = await getCurrentLocale();

  if (!session) {
    return (
      <div className="container mx-auto max-w-3xl py-16 px-6 md:py-24 md:px-10">
        <h1 className="text-4xl font-bold mb-8">Profile Page</h1>
        <p>You must be logged in to view this page.</p>
        <p>
          Please{" "}
          <Link href="/auth/login" className="text-primary underline">
            sign in
          </Link>{" "}
          to continue.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Header with profile */}
      <div className="bg-linear-to-br from-primary to-primary/70 text-primary-foreground p-6 pb-12">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Profile</h1>
            <Link href={`/${locale}/dashboard/profile/settings`}>
              <Settings className="size-7 md:size-8" strokeWidth={1.5} />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Avatar className="size-18 md:size-20 border-4 border-primary-foreground/20">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground text-xl md:text-2xl font-bold">
                {session.user.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl md:text-2xl font-bold">
                {session.user.name}
              </h2>
              <p className="text-primary-foreground/80">
                Member since{" "}
                <span className="sm:hidden">
                  {new Date(session.user.createdAt).toLocaleDateString("en", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span className="hidden sm:inline">
                  {new Date(session.user.createdAt).toLocaleDateString("en", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-primary-foreground/20 text-primary-foreground border-0">
                  Beginner
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto p-4 mt-6 flex flex-col items-center justify-center text-center h-[calc(100vh-45vh)]">
        <p className="text-primary text-2xl font-bold">
          This page is under construction...
        </p>
        <p className="text-muted-foreground">
          Come back later to see your profile !
        </p>
      </div>
    </div>
  );
}
