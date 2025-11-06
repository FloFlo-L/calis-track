"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface SignOutButtonProps {
  size?: "sm" | "lg";
  className?: string;
}

export const SignOutButton = ({ className, size }: SignOutButtonProps) => {
  const [isPending, setIsPending] = React.useState(false);
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onSuccess: () => {
          toast.success("Signed out successfully, see you soon !");
          router.push("/auth/login");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    });
  }
  return (
    <Button
      variant="destructive"
      size={size}
      onClick={handleSignOut}
      disabled={isPending}
      className={className}
    >
      {isPending ? (
        <>
          <Spinner />
          Signing out...
        </>
      ) : (
        "Sign Out"
      )}
    </Button>
  );
};
