"use client";

import { useState, useMemo } from "react";
import { Vehicle } from "@/lib/vehicles";
import { useVehicles } from "@/hooks/use-vehicles";
import { VehicleCard } from "./vehicle-card";
import { VehicleFilters } from "./vehicle-filters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Filter, Search, X } from "lucide-react";

interface VehicleCatalogProps {
    initialVehicles: Vehicle[];
}

export function VehicleCatalog({ initialVehicles }: VehicleCatalogProps) {
    const { activeVehicles, isLoaded } = useVehicles();
    const vehiclesSource = useMemo(() => {
        return isLoaded ? activeVehicles : initialVehicles.filter(v => !v.archived);
    }, [isLoaded, activeVehicles, initialVehicles]);

    const [filters, setFilters] = useState({
        search: "",
        brand: "all",
        year: "all",
        color: "all",
        transmission: "all",
        maxKm: "all",
        engine: "all",
    });
    const [sortBy, setSortBy] = useState<string>("default");

    // Calculate unique values for filters based on ALL vehicles
    const uniqueBrands = useMemo(() =>
        Array.from(new Set(vehiclesSource.map((v) => v.brand))).sort(),
        [vehiclesSource]
    );

    const uniqueColors = useMemo(() =>
        Array.from(new Set(vehiclesSource.map((v) => v.color))).sort(),
        [vehiclesSource]
    );

    const uniqueYears = useMemo(() =>
        Array.from(new Set(vehiclesSource.map((v) => v.year))).sort((a, b) => b - a),
        [vehiclesSource]
    );

    const uniqueTransmissions = useMemo(() =>
        Array.from(new Set(vehiclesSource.map((v) => v.transmission))).sort(),
        [vehiclesSource]
    );

    // Extract unique engines (e.g., 1.0, 1.6, 2.0) from version string
    const uniqueEngines = useMemo(() => {
        const engines = new Set<string>();
        vehiclesSource.forEach((v) => {
            const match = v.version.match(/(\d\.\d)/);
            if (match) {
                engines.add(match[0]);
            }
        });
        return Array.from(engines).sort();
    }, [vehiclesSource]);

    // Filter and Sort vehicles
    const processedVehicles = useMemo(() => {
        const filtered = vehiclesSource.filter((vehicle) => {
            // Filter by Search Term
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                const vehicleName = `${vehicle.brand} ${vehicle.model} ${vehicle.version}`.toLowerCase();
                if (!vehicleName.includes(searchLower)) return false;
            }

            // Filter by Brand
            if (filters.brand !== "all" && vehicle.brand !== filters.brand) return false;

            // Filter by Year (minimum year)
            if (filters.year !== "all" && vehicle.year < parseInt(filters.year)) return false;

            // Filter by Color
            if (filters.color !== "all" && vehicle.color !== filters.color) return false;

            // Filter by Transmission
            if (filters.transmission !== "all" && vehicle.transmission !== filters.transmission) return false;

            // Filter by Engine
            if (filters.engine !== "all") {
                if (!vehicle.version.includes(filters.engine)) return false;
            }

            // Filter by Mileage
            if (filters.maxKm !== "all") {
                if (vehicle.km === "Consulte") return false;
                const vehicleKm = parseInt(vehicle.km.replace(/\./g, ""));
                if (isNaN(vehicleKm) || vehicleKm > parseInt(filters.maxKm)) return false;
            }

            return true;
        });

        // Helper helpers to parse numeric values for sorting
        const parsePrice = (priceStr: string) => {
            if (priceStr === "Consulte") return Infinity;
            const cleaned = priceStr.replace(/[^\d]/g, "");
            return cleaned ? parseInt(cleaned) : Infinity;
        };

        const parseKm = (kmStr: string) => {
            if (kmStr === "Consulte") return Infinity;
            const cleaned = kmStr.replace(/[^\d]/g, "");
            return cleaned ? parseInt(cleaned) : Infinity;
        };

        // Apply Sorting
        if (sortBy === "year-desc") {
            filtered.sort((a, b) => b.year - a.year);
        } else if (sortBy === "year-asc") {
            filtered.sort((a, b) => a.year - b.year);
        } else if (sortBy === "km-asc") {
            filtered.sort((a, b) => parseKm(a.km) - parseKm(b.km));
        } else if (sortBy === "brand-asc") {
            filtered.sort((a, b) => `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`));
        } else if (sortBy === "price-asc") {
            filtered.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        } else if (sortBy === "price-desc") {
            filtered.sort((a, b) => {
                const priceA = parsePrice(a.price);
                const priceB = parsePrice(b.price);
                if (priceA === Infinity) return 1;
                if (priceB === Infinity) return -1;
                return priceB - priceA;
            });
        }

        return filtered;
    }, [vehiclesSource, filters, sortBy]);

    return (
        <div className="container mx-auto max-w-7xl px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">

                {/* Mobile Filter Sheet */}
                <div className="lg:hidden mb-5">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button className="w-full bg-[#323062] hover:bg-[#2A1770] text-white font-extrabold h-14 rounded-xl shadow-lg flex items-center justify-center gap-2.5 text-base active:scale-[0.99] transition-all">
                                <Filter className="h-5 w-5 text-[#D60404]" />
                                <span>Filtrar Veículos ({processedVehicles.length} {processedVehicles.length === 1 ? 'resultado' : 'resultados'})</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[88vw] sm:w-[540px] overflow-y-auto p-6 bg-white">
                            <div className="pb-4 mb-4 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="text-xl font-bold text-[#323062]">Filtros de Busca</h3>
                            </div>
                            <VehicleFilters
                                filters={filters}
                                setFilters={setFilters}
                                uniqueBrands={uniqueBrands}
                                uniqueColors={uniqueColors}
                                uniqueYears={uniqueYears}
                                uniqueTransmissions={uniqueTransmissions}
                                uniqueEngines={uniqueEngines}
                            />
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Desktop Sidebar */}
                <aside className="hidden lg:block w-72 shrink-0">
                    <VehicleFilters
                        filters={filters}
                        setFilters={setFilters}
                        uniqueBrands={uniqueBrands}
                        uniqueColors={uniqueColors}
                        uniqueYears={uniqueYears}
                        uniqueTransmissions={uniqueTransmissions}
                        uniqueEngines={uniqueEngines}
                    />
                </aside>

                {/* Main Grid */}
                <main className="flex-1">
                    <div className="mb-6 space-y-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <Input
                                placeholder="Buscar por marca, modelo ou versão..."
                                className="pl-12 pr-10 bg-white border-slate-200 shadow-sm focus:border-[#D60404] h-12 rounded-xl text-base"
                                value={filters.search}
                                onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                            />
                            {filters.search && (
                                <button
                                    type="button"
                                    onClick={() => setFilters((prev) => ({ ...prev, search: "" }))}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                                    aria-label="Limpar busca"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>

                        {/* Active Filters Pills */}
                        {(Boolean(filters.search.trim()) ||
                          filters.brand !== "all" ||
                          filters.year !== "all" ||
                          filters.color !== "all" ||
                          filters.transmission !== "all" ||
                          filters.maxKm !== "all" ||
                          filters.engine !== "all") && (
                            <div className="flex flex-wrap items-center gap-2 pt-1">
                                <span className="text-xs font-semibold text-slate-500">Filtros ativos:</span>
                                {filters.search.trim() && (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                                        Busca: "{filters.search}"
                                        <button
                                            onClick={() => setFilters((prev) => ({ ...prev, search: "" }))}
                                            className="hover:text-red-500"
                                            aria-label="Remover busca"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}
                                {filters.brand !== "all" && (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                                        Marca: {filters.brand}
                                        <button
                                            onClick={() => setFilters((prev) => ({ ...prev, brand: "all" }))}
                                            className="hover:text-red-500"
                                            aria-label="Remover filtro de marca"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}
                                {filters.year !== "all" && (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                                        A partir de: {filters.year}
                                        <button
                                            onClick={() => setFilters((prev) => ({ ...prev, year: "all" }))}
                                            className="hover:text-red-500"
                                            aria-label="Remover filtro de ano"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}
                                {filters.color !== "all" && (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                                        Cor: {filters.color}
                                        <button
                                            onClick={() => setFilters((prev) => ({ ...prev, color: "all" }))}
                                            className="hover:text-red-500"
                                            aria-label="Remover filtro de cor"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}
                                {filters.transmission !== "all" && (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                                        Câmbio: {filters.transmission}
                                        <button
                                            onClick={() => setFilters((prev) => ({ ...prev, transmission: "all" }))}
                                            className="hover:text-red-500"
                                            aria-label="Remover filtro de câmbio"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}
                                {filters.engine !== "all" && (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                                        Motor: {filters.engine}
                                        <button
                                            onClick={() => setFilters((prev) => ({ ...prev, engine: "all" }))}
                                            className="hover:text-red-500"
                                            aria-label="Remover filtro de motor"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}
                                {filters.maxKm !== "all" && (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                                        Até {parseInt(filters.maxKm).toLocaleString('pt-BR')} km
                                        <button
                                            onClick={() => setFilters((prev) => ({ ...prev, maxKm: "all" }))}
                                            className="hover:text-red-500"
                                            aria-label="Remover filtro de quilometragem"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}
                                <button
                                    onClick={() => {
                                        setFilters({
                                            search: "",
                                            brand: "all",
                                            year: "all",
                                            color: "all",
                                            transmission: "all",
                                            maxKm: "all",
                                            engine: "all",
                                        });
                                        setSortBy("default");
                                    }}
                                    className="text-xs text-red-600 hover:underline font-semibold ml-1"
                                >
                                    Limpar todos
                                </button>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                            <h2 className="text-lg sm:text-2xl font-bold text-slate-800">
                                {processedVehicles.length} {processedVehicles.length === 1 ? 'veículo disponível' : 'veículos disponíveis'}
                            </h2>
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <span className="text-xs sm:text-sm font-semibold text-slate-500 shrink-0">Ordenar:</span>
                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger className="w-full sm:w-[220px] bg-white border-slate-200 font-medium">
                                        <SelectValue placeholder="Padrão" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="default">Padrão</SelectItem>
                                        <SelectItem value="year-desc">Ano: Mais novos</SelectItem>
                                        <SelectItem value="year-asc">Ano: Mais antigos</SelectItem>
                                        <SelectItem value="km-asc">Menor KM</SelectItem>
                                        <SelectItem value="brand-asc">Marca: A-Z</SelectItem>
                                        <SelectItem value="price-asc">Menor Preço</SelectItem>
                                        <SelectItem value="price-desc">Maior Preço</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {processedVehicles.length > 0 ? (
                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {processedVehicles.map((vehicle) => (
                                <VehicleCard key={vehicle.id} vehicle={vehicle} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                            <p className="text-lg text-slate-500 font-medium">
                                Nenhum veículo encontrado com os filtros selecionados.
                            </p>
                            <Button
                                variant="link"
                                onClick={() => {
                                    setFilters({
                                        search: "",
                                        brand: "all",
                                        year: "all",
                                        color: "all",
                                        transmission: "all",
                                        maxKm: "all",
                                        engine: "all",
                                    });
                                    setSortBy("default");
                                }}
                                className="text-primary mt-2"
                            >
                                Limpar todos os filtros
                            </Button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
