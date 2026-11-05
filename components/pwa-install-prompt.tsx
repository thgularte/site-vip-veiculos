"use client";

import { useEffect, useState } from "react";
import { Download, X, Share, PlusSquare } from "lucide-react";
import Image from "next/image";
import { registerAppInstallClient } from "@/hooks/use-app-stats";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isDismissed, setIsDismissed] = useState(true);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    // Registra o Service Worker
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("Service Worker registrado com sucesso."))
        .catch((err) => console.log("Erro ao registrar Service Worker:", err));
    }

    // Detecta se já está instalado / rodando como app standalone
    const isApp =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    if (isApp) {
      setIsStandalone(true);
      registerAppInstallClient("standalone");
      return;
    }

    const onAppInstalled = () => {
      registerAppInstallClient("pwa_prompt");
      setIsDismissed(true);
    };
    window.addEventListener("appinstalled", onAppInstalled);

    // Verifica se já foi dispensado recentemente nesta sessão
    const dismissedSession = sessionStorage.getItem("pwa_prompt_dismissed");
    if (dismissedSession) {
      return () => {
        window.removeEventListener("appinstalled", onAppInstalled);
      };
    }

    // Detecta iOS Safari
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    const isSafari =
      /safari/.test(userAgent) &&
      !/chrome|crios|fxios|edgios/.test(userAgent);

    if (isIosDevice) {
      setIsIOS(true);
      // No iOS, se for Safari e não estiver instalado, mostra após 3s
      if (isSafari) {
        const timer = setTimeout(() => setIsDismissed(false), 3000);
        return () => {
          clearTimeout(timer);
          window.removeEventListener("appinstalled", onAppInstalled);
        };
      }
    }

    // Para Android / Chrome / Edge / Desktop
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsDismissed(false);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSInstructions(true);
      registerAppInstallClient("pwa_prompt");
      return;
    }

    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      registerAppInstallClient("pwa_prompt");
      setIsDismissed(true);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    setShowIOSInstructions(false);
    sessionStorage.setItem("pwa_prompt_dismissed", "true");
  };

  if (isStandalone || isDismissed) {
    return null;
  }

  return (
    <aside
      aria-label="Instalação do Aplicativo"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 bg-[#1f1d42] text-white p-4 rounded-2xl shadow-2xl border border-red-500/30 animate-in slide-in-from-bottom duration-300"
    >
      <div className="flex items-start gap-3.5">
        <div className="w-12 h-12 rounded-xl bg-white/10 p-1 flex-shrink-0 flex items-center justify-center border border-white/20">
          <Image
            src="/icon-192x192.png"
            alt="VipVeículos App"
            width={44}
            height={44}
            className="rounded-lg object-contain"
          />
        </div>

        <div className="flex-1 min-w-0 pr-6">
          <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
            Baixe o App VipVeículos
          </h4>
          <p className="text-xs text-slate-300 mt-0.5 leading-snug">
            Acesse as melhores ofertas e novidades direto da tela inicial do seu celular, mais rápido e sem ocupar memória.
          </p>

          {showIOSInstructions ? (
            <div className="mt-3 p-2.5 bg-white/10 rounded-lg text-xs space-y-1.5 text-slate-200 border border-white/10">
              <p className="font-medium text-amber-300">Como instalar no iPhone:</p>
              <div className="flex items-center gap-1.5">
                <span>1. Toque no botão de Compartilhar</span>
                <Share className="w-3.5 h-3.5 text-blue-400 inline" />
              </div>
              <div className="flex items-center gap-1.5">
                <span>2. Role e selecione</span>
                <span className="font-semibold text-white flex items-center gap-1">
                  &quot;Adicionar à Tela de Início&quot;
                  <PlusSquare className="w-3.5 h-3.5 inline" />
                </span>
              </div>
            </div>
          ) : (
            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={handleInstallClick}
                className="bg-[#D60404] hover:bg-[#b00303] text-white text-xs font-semibold px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-colors shadow-md shadow-red-950/40"
              >
                <Download className="w-3.5 h-3.5" />
                {isIOS ? "Como Instalar" : "Instalar Aplicativo"}
              </button>
              <button
                type="button"
                onClick={handleDismiss}
                className="text-xs text-slate-400 hover:text-slate-200 px-2 py-1.5 transition-colors"
              >
                Agora não
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded-md"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
