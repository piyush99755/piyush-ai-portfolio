import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { bioData } from "@/data/bio";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${bioData.name} | ${bioData.role}`,
    template: `%s | ${bioData.name}`,
  },
  description: bioData.shortBio,
  keywords: [
    "AI Software Engineer",
    "Full-Stack Developer",
    "Voice AI Receptionist",
    "Next.js",
    "TypeScript",
    "FastAPI",
    "Python",
    "Retell AI",
    "Twilio",
    "RAG",
    "n8n Automation",
  ],
  authors: [{ name: bioData.name }],
  creator: bioData.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    title: `${bioData.name} | ${bioData.role}`,
    description: bioData.shortBio,
    siteName: `${bioData.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${bioData.name} | ${bioData.role}`,
    description: bioData.shortBio,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
