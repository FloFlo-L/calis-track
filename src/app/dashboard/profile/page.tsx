import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { Settings } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

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
      {/* Header avec profil */}
      <div className="bg-linear-to-br from-primary to-primary/70 text-primary-foreground p-6 pb-12">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Profil</h1>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
              asChild
            >
              <Link href="/dashboard/settings">
                <Settings className="size-8" strokeWidth={1.5} />
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-4 border-primary-foreground/20">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground text-2xl font-bold">
                {session.user.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{session.user.name}</h2>
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
    </div>
  );
}
