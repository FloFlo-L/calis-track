"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { toast } from "sonner";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const formData = new FormData(evt.target as HTMLFormElement);

    const email = String(formData.get("email"));
    if (!email) {
      return toast.error("Email is required");
    }

    const password = String(formData.get("password"));
    if (!password) {
      return toast.error("Password is required");
    }

    const confirmPassword = String(formData.get("confirm-password"));
    if (!confirmPassword) {
      return toast.error("Confirm Password is required");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    console.log({ email, password, confirmPassword });

    await authClient.signUp.email(
      {
        email,
        name: "", // user name (optional)
        password,
      },
      {
        onRequest: () => {
          // do somethinng
        },
        onSuccess: () => {
          // redirect or show success message
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      }
    );
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Enter your email below to create your account
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" name="password" type="password" />
              </Field>
              <Field>
                <FieldLabel htmlFor="confirm-password">
                  Confirm Password
                </FieldLabel>
                <Input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                />
              </Field>
              <Field>
                <Button type="submit">Create Account</Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field>
                <Button variant="outline" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Signup with Google
                </Button>
              </Field>
              <FieldDescription className="text-center">
                Already have an account ? <a href="/auth/login">Sign in</a>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted/40 hidden md:flex items-end bg-[radial-gradient(circle_at_50%_50%,color-mix(in_srgb,var(--primary)_40%,transparent)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,color-mix(in_srgb,var(--primary)_30%,transparent)_0%,transparent_70%)]">
            <Image
              src="/images/signup-illustration.png"
              alt="Image"
              width={800}
              height={800}
              className="w-full h-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
