import { Metadata } from "next";

interface PageMetadataProps {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  image?: string;
  type?: "website" | "article";
}

export function generatePageMetadata({
  title,
  description,
  keywords = [],
  canonical,
  image = "/O home.png",
  type = "website",
}: PageMetadataProps): Metadata {
  const baseUrl = "https://vipveiculos.com.br";
  const fullTitle = `${title} | VipVeículos`;

  return {
    title,
    description,
    keywords: [
      "VipVeículos",
      "Rio Grande",
      "carros usados",
      "veículos seminovos",
      ...keywords,
    ],
    alternates: {
      canonical: canonical ? `${baseUrl}${canonical}` : baseUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical ? `${baseUrl}${canonical}` : baseUrl,
      siteName: "VipVeículos",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "pt_BR",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
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
}
