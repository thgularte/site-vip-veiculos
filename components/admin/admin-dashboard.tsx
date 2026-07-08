"use client";

import { useState, useMemo } from "react";
import { useVehicles } from "@/hooks/use-vehicles";
import { Vehicle } from "@/lib/vehicles";
import { formatGoogleDriveUrl } from "@/lib/drive-helper";
import { VehicleFormModal } from "./vehicle-form-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Archive,
  ArchiveRestore,
  ExternalLink,
  LogOut,
  Car,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Filter,
  Layers,
  Calendar,
  Gauge,
  Tag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const {
    vehicles,
    activeVehicles,
    archivedVehicles,
    isLoaded,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    toggleArchive,
    resetToDefault,
  } = useVehicles();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "archived">("all");
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  // Alert dialogs state
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      if (filterStatus === "active" && v.archived) return false;
      if (filterStatus === "archived" && !v.archived) return false;

      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const fullStr = `${v.brand} ${v.model} ${v.version} ${v.year} ${v.color}`.toLowerCase();
        if (!fullStr.includes(query)) return false;
      }
      return true;
    });
  }, [vehicles, filterStatus, searchTerm]);

  const uniqueBrandsCount = useMemo(() => {
    return new Set(vehicles.map((v) => v.brand)).size;
  }, [vehicles]);

  const handleOpenCreate = () => {
    setEditingVehicle(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setIsModalOpen(true);
  };

  const handleSaveVehicle = (vehicleData: Omit<Vehicle, "id">, existingId?: number) => {
    if (existingId !== undefined) {
      updateVehicle({ ...vehicleData, id: existingId });
      showToast(` Veículo ${vehicleData.brand} ${vehicleData.model} atualizado com sucesso!`);
    } else {
      addVehicle(vehicleData);
      showToast(` Novo veículo ${vehicleData.brand} ${vehicleData.model} adicionado ao estoque!`);
    }
    setIsModalOpen(false);
    setEditingVehicle(null);
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmId !== null) {
      const v = vehicles.find((item) => item.id === deleteConfirmId);
      deleteVehicle(deleteConfirmId);
      showToast(` Veículo ${v?.brand || ""} ${v?.model || ""} foi excluído do estoque.`);
      setDeleteConfirmId(null);
    }
  };

  const handleConfirmReset = () => {
    resetToDefault();
    showToast(" Padrão de fábrica restaurado com sucesso! (21 veículos originais)");
    setIsResetConfirmOpen(false);
  };

  const handleToggleArchive = (id: number) => {
    const v = vehicles.find((item) => item.id === id);
    toggleArchive(id);
    if (v?.archived) {
      showToast(` Veículo ${v.brand} ${v.model} desarquivado e visível no site!`);
    } else {
      showToast(` Veículo ${v?.brand} ${v?.model} arquivado (oculto no site).`);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="font-medium">Carregando painel de controle...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#323062] text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-white/20 animate-in fade-in slide-in-from-top duration-300">
          <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Admin Header */}
      <header className="bg-gradient-to-r from-[#323062] via-[#2A1770] to-[#1e1054] text-white shadow-xl sticky top-0 z-30">
        <div className="container mx-auto max-w-7xl px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white p-1 shadow-md flex items-center justify-center shrink-0">
              <Image src="/logo.png" alt="Logo" width={36} height={36} className="object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight">Painel VIP Veículos</h1>
                <Badge className="bg-[#D60404] hover:bg-[#A81818] text-white text-[10px] uppercase font-bold px-2 py-0.5">
                  Admin
                </Badge>
              </div>
              <p className="text-xs text-blue-200">
                Logado como <strong className="text-white">vipveiculos@gmail.com</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-[#323062] font-medium transition-all"
            >
              <Link href="/vehicles" target="_blank">
                <ExternalLink className="w-4 h-4 mr-1.5" /> Ver Site / Catálogo
              </Link>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={onLogout}
              className="bg-red-600/80 hover:bg-red-600 text-white font-medium shadow-md transition-all"
            >
              <LogOut className="w-4 h-4 mr-1.5" /> Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl px-4 mt-8 space-y-8">
        {/* KPI Cards Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-5 bg-white border-0 shadow-md rounded-2xl flex items-center justify-between relative overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#323062]/5 rounded-full -mr-6 -mt-6 group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Total no Estoque
              </p>
              <p className="text-3xl font-extrabold text-[#323062] mt-1">{vehicles.length}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#323062]/10 flex items-center justify-center text-[#323062]">
              <Car className="w-6 h-6" />
            </div>
          </Card>

          <Card className="p-5 bg-white border-0 shadow-md rounded-2xl flex items-center justify-between relative overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-full -mr-6 -mt-6 group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Ativos no Site
              </p>
              <p className="text-3xl font-extrabold text-green-600 mt-1">{activeVehicles.length}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </Card>

          <Card className="p-5 bg-white border-0 shadow-md rounded-2xl flex items-center justify-between relative overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full -mr-6 -mt-6 group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Arquivados
              </p>
              <p className="text-3xl font-extrabold text-amber-600 mt-1">{archivedVehicles.length}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600">
              <Archive className="w-6 h-6" />
            </div>
          </Card>

          <Card className="p-5 bg-white border-0 shadow-md rounded-2xl flex items-center justify-between relative overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full -mr-6 -mt-6 group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Marcas Diversas
              </p>
              <p className="text-3xl font-extrabold text-[#D60404] mt-1">{uniqueBrandsCount}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#D60404]/10 flex items-center justify-center text-[#D60404]">
              <Layers className="w-6 h-6" />
            </div>
          </Card>
        </div>

        {/* Toolbar: Search, Filters, Add & Reset */}
        <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto flex-1">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Buscar por marca, modelo, ano..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-50 border-slate-200 focus:bg-white rounded-xl h-10 text-sm w-full"
              />
            </div>

            <div className="flex items-center p-1 bg-slate-100 rounded-xl w-full sm:w-auto overflow-x-auto">
              <button
                type="button"
                onClick={() => setFilterStatus("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  filterStatus === "all"
                    ? "bg-white text-[#323062] shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Todos ({vehicles.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterStatus("active")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  filterStatus === "active"
                    ? "bg-white text-green-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Ativos ({activeVehicles.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterStatus("archived")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  filterStatus === "archived"
                    ? "bg-white text-amber-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Arquivados ({archivedVehicles.length})
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsResetConfirmOpen(true)}
              className="border-slate-300 text-slate-700 hover:bg-slate-100 rounded-xl h-10 text-xs font-medium shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
              Restaurar Original
            </Button>

            <Button
              onClick={handleOpenCreate}
              className="bg-[#D60404] hover:bg-[#A81818] text-white rounded-xl h-10 text-sm font-semibold shadow-md shadow-red-600/20 px-5 shrink-0"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Adicionar Veículo
            </Button>
          </div>
        </div>

        {/* Vehicles List / Grid */}
        {filteredVehicles.length > 0 ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <span>Veículos listados ({filteredVehicles.length})</span>
              <span>Ações Rápidas</span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredVehicles.map((vehicle) => (
                <Card
                  key={vehicle.id}
                  className={`p-4 md:p-5 bg-white border-0 shadow-sm hover:shadow-md transition-all rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-l-4 ${
                    vehicle.archived ? "border-l-amber-500 opacity-80 bg-slate-50/80" : "border-l-green-500"
                  }`}
                >
                  {/* Left: Thumbnail & Main Info */}
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="w-24 h-20 md:w-28 md:h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 relative shadow-inner border border-slate-200">
                      <img
                        src={formatGoogleDriveUrl(vehicle.image || "/car-hatchback.png")}
                        alt={vehicle.model}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/car-hatchback.png";
                        }}
                      />
                      {vehicle.archived && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-[10px] font-bold uppercase tracking-wider">
                          Arquivado
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-extrabold text-slate-800 text-base md:text-lg">
                          {vehicle.brand} {vehicle.model}
                        </span>
                        <Badge variant="secondary" className="text-xs font-semibold bg-slate-100 text-slate-700">
                          {vehicle.version}
                        </Badge>
                        {vehicle.archived ? (
                          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-0 text-[11px] font-semibold">
                            Inativo (Arquivado)
                          </Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-0 text-[11px] font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Ativo
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          Ano: {vehicle.modelYear}/{vehicle.year}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Gauge className="w-3.5 h-3.5 text-slate-400" />
                          Km: {vehicle.km}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Tag className="w-3.5 h-3.5 text-slate-400" />
                          {vehicle.transmission} / {vehicle.fuel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Middle: Price */}
                  <div className="text-left md:text-right w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                    <span className="text-xs font-semibold text-slate-400 uppercase block">Preço</span>
                    <span className="text-lg md:text-xl font-extrabold text-[#D60404]">
                      {vehicle.price}
                    </span>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenEdit(vehicle)}
                      className="bg-white hover:bg-slate-50 text-slate-700 border-slate-300 rounded-xl h-9 px-3 text-xs font-semibold"
                    >
                      <Edit className="w-3.5 h-3.5 mr-1 text-blue-600" />
                      Editar
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleArchive(vehicle.id)}
                      title={vehicle.archived ? "Restaurar para o site" : "Arquivar veículo"}
                      className={`rounded-xl h-9 px-3 text-xs font-semibold border ${
                        vehicle.archived
                          ? "bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-300"
                          : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-300"
                      }`}
                    >
                      {vehicle.archived ? (
                        <>
                          <ArchiveRestore className="w-3.5 h-3.5 mr-1 text-amber-600" />
                          Desarquivar
                        </>
                      ) : (
                        <>
                          <Archive className="w-3.5 h-3.5 mr-1 text-slate-500" />
                          Arquivar
                        </>
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setDeleteConfirmId(vehicle.id)}
                      title="Excluir veículo"
                      className="bg-white hover:bg-red-50 text-red-600 hover:text-red-700 border-slate-300 hover:border-red-300 rounded-xl h-9 px-2.5"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>

                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      title="Ver página no site"
                      className="text-slate-500 hover:text-[#323062] hover:bg-slate-100 rounded-xl h-9 px-2.5"
                    >
                      <Link href={`/veiculos/${vehicle.id}`} target="_blank">
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-slate-200">
            <Car className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-700">Nenhum veículo encontrado</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto mt-1">
              {searchTerm || filterStatus !== "all"
                ? "Tente ajustar a busca ou alterar os filtros de status selecionados."
                : "Seu estoque está vazio. Clique em 'Adicionar Veículo' ou restaure o padrão de fábrica."}
            </p>
            {(searchTerm || filterStatus !== "all") && (
              <Button
                variant="link"
                onClick={() => {
                  setSearchTerm("");
                  setFilterStatus("all");
                }}
                className="text-primary mt-2"
              >
                Limpar filtros de busca
              </Button>
            )}
          </div>
        )}
      </main>

      {/* Vehicle Add / Edit Modal */}
      <VehicleFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingVehicle(null);
        }}
        onSave={handleSaveVehicle}
        initialData={editingVehicle}
      />

      {/* Delete Confirmation Alert */}
      <AlertDialog
        open={deleteConfirmId !== null}
        onOpenChange={(open) => !open && setDeleteConfirmId(null)}
      >
        <AlertDialogContent className="bg-white rounded-2xl max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-600 text-lg">
              <AlertTriangle className="w-5 h-5" /> Confirmar Exclusão
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600">
              Tem certeza que deseja excluir permanentemente este veículo do seu catálogo local? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="rounded-xl">Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white rounded-xl"
            >
              Sim, Excluir Veículo
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reset to Default Confirmation Alert */}
      <AlertDialog open={isResetConfirmOpen} onOpenChange={setIsResetConfirmOpen}>
        <AlertDialogContent className="bg-white rounded-2xl max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-[#323062] text-lg">
              <RotateCcw className="w-5 h-5 text-primary" /> Restaurar Padrão de Fábrica?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600">
              Isso irá substituir toda a sua lista atual no localStorage pelos 21 veículos originais do site. Todas as suas edições, adicões ou exclusões serão substituídas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="rounded-xl">Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmReset}
              className="bg-[#323062] hover:bg-[#2A1770] text-white rounded-xl"
            >
              Sim, Restaurar Original
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
