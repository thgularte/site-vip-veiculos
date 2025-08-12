import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Users, Heart, Shield, Clock, Star, Phone, Mail } from 'lucide-react'
import Image from "next/image"
import { Navigation } from "@/components/navigation"

const teamMembers = [
  {
    name: "Carlos Silva",
    role: "Diretor Geral",
    experience: "15 anos",
    image: "/placeholder.svg?height=300&width=300",
    description: "Fundador da VipVeículos, especialista em negociações e relacionamento com clientes."
  },
  {
    name: "Ana Santos",
    role: "Gerente de Vendas",
    experience: "8 anos",
    image: "/placeholder.svg?height=300&width=300",
    description: "Especialista em financiamentos e consultoria personalizada para cada cliente."
  },
  {
    name: "Roberto Costa",
    role: "Consultor Sênior",
    experience: "12 anos",
    image: "/placeholder.svg?height=300&width=300",
    description: "Expert em avaliações e inspeções técnicas, garantindo a qualidade dos veículos."
  },
  {
    name: "Mariana Lima",
    role: "Consultora de Vendas",
    experience: "5 anos",
    image: "/placeholder.svg?height=300&width=300",
    description: "Focada em atendimento ao cliente e soluções personalizadas de financiamento."
  }
]

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
              <h2 className="text-3xl font-bold text-[#323062]">15 Anos Transformando Sonhos em Realidade</h2>
              <div className="space-y-4 text-[#B9B9B9]">
                <p>
                  A VipVeículos nasceu em janeiro de 2008 com um sonho simples: revolucionar a experiência 
                  de compra de veículos no Brasil. Desde o primeiro dia, nosso compromisso tem sido oferecer 
                  não apenas carros de qualidade, mas uma experiência completa de confiança e transparência.
                </p>
                <p>
                  Ao longo desses 15 anos, construímos uma reputação sólida baseada em valores fundamentais: 
                  honestidade, qualidade e respeito ao cliente. Cada veículo que passa por nossas mãos é 
                  cuidadosamente selecionado e inspecionado, garantindo que nossos clientes levem para casa 
                  não apenas um carro, mas a certeza de uma excelente compra.
                </p>
                <p>
                  Hoje, somos mais que uma concessionária - somos parceiros dos nossos clientes na realização 
                  de seus sonhos automotivos. Nossa equipe especializada trabalha incansavelmente para criar 
                  um ambiente acolhedor onde cada negociação é conduzida com seriedade e transparência total.
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
            <h2 className="text-3xl font-bold text-[#323062] mb-4">Nossos Valores</h2>
            <p className="text-[#B9B9B9] text-lg">Os pilares que guiam nossa atuação no mercado</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[#D60404] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#323062] mb-2">Paixão</h3>
                <p className="text-[#B9B9B9]">Amamos o que fazemos e isso se reflete em cada atendimento</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[#2A1770] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#323062] mb-2">Confiança</h3>
                <p className="text-[#B9B9B9]">Transparência total em todas as nossas negociações</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[#03045E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#323062] mb-2">Qualidade</h3>
                <p className="text-[#B9B9B9]">Selecionamos apenas veículos que atendem nossos altos padrões</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[#A81818] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#323062] mb-2">Compromisso</h3>
                <p className="text-[#B9B9B9]">Dedicação total para garantir sua satisfação</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#323062] mb-4">Nossa Equipe</h2>
            <p className="text-[#B9B9B9] text-lg">Profissionais especializados prontos para atender você</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                  <h3 className="text-xl font-semibold text-[#323062] mb-1">{member.name}</h3>
                  <p className="text-[#D60404] font-medium mb-2">{member.role}</p>
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
            <h2 className="text-3xl font-bold text-[#323062] mb-4">Como Trabalhamos</h2>
            <p className="text-[#B9B9B9] text-lg">Nosso processo garante a melhor experiência para você</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[#D60404] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold text-[#323062] mb-3">Seleção Rigorosa</h3>
                <p className="text-[#B9B9B9]">
                  Cada veículo passa por uma inspeção detalhada de 150 pontos antes de entrar em nosso estoque
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[#2A1770] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold text-[#323062] mb-3">Atendimento Personalizado</h3>
                <p className="text-[#B9B9B9]">
                  Nossa equipe dedica tempo para entender suas necessidades e encontrar o veículo perfeito
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[#03045E] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold text-[#323062] mb-3">Pós-Venda Completo</h3>
                <p className="text-[#B9B9B9]">
                  Oferecemos suporte completo mesmo após a compra, garantindo sua total satisfação
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
            <h2 className="text-3xl font-bold mb-4">Pronto para encontrar seu próximo veículo?</h2>
            <p className="text-[#B9B9B9] text-lg mb-8">
              Nossa equipe está pronta para ajudar você a realizar o sonho do carro novo
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#D60404] hover:bg-[#A81818] text-white">
              <Phone className="w-4 h-4 mr-2" />
              Ligar Agora
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#323062]">
              <Mail className="w-4 h-4 mr-2" />
              Enviar E-mail
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
