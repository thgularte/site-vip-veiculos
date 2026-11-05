"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Download, Sparkles, Smartphone, Share, PlusSquare, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { registerAppInstallClient } from "@/hooks/use-app-stats";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function VehicleAppInstallModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSSteps, setShowIOSSteps] = useState(false);

  useEffect(() => {
    // Não exibe se o cliente já estiver usando a versão instalada (standalone)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    if (isStandalone) {
      registerAppInstallClient("standalone");
      return;
    }

    const onAppInstalled = () => {
      registerAppInstallClient("modal");
      setIsOpen(false);
    };
    window.addEventListener("appinstalled", onAppInstalled);

    // Não exibe novamente se o usuário já fechou o modal nos últimos 3 dias
    const lastDismissed = localStorage.getItem("vip_app_modal_dismissed");
    if (lastDismissed) {
      const dismissedTime = parseInt(lastDismissed, 10);
      const threeDaysMs = 3 * 24 * 60 * 60 * 1000;
      if (Date.now() - dismissedTime < threeDaysMs) {
        return () => {
          window.removeEventListener("appinstalled", onAppInstalled);
        };
      }
    }

    // Detecta iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    if (isIosDevice) {
      setIsIOS(true);
    }

    // Captura evento de instalação do Chrome/Android/Desktop
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    // Abre o modal após 1.2 segundo da entrada na página
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1200);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSSteps(true);
      registerAppInstallClient("modal");
      return;
    }

    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        registerAppInstallClient("modal");
        setIsOpen(false);
      }
      setDeferredPrompt(null);
    } else {
      // Caso o navegador não suporte prompt programático
      setShowIOSSteps(true);
      registerAppInstallClient("modal");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    // Salva data que dispensou para não ser intrusivo a cada clique
    localStorage.setItem("vip_app_modal_dismissed", Date.now().toString());
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => (!open ? handleClose() : setIsOpen(true))}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-white border-0 shadow-2xl rounded-3xl">
        {/* Top Header Banner com cores da VipVeículos */}
        <div className="relative bg-gradient-to-br from-[#323062] via-[#2A1770] to-[#1f1d42] p-6 text-white text-center overflow-hidden">
          {/* Luzes decorativas de fundo */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-red-600/20 rounded-full blur-2xl -translate-y-12 translate-x-12" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl translate-y-8 -translate-x-8" />

          {/* Logo App */}
          <div className="relative mx-auto w-20 h-20 rounded-2xl bg-white p-2 shadow-xl flex items-center justify-center mb-3">
            <Image
              src="/icon-192x192.png"
              alt="Ícone App VipVeículos"
              width={68}
              height={68}
              className="rounded-xl object-contain"
            />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-md mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Aplicativo Exclusivo
          </span>

          <DialogHeader className="space-y-1.5">
            <DialogTitle className="text-2xl font-black text-white tracking-tight">
              Baixe o App da VipVeículos!
            </DialogTitle>
            <DialogDescription className="text-blue-100 text-sm">
              Tenha todo o nosso estoque de Rio Grande na palma da sua mão com máxima velocidade.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          {!showIOSSteps ? (
            <>
              <div className="space-y-2.5">
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <div className="w-7 h-7 rounded-lg bg-red-50 text-[#D60404] flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 font-bold" />
                  </div>
                  <span>Receba novidades e carros recém-chegados</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <div className="w-7 h-7 rounded-lg bg-red-50 text-[#D60404] flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 font-bold" />
                  </div>
                  <span>Navegação ultra rápida sem barra de navegador</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <div className="w-7 h-7 rounded-lg bg-red-50 text-[#D60404] flex items-center justify-center shrink-0">
                    <Smartphone className="w-4 h-4 font-bold" />
                  </div>
                  <span>Não ocupa espaço na memória do aparelho</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2.5">
                <Button
                  onClick={handleInstallClick}
                  size="lg"
                  className="w-full bg-[#D60404] hover:bg-[#b00303] text-white font-black text-base h-13 rounded-xl shadow-lg shadow-red-600/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  {isIOS ? "Como Adicionar ao Celular" : "Instalar Aplicativo Agora"}
                </Button>

                <Button
                  variant="ghost"
                  onClick={handleClose}
                  className="w-full text-slate-500 hover:text-slate-800 text-sm font-semibold h-10 rounded-xl"
                >
                  Continuar no navegador
                </Button>
              </div>
            </>
          ) : (
            /* Passo a passo para iPhone ou navegadores com fluxo manual */
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-sm text-[#323062] flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#D60404]" />
                  Passo a passo no seu celular:
                </h4>

                <div className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 font-bold flex items-center justify-center shrink-0 text-xs">
                      1
                    </span>
                    <p>
                      Toque no botão de <strong>Compartilhar</strong>{" "}
                      <Share className="w-4 h-4 text-blue-500 inline mx-1" /> na barra inferior do Safari.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 font-bold flex items-center justify-center shrink-0 text-xs">
                      2
                    </span>
                    <p>
                      Role para cima e toque em{" "}
                      <span className="font-semibold text-[#323062] inline-flex items-center gap-1">
                        &quot;Adicionar à Tela de Início&quot;
                        <PlusSquare className="w-3.5 h-3.5 inline text-slate-600" />
                      </span>.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 font-bold flex items-center justify-center shrink-0 text-xs">
                      3
                    </span>
                    <p>
                      Toque em <strong>Adicionar</strong> no canto superior direito. Pronto!
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleClose}
                className="w-full bg-[#323062] hover:bg-[#2A1770] text-white font-bold h-12 rounded-xl"
              >
                Entendi, ver veículos
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
