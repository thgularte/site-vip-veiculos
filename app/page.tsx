import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Phone, Mail, Calendar, Users, Award, Car } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Store Front Image Section */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <Image
          src="/placeholder.svg?height=800&width=1200"
          alt="VipVeículos - Fachada da Loja"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-8 left-8 text-white">
          <Badge className="bg-[#D60404] hover:bg-[#A81818] text-white px-4 py-2 mb-4">
            <Calendar className="w-4 h-4 mr-2" />
            Desde Janeiro de 2008
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold">VipVeículos</h1>
          <p className="text-xl md:text-2xl text-gray-200 mt-2">Mais de 15 anos de experiência</p>
        </div>
      </section>

      {/* Spacer */}
      <div className="py-12"></div>

      {/* Company Introduction Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-[#323062]">
                Tradição e Confiança
                <span className="block text-2xl lg:text-3xl text-[#D60404] font-normal mt-2">
                  no mercado automobilístico
                </span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                A VipVeículos está no mercado automobilístico há mais de 15 anos, iniciando sua jornada em janeiro de 2008. 
                Desde então, trabalha diariamente para garantir a certeza de uma ótima compra, valorizando veículos de qualidade 
                e um ambiente harmonioso para receber seus clientes e amigos, com respeito e negociações sérias.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-[#D60404] hover:bg-[#A81818] text-white">
                  <Link href="/vehicles">Ver Veículos</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-[#323062] text-[#323062] hover:bg-[#323062] hover:text-white">
                  <Link href="/about">Sobre Nós</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Interior da VipVeículos"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#D60404] text-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <Award className="w-6 h-6" />
                  <div>
                    <div className="font-bold">15+ Anos</div>
                    <div className="text-sm opacity-90">de Confiança</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#323062] mb-4">Por que escolher a VipVeículos?</h2>
            <p className="text-[#B9B9B9] text-lg">Qualidade, confiança e experiência em cada negociação</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-l-4 border-l-[#D60404] hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Award className="w-12 h-12 text-[#D60404] mb-4" />
                <h3 className="text-xl font-semibold text-[#323062] mb-2">15+ Anos de Experiência</h3>
                <p className="text-[#B9B9B9]">Desde 2008 no mercado, garantindo expertise e confiabilidade em cada transação.</p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-[#2A1770] hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Car className="w-12 h-12 text-[#2A1770] mb-4" />
                <h3 className="text-xl font-semibold text-[#323062] mb-2">Veículos de Qualidade</h3>
                <p className="text-[#B9B9B9]">Selecionamos cuidadosamente cada veículo para garantir a melhor experiência.</p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-[#03045E] hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Users className="w-12 h-12 text-[#03045E] mb-4" />
                <h3 className="text-xl font-semibold text-[#323062] mb-2">Atendimento Personalizado</h3>
                <p className="text-[#B9B9B9]">Ambiente harmonioso e negociações sérias, tratando cada cliente como família.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#323062] mb-4">O que nossos clientes dizem</h2>
            <p className="text-[#B9B9B9] text-lg">Depoimentos reais de quem confia na VipVeículos</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#D60404] text-[#D60404]" />
                  ))}
                </div>
                <p className="text-[#B9B9B9] mb-4">
                  "Excelente atendimento! Comprei meu carro na VipVeículos e foi uma experiência incrível. 
                  Equipe muito profissional e honesta."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#323062] rounded-full flex items-center justify-center text-white font-semibold">
                    M
                  </div>
                  <div>
                    <div className="font-semibold text-[#323062]">Maria Silva</div>
                    <div className="text-sm text-[#B9B9B9]">Cliente desde 2020</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#D60404] text-[#D60404]" />
                  ))}
                </div>
                <p className="text-[#B9B9B9] mb-4">
                  "Já comprei 3 carros na VipVeículos. Sempre com transparência total e veículos de excelente qualidade. 
                  Recomendo de olhos fechados!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#2A1770] rounded-full flex items-center justify-center text-white font-semibold">
                    J
                  </div>
                  <div>
                    <div className="font-semibold text-[#323062]">João Santos</div>
                    <div className="text-sm text-[#B9B9B9]">Cliente desde 2018</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#D60404] text-[#D60404]" />
                  ))}
                </div>
                <p className="text-[#B9B9B9] mb-4">
                  "Atendimento excepcional! Me ajudaram a encontrar exatamente o que eu procurava. 
                  Equipe muito atenciosa e preços justos."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#03045E] rounded-full flex items-center justify-center text-white font-semibold">
                    A
                  </div>
                  <div>
                    <div className="font-semibold text-[#323062]">Ana Costa</div>
                    <div className="text-sm text-[#B9B9B9]">Cliente desde 2022</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Vehicles CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#323062] to-[#2A1770] text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-4">Encontre seu próximo veículo</h2>
          <p className="text-[#B9B9B9] text-lg mb-8">
            Explore nossa seleção de veículos de qualidade, todos revisados e com garantia
          </p>
          <Button asChild size="lg" className="bg-[#D60404] hover:bg-[#A81818] text-white">
            <Link href="/vehicles">Ver Todos os Veículos</Link>
          </Button>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#323062] mb-4">Nossa Localização</h2>
            <p className="text-[#B9B9B9] text-lg">Visite nossa loja e conheça nossos veículos pessoalmente</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-[#D60404] mt-1" />
                    <div>
                      <h3 className="font-semibold text-[#323062] mb-2">Endereço</h3>
                      <p className="text-[#B9B9B9]">
                        Rua dos Automóveis, 1234<br />
                        Centro - Cidade, Estado<br />
                        CEP: 12345-678
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-[#2A1770] mt-1" />
                    <div>
                      <h3 className="font-semibold text-[#323062] mb-2">Telefone</h3>
                      <p className="text-[#B9B9B9]">(11) 9999-9999</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-[#03045E] mt-1" />
                    <div>
                      <h3 className="font-semibold text-[#323062] mb-2">E-mail</h3>
                      <p className="text-[#B9B9B9]">contato@vipveiculos.com.br</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="bg-[#B9B9B9] rounded-lg h-96 flex items-center justify-center">
              <div className="text-center text-[#323062]">
                <MapPin className="w-16 h-16 mx-auto mb-4" />
                <p className="text-lg font-semibold">Mapa Interativo</p>
                <p className="text-sm">Integração com Google Maps</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
