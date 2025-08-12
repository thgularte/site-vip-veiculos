"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Car, Phone, MessageCircle } from 'lucide-react'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Início" },
    { href: "/vehicles", label: "Veículos" },
    { href: "/about", label: "Sobre Nós" },
  ]

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#D60404] to-[#A81818] rounded-lg flex items-center justify-center">
              <Car className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold text-[#323062]">VipVeículos</div>
              <div className="text-xs text-[#B9B9B9]">Desde 2008</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[#323062] hover:text-[#D60404] font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Contact Button */}
          <div className="hidden md:flex items-center gap-4">
            <Button className="bg-[#D60404] hover:bg-[#A81818] text-white">
              <Phone className="w-4 h-4 mr-2" />
              Contato
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-6 mt-6">
                <Link href="/" className="flex items-center gap-2 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#D60404] to-[#A81818] rounded-lg flex items-center justify-center">
                    <Car className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[#323062]">VipVeículos</div>
                    <div className="text-xs text-[#B9B9B9]">Desde 2008</div>
                  </div>
                </Link>
                
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-[#323062] hover:text-[#D60404] font-medium transition-colors py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                
                <Button className="bg-[#D60404] hover:bg-[#A81818] text-white mt-4">
                  <Phone className="w-4 h-4 mr-2" />
                  Contato
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          asChild
          size="lg"
          className="bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full w-14 h-14 p-0 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <a
            href="https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre os veículos da VipVeículos."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp"
          >
            <MessageCircle className="w-7 h-7" />
          </a>
        </Button>
      </div>
    </header>
  )
}
