"use client";

import { useState, useEffect } from "react";
import { Bell, BellRing, Check, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function NotificationPromptBanner() {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      "PushManager" in window &&
      "Notification" in window
    ) {
      setIsSupported(true);
      setPermission(Notification.permission);

      if (Notification.permission === "granted") {
        setIsSubscribed(true);
        return;
      }

      if (Notification.permission === "denied") {
        return;
      }

      // Se for padrão (default) e não dispensou recentemente
      const dismissed = localStorage.getItem("vip_push_prompt_dismissed");
      if (!dismissed) {
        // Mostra após 4 segundos de navegação
        const t = setTimeout(() => setIsVisible(true), 4000);
        return () => clearTimeout(t);
      }
    }
  }, []);

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      const perm = await Notification.requestPermission();
      setPermission(perm);

      if (perm !== "granted") {
        setIsVisible(false);
        setLoading(false);
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

      if (!vapidPublicKey) {
        console.error("VAPID Public Key not defined");
        setLoading(false);
        return;
      }

      let subscription = await registration.pushManager.getSubscription();
      if (!subscription) {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
        });
      }

      // Envia ao backend
      await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscription }),
      });

      setIsSubscribed(true);
      setIsVisible(false);
      toast({
        title: "🔔 Notificações ativadas!",
        description: "Você será avisado em primeira mão sempre que um novo carro chegar.",
      });
    } catch (err) {
      console.error("Erro ao ativar notificações:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("vip_push_prompt_dismissed", "true");
  };

  if (!isSupported || !isVisible || isSubscribed) {
    return null;
  }

  return (
    <aside
      aria-label="Notificações de Novos Veículos"
      className="fixed bottom-20 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-50 bg-[#1f1d42] text-white p-4 rounded-2xl shadow-2xl border border-red-500/30 animate-in slide-in-from-bottom duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-red-600/20 text-[#D60404] flex items-center justify-center shrink-0">
          <BellRing className="w-5 h-5 animate-bounce" />
        </div>

        <div className="flex-1 min-w-0 pr-4">
          <h4 className="font-bold text-sm text-white">Novos Carros no Estoque</h4>
          <p className="text-xs text-slate-300 mt-0.5 leading-snug">
            Deseja receber um aviso no seu celular sempre que um novo carro chegar na loja?
          </p>

          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              disabled={loading}
              onClick={handleSubscribe}
              className="bg-[#D60404] hover:bg-[#b00303] text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-md disabled:opacity-50"
            >
              <Check className="w-3.5 h-3.5" />
              {loading ? "Ativando..." : "Sim, me avisar"}
            </button>
            <button
              type="button"
              onClick={handleDismiss}
              className="text-xs text-slate-400 hover:text-slate-200 px-2 py-1 transition-colors"
            >
              Agora não
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          className="text-slate-400 hover:text-white p-1 rounded-md"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
