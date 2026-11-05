"use client";

import { useVehicles } from "@/hooks/use-vehicles";
import { Vehicle } from "@/lib/vehicles";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { VehicleCard } from "@/components/vehicles/vehicle-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Fuel, Gauge, Cog, Check, AlertCircle, Share2, MessageCircle } from "lucide-react";
import Link from "next/link";
import { VehicleActions } from "@/components/vehicles/vehicle-actions";
import { VehicleGallery } from "@/components/vehicles/vehicle-gallery";
import { useMemo } from "react";
import { useToast } from "@/components/ui/use-toast";

interface VehicleDetailViewProps {
  id: number;
  initialVehicle?: Vehicle;
}

export function VehicleDetailView({ id, initialVehicle }: VehicleDetailViewProps) {
  const { toast } = useToast();
  const { vehicles, isLoaded } = useVehicles();

  const vehicle = useMemo(() => {
    if (isLoaded) {
      return vehicles.find((v) => v.id === id);
    }
    return initialVehicle || vehicles.find((v) => v.id === id);
  }, [id, vehicles, isLoaded, initialVehicle]);

  const handleShare = async () => {
    if (!currentVehicle) return;

    const shareData = {
      title: `${currentVehicle.brand} ${currentVehicle.model} - VipVeículos`,
      text: `Confira este ${currentVehicle.brand} ${currentVehicle.model} ${currentVehicle.version} na VipVeículos em Rio Grande - RS!`,
      url: window.location.href,
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User closed share dialog
      }
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copiado!",
          description: "O link deste anúncio foi copiado para a área de transferência.",
        });
      } catch (err) {
        console.error("Falha ao copiar:", err);
      }
    }
  };

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
            <Link href="/veiculos">
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para o Catálogo
            </Link>
          </Button>
        </main>
      </div>
    );
  }

  const currentVehicle = vehicle || initialVehicle;

  const similarVehicles = useMemo(() => {
    if (!currentVehicle) return [];
    const pool = vehicles.filter((v) => v.id !== currentVehicle.id && !v.archived);
    const scored = pool.map((v) => {
      let score = 0;
      if (v.brand.toLowerCase() === currentVehicle.brand.toLowerCase()) score += 3;
      if (Math.abs(v.year - currentVehicle.year) <= 2) score += 2;
      return { vehicle: v, score };
    });
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 3).map((item) => item.vehicle);
  }, [currentVehicle, vehicles]);

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
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      <Navigation />

      <main className="container mx-auto max-w-7xl px-3 sm:px-4 py-6 sm:py-8 pb-28 lg:pb-8 overflow-hidden">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <Link
            href="/veiculos"
            className="inline-flex items-center text-slate-600 hover:text-primary transition-colors font-semibold text-sm group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar para Veículos
          </Link>

          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="border-slate-200 text-slate-700 hover:bg-slate-100 rounded-xl gap-2 text-xs font-semibold h-9"
          >
            <Share2 className="w-3.5 h-3.5 text-primary" />
            <span>Compartilhar</span>
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 w-full max-w-full">
          {/* Left Column: Images */}
          <div className="w-full max-w-full overflow-hidden">
            <VehicleGallery
              image={currentVehicle.image}
              images={currentVehicle.images}
              brand={currentVehicle.brand}
              model={currentVehicle.model}
              extras={currentVehicle.extras}
            />
          </div>

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
                  <Cog className="w-3.5 h-3.5" />
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

        {/* Similar / Related Vehicles */}
        {similarVehicles.length > 0 && (
          <section className="mt-16 pt-12 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
              <div>
                <span className="text-xs font-bold text-[#D60404] uppercase tracking-wider">
                  Você também pode gostar
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#323062] tracking-tight mt-1">
                  Veja outros carros
                </h2>
              </div>
              <Button asChild variant="outline" className="border-slate-300 font-bold hover:bg-slate-100 rounded-xl h-11">
                <Link href="/veiculos">Ver Mais</Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarVehicles.map((simVehicle) => (
                <VehicleCard key={simVehicle.id} vehicle={simVehicle} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />

      {/* Mobile Sticky Bottom Conversion Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 shadow-[0_-4px_25px_rgba(0,0,0,0.1)] flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider truncate">
            {currentVehicle.brand} {currentVehicle.model}
          </div>
          <div className="text-xl font-black text-[#323062] tracking-tight leading-none">
            {currentVehicle.price && currentVehicle.price !== "Consulte" ? currentVehicle.price : "Sob Consulta"}
          </div>
        </div>

        <Button
          asChild
          className="bg-[#25D366] hover:bg-[#1fba59] text-white font-extrabold px-4 py-2.5 h-12 rounded-xl shadow-md shadow-green-500/25 active:scale-95 transition-all shrink-0 flex items-center gap-2 text-sm"
        >
          <a
            href={`https://wa.me/5553984139110?text=${encodeURIComponent(
              `Olá! Estou vendo o ${currentVehicle.brand} ${currentVehicle.model} (${currentVehicle.version}, ${currentVehicle.modelYear}/${currentVehicle.year}) no site e gostaria de mais informações.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Chamar WhatsApp</span>
          </a>
        </Button>
      </div>
    </div>
  );
}
