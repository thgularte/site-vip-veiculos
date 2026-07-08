import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://vipveiculosriogrande.com.br"),
  title: {
    default: "VipVeículos | Carros Seminovos e Usados em Rio Grande - RS",
    template: "%s | VipVeículos Rio Grande",
  },
  description:
    "A VipVeículos está há mais de 15 anos no mercado automobilístico de Rio Grande - RS. Carros seminovos e usados revisados com garantia de procedência, respeito e as melhores condições.",
  keywords: [
    "VipVeículos",
    "Vip Veículos Rio Grande",
    "carros usados Rio Grande RS",
    "veículos seminovos RS",
    "comprar carro Rio Grande",
    "concessionária Rio Grande",
    "carros de qualidade RS",
    "loja de automóveis Rio Grande",
    "financiamento veículos RS",
    "Fábio Gularte",
  ],
  authors: [{ name: "VipVeículos" }],
  creator: "VipVeículos",
  publisher: "VipVeículos",
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
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://vipveiculosriogrande.com.br",
    siteName: "VipVeículos Rio Grande",
    title: "VipVeículos | Carros Seminovos e Usados em Rio Grande - RS",
    description:
      "A certeza de uma ótima compra! Mais de 15 anos oferecendo veículos revisados e atendimento humanizado em Rio Grande - RS.",
    images: [
      {
        url: "/O home.png",
        width: 1200,
        height: 630,
        alt: "VipVeículos - Loja de carros em Rio Grande RS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VipVeículos | Carros Seminovos e Usados em Rio Grande - RS",
    description:
      "A certeza de uma ótima compra! Mais de 15 anos oferecendo veículos revisados e atendimento humanizado em Rio Grande - RS.",
    images: ["/O home.png"],
  },
  verification: {
    google: "google-site-verification-code", // Substituir pelo código real
  },
  generator: "Next.js",
  applicationName: "VipVeículos",
  category: "automotive",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || "G-E286F6BFTW"} />
    </html>
  );
}
