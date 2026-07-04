"use client";

import { useVehicles } from "@/hooks/use-vehicles";
import { Vehicle } from "@/lib/vehicles";
import { Navigation } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Fuel, Gauge, Users, Check, AlertCircle } from "lucide-react";
import Link from "next/link";
import { VehicleActions } from "@/components/vehicles/vehicle-actions";
import { VehicleGallery } from "@/components/vehicles/vehicle-gallery";
import { useMemo } from "react";

interface VehicleDetailViewProps {
  id: number;
  initialVehicle?: Vehicle;
}

export function VehicleDetailView({ id, initialVehicle }: VehicleDetailViewProps) {
  const { vehicles, isLoaded } = useVehicles();

  const vehicle = useMemo(() => {
    if (isLoaded) {
      return vehicles.find((v) => v.id === id);
    }
    return initialVehicle || vehicles.find((v) => v.id === id);
  }, [id, vehicles, isLoaded, initialVehicle]);

  if (isLoaded && !vehicle && !initialVehicle) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navigation />
        <main className="container mx-auto max-w-4xl px-4 py-16 text-center flex-1 flex flex-col items-center justify-center">
          <AlertCircle className="w-16 h-16 text-slate-300 mb-4 animate-bounce" />
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
            Veículo Não Encontrado
          </h1>
          <p className="text-slate-600 mb-8 max-w-md">
            O veículo que você está procurando pode ter sido removido, arquivado ou o endereço digitado está incorreto.
          </p>
          <Button asChild className="bg-[#D60404] hover:bg-[#A81818] text-white">
            <Link href="/vehicles">
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para o Catálogo
            </Link>
          </Button>
        </main>
      </div>
    );
  }

  const currentVehicle = vehicle || initialVehicle;

  if (!currentVehicle) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navigation />
        <main className="container mx-auto max-w-7xl px-4 py-16 text-center">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-slate-200 rounded w-1/3 mx-auto"></div>
            <div className="h-96 bg-slate-200 rounded-xl max-w-4xl mx-auto"></div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <main className="container mx-auto max-w-7xl px-4 py-8">
        <Link
          href="/vehicles"
          className="inline-flex items-center text-slate-600 hover:text-primary mb-6 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para Veículos
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column: Images */}
          <VehicleGallery
            image={currentVehicle.image}
            images={currentVehicle.images}
            brand={currentVehicle.brand}
            model={currentVehicle.model}
            extras={currentVehicle.extras}
          />

          {/* Right Column: Info & Details */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                {currentVehicle.brand} {currentVehicle.model}
              </h1>
              <div className="flex items-center gap-3 mt-2">
                <Badge variant="secondary" className="text-sm font-medium">
                  {currentVehicle.version}
                </Badge>
                <span className="text-slate-400">•</span>
                <span className="text-slate-600 font-medium">{currentVehicle.color}</span>
                {currentVehicle.archived && (
                  <Badge variant="destructive" className="bg-amber-500 text-white">
                    Arquivado
                  </Badge>
                )}
              </div>
            </div>

            {/* Key Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                  <Calendar className="w-3.5 h-3.5" />
                  Ano
                </div>
                <p className="font-semibold text-slate-900">
                  {currentVehicle.modelYear}/{currentVehicle.year}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                  <Gauge className="w-3.5 h-3.5" />
                  Km
                </div>
                <p className="font-semibold text-slate-900">{currentVehicle.km}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                  <Users className="w-3.5 h-3.5" />
                  Câmbio
                </div>
                <p className="font-semibold text-slate-900">{currentVehicle.transmission}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                  <Fuel className="w-3.5 h-3.5" />
                  Combustível
                </div>
                <p className="font-semibold text-slate-900">{currentVehicle.fuel}</p>
              </div>
            </div>

            {/* Description */}
            <Card className="p-6 border-slate-100 shadow-sm bg-white/50">
              <h3 className="font-semibold text-lg text-slate-900 mb-3">Sobre o veículo</h3>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {currentVehicle.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {currentVehicle.extras?.map((extra) => (
                  <Badge
                    key={extra}
                    variant="outline"
                    className="border-primary/20 text-primary bg-primary/5"
                  >
                    <Check className="w-3 h-3 mr-1" /> {extra}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Features */}
            {currentVehicle.features && currentVehicle.features.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-slate-900">Itens e Opcionais</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {currentVehicle.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-sm text-slate-700 bg-white p-2.5 rounded-lg border border-slate-100"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <VehicleActions vehicle={currentVehicle} />
          </div>
        </div>
      </main>
    </div>
  );
}
