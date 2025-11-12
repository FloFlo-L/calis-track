import { BottomNavBar } from "@/components/bottom-nav-bar";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <BottomNavBar />
    </>
  );
}
