import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Clock, Heart, Mail, Phone, Shield } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sobre Nós | Nossa História e Tradição em Rio Grande",
  description:
    "Conheça a história da VipVeículos, fundada em 2008 por Fábio Gularte em Rio Grande - RS. Mais de 15 anos de tradição, confiança, transparência e respeito no mercado automobilístico.",
  keywords: [
    "história VipVeículos",
    "Vip Veículos Rio Grande",
    "Fábio Gularte",
    "empresa automobilística Rio Grande RS",
    "concessionária confiável RS",
    "loja de carros tradição RS",
    "15 anos experiência carros",
  ],
  openGraph: {
    title: "Sobre Nós - VipVeículos Rio Grande",
    description:
      "Conheça a história da VipVeículos, fundada em 2008 por Fábio Gularte. Mais de 15 anos de tradição no mercado automobilístico de Rio Grande - RS.",
    url: "https://vipveiculosriogrande.com.br/sobre",
  },
};

const teamMembers = [
  {
    name: "Fábio Gularte",
    role: "Dono / Fundador",
    experience: "15+ anos",
    image: "/fundador.jpeg",
    description:
      "Fundador da Vip Veículos, com mais de 15 anos de experiência no mercado automobilístico de Rio Grande.",
  },
  {
    name: "Marco",
    role: "Vendedor",
    experience: "Especialista",
    image: "/placeholder-user.jpg",
    description:
      "Vendedor experiente, focado em encontrar o veículo ideal para cada cliente com atendimento personalizado.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-r from-[#323062] to-[#2A1770] text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Sobre a VipVeículos</h1>
            <p className="text-blue-100 text-lg">
              Conheça nossa história, valores e a equipe que faz a diferença
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-[#D60404] hover:bg-[#A81818] text-white px-4 py-2 font-bold">
                Nossa História
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#323062] tracking-tight leading-tight">
                15 Anos Ajudando Famílias a Escolherem o Carro Ideal
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed text-base">
                <p>
                  A Vip Veículos está há mais de 15 anos no mercado de
                  automóveis usados de Rio Grande, começando sua jornada em
                  janeiro de 2008 e desde então vem trabalhando no seu dia a dia
                  para garantir a certeza de uma ótima compra, prezando carros
                  de qualidade e um ambiente harmonioso para receber seus
                  clientes e amigos.
                </p>
                <p>
                  Fundada por Fábio Gularte, nossa empresa se estabeleceu com o
                  compromisso de conduzir todas as negociações com respeito e
                  seriedade, sempre buscando a satisfação total de nossos
                  clientes. Conte com a ajuda de profissionais qualificados que
                  ajudam famílias a encontrarem o carro ideal.
                </p>
                <p>
                  Nossa equipe qualificada trabalha para atendê-lo da melhor
                  forma possível, garantindo que cada cliente encontre
                  exatamente o que procura. Com mais de 15 anos de experiência
                  no mercado automobilístico, construímos uma reputação sólida
                  baseada na confiança e transparência em cada negociação.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/faxada.jpeg"
                alt="História da VipVeículos - Fachada da loja em Rio Grande RS"
                width={600}
                height={500}
                className="rounded-2xl shadow-xl object-cover h-[380px] sm:h-[440px] w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#D60404] text-white p-6 rounded-2xl shadow-lg hidden sm:block">
                <div className="text-center">
                  <div className="text-3xl font-extrabold">15+</div>
                  <div className="text-sm font-medium">Anos de</div>
                  <div className="text-sm font-medium">Experiência</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#323062] mb-4">
              Nossos Valores
            </h2>
            <p className="text-slate-600 text-lg">
              Os pilares que guiam nossa atuação no mercado
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow border-slate-100 shadow-sm">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[#D60404] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md shadow-red-500/20">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#323062] mb-2">
                  Respeito
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Tratamos cada cliente como família, com respeito e atenção
                  especial
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow border-slate-100 shadow-sm">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[#2A1770] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md shadow-purple-500/20">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#323062] mb-2">
                  Confiança
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Transparência total em todas as nossas negociações
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow border-slate-100 shadow-sm">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[#03045E] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md shadow-blue-500/20">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#323062] mb-2">
                  Qualidade
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Selecionamos apenas veículos que atendem nossos altos padrões
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow border-slate-100 shadow-sm">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[#A81818] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md shadow-red-700/20">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#323062] mb-2">
                  Seriedade
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Conduzimos todas as negociações com seriedade e transparência
                  total
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#323062] mb-4">
              Nossa Equipe
            </h2>
            <p className="text-slate-600 text-lg">
              Equipe qualificada para atendê-lo e ajudar sua família a encontrar
              o carro ideal
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {teamMembers.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-slate-100 shadow-sm">
                <CardContent className="p-6 text-center">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-slate-100 shadow-md"
                  />
                  <h3 className="text-xl font-semibold text-[#323062] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[#D60404] font-semibold mb-2 text-sm">
                    {member.role}
                  </p>
                  <Badge variant="secondary" className="mb-3 text-xs font-semibold">
                    {member.experience} de experiência
                  </Badge>
                  <p className="text-slate-600 text-sm leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#323062] mb-4">
              Como Trabalhamos
            </h2>
            <p className="text-slate-600 text-lg">
              Nosso processo garante a melhor experiência para você
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow border-slate-100 shadow-sm">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[#D60404] rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-md shadow-red-500/20">
                  1
                </div>
                <h3 className="text-xl font-semibold text-[#323062] mb-3">
                  Seleção de Qualidade
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Cada veículo é cuidadosamente selecionado e avaliado, prezando
                  pela qualidade e condições que garantem a satisfação do
                  cliente
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow border-slate-100 shadow-sm">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[#2A1770] rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-md shadow-purple-500/20">
                  2
                </div>
                <h3 className="text-xl font-semibold text-[#323062] mb-3">
                  Ambiente Harmonioso
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Criamos um ambiente acolhedor para receber nossos clientes e
                  amigos, com respeito e seriedade em todas as negociações
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow border-slate-100 shadow-sm">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[#03045E] rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-md shadow-blue-500/20">
                  3
                </div>
                <h3 className="text-xl font-semibold text-[#323062] mb-3">
                  Certeza de uma Ótima Compra
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Trabalhamos diariamente para garantir que cada cliente tenha a
                  certeza de uma excelente compra e total satisfação
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#323062] to-[#2A1770] text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              Pronto para encontrar o carro ideal para sua família?
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Nossa equipe qualificada está pronta para ajudar você a realizar o
              sonho do carro novo
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-[#D60404] hover:bg-[#A81818] text-white font-extrabold h-14 px-8 py-4 rounded-xl shadow-lg shadow-red-600/30 active:scale-[0.98] transition-all text-base flex items-center justify-center gap-2.5"
            >
              <a
                href="https://wa.me/5553984139110?text=Olá! Gostaria de entrar em contato com a VipVeículos."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="w-5 h-5 shrink-0" />
                <span>Ligar ou Chamar no WhatsApp</span>
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-[#323062] font-bold h-14 px-8 py-4 rounded-xl active:scale-[0.98] transition-all text-base flex items-center justify-center gap-2.5 bg-transparent"
            >
              <a
                href="https://wa.me/5553984139110?text=Olá! Gostaria de entrar em contato com a VipVeículos."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Mail className="w-5 h-5 shrink-0" />
                <span>Enviar Mensagem</span>
              </a>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
