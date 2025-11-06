import Footer from "@/components/footer";
import NavBar from "@/components/nav-bar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CalisTrack",
  description: "Track your calisthenics progress with CalisTrack.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
