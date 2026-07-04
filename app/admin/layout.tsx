import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Painel Administrativo VIP - Gestão de Estoque",
  description: "Área restrita para gerenciamento de veículos, estoque e listagens da VipVeículos.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-slate-100">{children}</div>;
}
