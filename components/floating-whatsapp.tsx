"use client";

import { MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

export function FloatingWhatsAppButton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const phoneNumber = "5553984139110";
  const defaultMessage = "Olá! Vim pelo site da VipVeículos e gostaria de mais informações.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <aside
      aria-label="Atendimento via WhatsApp"
      className="fixed bottom-6 right-6 z-40 group flex items-center"
    >
      {/* Tooltip on hover */}
      <span className="hidden md:inline-block mr-3 px-3.5 py-1.5 rounded-full bg-[#1f1d42] text-white text-xs font-semibold shadow-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        Falar no WhatsApp
      </span>

      {/* Pulsing ring indicator */}
      <span className="absolute right-0 w-14 h-14 rounded-full bg-[#25D366] opacity-75 animate-ping -z-10" />

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chamar no WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-xl shadow-green-600/30 transition-transform duration-200 active:scale-95 group-hover:scale-110"
      >
        <MessageCircle className="w-8 h-8 fill-current" />
      </a>
    </aside>
  );
}
