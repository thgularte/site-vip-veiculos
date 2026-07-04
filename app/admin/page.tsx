"use client";

import { useState, useEffect } from "react";
import { AdminLogin } from "@/components/admin/admin-login";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    try {
      const auth = localStorage.getItem("vipveiculos_admin_logged_in");
      if (auth === "true") {
        setIsLoggedIn(true);
      }
    } catch (e) {
      console.error("Erro ao ler status de autenticação:", e);
    } finally {
      setIsCheckingAuth(false);
    }
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("vipveiculos_admin_logged_in");
    } catch (e) {
      console.error("Erro ao deslogar:", e);
    }
    setIsLoggedIn(false);
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#1a1936] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3 text-white/80">
          <div className="w-8 h-8 border-4 border-[#D60404] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium">Verificando segurança...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <AdminLogin onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
}
