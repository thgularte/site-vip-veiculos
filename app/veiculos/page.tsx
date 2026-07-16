import { Navigation } from "@/components/navigation";
import { VehicleCatalog } from "@/components/vehicles/vehicle-catalog";
import { getVehicles } from "@/lib/supabase-db";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Veículos Disponíveis | Estoque Seminovos e Usados",
  description:
    "Explore nosso estoque atualizado de veículos revisados de qualidade: Chevrolet, Volkswagen, Fiat, Hyundai, Toyota, Honda, Renault e Ford. Carros seminovos com garantia e procedência em Rio Grande - RS.",
  keywords: [
    "estoque carros Rio Grande",
    "carros à venda Rio Grande RS",
    "Chevrolet usados RS",
    "Volkswagen seminovos",
    "Fiat seminovo",
    "Hyundai Rio Grande",
    "Toyota seminovo RS",
    "Honda usado RS",
    "veículos revisados Rio Grande",
    "carros com garantia RS",
  ],
  openGraph: {
    title: "Estoque de Veículos - VipVeículos Rio Grande",
    description:
      "Explore nosso estoque de veículos revisados de qualidade. Carros seminovos com garantia e procedência em Rio Grande - RS.",
    url: "https://vipveiculosriogrande.com.br/veiculos",
  },
};

export default async function VehiclesPage() {
  let dbVehicles: any[] = [];
  try {
    dbVehicles = await getVehicles();
  } catch (e) {
    console.error("Error loading vehicles for catalog page:", e);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-r from-[#323062] to-[#2A1770] text-white py-16 px-4 relative overflow-hidden">
        {/* Abstract shapes for visual interest */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl translate-y-10 -translate-x-10" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Encontre seu próximo carro
            </h1>
            <p className="text-blue-100 text-lg md:text-xl font-light leading-relaxed">
              Confira nossa seleção exclusiva de veículos seminovos.
              Qualidade garantida, IPVA pago e revisão em dia.
            </p>
          </div>
        </div>
      </section>

      <VehicleCatalog initialVehicles={dbVehicles} />
    </div>
  );
}
