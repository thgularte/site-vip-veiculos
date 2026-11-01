import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Vehicle } from "@/lib/vehicles";
import { formatGoogleDriveUrl } from "@/lib/drive-helper";
import { Calendar, Fuel, Gauge, Cog } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface VehicleCardProps {
    vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
    const isConsultPrice = !vehicle.price || vehicle.price === "Consulte";

    return (
        <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-border/50 bg-white/50 backdrop-blur-sm flex flex-col justify-between">
            <div>
                <div className="relative overflow-hidden aspect-[16/10] max-h-[220px] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
                    <Link href={`/veiculos/${vehicle.id}`} className="relative block w-full h-full flex items-center justify-center">
                        {/* Fundo borrado sutil para harmonia */}
                        <div className="absolute inset-0 -z-10 opacity-35 blur-xl scale-110 pointer-events-none">
                            <Image
                                src={formatGoogleDriveUrl(vehicle.image || "/placeholder.svg")}
                                alt=""
                                fill
                                aria-hidden="true"
                                className="object-cover"
                            />
                        </div>

                        {/* Imagem do carro adaptada 100% sem cortes e em tamanho mais compacto */}
                        <Image
                            src={formatGoogleDriveUrl(vehicle.image || "/placeholder.svg")}
                            alt={`${vehicle.brand} ${vehicle.model}`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                        />
                    </Link>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <Badge className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#323062]/90 hover:bg-[#323062] text-white shadow-md backdrop-blur-sm border-0 font-bold text-xs">
                        {vehicle.modelYear}/{vehicle.year}
                    </Badge>

                    {vehicle.extras?.includes("Único dono") && (
                        <Badge className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-blue-900/90 hover:bg-blue-900 text-white shadow-md backdrop-blur-sm border-0 text-xs">
                            Único dono
                        </Badge>
                    )}
                    {vehicle.extras?.includes("Segundo dono") && (
                        <Badge className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-indigo-900/90 hover:bg-indigo-900 text-white shadow-md backdrop-blur-sm border-0 text-xs">
                            Segundo dono
                        </Badge>
                    )}
                </div>

                <CardHeader className="pb-2">
                    <div className="space-y-1">
                        <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-primary transition-colors leading-tight">
                            <Link href={`/veiculos/${vehicle.id}`}>
                                {vehicle.brand} {vehicle.model}
                            </Link>
                        </CardTitle>
                        <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
                            <span>{vehicle.version}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-300" />
                            <span>{vehicle.color}</span>
                        </p>
                    </div>

                    {/* Vehicle Price Display */}
                    <div className="pt-3">
                        <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">
                            {isConsultPrice ? "Condição" : "Valor à vista"}
                        </span>
                        <span className="text-2xl font-black text-[#323062] tracking-tight">
                            {isConsultPrice ? "Sob Consulta" : vehicle.price}
                        </span>
                    </div>
                </CardHeader>
            </div>

            <CardContent className="space-y-5 pt-0">
                {/* 4-item balanced specs grid */}
                <div className="grid grid-cols-2 gap-2.5 text-xs sm:text-sm">
                    <div className="flex items-center gap-2 text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100/80">
                        <Calendar className="w-4 h-4 text-primary shrink-0" />
                        <span className="font-semibold truncate">{vehicle.modelYear}/{vehicle.year}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100/80">
                        <Gauge className="w-4 h-4 text-primary shrink-0" />
                        <span className="font-semibold truncate">{vehicle.km} km</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100/80">
                        <Fuel className="w-4 h-4 text-primary shrink-0" />
                        <span className="font-semibold truncate">{vehicle.fuel}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100/80">
                        <Cog className="w-4 h-4 text-primary shrink-0" />
                        <span className="font-semibold truncate">{vehicle.transmission}</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-slate-700 text-xs uppercase tracking-wider">Destaques</h4>
                        <div className="h-px bg-slate-200 flex-1" />
                    </div>
                    <div className="flex flex-wrap gap-1.5 min-h-[26px]">
                        {vehicle.features.slice(0, 3).map((feature, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/60"
                            >
                                {feature}
                            </span>
                        ))}
                        {vehicle.features.length > 3 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-red-50 text-red-700 border border-red-100">
                                +{vehicle.features.length - 3}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex gap-2.5 pt-2">
                    <Button
                        asChild
                        className="flex-1 bg-[#323062] hover:bg-[#2A1770] text-white shadow-sm hover:shadow-md h-11 rounded-xl font-bold text-xs sm:text-sm active:scale-[0.98] transition-all"
                    >
                        <Link href={`/veiculos/${vehicle.id}`}>
                            Ver Detalhes
                        </Link>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        className="flex-1 border-[#25D366]/40 bg-green-50/60 hover:bg-[#25D366] text-green-700 hover:text-white h-11 rounded-xl font-bold text-xs sm:text-sm active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
                    >
                        <a
                            href={`https://wa.me/5553984139110?text=${encodeURIComponent(`Olá! Tenho interesse no ${vehicle.brand} ${vehicle.model} ${vehicle.version} (${vehicle.modelYear}/${vehicle.year}). Gostaria de mais informações.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span>WhatsApp</span>
                        </a>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
