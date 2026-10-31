import { Award, Clock, Heart, Instagram, Mail, MapPin, Phone, ShieldCheck, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1f1d42] text-slate-300 border-t border-slate-800/80 pt-16 pb-12">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-700/60">
          {/* Brand & Slogan */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white/10 p-1.5 flex items-center justify-center">
                <Image
                  src="/logo_vip.svg"
                  alt="VipVeículos Logo"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-xl font-black text-white tracking-tight">
                VipVeículos
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              A certeza de uma ótima compra em Rio Grande e região há mais de 15 anos. Carros seminovos e usados selecionados com procedência e garantia.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.instagram.com/vipveiculos_/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm"
                aria-label="Instagram da VipVeículos"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/5553984139110"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#25D366] flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm"
                aria-label="WhatsApp da VipVeículos"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="mailto:vipveiculos@gmail.com"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#D60404] flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm"
                aria-label="E-mail da VipVeículos"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Navegação</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white hover:underline transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/veiculos" className="hover:text-white hover:underline transition-colors">
                  Veículos em Estoque
                </Link>
              </li>
              <li>
                <Link href="/vender" className="hover:text-white hover:underline transition-colors">
                  Venda ou Troque seu Carro
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="hover:text-white hover:underline transition-colors">
                  Nossa História e Valores
                </Link>
              </li>
            </ul>
          </div>

          {/* Hours of Operation */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D60404]" />
              Atendimento Loja Física
            </h3>
            <div className="space-y-2 text-sm text-slate-400">
              <div>
                <p className="font-semibold text-slate-200">Segunda a Sexta-feira</p>
                <p>08:30 às 12:00 e 13:30 às 18:30</p>
              </div>
              <div className="pt-1">
                <p className="font-semibold text-slate-200">Sábados</p>
                <p>08:30 às 12:30</p>
              </div>
              <div className="pt-1">
                <p className="text-xs text-slate-500">Domingos e Feriados: Fechado</p>
              </div>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D60404]" />
              Onde Estamos
            </h3>
            <div className="space-y-2.5 text-sm text-slate-400">
              <p className="leading-relaxed">
                Av. Santos Dumont, 80<br />
                Vila Junção, Rio Grande - RS<br />
                CEP: 96202-090
              </p>
              <div className="pt-1">
                <a
                  href="https://www.google.com/maps/place/Av.+Santos+Dumont,+80+-+Vila+Juncao,+Rio+Grande+-+RS,+96202-090/@-32.0408958,-52.1087725,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-300 underline underline-offset-2"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Como chegar pelo Google Maps
                </a>
              </div>
              <div className="pt-2 text-xs space-y-1">
                <p>
                  Fixo:{" "}
                  <a href="tel:5332300250" className="text-slate-300 hover:text-white font-medium">
                    (53) 3230-0250
                  </a>
                </p>
                <p>
                  WhatsApp:{" "}
                  <a href="https://wa.me/5553984139110" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 font-medium">
                    (53) 98413-9110
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} VipVeículos. Todos os direitos reservados. Rio Grande - RS.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
              Ambiente Seguro
            </span>
            <Link
              href="/admin"
              className="flex items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors"
              title="Área Administrativa"
            >
              <Lock className="w-3 h-3" />
              <span>Painel</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
