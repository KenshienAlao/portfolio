import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

import { ThemeProvider } from "@/provider/theme-provider";
import { QueryProvider } from "@/provider/query-provider";

const siteUrl = "https://kenshien.is-a.dev";
const siteName = "Kenshien Alao";
const siteTitle = "Kenshien Alao — Backend Developer";

const siteDescription =
  "Kenshien Alao is a backend developer specializing in modern, performant, and scalable web applications using React, Next.js, TypeScript, Spring Boot, Java, and PostgreSQL.";

const socialProfiles = {
  github: "https://github.com/KenshienAlao",
  linkedin: "https://www.linkedin.com/in/KenshienAlao/",
  facebook: "https://www.facebook.com/KenshienAndres",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: siteTitle,
    template: `%s — ${siteName}`,
  },

  description: siteDescription,

  applicationName: `${siteName} Portfolio`,

  verification: {
    google: "NH9L2PmI0prGi7N1yumFm8iYh_ELc7B0qms5gC_BBjs",
  },

  authors: [
    {
      name: siteName,
      url: siteUrl,
    },
  ],

  creator: siteName,
  publisher: siteName,
  category: "technology",

  keywords: [
    "Kenshien Alao",
    "Clarenze Kenshien A. Alao",
    "Clarenze Alao",
    "Kenshien",
    "Backend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Spring Boot Developer",
    "Java Developer",
    "PostgreSQL Developer",
    "Software Developer",
    "Software Engineering",
  ],

  referrer: "strict-origin-when-cross-origin",

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
    locale: "en_US",

    images: [
      {
        url: `${siteUrl}/og-image.png`,
        secureUrl: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${siteName} — Backend Developer`,
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,

    images: [
      {
        url: `${siteUrl}/og-image.png`,
        alt: `${siteName} — Backend Developer`,
      },
    ],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/icon.png",
        type: "image/png",
      },
    ],

    apple: {
      url: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: siteName,
  },

  manifest: "/manifest.webmanifest",

  formatDetection: {
    telephone: false,
    email: true,
    address: false,
  },
};

function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",

    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,

        name: siteName,
        url: siteUrl,
        image: `${siteUrl}/og-image.png`,

        jobTitle: "Backend Developer",

        description: siteDescription,

        knowsAbout: [
          "Web Development",
          "Software Engineering",
          "Frontend Development",
          "Backend Development",
          "React",
          "Next.js",
          "TypeScript",
          "Spring Boot",
          "Java",
          "PostgreSQL",
        ],

        sameAs: Object.values(socialProfiles),
      },

      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,

        url: siteUrl,
        name: siteName,
        description: siteDescription,

        publisher: {
          "@id": `${siteUrl}/#person`,
        },

        inLanguage: "en-US",
      },

      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,

        url: siteUrl,
        name: siteTitle,
        description: siteDescription,

        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },

        about: {
          "@id": `${siteUrl}/#person`,
        },

        inLanguage: "en-US",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",

  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#ffffff",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#0f1115",
    },
  ],

  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistMono.variable} bg-background font-mono`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <JsonLd />
        <ThemeProvider>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
