import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { VehicleCatalog } from "@/components/vehicles/vehicle-catalog";
import { VehicleAppInstallModal } from "@/components/vehicles/vehicle-app-install-modal";
import { getVehicles } from "@/lib/supabase-db";
import { Metadata } from "next";
import { breadcrumbSchema, BASE_URL } from "@/lib/schemas";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Carros Usados e Seminovos em Rio Grande - RS | Estoque VipVeículos",
  description:
    "Procurando carros em Rio Grande - RS? Confira nosso estoque atualizado de Ford, Chevrolet, Volkswagen, Fiat, Hyundai e Toyota seminovos revisados e com garantia.",
  alternates: {
    canonical: `${BASE_URL}/veiculos`,
  },
  keywords: [
    "carros usados em Rio Grande",
    "carros seminovos Rio Grande RS",
    "comprar carro em Rio Grande",
    "Ford Ka em Rio Grande",
    "Ford usado Rio Grande",
    "Chevrolet seminovos Rio Grande",
    "Volkswagen usados Rio Grande",
    "Fiat Rio Grande",
    "loja de carros Rio Grande RS",
    "VipVeículos",
  ],
  openGraph: {
    title: "Carros Usados e Seminovos em Rio Grande - RS | VipVeículos",
    description:
      "Explore nosso estoque de veículos seminovos e usados revisados com garantia e procedência em Rio Grande - RS.",
    url: `${BASE_URL}/veiculos`,
  },
};

export default async function VehiclesPage() {
  let dbVehicles: any[] = [];
  try {
    dbVehicles = await getVehicles();
  } catch (e) {
    console.error("Error loading vehicles for catalog page:", e);
  }

  const breadcrumbsJsonLd = breadcrumbSchema([
    { name: "Início", url: BASE_URL },
    { name: "Carros Usados em Rio Grande", url: `${BASE_URL}/veiculos` },
  ]);

  return (
    <div className="min-h-screen bg-slate-50">
      <VehicleAppInstallModal />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbsJsonLd),
        }}
      />
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-r from-[#323062] to-[#2A1770] text-white py-16 px-4 relative overflow-hidden">
        {/* Abstract shapes for visual interest */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl translate-y-10 -translate-x-10" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Carros Seminovos em Rio Grande - RS
            </h1>
            <p className="text-blue-100 text-lg md:text-xl font-light leading-relaxed">
              Confira nossa seleção exclusiva de veículos revisados com procedência e garantia.
            </p>
          </div>
        </div>
      </section>

      <VehicleCatalog initialVehicles={dbVehicles} />
      <Footer />
    </div>
  );
}
