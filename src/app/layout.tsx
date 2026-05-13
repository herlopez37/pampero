import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pampero — Wordle de futbolistas argentinos",
  description:
    "Adiviná el futbolista argentino del día en 6 intentos. Un nuevo desafío cada 24 horas.",
  openGraph: {
    title: "Pampero",
    description: "Adiviná el futbolista argentino del día en 6 intentos.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
