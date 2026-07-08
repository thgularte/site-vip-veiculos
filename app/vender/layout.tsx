import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Venda ou Troque seu Carro | Avaliação Justa no WhatsApp",
  description:
    "Quer vender ou trocar seu carro usado com rapidez, segurança e a melhor avaliação de Rio Grande - RS? Preencha os dados e receba uma proposta direto no WhatsApp da VipVeículos.",
  keywords: [
    "vender carro Rio Grande",
    "venda seu carro RS",
    "avaliação de veículos Rio Grande",
    "compramos seu carro RS",
    "trocar de carro Rio Grande",
    "concessionária compra carros",
    "revenda de carros Rio Grande",
  ],
  openGraph: {
    title: "Venda ou Troque seu Carro - VipVeículos Rio Grande",
    description:
      "Venda ou troque seu carro usado com rapidez e segurança. Faça sua avaliação online e receba proposta no WhatsApp!",
    url: "https://vipveiculosriogrande.com.br/vender",
  },
};

export default function SellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
