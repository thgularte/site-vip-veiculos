"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail, ShieldCheck, ArrowRight, AlertCircle, Car } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      // Admin credentials as requested by user
      if (
        email.trim().toLowerCase() === "vipveiculos@gmail.com" &&
        password === "v1234567"
      ) {
        localStorage.setItem("vipveiculos_admin_logged_in", "true");
        onLoginSuccess();
      } else {
        setError("E-mail ou senha incorretos. Verifique suas credenciais.");
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1936] via-[#2A1770] to-[#121124] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#D60404]/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none animate-pulse delay-700" />

      {/* Top right link to site */}
      <div className="absolute top-6 right-6 z-10">
        <Button
          asChild
          variant="outline"
          className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-[#323062] backdrop-blur-md transition-all"
        >
          <Link href="/">
            <Car className="w-4 h-4 mr-2" /> Voltar ao Site
          </Link>
        </Button>
      </div>

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-10 shadow-2xl relative z-10 text-white">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-white rounded-2xl p-2 shadow-lg mb-4 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
            <Image
              src="/logo.png"
              alt="VipVeículos Logo"
              width={56}
              height={56}
              className="object-contain"
            />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D60404]/30 border border-[#D60404]/50 text-red-200 text-xs font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D60404]" />
            Acesso Restrito
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Painel Administrativo
          </h1>
          <p className="text-gray-300 text-sm mt-1">
            Gerencie o estoque, adicione ou edite veículos do site.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/20 border border-red-500/40 flex items-start gap-3 text-red-200 text-sm animate-shake">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-200">
              E-mail Administrativo
            </Label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="vipveiculos@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 bg-black/20 border-white/15 text-white placeholder:text-gray-500 focus:border-[#D60404] focus:ring-1 focus:ring-[#D60404] h-12 rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-200">
              Senha secreta
            </Label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 bg-black/20 border-white/15 text-white placeholder:text-gray-500 focus:border-[#D60404] focus:ring-1 focus:ring-[#D60404] h-12 rounded-xl"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#D60404] hover:bg-[#A81818] text-white h-12 rounded-xl font-semibold text-base shadow-lg shadow-red-900/40 hover:shadow-red-900/60 transition-all duration-300 mt-2"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Autenticando...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Acessar Sistema <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-gray-400">
          <p>Sistema de Gerenciamento VIP Veículos © 2026</p>
          <p className="mt-1 opacity-75">Armazenamento em Frontend JSON Local</p>
        </div>
      </div>
    </div>
  );
}
