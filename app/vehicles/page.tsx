import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Fuel, Calendar, Gauge, Users, Search, Filter } from 'lucide-react'
import Image from "next/image"
import { Navigation } from "@/components/navigation"

const vehicles = [
  {
    id: 1,
    brand: "Honda",
    model: "Civic",
    year: 2022,
    price: "R$ 89.900",
    fuel: "Flex",
    km: "25.000",
    transmission: "Automático",
    image: "/placeholder.svg?height=300&width=400",
    features: ["Ar Condicionado", "Direção Elétrica", "Vidros Elétricos", "Central Multimídia"]
  },
  {
    id: 2,
    brand: "Toyota",
    model: "Corolla",
    year: 2021,
    price: "R$ 95.500",
    fuel: "Flex",
    km: "18.000",
    transmission: "CVT",
    image: "/placeholder.svg?height=300&width=400",
    features: ["Toyota Safety Sense", "Ar Digital", "Bancos de Couro", "Câmera de Ré"]
  },
  {
    id: 3,
    brand: "Volkswagen",
    model: "Jetta",
    year: 2023,
    price: "R$ 105.000",
    fuel: "Turbo",
    km: "12.000",
    transmission: "Automático",
    image: "/placeholder.svg?height=300&width=400",
    features: ["Teto Solar", "Faróis LED", "Sensor de Estacionamento", "Start/Stop"]
  },
  {
    id: 4,
    brand: "Hyundai",
    model: "HB20S",
    year: 2022,
    price: "R$ 72.900",
    fuel: "Flex",
    km: "30.000",
    transmission: "Manual",
    image: "/placeholder.svg?height=300&width=400",
    features: ["Central Multimídia", "Ar Condicionado", "Direção Hidráulica", "Airbags"]
  },
  {
    id: 5,
    brand: "Chevrolet",
    model: "Onix Plus",
    year: 2023,
    price: "R$ 78.500",
    fuel: "Flex",
    km: "8.000",
    transmission: "Automático",
    image: "/placeholder.svg?height=300&width=400",
    features: ["MyLink", "Ar Automático", "Sensor Chuva", "Controle de Estabilidade"]
  },
  {
    id: 6,
    brand: "Nissan",
    model: "Sentra",
    year: 2021,
    price: "R$ 92.000",
    fuel: "Flex",
    km: "22.000",
    transmission: "CVT",
    image: "/placeholder.svg?height=300&width=400",
    features: ["Nissan Connect", "Ar Digital", "Bancos de Couro", "Freio Automático"]
  }
]

export default function VehiclesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-[#323062] to-[#2A1770] text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Nossos Veículos</h1>
            <p className="text-[#B9B9B9] text-lg">
              Explore nossa seleção de veículos de qualidade, todos revisados e com garantia
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
              <Input placeholder="Buscar por marca ou modelo..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Marca" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="honda">Honda</SelectItem>
                <SelectItem value="toyota">Toyota</SelectItem>
                <SelectItem value="volkswagen">Volkswagen</SelectItem>
                <SelectItem value="hyundai">Hyundai</SelectItem>
                <SelectItem value="chevrolet">Chevrolet</SelectItem>
                <SelectItem value="nissan">Nissan</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Ano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
                <SelectItem value="2020">2020</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Preço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-50000">Até R$ 50.000</SelectItem>
                <SelectItem value="50000-80000">R$ 50.000 - R$ 80.000</SelectItem>
                <SelectItem value="80000-100000">R$ 80.000 - R$ 100.000</SelectItem>
                <SelectItem value="100000+">Acima de R$ 100.000</SelectItem>
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
              <Card key={vehicle.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative">
                  <Image
                    src={vehicle.image || "/placeholder.svg"}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-[#D60404] hover:bg-[#A81818]">
                    {vehicle.year}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-[#323062]">
                    {vehicle.brand} {vehicle.model}
                  </CardTitle>
                  <div className="text-2xl font-bold text-[#D60404]">{vehicle.price}</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-[#B9B9B9]">
                      <Calendar className="w-4 h-4" />
                      {vehicle.year}
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
                    <h4 className="font-semibold text-[#323062] text-sm">Principais características:</h4>
                    <div className="flex flex-wrap gap-1">
                      {vehicle.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {vehicle.features.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{vehicle.features.length - 3} mais
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1 bg-[#D60404] hover:bg-[#A81818]">
                      Ver Detalhes
                    </Button>
                    <Button variant="outline" className="border-[#323062] text-[#323062] hover:bg-[#323062] hover:text-white">
                      Contato
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
          <h2 className="text-3xl font-bold mb-4">Não encontrou o que procura?</h2>
          <p className="text-[#B9B9B9] text-lg mb-8">
            Entre em contato conosco! Podemos ajudar você a encontrar o veículo ideal
          </p>
          <Button size="lg" className="bg-[#D60404] hover:bg-[#A81818] text-white">
            Falar com Especialista
          </Button>
        </div>
      </section>
    </div>
  )
}
