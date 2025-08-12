import { Navigation } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Fuel, Gauge, Search, Users } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

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

const vehicles = [
  {
    id: 1,
    brand: "Volkswagen",
    model: "Gol",
    version: "1.0 Trendline",
    year: 2017,
    modelYear: 2016,
    price: "Consulte",
    fuel: "Flex",
    km: "118.000",
    transmission: "Manual",
    color: "Vermelho",
    image: "/placeholder.svg?height=300&width=400",
    features: [
      "Direção Hidráulica",
      "Trava Elétrica",
      "Vidros Elétricos",
      "Ar Condicionado",
      "IPVA Pago",
      "Revisão em Dia",
    ],
    description:
      "Veículo completo com direção hidráulica, trava e vidros elétricos e com ar condicionado.",
    extras: ["Aceitamos troca"],
  },
  {
    id: 2,
    brand: "Volkswagen",
    model: "Fox",
    version: "Extreme 1.6",
    year: 2020,
    modelYear: 2020,
    price: "Consulte",
    fuel: "Flex",
    km: "Consulte",
    transmission: "Manual",
    color: "Vermelho",
    image: "/placeholder.svg?height=300&width=400",
    features: [
      "Travas Elétricas",
      "Vidros Elétricos",
      "Farol Auxiliar",
      "Farol de Neblina",
      "Direção Hidráulica",
      "Rodas Diamantadas",
      "IPVA Pago",
      "Revisão em Dia",
    ],
    description:
      "Veículo com travas e vidros elétricos, com farol auxiliar e de neblina. Com direção hidráulica e rodas diamantadas.",
    extras: ["Aceitamos troca"],
  },
  {
    id: 3,
    brand: "Renault",
    model: "Sandero",
    version: "Intense 1.6",
    year: 2020,
    modelYear: 2020,
    price: "Consulte",
    fuel: "Flex",
    km: "Consulte",
    transmission: "Manual",
    color: "Branco",
    image: "/placeholder.svg?height=300&width=400",
    features: [
      "Direção Hidráulica",
      "Rodas Liga Leve",
      "Bancos Misto Couro/Tecido",
      "IPVA Pago",
      "Revisão em Dia",
    ],
    description:
      "Veículo com direção hidráulica e rodas liga leve. Com bancos misto de couro e tecido.",
    extras: ["Aceitamos troca"],
  },
  {
    id: 4,
    brand: "Fiat",
    model: "Palio",
    version: "EVO Essence 1.6",
    year: 2016,
    modelYear: 2015,
    price: "Consulte",
    fuel: "Flex",
    km: "Consulte",
    transmission: "Manual",
    color: "Cinza",
    image: "/placeholder.svg?height=300&width=400",
    features: [
      "Travas Elétricas",
      "Vidros Elétricos",
      "Som Original Fiat",
      "Freios ABS",
      "Direção Hidráulica",
      "Rodas Liga Leve",
      "4 Pneus Novos",
      "IPVA Pago",
      "Revisão em Dia",
    ],
    description:
      "Veículo com travas e vidros elétricos, com som original Fiat. E freios ABS e com direção hidráulica, rodas de liga leve mais 04 pneus novos.",
    extras: ["Segundo dono", "Aceitamos troca"],
  },
  {
    id: 5,
    brand: "Fiat",
    model: "Strada",
    version: "Freedom 1.4",
    year: 2020,
    modelYear: 2020,
    price: "Consulte",
    fuel: "Flex",
    km: "Consulte",
    transmission: "Manual",
    color: "Preto",
    image: "/placeholder.svg?height=300&width=400",
    features: [
      "4X2",
      "Freios ABS",
      "Rodas Liga Leve",
      "4 Pneus Novos",
      "Direção Hidráulica",
      "Câmbio Manual",
      "IPVA Pago",
      "Revisão em Dia",
    ],
    description:
      "Veículo 4X2, com freios ABS e rodas de liga leve. e 04 pneus novos. Direção hidráulica com câmbio manual.",
    extras: ["Aceitamos troca"],
  },
  {
    id: 6,
    brand: "Hyundai",
    model: "HB20S",
    version: "Sedan Comfort Plus 1.6",
    year: 2015,
    modelYear: 2014,
    price: "Consulte",
    fuel: "Flex",
    km: "Consulte",
    transmission: "Manual",
    color: "Branco",
    image: "/placeholder.svg?height=300&width=400",
    features: [
      "Direção Hidráulica",
      "Rodas Liga Leve",
      "Controle Som Volante",
      "Travas Elétricas",
      "Vidros Elétricos",
      "IPVA Pago",
      "Revisão em Dia",
    ],
    description:
      "Veículo de direção hidráulica, com rodas de liga leve. Controle de som no volante, travas e vidros elétricos.",
    extras: ["Aceitamos troca"],
  },
  {
    id: 7,
    brand: "Chevrolet",
    model: "Prisma",
    version: "LTZ 1.4",
    year: 2014,
    modelYear: 2013,
    price: "Consulte",
    fuel: "Flex",
    km: "Consulte",
    transmission: "Automático",
    color: "Prata",
    image: "/placeholder.svg?height=300&width=400",
    features: [
      "Câmbio Automático",
      "Rodas Liga Leve",
      "Direção Hidráulica",
      "Ar Condicionado",
      "Travas Elétricas",
      "Vidros Elétricos",
      "IPVA Pago",
      "Revisão em Dia",
    ],
    description:
      "Veículo de câmbio automático, com rodas de liga leve e direção hidráulica. Com ar condicionando quente e frio, com travas e vidros elétricos.",
    extras: ["Aceitamos troca"],
  },
  {
    id: 8,
    brand: "Chevrolet",
    model: "Cruze",
    version: "LTZ Turbo 1.4",
    year: 2017,
    modelYear: 2016,
    price: "Consulte",
    fuel: "Flex",
    km: "Consulte",
    transmission: "Automático",
    color: "Preto",
    image: "/placeholder.svg?height=300&width=400",
    features: [
      "Câmbio Automático",
      "Rodas Liga Leve",
      "Direção Elétrica",
      "Freios ABS",
      "Retrovisor Elétrico",
      "Bancos Couro Ecológico",
      "IPVA Pago",
      "Revisão em Dia",
    ],
    description:
      "Veículo de câmbio automático, com rodas de liga leve e direção elétrica. Com freios abs, e retrovisor elétrico, com os bancos de couro ecológico.",
    extras: ["Segundo dono", "Aceitamos troca"],
  },
  {
    id: 9,
    brand: "Chevrolet",
    model: "Onix",
    version: "Hatch Active 1.4",
    year: 2017,
    modelYear: 2016,
    price: "Consulte",
    fuel: "Flex",
    km: "Consulte",
    transmission: "Manual",
    color: "Vermelho",
    image: "/placeholder.svg?height=300&width=400",
    features: [
      "Direção Hidráulica",
      "Câmbio Manual",
      "Rodas Liga Diamantadas",
      "Travas Elétricas",
      "Vidros Elétricos",
      "IPVA Pago",
      "Revisão em Dia",
    ],
    description:
      "Veículo de direção hidráulica, com câmbio manual. Rodas de liga diamantadas, travas e vidros elétricos.",
    extras: ["Aceitamos troca"],
  },
  {
    id: 10,
    brand: "Chevrolet",
    model: "Onix",
    version: "Sedan Plus 1.0 Turbo",
    year: 2022,
    modelYear: 2022,
    price: "Consulte",
    fuel: "Flex",
    km: "Consulte",
    transmission: "Automático",
    color: "Branco",
    image: "/placeholder.svg?height=300&width=400",
    features: [
      "Sensor Estacionamento",
      "Rodas Liga Leve",
      "Câmbio Automático",
      "Travas Elétricas",
      "Vidros Elétricos",
      "Kit Multimídia",
      "Controle Mídia Volante",
      "IPVA Pago",
      "Revisão em Dia",
    ],
    description:
      "Veículo com sensor de estacionamento, rodas de liga leve e câmbio automático. Trava e vidros elétricos, kit multimidia e controle de midia no volante.",
    extras: ["Aceitamos troca"],
  },
  {
    id: 11,
    brand: "Chevrolet",
    model: "Tracker",
    version: "Premier 1.2 Turbo",
    year: 2022,
    modelYear: 2021,
    price: "Consulte",
    fuel: "Flex",
    km: "Consulte",
    transmission: "Automático",
    color: "Prata",
    image: "/placeholder.svg?height=300&width=400",
    features: [
      "Câmbio Automático",
      "Direção Elétrica",
      "Freios ABS",
      "Controle Som Volante",
      "Bancos Couro Ecológico",
      "Rodas Liga Leve",
      "IPVA Pago",
      "Revisão em Dia",
    ],
    description:
      "Veículo de câmbio automático, direção elétrica e freios ABS. Com controle de som no volante, bancos em couro ecológico e rodas de liga leve.",
    extras: ["Único dono", "Aceitamos troca"],
  },
  {
    id: 12,
    brand: "Renault",
    model: "Duster",
    version: "Dakar 1.6",
    year: 2016,
    modelYear: 2016,
    price: "Consulte",
    fuel: "Flex",
    km: "Consulte",
    transmission: "Manual",
    color: "Branco",
    image: "/placeholder.svg?height=300&width=400",
    features: [
      "Câmbio Manual",
      "Direção Hidráulica",
      "Rodas Liga Leve",
      "Bancos Couro Ecológico",
      "Computador Bordo",
      "Câmera de Ré",
      "IPVA Pago",
      "Revisão em Dia",
    ],
    description:
      "Veículo de câmbio manual, com direção hidráulica com rodas de liga leve. Com bancos em couro/ecológico, computador de bordo e direção de ré.",
    extras: ["Aceitamos troca"],
  },
  {
    id: 13,
    brand: "Volkswagen",
    model: "Polo",
    version: "1.6",
    year: 2020,
    modelYear: 2019,
    price: "Consulte",
    fuel: "Flex",
    km: "Consulte",
    transmission: "Manual",
    color: "Branco",
    image: "/placeholder.svg?height=300&width=400",
    features: [
      "Câmbio Manual",
      "Direção Hidráulica",
      "Rodas Liga Leve",
      "Freios ABS",
      "Ar Condicionado",
      "Travas Elétricas",
      "Vidros Elétricos",
      "IPVA Pago",
      "Revisão em Dia",
    ],
    description:
      "Veículo de câmbio manual, com direção hidráulica com rodas de liga leve e freios Abs. Com ar condicionado, travas e vidros elétricos.",
    extras: ["Aceitamos troca"],
  },
  {
    id: 14,
    brand: "Renault",
    model: "Captur",
    version: "Intense 1.6",
    year: 2020,
    modelYear: 2019,
    price: "Consulte",
    fuel: "Flex",
    km: "Consulte",
    transmission: "Automático",
    color: "Prata",
    image: "/placeholder.svg?height=300&width=400",
    features: [
      "Câmbio Automático",
      "Direção Elétrica",
      "Rodas Diamantadas",
      "Câmera de Ré",
      "Freios ABS",
      "IPVA Pago",
      "Revisão em Dia",
    ],
    description:
      "Veículo de câmbio automático, direção elétrica. Rodas diamantadas, com camera de ré e freios Abs.",
    extras: ["Aceitamos troca"],
  },
  {
    id: 15,
    brand: "Chevrolet",
    model: "Spin",
    version: "Activate 1.8",
    year: 2017,
    modelYear: 2017,
    price: "Consulte",
    fuel: "Flex",
    km: "Consulte",
    transmission: "Automático",
    color: "Preto",
    image: "/placeholder.svg?height=300&width=400",
    features: [
      "Freios ABS",
      "Direção Hidráulica",
      "Câmbio Automático",
      "Retrovisores Elétricos",
      "Travas Elétricas",
      "Vidros Elétricos",
      "IPVA Pago",
      "Revisão em Dia",
    ],
    description:
      "Veículo com freios Abs, direção hidráulica de câmbio automático. Retrovisores, travas e vidros elétricos.",
    extras: ["Aceitamos troca"],
  },
  {
    id: 16,
    brand: "Fiat",
    model: "Grand Siena",
    version: "Essence 1.6",
    year: 2014,
    modelYear: 2014,
    price: "Consulte",
    fuel: "Flex",
    km: "Consulte",
    transmission: "Manual",
    color: "Branco",
    image: "/placeholder.svg?height=300&width=400",
    features: [
      "Câmbio Manual",
      "Rodas Liga Leve",
      "Mídia 2Din Original",
      "IPVA Pago",
      "Revisão em Dia",
    ],
    description:
      "Veículo de câmbio manual, com rodas de liga leve e mídia 2Din original.",
    extras: ["Aceitamos troca"],
  },
  {
    id: 17,
    brand: "Hyundai",
    model: "Creta",
    version: "Limited 1.0",
    year: 2022,
    modelYear: 2021,
    price: "Consulte",
    fuel: "Flex",
    km: "Consulte",
    transmission: "Automático",
    color: "Branco",
    image: "/placeholder.svg?height=300&width=400",
    features: [
      "Câmbio Automático",
      "Computador Bordo",
      "Piloto Automático",
      "Rodas Liga Leve",
      "Sensor Estacionamento",
      "IPVA Pago",
      "Revisão em Dia",
    ],
    description:
      "Veículo de câmbio automático, com computador de bordo e piloto automático. Com rodas de liga leve e sensor de estacionamento.",
    extras: ["Segundo dono", "Aceitamos troca"],
  },
  {
    id: 18,
    brand: "Renault",
    model: "Kwid",
    version: "Zen 1.0",
    year: 2024,
    modelYear: 2023,
    price: "Consulte",
    fuel: "Flex",
    km: "Consulte",
    transmission: "Manual",
    color: "Branco",
    image: "/placeholder.svg?height=300&width=400",
    features: [
      "Câmbio Manual",
      "Ar Condicionado",
      "Direção Hidráulica",
      "Desembaçador Traseiro",
      "Travas Elétricas",
      "Vidros Elétricos",
      "IPVA Pago",
      "Revisão em Dia",
    ],
    description:
      "Veículo de câmbio manual, ar condicionado e direção hidráulica. Com desembaçador traseiro, trava e vidros elétricos.",
    extras: ["Único dono", "Aceitamos troca"],
  },
  {
    id: 19,
    brand: "Ford",
    model: "Ka",
    version: "SE Plus 1.5",
    year: 2024,
    modelYear: 2023,
    price: "Consulte",
    fuel: "Flex",
    km: "Consulte",
    transmission: "Manual",
    color: "Prata",
    image: "/placeholder.svg?height=300&width=400",
    features: [
      "Câmbio Manual",
      "Ar Condicionado",
      "Direção Hidráulica",
      "Desembaçador Traseiro",
      "Travas Elétricas",
      "Vidros Elétricos",
      "IPVA Pago",
      "Revisão em Dia",
    ],
    description:
      "Veículo de câmbio manual, ar condicionado e direção hidráulica. Com desembaçador traseiro, trava e vidros elétricos.",
    extras: ["Aceitamos troca"],
  },
  {
    id: 20,
    brand: "Honda",
    model: "Fit",
    version: "LX 1.5",
    year: 2020,
    modelYear: 2020,
    price: "Consulte",
    fuel: "Flex",
    km: "Consulte",
    transmission: "Automático",
    color: "Branco",
    image: "/placeholder.svg?height=300&width=400",
    features: [
      "Câmbio Automático",
      "Freios ABS",
      "Direção Hidráulica",
      "4 Pneus Novos",
      "Rodas Liga Leve",
      "IPVA Pago",
      "Revisão em Dia",
    ],
    description:
      "Veículo de câmbio automático, freios abs e direção hidráulica. Com 04 pneus novos e rodas de liga leve.",
    extras: ["Aceitamos troca"],
  },
  {
    id: 21,
    brand: "Fiat",
    model: "Idea",
    version: "Attract 1.4",
    year: 2016,
    modelYear: 2015,
    price: "Consulte",
    fuel: "Flex",
    km: "Consulte",
    transmission: "Manual",
    color: "Preto",
    image: "/placeholder.svg?height=300&width=400",
    features: [
      "Câmbio Manual",
      "Ar Condicionado",
      "Direção Hidráulica",
      "Rodas Liga Leve",
      "4 Pneus Novos",
      "IPVA Pago",
      "Revisão em Dia",
    ],
    description:
      "Veículo de câmbio manual, ar condicionado e direção hidráulica. Com rodas de liga leve e 04 pneus novos.",
    extras: ["Segundo dono", "Aceitamos troca"],
  },
];

export default function VehiclesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-r from-[#323062] to-[#2A1770] text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Veículos Disponíveis</h1>
            <p className="text-[#B9B9B9] text-lg">
              Confira nossa seleção atual de veículos usados de qualidade. Todos
              com IPVA pago, revisão em dia e aceitamos troca
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 bg-gray-50 border-b">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-[#B9B9B9]" />
              <Input
                placeholder="Buscar por marca ou modelo..."
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Marca" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="chevrolet">Chevrolet</SelectItem>
                <SelectItem value="fiat">Fiat</SelectItem>
                <SelectItem value="volkswagen">Volkswagen</SelectItem>
                <SelectItem value="hyundai">Hyundai</SelectItem>
                <SelectItem value="renault">Renault</SelectItem>
                <SelectItem value="honda">Honda</SelectItem>
                <SelectItem value="ford">Ford</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Ano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
                <SelectItem value="2020">2020</SelectItem>
                <SelectItem value="2019">2019</SelectItem>
                <SelectItem value="2018">2018</SelectItem>
                <SelectItem value="2017">2017</SelectItem>
                <SelectItem value="2016">2016</SelectItem>
                <SelectItem value="2015">2015</SelectItem>
                <SelectItem value="2014">2014</SelectItem>
                <SelectItem value="2013">2013</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Vehicles Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle) => (
              <Card
                key={vehicle.id}
                className="hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src={vehicle.image || "/placeholder.svg"}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-[#D60404] hover:bg-[#A81818]">
                    {vehicle.modelYear}/{vehicle.year}
                  </Badge>
                  {vehicle.extras && vehicle.extras.includes("Único dono") && (
                    <Badge className="absolute top-4 right-4 bg-[#2A1770] hover:bg-[#2A1770]">
                      Único dono
                    </Badge>
                  )}
                  {vehicle.extras &&
                    vehicle.extras.includes("Segundo dono") && (
                      <Badge className="absolute top-4 right-4 bg-[#03045E] hover:bg-[#03045E]">
                        Segundo dono
                      </Badge>
                    )}
                </div>
                <CardHeader>
                  <CardTitle className="text-[#323062]">
                    {vehicle.brand} {vehicle.model}
                  </CardTitle>
                  <div className="text-sm text-[#B9B9B9] mb-2">
                    {vehicle.version} • {vehicle.color}
                  </div>
                  <div className="text-2xl font-bold text-[#D60404]">
                    {vehicle.price}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-[#B9B9B9]">
                      <Calendar className="w-4 h-4" />
                      {vehicle.modelYear}/{vehicle.year}
                    </div>
                    <div className="flex items-center gap-2 text-[#B9B9B9]">
                      <Gauge className="w-4 h-4" />
                      {vehicle.km} km
                    </div>
                    <div className="flex items-center gap-2 text-[#B9B9B9]">
                      <Fuel className="w-4 h-4" />
                      {vehicle.fuel}
                    </div>
                    <div className="flex items-center gap-2 text-[#B9B9B9]">
                      <Users className="w-4 h-4" />
                      {vehicle.transmission}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-[#323062] text-sm">
                      Características:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {vehicle.features.slice(0, 4).map((feature, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {feature}
                        </Badge>
                      ))}
                      {vehicle.features.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{vehicle.features.length - 4} mais
                        </Badge>
                      )}
                    </div>
                  </div>
                  {vehicle.description && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-[#323062] text-sm">
                        Descrição:
                      </h4>
                      <p className="text-xs text-[#B9B9B9] leading-relaxed">
                        {vehicle.description}
                      </p>
                    </div>
                  )}
                  <div className="flex gap-2 pt-4">
                    <Button
                      asChild
                      className="flex-1 bg-[#D60404] hover:bg-[#A81818]"
                    >
                      <a
                        href={`https://wa.me/5553984139110?text=Olá! Gostaria de mais detalhes sobre o ${vehicle.brand} ${vehicle.model} ${vehicle.version} ${vehicle.modelYear}/${vehicle.year} cor ${vehicle.color}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ver Detalhes
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="border-[#323062] text-[#323062] hover:bg-[#323062] hover:text-white"
                    >
                      <a
                        href={`https://wa.me/5553984139110?text=Olá! Tenho interesse no ${vehicle.brand} ${vehicle.model} ${vehicle.version} ${vehicle.modelYear}/${vehicle.year}. Gostaria de mais informações.`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Contato
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#323062] to-[#2A1770] text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Não encontrou o que procura?
          </h2>
          <p className="text-[#B9B9B9] text-lg mb-8">
            Entre em contato conosco! Podemos ajudar você a encontrar o veículo
            ideal
          </p>
          <Button
            asChild
            size="lg"
            className="bg-[#D60404] hover:bg-[#A81818] text-white"
          >
            <a
              href="https://wa.me/5553984139110?text=Olá! Gostaria de falar com um especialista da VipVeículos sobre veículos disponíveis."
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar com Especialista
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
