import { Navigation } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Clock, Heart, Mail, Phone, Shield } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sobre Nós - Nossa História e Valores",
  description:
    "Conheça a história da VipVeículos, fundada em 2008 por Fábio Gularte. Mais de 15 anos de experiência no mercado automobilístico com valores de respeito, qualidade e confiança.",
  keywords: [
    "história VipVeículos",
    "Fábio Gularte",
    "empresa automobilística Rio Grande",
    "valores da empresa",
    "equipe VipVeículos",
    "Marco vendedor",
    "15 anos experiência",
  ],
  openGraph: {
    title: "Sobre Nós - VipVeículos",
    description:
      "Conheça a história da VipVeículos, fundada em 2008 por Fábio Gularte. Mais de 15 anos de experiência no mercado automobilístico.",
    url: "https://vipveiculos.com.br/about",
  },
};

const teamMembers = [
  {
    name: "Fábio Gularte",
    role: "Dono / Fundador",
    experience: "15+ anos",
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Fundador da Vip Veículos, com mais de 15 anos de experiência no mercado automobilístico de Rio Grande.",
  },
  {
    name: "Marco",
    role: "Vendedor",
    experience: "Especialista",
    image: "/placeholder.svg?height=300&width=300",
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
            <p className="text-[#B9B9B9] text-lg">
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
              <Badge className="bg-[#D60404] hover:bg-[#A81818] text-white px-4 py-2">
                Nossa História
              </Badge>
              <h2 className="text-3xl font-bold text-[#323062]">
                15 Anos Ajudando Famílias a Escolherem o Carro Ideal
              </h2>
              <div className="space-y-4 text-[#B9B9B9]">
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
                src="/placeholder.svg?height=500&width=600"
                alt="História da VipVeículos"
                width={600}
                height={500}
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#D60404] text-white p-6 rounded-lg shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold">15+</div>
                  <div className="text-sm">Anos de</div>
                  <div className="text-sm">Experiência</div>
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
            <p className="text-[#B9B9B9] text-lg">
              Os pilares que guiam nossa atuação no mercado
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[#D60404] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#323062] mb-2">
                  Respeito
                </h3>
                <p className="text-[#B9B9B9]">
                  Tratamos cada cliente como família, com respeito e atenção
                  especial
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[#2A1770] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#323062] mb-2">
                  Confiança
                </h3>
                <p className="text-[#B9B9B9]">
                  Transparência total em todas as nossas negociações
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[#03045E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#323062] mb-2">
                  Qualidade
                </h3>
                <p className="text-[#B9B9B9]">
                  Selecionamos apenas veículos que atendem nossos altos padrões
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[#A81818] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#323062] mb-2">
                  Seriedade
                </h3>
                <p className="text-[#B9B9B9]">
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
            <p className="text-[#B9B9B9] text-lg">
              Equipe qualificada para atendê-lo e ajudar sua família a encontrar
              o carro ideal
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {teamMembers.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-[#323062] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[#D60404] font-medium mb-2">
                    {member.role}
                  </p>
                  <Badge variant="secondary" className="mb-3">
                    {member.experience} de experiência
                  </Badge>
                  <p className="text-[#B9B9B9] text-sm">{member.description}</p>
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
            <p className="text-[#B9B9B9] text-lg">
              Nosso processo garante a melhor experiência para você
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[#D60404] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold text-[#323062] mb-3">
                  Seleção de Qualidade
                </h3>
                <p className="text-[#B9B9B9]">
                  Cada veículo é cuidadosamente selecionado e avaliado, prezando
                  pela qualidade e condições que garantem a satisfação do
                  cliente
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[#2A1770] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold text-[#323062] mb-3">
                  Ambiente Harmonioso
                </h3>
                <p className="text-[#B9B9B9]">
                  Criamos um ambiente acolhedor para receber nossos clientes e
                  amigos, com respeito e seriedade em todas as negociações
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[#03045E] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold text-[#323062] mb-3">
                  Certeza de uma Ótima Compra
                </h3>
                <p className="text-[#B9B9B9]">
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
            <p className="text-[#B9B9B9] text-lg mb-8">
              Nossa equipe qualificada está pronta para ajudar você a realizar o
              sonho do carro novo
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-[#D60404] hover:bg-[#A81818] text-white"
            >
              <a
                href="https://wa.me/5553984139110?text=Olá! Gostaria de entrar em contato com a VipVeículos."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="w-4 h-4 mr-2" />
                Ligar Agora
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#323062]"
            >
              <a
                href="https://wa.me/5553984139110?text=Olá! Gostaria de entrar em contato com a VipVeículos."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Mail className="w-4 h-4 mr-2" />
                Enviar Mensagem
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
