import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Vehicle } from "@/lib/vehicles";
import { formatGoogleDriveUrl } from "@/lib/drive-helper";
import { Calendar, Fuel, Gauge, Users } from "lucide-react";
import Image from "next/image";

import Link from "next/link";

interface VehicleCardProps {
    vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
    return (
        <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-border/50 bg-white/50 backdrop-blur-sm">
            <div className="relative overflow-hidden">
                <Link href={`/veiculos/${vehicle.id}`}>
                    <Image
                        src={formatGoogleDriveUrl(vehicle.image || "/placeholder.svg")}
                        alt={`${vehicle.brand} ${vehicle.model}`}
                        width={400}
                        height={300}
                        className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </Link>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <Badge className="absolute top-4 left-4 bg-primary/90 hover:bg-primary shadow-lg backdrop-blur-sm border-0">
                    {vehicle.modelYear}/{vehicle.year}
                </Badge>

                {vehicle.extras?.includes("Único dono") && (
                    <Badge className="absolute top-4 right-4 bg-blue-900/90 hover:bg-blue-900 shadow-lg backdrop-blur-sm border-0">
                        Único dono
                    </Badge>
                )}
                {vehicle.extras?.includes("Segundo dono") && (
                    <Badge className="absolute top-4 right-4 bg-indigo-900/90 hover:bg-indigo-900 shadow-lg backdrop-blur-sm border-0">
                        Segundo dono
                    </Badge>
                )}
            </div>

            <CardHeader className="pb-3">
                <div className="space-y-1">
                    <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-primary transition-colors">
                        <Link href={`/veiculos/${vehicle.id}`}>
                            {vehicle.brand} {vehicle.model}
                        </Link>
                    </CardTitle>
                    <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        {vehicle.version}
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        {vehicle.color}
                    </p>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">

                    <div className="flex items-center gap-2.5 text-slate-600 bg-slate-50 p-2 rounded-lg">
                        <Gauge className="w-4 h-4 text-primary/70" />
                        <span className="font-medium">{vehicle.km} km</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-slate-600 bg-slate-50 p-2 rounded-lg">
                        <Fuel className="w-4 h-4 text-primary/70" />
                        <span className="font-medium">{vehicle.fuel}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-slate-600 bg-slate-50 p-2 rounded-lg">
                        <Users className="w-4 h-4 text-primary/70" />
                        <span className="font-medium">{vehicle.transmission}</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-slate-800 text-sm">Destaques</h4>
                        <div className="h-px bg-slate-200 flex-1" />
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {vehicle.features.slice(0, 3).map((feature, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                            >
                                {feature}
                            </span>
                        ))}
                        {vehicle.features.length > 3 && (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                                +{vehicle.features.length - 3}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex gap-2.5 pt-3">
                    <Button
                        asChild
                        className="flex-1 bg-[#323062] hover:bg-[#2A1770] text-white shadow-sm hover:shadow-md h-11 sm:h-12 rounded-xl font-bold text-xs sm:text-sm active:scale-[0.98] transition-all"
                    >
                        <Link href={`/veiculos/${vehicle.id}`}>
                            Ver Detalhes
                        </Link>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        className="flex-1 border-[#25D366]/40 bg-green-50/50 hover:bg-[#25D366] text-green-700 hover:text-white h-11 sm:h-12 rounded-xl font-bold text-xs sm:text-sm active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
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
