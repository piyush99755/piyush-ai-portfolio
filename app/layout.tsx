import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { bioData } from "@/data/bio";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://piyushtadvi.co.uk"),
  title: {
    default: `${bioData.name} — ${bioData.role}`,
    template: `%s | ${bioData.name}`,
  },
  description: bioData.tagline,
  keywords: [
    "Piyush Tadvi",
    "AI Software Engineer",
    "Full-Stack Engineer",
    "Next.js Developer",
    "FastAPI Python",
    "Retell AI Voice Receptionist",
    "RAG Architecture",
    "n8n Workflow Automation",
    "TypeScript Portfolio",
  ],
  authors: [{ name: bioData.name, url: "https://piyushtadvi.co.uk" }],
  creator: bioData.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://piyushtadvi.co.uk",
    title: `${bioData.name} — ${bioData.role}`,
    description: bioData.tagline,
    siteName: `${bioData.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${bioData.name} — ${bioData.role}`,
    description: bioData.tagline,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://piyushtadvi.co.uk/#person",
      name: bioData.name,
      jobTitle: bioData.role,
      description: bioData.shortBio,
      url: "https://piyushtadvi.co.uk",
      email: "mailto:piyushtadvi4@gmail.com",
      sameAs: [
        "https://github.com/piyush99755",
        "https://linkedin.com/in/piyushtadvi",
      ],
      knowsAbout: bioData.primarySkills,
    },
    {
      "@type": "WebSite",
      "@id": "https://piyushtadvi.co.uk/#website",
      url: "https://piyushtadvi.co.uk",
      name: `${bioData.name} AI & Full-Stack Engineering Portfolio`,
      publisher: {
        "@id": "https://piyushtadvi.co.uk/#person",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
