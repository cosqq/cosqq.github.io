import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getProfile } from "@/lib/content";
import { Footer } from "@/components/Footer";
import { CircuitBackground } from "@/components/CircuitBackground";
import "./globals.css";

const profile = getProfile();

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cosqq.github.io"),
  title: `${profile.name} — ${profile.title}`,
  description: profile.tagline,
  openGraph: {
    title: `${profile.name} — ${profile.title}`,
    description: profile.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen">
        <CircuitBackground />
        <div className="relative z-0 mx-auto flex min-h-screen max-w-4xl flex-col bg-[color:var(--color-canvas)] ring-1 ring-[color:var(--color-accent)]/15 shadow-[0_0_80px_-20px_rgba(34,211,238,0.35)]">
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
