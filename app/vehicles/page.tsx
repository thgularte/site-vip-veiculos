import { Navigation } from "@/components/navigation";
import { VehicleCatalog } from "@/components/vehicles/vehicle-catalog";
import { vehicles } from "@/lib/vehicles";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Veículos Disponíveis - Carros de Qualidade",
  description:
    "Explore nossa seleção de 21 veículos de qualidade: Chevrolet, Volkswagen, Fiat, Hyundai, Renault, Honda e Ford. Carros seminovos revisados com garantia em Rio Grande - RS.",
  keywords: [
    "carros à venda Rio Grande",
    "Chevrolet usados",
    "Volkswagen seminovos",
    "Fiat usado",
    "Hyundai Rio Grande",
    "Renault usado",
    "Honda seminovo",
    "Ford usado",
    "veículos revisados",
    "carros com garantia",
  ],
  openGraph: {
    title: "Veículos Disponíveis - VipVeículos",
    description:
      "Explore nossa seleção de 21 veículos de qualidade: Chevrolet, Volkswagen, Fiat, Hyundai, Renault, Honda e Ford.",
    url: "https://vipveiculos.com.br/vehicles",
  },
};

export default function VehiclesPage() {
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

      <VehicleCatalog initialVehicles={vehicles} />
    </div>
  );
}
