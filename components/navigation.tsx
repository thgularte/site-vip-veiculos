"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, MessageCircle, ChevronRight, MapPin, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  transparentAtTop?: boolean;
}

export function Navigation({ transparentAtTop }: NavigationProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isTransparentMode = transparentAtTop ?? isHome;
  const isTransparent = isTransparentMode && !isScrolled;

  useEffect(() => {
    if (!isTransparentMode) {
      setIsScrolled(false);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isTransparentMode, pathname]);

  const navItems = [
    { href: "/", label: "Início" },
    { href: "/veiculos", label: "Veículos" },
    { href: "/sobre", label: "Sobre Nós" },
    { href: "/vender", label: "Venda seu Carro" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        "transition-all duration-300 z-40",
        isTransparentMode ? "fixed top-0 left-0 right-0" : "sticky top-0",
        isTransparent
          ? "bg-transparent border-b border-transparent shadow-none"
          : "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100"
      )}
    >
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className={cn(
                "w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:scale-105",
                isTransparent
                  ? "bg-white/95 p-1 shadow-md shadow-black/20"
                  : "shadow-xs"
              )}
            >
              <Image
                src="/logo_vip.svg"
                alt="VipVeículos Logo"
                width={44}
                height={44}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div
                className={cn(
                  "text-lg sm:text-xl font-extrabold leading-tight tracking-tight transition-colors duration-300",
                  isTransparent
                    ? "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]"
                    : "text-[#323062]"
                )}
              >
                VipVeículos
              </div>
              <div
                className={cn(
                  "text-[11px] font-semibold leading-none transition-colors duration-300",
                  isTransparent
                    ? "text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                    : "text-slate-400"
                )}
              >
                Desde 2008
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "font-bold text-base transition-all duration-300 py-2 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:transition-all",
                    isTransparent
                      ? active
                        ? "text-red-400 after:w-full after:bg-[#D60404] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                        : "text-white hover:text-red-400 after:w-0 after:bg-[#D60404] hover:after:w-full drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                      : active
                        ? "text-[#D60404] after:w-full after:bg-[#D60404]"
                        : "text-[#323062] hover:text-[#D60404] after:w-0 after:bg-[#D60404] hover:after:w-full"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "w-11 h-11 rounded-xl transition-all duration-300 active:scale-95 shadow-2xs",
                  isTransparent
                    ? "border-white/30 text-white bg-black/20 hover:bg-white/20 hover:text-white"
                    : "border-slate-200 text-[#323062] hover:bg-slate-50"
                )}
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
                    <div className="text-xs font-semibold text-slate-400">
                      Desde 2008
                    </div>
                  </div>
                </Link>

                {/* Navigation Links */}
                <nav className="space-y-2.5">
                  {navItems.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center justify-between px-4 py-3.5 rounded-xl font-bold text-base active:scale-[0.98] transition-all",
                          active
                            ? "bg-[#D60404] text-white shadow-sm"
                            : "text-[#323062] bg-slate-50/80 hover:bg-[#D60404] hover:text-white"
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        <span>{item.label}</span>
                        <ChevronRight className={cn("w-5 h-5", active ? "opacity-90" : "opacity-40")} />
                      </Link>
                    );
                  })}
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
    </header>
  );
}
