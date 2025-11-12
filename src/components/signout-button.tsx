"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface SignOutButtonProps {
  size?: "sm" | "lg";
  className?: string;
  label: [string, string];
}

export const SignOutButton = ({
  className,
  size,
  label,
}: SignOutButtonProps) => {
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
      className={`cursor-pointer ${className}`}
    >
      {isPending ? (
        <>
          <Spinner />
          {label[0]}
        </>
      ) : (
        <>
          <LogOut className="size-4" />
          {label[1]}
        </>
      )}
    </Button>
  );
};
