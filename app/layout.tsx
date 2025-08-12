import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "VipVeículos - Mais de 15 anos de experiência",
    template: "%s | VipVeículos",
  },
  description:
    "A VipVeículos está no mercado automobilístico há mais de 15 anos, oferecendo veículos de qualidade e atendimento personalizado em Rio Grande - RS.",
  keywords: [
    "VipVeículos",
    "carros usados",
    "veículos Rio Grande",
    "automóveis RS",
    "loja de carros",
    "veículos seminovos",
    "concessionária Rio Grande",
    "carros de qualidade",
    "financiamento veículos",
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
    url: "https://vipveiculos.com.br",
    siteName: "VipVeículos",
    title: "VipVeículos - Mais de 15 anos de experiência",
    description:
      "A VipVeículos está no mercado automobilístico há mais de 15 anos, oferecendo veículos de qualidade e atendimento personalizado em Rio Grande - RS.",
    images: [
      {
        url: "/O home.png",
        width: 1200,
        height: 630,
        alt: "VipVeículos - Loja de carros em Rio Grande",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VipVeículos - Mais de 15 anos de experiência",
    description:
      "A VipVeículos está no mercado automobilístico há mais de 15 anos, oferecendo veículos de qualidade e atendimento personalizado em Rio Grande - RS.",
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
    </html>
  );
}
