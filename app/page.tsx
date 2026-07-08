import { Navigation } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { organizationSchema, websiteSchema } from "@/lib/schemas";
import {
  Award,
  Calendar,
  Car,
  Mail,
  MapPin,
  Phone,
  Star,
  Users,
  Instagram,
  Heart,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />

      <Navigation />

      {/* Store Front Image Section */}
      <section className="relative h-[75vh] md:h-[85vh] overflow-hidden">
        <Image
          src="/faxada.jpeg"
          alt="Fachada da VipVeículos - Loja de carros em Rio Grande, RS"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-8 left-6 sm:left-12 right-6 sm:right-auto text-white z-10">
          <Badge className="bg-[#D60404] hover:bg-[#A81818] text-white px-3.5 py-1.5 mb-3 text-xs sm:text-sm font-bold shadow-md">
            <Calendar className="w-4 h-4 mr-2" />
            Desde Janeiro de 2008
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none">
            VipVeículos
          </h1>
          <p className="text-lg sm:text-2xl text-gray-200 mt-2 font-medium max-w-xl">
            A certeza de uma ótima compra em Rio Grande - RS
          </p>
        </div>
      </section>

      {/* Company Introduction Section */}
      <section className="py-16 sm:py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-[#323062] tracking-tight">
                Tradição e Confiança
                <span className="block text-xl sm:text-2xl lg:text-3xl text-[#D60404] font-semibold mt-1">
                  em Rio Grande há mais de 15 anos
                </span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
                A Vip Veículos está há mais de 15 anos no mercado de automóveis
                usados de Rio Grande, começando sua jornada em janeiro de 2008 e
                desde então vem trabalhando no seu dia a dia para garantir a
                certeza de uma ótima compra, prezando carros de qualidade e um
                ambiente harmonioso para receber seus clientes e amigos, com
                respeito e seriedade nas negociações.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto bg-[#D60404] hover:bg-[#A81818] text-white font-extrabold h-13 py-4 px-8 rounded-xl shadow-lg shadow-red-600/20 active:scale-[0.98] transition-all"
                >
                  <Link href="/veiculos">Ver Veículos em Estoque</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-2 border-[#323062] text-[#323062] hover:bg-[#323062] hover:text-white font-bold h-13 py-4 px-8 rounded-xl active:scale-[0.98] transition-all"
                >
                  <Link href="/sobre">Conheça Nossa História</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/O home.png"
                alt="Interior da loja VipVeículos mostrando ambiente de atendimento aos clientes"
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

      {/* Satisfied Customers / Realized Dreams Section */}
      <section className="py-20 px-4 bg-slate-50 border-t border-b border-slate-100">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-[#D60404] hover:bg-[#A81818] text-white px-4 py-2">
                Sonhos Realizados
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#323062] leading-tight">
                Mais do que vender carros,
                <span className="block text-[#D60404] mt-1">
                  conectamos pessoas a novas conquistas
                </span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Na VipVeículos, entendemos que um automóvel representa muito
                mais do que apenas um meio de locomoção. Ele é o parceiro diário
                no trabalho, o conforto nas viagens de fim de semana e a
                segurança de quem você ama.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Nosso propósito é entender a fundo a sua necessidade e o seu
                estilo de vida para ajudar você a escolher o veículo que
                realmente vá agregar valor ao seu dia a dia, trazendo
                praticidade, economia e segurança. Cada entrega de chaves é a
                celebração de um novo capítulo feliz na vida dos nossos clientes
                e amigos.
              </p>
            </div>

            {/* Photo Grid / Gallery */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-md group">
                  <Image
                    src="/happy_customer_1.png"
                    alt="Entrega de chaves - Clientes satisfeitos da VipVeículos"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex items-end">
                    <span className="text-white text-sm font-semibold">
                      Juliana & Thiago
                    </span>
                  </div>
                </div>
                <div className="relative h-40 rounded-2xl overflow-hidden shadow-md group">
                  <Image
                    src="/happy_custumer_2.jpeg"
                    alt="Entrega de chaves - Cliente satisfeito VipVeículos"
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex items-end">
                    <span className="text-white text-sm font-semibold">
                      Carlos Eduardo
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative h-40 rounded-2xl overflow-hidden shadow-md group">
                  <Image
                    src="/happy_customer_3.png"
                    alt="Entrega de chaves - Família feliz com carro novo"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex items-end">
                    <span className="text-white text-sm font-semibold">
                      Família Souza
                    </span>
                  </div>
                </div>
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-[#323062] to-[#2A1770] flex flex-col justify-between p-6 text-white">
                  <Award className="w-8 h-8 text-[#D60404]" />
                  <div>
                    <p className="text-2xl font-bold">100%</p>
                    <p className="text-sm opacity-80">
                      de dedicação em cada detalhe para ajudar você a realizar
                      seu sonho.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicles CTA Section */}
      <section className="py-16 sm:py-20 px-4 bg-gradient-to-r from-[#323062] to-[#2A1770] text-white">
        <div className="container mx-auto max-w-6xl text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Encontre seu próximo veículo
          </h2>
          <p className="text-[#B9B9B9] text-base sm:text-lg max-w-2xl mx-auto font-normal">
            Explore nossa seleção de veículos de qualidade, todos revisados e
            com garantia de procedência.
          </p>
          <div className="pt-2">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-[#D60404] hover:bg-[#A81818] text-white font-extrabold h-14 px-8 py-4 rounded-xl shadow-xl shadow-red-600/30 active:scale-[0.98] transition-all text-base"
            >
              <Link href="/veiculos">Ver Todos os Veículos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 sm:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#323062] mb-3">
              Nossa Localização
            </h2>
            <p className="text-slate-500 text-base sm:text-lg font-medium">
              Visite nossa loja e conheça nossos veículos pessoalmente
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6">
              <Card className="rounded-2xl border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 sm:p-7">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-red-50 rounded-xl text-[#D60404] shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-[#323062] mb-1">
                        Endereço
                      </h3>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                        Av. Santos Dumont, 80
                        <br />
                        Vila Junção, Rio Grande - RS
                        <br />
                        CEP: 96202-090
                      </p>
                      <Button
                        asChild
                        className="w-full sm:w-auto mt-4 bg-[#D60404] hover:bg-[#A81818] text-white text-sm font-bold h-12 rounded-xl shadow-sm flex items-center justify-center gap-2"
                        size="sm"
                      >
                        <a
                          href="https://www.google.com/maps/place/Av.+Santos+Dumont,+80+-+Vila+Juncao,+Rio+Grande+-+RS,+96202-090/@-32.0408958,-52.1087725,17z"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MapPin className="w-4 h-4" />
                          <span>Abrir no Google Maps</span>
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-2xl border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 sm:p-7">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-50 rounded-xl text-[#2A1770] shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-[#323062] mb-1">
                        Atendimento e Telefone
                      </h3>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                        Telefone Fixo: <span className="font-semibold">(53) 3230-0250</span>
                        <br />
                        WhatsApp: <span className="font-semibold">(53) 98413-9110</span>
                        <br />
                        WhatsApp: <span className="font-semibold">(53) 99104-3340</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-2xl border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 sm:p-7">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-50 rounded-xl text-[#03045E] shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-[#323062] mb-1">
                        Canais Online
                      </h3>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                        E-mail: <span className="font-semibold">vipveiculos@gmail.com</span>
                        <br />
                        Instagram: <span className="font-semibold text-pink-600">@vipveiculos_</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="rounded-2xl overflow-hidden h-80 sm:h-96 shadow-lg border border-slate-100">
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

      {/* Instagram CTA Section */}
      <section className="py-16 sm:py-20 px-4 bg-gradient-to-br from-slate-50 to-slate-100 border-t border-slate-200">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex p-3.5 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-2xl text-white shadow-md">
              <Instagram className="w-8 h-8" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#323062] tracking-tight">Siga-nos no Instagram</h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-normal">
              Fique por dentro das novidades! Siga o perfil <span className="font-semibold text-pink-600">@vipveiculos_</span> para acompanhar novas chegadas no pátio, entregas de chaves e ofertas exclusivas em tempo real.
            </p>
            <div className="pt-2">
              <Button
                asChild
                className="w-full sm:w-auto bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:opacity-95 text-white font-extrabold h-14 px-8 py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] text-base"
              >
                <a
                  href="https://www.instagram.com/vipveiculos_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5"
                >
                  <Instagram className="w-5 h-5 shrink-0" />
                  <span>Seguir @vipveiculos_ agora</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Instagram Post Grid Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: "/happy_customer_1.png", likes: "142", comments: "12", position: "object-center" },
              { src: "/happy_custumer_2.jpeg", likes: "115", comments: "9", position: "object-top" },
              { src: "/happy_customer_3.png", likes: "168", comments: "21", position: "object-center" },
              { src: "/faxada.jpeg", likes: "245", comments: "32", position: "object-center" },
            ].map((post, idx) => (
              <a
                key={idx}
                href="https://www.instagram.com/vipveiculos_/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square rounded-2xl overflow-hidden shadow-md group block bg-slate-200"
              >
                <Image
                  src={post.src}
                  alt={`Post do Instagram VipVeículos ${idx + 1}`}
                  fill
                  className={`object-cover transition-transform duration-500 group-hover:scale-110 ${post.position}`}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-white font-bold">
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-5 h-5 fill-white" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageCircle className="w-5 h-5 fill-white" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
