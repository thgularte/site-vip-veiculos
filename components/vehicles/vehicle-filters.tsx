import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FilterX } from "lucide-react";

interface FilterState {
    search: string;
    brand: string;
    year: string;
    color: string;
    transmission: string;
    maxKm: string;
    engine: string;
}

interface VehicleFiltersProps {
    filters: FilterState;
    setFilters: (filters: FilterState | ((prev: FilterState) => FilterState)) => void;
    uniqueBrands: string[];
    uniqueColors: string[];
    uniqueYears: number[];
    uniqueTransmissions: string[];
    uniqueEngines: string[];
}

export function VehicleFilters({
    filters,
    setFilters,
    uniqueBrands,
    uniqueColors,
    uniqueYears,
    uniqueTransmissions,
    uniqueEngines,
}: VehicleFiltersProps) {
    const updateFilter = (key: keyof FilterState, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setFilters({
            search: "",
            brand: "all",
            year: "all",
            color: "all",
            transmission: "all",
            maxKm: "all",
            engine: "all",
        });
    };

    const hasActiveFilters = Object.values(filters).some((val) => val !== "all");

    return (
        <div className="space-y-8 p-6 bg-white rounded-xl shadow-sm border border-slate-100 h-fit sticky top-24">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-800">Filtros</h3>
                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 px-2 text-xs"
                    >
                        <FilterX className="w-3.5 h-3.5 mr-1" />
                        Limpar
                    </Button>
                )}
            </div>

            <div className="space-y-6">
                {/* Brand Filter */}
                <div className="space-y-3">
                    <Label className="text-sm font-semibold text-slate-700">Marca</Label>
                    <Select
                        value={filters.brand}
                        onValueChange={(val) => updateFilter("brand", val)}
                    >
                        <SelectTrigger className="w-full bg-slate-50 border-slate-200 focus:ring-primary/20">
                            <SelectValue placeholder="Todas as marcas" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas as marcas</SelectItem>
                            {uniqueBrands.map((brand) => (
                                <SelectItem key={brand} value={brand}>
                                    {brand}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Year Filter */}
                <div className="space-y-3">
                    <Label className="text-sm font-semibold text-slate-700">Ano Mínimo</Label>
                    <Select
                        value={filters.year}
                        onValueChange={(val) => updateFilter("year", val)}
                    >
                        <SelectTrigger className="w-full bg-slate-50 border-slate-200 focus:ring-primary/20">
                            <SelectValue placeholder="Qualquer ano" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Qualquer ano</SelectItem>
                            {uniqueYears.map((year) => (
                                <SelectItem key={year} value={year.toString()}>
                                    A partir de {year}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Transmission Filter */}
                <div className="space-y-3">
                    <Label className="text-sm font-semibold text-slate-700">Câmbio</Label>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="trans-all"
                                checked={filters.transmission === "all"}
                                onCheckedChange={() => updateFilter("transmission", "all")}
                            />
                            <label
                                htmlFor="trans-all"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-600"
                            >
                                Todos
                            </label>
                        </div>
                        {uniqueTransmissions.map((trans) => (
                            <div key={trans} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`trans-${trans}`}
                                    checked={filters.transmission === trans}
                                    onCheckedChange={() => updateFilter("transmission", trans)}
                                />
                                <label
                                    htmlFor={`trans-${trans}`}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-600"
                                >
                                    {trans}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Engine Filter */}
                <div className="space-y-3">
                    <Label className="text-sm font-semibold text-slate-700">Motor</Label>
                    <Select
                        value={filters.engine}
                        onValueChange={(val) => updateFilter("engine", val)}
                    >
                        <SelectTrigger className="w-full bg-slate-50 border-slate-200 focus:ring-primary/20">
                            <SelectValue placeholder="Todos os motores" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos os motores</SelectItem>
                            {uniqueEngines.map((engine) => (
                                <SelectItem key={engine} value={engine}>
                                    {engine}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Mileage Filter */}
                <div className="space-y-3">
                    <Label className="text-sm font-semibold text-slate-700">Km Máximo</Label>
                    <Select
                        value={filters.maxKm}
                        onValueChange={(val) => updateFilter("maxKm", val)}
                    >
                        <SelectTrigger className="w-full bg-slate-50 border-slate-200 focus:ring-primary/20">
                            <SelectValue placeholder="Qualquer km" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Qualquer km</SelectItem>
                            <SelectItem value="10000">Até 10.000 km</SelectItem>
                            <SelectItem value="30000">Até 30.000 km</SelectItem>
                            <SelectItem value="50000">Até 50.000 km</SelectItem>
                            <SelectItem value="80000">Até 80.000 km</SelectItem>
                            <SelectItem value="100000">Até 100.000 km</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Color Filter */}
                <div className="space-y-3">
                    <Label className="text-sm font-semibold text-slate-700">Cor</Label>
                    <Select
                        value={filters.color}
                        onValueChange={(val) => updateFilter("color", val)}
                    >
                        <SelectTrigger className="w-full bg-slate-50 border-slate-200 focus:ring-primary/20">
                            <SelectValue placeholder="Todas as cores" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas as cores</SelectItem>
                            {uniqueColors.map((color) => (
                                <SelectItem key={color} value={color}>
                                    {color}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}
