"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, MessageCircle, Phone, ChevronRight, MapPin, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Início" },
    { href: "/vehicles", label: "Veículos" },
    { href: "/about", label: "Sobre Nós" },
    { href: "/sell", label: "Venda seu Carro" },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 sticky top-0 z-40 transition-all">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <Image
                src="/logo.png"
                alt="VipVeículos Logo"
                width={44}
                height={44}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-extrabold text-[#323062] leading-tight tracking-tight">
                VipVeículos
              </div>
              <div className="text-[11px] font-semibold text-[#B9B9B9] leading-none">
                Desde 2008
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[#323062] hover:text-[#D60404] font-bold text-base transition-colors py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#D60404] hover:after:w-full after:transition-all"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Contact Button Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-[#D60404] hover:bg-[#A81818] text-white font-bold px-6 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <a
                href="https://wa.me/5553984139110?text=Olá! Gostaria de saber mais sobre os veículos da VipVeículos."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="w-4 h-4 mr-2" />
                Falar com Consultor
              </a>
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="outline"
                size="icon"
                className="w-11 h-11 rounded-xl border-slate-200 text-[#323062] hover:bg-slate-50 active:scale-95 transition-all shadow-2xs"
                aria-label="Abrir Menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] sm:w-80 p-6 bg-white flex flex-col justify-between">
              <div className="space-y-6">
                {/* Drawer Header */}
                <Link
                  href="/"
                  className="flex items-center gap-3 pb-6 border-b border-slate-100"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center shadow-xs">
                    <Image
                      src="/logo.png"
                      alt="VipVeículos Logo"
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-xl font-extrabold text-[#323062]">
                      VipVeículos
                    </div>
                    <div className="text-xs font-semibold text-[#B9B9B9]">
                      Desde 2008
                    </div>
                  </div>
                </Link>

                {/* Navigation Links */}
                <nav className="space-y-2.5">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between px-4 py-3.5 rounded-xl text-[#323062] font-bold text-base bg-slate-50/80 hover:bg-[#D60404] hover:text-white active:scale-[0.98] transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="w-5 h-5 opacity-50" />
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Drawer Footer Contact Info */}
              <div className="space-y-4 pt-6 border-t border-slate-100">
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-[#25D366] hover:bg-[#1fba59] text-white font-extrabold py-6 rounded-xl shadow-md shadow-green-500/20 flex items-center justify-center gap-2"
                >
                  <a
                    href="https://wa.me/5553984139110?text=Olá! Gostaria de saber mais sobre os veículos da VipVeículos."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-6 h-6 fill-current" />
                    <span>WhatsApp Direto</span>
                  </a>
                </Button>

                <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#D60404] shrink-0" />
                    <span>Av. Santos Dumont, 80 - Rio Grande, RS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-pink-600 shrink-0" />
                    <span>@vipveiculos_</span>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50">
        <Button
          asChild
          size="lg"
          className="bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full w-14 h-14 sm:w-16 sm:h-16 p-0 shadow-xl shadow-green-500/30 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center group"
        >
          <a
            href="https://wa.me/5553984139110?text=Olá! Gostaria de saber mais sobre os veículos da VipVeículos."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp"
          >
            <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-current group-hover:scale-110 transition-transform" />
          </a>
        </Button>
      </div>
    </header>
  );
}
