import { Navigation } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Award,
  Calendar,
  Car,
  Mail,
  MapPin,
  Phone,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
          <p className="text-xl md:text-2xl text-gray-200 mt-2">
            Mais de 15 anos de experiência
          </p>
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
                  em Rio Grande há mais de 15 anos
                </span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                A Vip Veículos está há mais de 15 anos no mercado de automóveis
                usados de Rio Grande, começando sua jornada em janeiro de 2008 e
                desde então vem trabalhando no seu dia a dia para garantir a
                certeza de uma ótima compra, prezando carros de qualidade e um
                ambiente harmonioso para receber seus clientes e amigos, com
                respeito e seriedade nas negociações.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#D60404] hover:bg-[#A81818] text-white"
                >
                  <Link href="/vehicles">Ver Veículos</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-[#323062] text-[#323062] hover:bg-[#323062] hover:text-white"
                >
                  <Link href="/about">Sobre Nós</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/O home.png"
                alt="Interior da VipVeículos"
                width={358}
                height={514}
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
            <h2 className="text-3xl font-bold text-[#323062] mb-4">
              Por que escolher a VipVeículos?
            </h2>
            <p className="text-[#B9B9B9] text-lg">
              Qualidade, confiança e experiência em cada negociação
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-l-4 border-l-[#D60404] hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Award className="w-12 h-12 text-[#D60404] mb-4" />
                <h3 className="text-xl font-semibold text-[#323062] mb-2">
                  15+ Anos de Experiência
                </h3>
                <p className="text-[#B9B9B9]">
                  Desde 2008 no mercado, garantindo expertise e confiabilidade
                  em cada transação.
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-[#2A1770] hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Car className="w-12 h-12 text-[#2A1770] mb-4" />
                <h3 className="text-xl font-semibold text-[#323062] mb-2">
                  Veículos de Qualidade
                </h3>
                <p className="text-[#B9B9B9]">
                  Selecionamos cuidadosamente cada veículo para garantir a
                  melhor experiência.
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-[#03045E] hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Users className="w-12 h-12 text-[#03045E] mb-4" />
                <h3 className="text-xl font-semibold text-[#323062] mb-2">
                  Atendimento Personalizado
                </h3>
                <p className="text-[#B9B9B9]">
                  Ambiente harmonioso e negociações sérias, tratando cada
                  cliente como família.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#323062] mb-4">
              O que nossos clientes dizem
            </h2>
            <p className="text-[#B9B9B9] text-lg">
              Depoimentos reais de quem confia na VipVeículos
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-[#D60404] text-[#D60404]"
                    />
                  ))}
                </div>
                <p className="text-[#B9B9B9] mb-4">
                  "A negociação lá sempre é resultado de qualidade e satisfação.
                  Loja linda, impecável e produtos excelentes. Parabéns ao
                  Marcos, Fábio e Patrícia..👏"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#323062] rounded-full flex items-center justify-center text-white font-semibold">
                    R
                  </div>
                  <div>
                    <div className="font-semibold text-[#323062]">
                      Rogerio Pereira
                    </div>
                    <div className="text-sm text-[#B9B9B9]">
                      Cliente da VipVeículos
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-[#D60404] text-[#D60404]"
                    />
                  ))}
                </div>
                <p className="text-[#B9B9B9] mb-4">
                  "Profissionais extremamente atenciosos, com certeza indico a
                  todos... mais importante: seriedade... obrigada"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#2A1770] rounded-full flex items-center justify-center text-white font-semibold">
                    M
                  </div>
                  <div>
                    <div className="font-semibold text-[#323062]">
                      Maria Medeiros
                    </div>
                    <div className="text-sm text-[#B9B9B9]">
                      Cliente da VipVeículos
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-[#D60404] text-[#D60404]"
                    />
                  ))}
                </div>
                <p className="text-[#B9B9B9] mb-4">
                  "Profissionais extremamente qualificados e responsáveis! Fiz
                  minha compra, sem mesmo conhecer o veículo! E com certeza
                  estou muito satisfeita com nossa negociação, carro impecável.
                  Gratidão é a palavra que me define!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#03045E] rounded-full flex items-center justify-center text-white font-semibold">
                    B
                  </div>
                  <div>
                    <div className="font-semibold text-[#323062]">
                      Bianca Monks
                    </div>
                    <div className="text-sm text-[#B9B9B9]">
                      Cliente da VipVeículos
                    </div>
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
          <h2 className="text-3xl font-bold mb-4">
            Encontre seu próximo veículo
          </h2>
          <p className="text-[#B9B9B9] text-lg mb-8">
            Explore nossa seleção de veículos de qualidade, todos revisados e
            com garantia
          </p>
          <Button
            asChild
            size="lg"
            className="bg-[#D60404] hover:bg-[#A81818] text-white"
          >
            <Link href="/vehicles">Ver Todos os Veículos</Link>
          </Button>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#323062] mb-4">
              Nossa Localização
            </h2>
            <p className="text-[#B9B9B9] text-lg">
              Visite nossa loja e conheça nossos veículos pessoalmente
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-[#D60404] mt-1" />
                    <div>
                      <h3 className="font-semibold text-[#323062] mb-2">
                        Endereço
                      </h3>
                      <p className="text-[#B9B9B9]">
                        Av. Santos Dumont, 80
                        <br />
                        Vila Junção, Rio Grande - RS
                        <br />
                        CEP: 96202-090
                      </p>
                      <Button
                        asChild
                        className="mt-3 bg-[#D60404] hover:bg-[#A81818] text-white text-sm"
                        size="sm"
                      >
                        <a
                          href="https://www.google.com/maps/place/Av.+Santos+Dumont,+80+-+Vila+Juncao,+Rio+Grande+-+RS,+96202-090/@-32.0408958,-52.1087725,17z"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MapPin className="w-4 h-4 mr-2" />
                          Ver no Google Maps
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-[#2A1770] mt-1" />
                    <div>
                      <h3 className="font-semibold text-[#323062] mb-2">
                        Telefone
                      </h3>
                      <p className="text-[#B9B9B9]">
                        (53) 3230-0250
                        <br />
                        WhatsApp: (53) 98413-9110
                        <br />
                        WhatsApp: (53) 99104-3340
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-[#03045E] mt-1" />
                    <div>
                      <h3 className="font-semibold text-[#323062] mb-2">
                        Contato
                      </h3>
                      <p className="text-[#B9B9B9]">
                        E-mail: vipveiculos@gmail.com
                        <br />
                        Instagram: @vipveiculos_
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="rounded-lg overflow-hidden h-96 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d830.2631565826582!2d-52.1087724869792!3d-32.040895781187946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x751153bbfc5ef7eed%3A0xf8468d209e59ae21!2sAv.%20Santos%20Dumont%2C%2080%20-%20Vila%20Juncao%2C%20Rio%20Grande%20-%20RS%2C%2096202-090!5e0!3m2!1spt-BR!2sbr!4v1734011234567!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                className="border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="VipVeículos - Av. Santos Dumont, 80, Vila Junção, Rio Grande - RS"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
