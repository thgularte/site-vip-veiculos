"use client";

import { useState, useEffect } from "react";
import { Vehicle } from "@/lib/vehicles";
import {
  formatGoogleDriveUrl,
  extractGoogleDriveId,
  isGoogleDriveUrl,
  compressImageFile,
  getDriveThumbnailFallback,
} from "@/lib/drive-helper";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  X,
  Image as ImageIcon,
  Sparkles,
  Car,
  Check,
  AlertCircle,
  Upload,
  Link as LinkIcon,
  HelpCircle,
  CheckCircle2,
  HardDrive,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Star,
  Layers,
} from "lucide-react";
import Image from "next/image";

interface VehicleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (vehicleData: Omit<Vehicle, "id">, existingId?: number) => void;
  initialData?: Vehicle | null;
}

const COMMON_FEATURES = [
  "Ar Condicionado",
  "Direção Hidráulica",
  "Vidros Elétricos",
  "Trava Elétrica",
  "Alarme",
  "Airbag",
  "Freios ABS",
  "Rodas de Liga Leve",
  "Sensor de Estacionamento",
  "Câmera de Ré",
  "Bancos em Couro",
  "Central Multimídia",
  "Teto Solar",
  "Farol de Neblina",
  "IPVA Pago",
  "Revisão em Dia",
];

const COMMON_EXTRAS = [
  "Aceitamos troca",
  "Único dono",
  "Garantia de fábrica",
  "Garantia da loja",
  "Manual e chave reserva",
];

export function VehicleFormModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: VehicleFormModalProps) {
  const isEditing = !!initialData;

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [version, setVersion] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [modelYear, setModelYear] = useState(new Date().getFullYear());
  const [price, setPrice] = useState("Consulte");
  const [fuel, setFuel] = useState("Flex");
  const [km, setKm] = useState("Consulte");
  const [transmission, setTransmission] = useState("Manual");
  const [color, setColor] = useState("");
  
  // Interactive N-Photo Suite State
  const [photos, setPhotos] = useState<string[]>([]);
  const [photoMode, setPhotoMode] = useState<"link" | "upload">("link");
  const [linkInput, setLinkInput] = useState("");
  const [isCompressing, setIsCompressing] = useState(false);
  const [showDriveHelp, setShowDriveHelp] = useState(false);

  // Other vehicle details
  const [features, setFeatures] = useState<string[]>([]);
  const [customFeature, setCustomFeature] = useState("");
  const [extras, setExtras] = useState<string[]>([]);
  const [customExtra, setCustomExtra] = useState("");
  const [description, setDescription] = useState("");
  const [archived, setArchived] = useState(false);

  useEffect(() => {
    if (initialData) {
      setBrand(initialData.brand || "");
      setModel(initialData.model || "");
      setVersion(initialData.version || "");
      setYear(initialData.year || new Date().getFullYear());
      setModelYear(initialData.modelYear || new Date().getFullYear());
      setPrice(initialData.price || "Consulte");
      setFuel(initialData.fuel || "Flex");
      setKm(initialData.km || "Consulte");
      setTransmission(initialData.transmission || "Manual");
      setColor(initialData.color || "");
      
      // Load all N photos (main image + gallery images)
      const initialPhotos: string[] = [];
      if (initialData.image) {
        initialPhotos.push(initialData.image);
      }
      if (initialData.images && Array.isArray(initialData.images)) {
        for (const img of initialData.images) {
          if (img && !initialPhotos.includes(img)) {
            initialPhotos.push(img);
          }
        }
      }
      setPhotos(initialPhotos);
      setLinkInput("");
      setPhotoMode("link");
      
      setFeatures(initialData.features || []);
      setExtras(initialData.extras || ["Aceitamos troca"]);
      setDescription(initialData.description || "");
      setArchived(!!initialData.archived);
    } else {
      setBrand("");
      setModel("");
      setVersion("");
      setYear(new Date().getFullYear());
      setModelYear(new Date().getFullYear());
      setPrice("Consulte");
      setFuel("Flex");
      setKm("Consulte");
      setTransmission("Manual");
      setColor("");
      
      setPhotos([]);
      setLinkInput("");
      setPhotoMode("link");
      
      setFeatures(["Direção Hidráulica", "Vidros Elétricos", "Ar Condicionado", "IPVA Pago"]);
      setExtras(["Aceitamos troca"]);
      setDescription("Veículo em excelente estado de conservação, revisado e com garantia.");
      setArchived(false);
    }
  }, [initialData, isOpen]);

  // N-Photo Manager Actions
  const handleAddLink = () => {
    if (!linkInput.trim()) return;
    // Split by comma or line break to support adding multiple links at once!
    const urls = linkInput
      .split(/,|\n/)
      .map((u) => u.trim())
      .filter((u) => u.length > 0);

    const newPhotos = [...photos];
    for (const url of urls) {
      const formatted = formatGoogleDriveUrl(url);
      if (!newPhotos.includes(formatted)) {
        newPhotos.push(formatted);
      }
    }
    setPhotos(newPhotos);
    setLinkInput("");
  };

  const handleMultiFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setIsCompressing(true);
      const newPhotos = [...photos];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const compressed = await compressImageFile(file, 1000, 0.82);
        if (!newPhotos.includes(compressed)) {
          newPhotos.push(compressed);
        }
      }
      setPhotos(newPhotos);
    } catch (err) {
      console.error("Erro ao otimizar e carregar imagens locais:", err);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleMakeCover = (index: number) => {
    if (index === 0 || index >= photos.length) return;
    const newPhotos = [...photos];
    const [selected] = newPhotos.splice(index, 1);
    newPhotos.unshift(selected); // Put at front as cover!
    setPhotos(newPhotos);
  };

  const handleMoveLeft = (index: number) => {
    if (index <= 0) return;
    const newPhotos = [...photos];
    const temp = newPhotos[index - 1];
    newPhotos[index - 1] = newPhotos[index];
    newPhotos[index] = temp;
    setPhotos(newPhotos);
  };

  const handleMoveRight = (index: number) => {
    if (index >= photos.length - 1) return;
    const newPhotos = [...photos];
    const temp = newPhotos[index + 1];
    newPhotos[index + 1] = newPhotos[index];
    newPhotos[index] = temp;
    setPhotos(newPhotos);
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  // Feature / Extra toggles
  const toggleFeature = (feat: string) => {
    if (features.includes(feat)) {
      setFeatures(features.filter((f) => f !== feat));
    } else {
      setFeatures([...features, feat]);
    }
  };

  const handleAddCustomFeature = () => {
    if (customFeature.trim() && !features.includes(customFeature.trim())) {
      setFeatures([...features, customFeature.trim()]);
      setCustomFeature("");
    }
  };

  const toggleExtra = (ext: string) => {
    if (extras.includes(ext)) {
      setExtras(extras.filter((e) => e !== ext));
    } else {
      setExtras([...extras, ext]);
    }
  };

  const handleAddCustomExtra = () => {
    if (customExtra.trim() && !extras.includes(customExtra.trim())) {
      setExtras([...extras, customExtra.trim()]);
      setCustomExtra("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedAll = photos
      .map((url) => formatGoogleDriveUrl(url.trim()))
      .filter((url) => url.length > 0);

    const mainImage = formattedAll[0] || "/car-hatchback.png";
    const galleryImages = formattedAll.length > 1 ? formattedAll.slice(1) : undefined;

    const vehicleData: Omit<Vehicle, "id"> = {
      brand: brand.trim() || "Marca",
      model: model.trim() || "Modelo",
      version: version.trim() || "Versão 1.0",
      year: Number(year) || new Date().getFullYear(),
      modelYear: Number(modelYear) || new Date().getFullYear(),
      price: price.trim() || "Consulte",
      fuel: fuel || "Flex",
      km: km.trim() || "Consulte",
      transmission: transmission || "Manual",
      color: color.trim() || "Cor",
      image: mainImage,
      images: galleryImages,
      features: features.length > 0 ? features : ["Veículo Revisado"],
      description: description.trim() || "Veículo em ótimo estado de conservação.",
      extras: extras.length > 0 ? extras : ["Aceitamos troca"],
      archived: archived,
    };

    onSave(vehicleData, initialData ? initialData.id : undefined);
  };

  const detectedDriveId = extractGoogleDriveId(linkInput);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 bg-slate-50 border-0 shadow-2xl rounded-2xl">
        <div className="bg-gradient-to-r from-[#323062] to-[#2A1770] text-white p-6 sticky top-0 z-20 shadow-md">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Car className="w-6 h-6 text-[#D60404]" />
            {isEditing ? `Editar ${initialData?.brand} ${initialData?.model}` : "Adicionar Novo Veículo"}
          </DialogTitle>
          <DialogDescription className="text-blue-100 text-sm mt-1">
            Preencha as informações abaixo e gerencie N fotos do veículo em tempo real.
          </DialogDescription>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Section 1: Informações Básicas */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 space-y-4">
            <h3 className="font-semibold text-lg text-slate-800 flex items-center gap-2 border-b pb-3">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">1</span>
              Informações Básicas do Veículo
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="brand" className="text-sm font-medium">Marca *</Label>
                <Input
                  id="brand"
                  placeholder="Ex: Volkswagen, Chevrolet..."
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="model" className="text-sm font-medium">Modelo *</Label>
                <Input
                  id="model"
                  placeholder="Ex: Gol, Onix, Corolla..."
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="version" className="text-sm font-medium">Versão *</Label>
                <Input
                  id="version"
                  placeholder="Ex: 1.6 Trendline Flex..."
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="space-y-1.5">
                <Label htmlFor="modelYear" className="text-sm font-medium">Ano Modelo</Label>
                <Input
                  id="modelYear"
                  type="number"
                  min={1990}
                  max={2030}
                  value={modelYear}
                  onChange={(e) => setModelYear(parseInt(e.target.value) || new Date().getFullYear())}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="year" className="text-sm font-medium">Ano Fabricação</Label>
                <Input
                  id="year"
                  type="number"
                  min={1990}
                  max={2030}
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value) || new Date().getFullYear())}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="price" className="text-sm font-medium">Preço *</Label>
                <Input
                  id="price"
                  placeholder="Ex: R$ 68.900 ou Consulte"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="km" className="text-sm font-medium">Quilometragem (Km) *</Label>
                <Input
                  id="km"
                  placeholder="Ex: 45.000 ou Consulte"
                  value={km}
                  onChange={(e) => setKm(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="space-y-1.5">
                <Label htmlFor="fuel" className="text-sm font-medium">Combustível</Label>
                <Select value={fuel} onValueChange={setFuel}>
                  <SelectTrigger id="fuel">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Flex">Flex</SelectItem>
                    <SelectItem value="Gasolina">Gasolina</SelectItem>
                    <SelectItem value="Diesel">Diesel</SelectItem>
                    <SelectItem value="Elétrico">Elétrico</SelectItem>
                    <SelectItem value="Híbrido">Híbrido</SelectItem>
                    <SelectItem value="Álcool">Álcool</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="transmission" className="text-sm font-medium">Câmbio</Label>
                <Select value={transmission} onValueChange={setTransmission}>
                  <SelectTrigger id="transmission">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manual">Manual</SelectItem>
                    <SelectItem value="Automático">Automático</SelectItem>
                    <SelectItem value="Automatizado">Automatizado</SelectItem>
                    <SelectItem value="CVT">CVT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="color" className="text-sm font-medium">Cor</Label>
                <Input
                  id="color"
                  placeholder="Ex: Branco, Preto, Prata..."
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Gestor de N Fotos Interativo */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4">
              <div>
                <h3 className="font-semibold text-lg text-slate-800 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">2</span>
                  Galeria de Fotos (Adicionar N Imagens)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Adicione quantas fotos quiser por link (Google Drive) ou fazendo upload de N arquivos ao mesmo tempo.
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge className="bg-[#323062] hover:bg-[#323062] text-white px-3 py-1 text-xs">
                  <Layers className="w-3.5 h-3.5 mr-1" />
                  Total: {photos.length} {photos.length === 1 ? "foto" : "fotos"}
                </Badge>
              </div>
            </div>

            {/* Mode Tabs */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center bg-slate-200/80 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setPhotoMode("link")}
                    className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${
                      photoMode === "link"
                        ? "bg-white text-[#323062] shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <LinkIcon className="w-3.5 h-3.5 text-[#D60404]" /> Colar Link(s) / Google Drive
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhotoMode("upload")}
                    className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${
                      photoMode === "upload"
                        ? "bg-white text-[#323062] shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5 text-blue-600" /> Enviar N Arquivos (Computador/Celular)
                  </button>
                </div>

                {photoMode === "link" && (
                  <button
                    type="button"
                    onClick={() => setShowDriveHelp(!showDriveHelp)}
                    className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <HelpCircle className="w-3.5 h-3.5" /> Como pegar o link no Drive?
                  </button>
                )}
              </div>

              {/* Tab 1: Link input */}
              {photoMode === "link" ? (
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      placeholder="Cole aqui o link do Google Drive (ex: https://drive.google...) ou link de imagem web. Você pode colar vários separados por vírgula!"
                      value={linkInput}
                      onChange={(e) => setLinkInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddLink();
                        }
                      }}
                      className="h-11 text-sm bg-white border-slate-300 focus:border-primary flex-1 shadow-sm"
                    />
                    <Button
                      type="button"
                      onClick={handleAddLink}
                      disabled={!linkInput.trim()}
                      className="bg-[#323062] hover:bg-[#2A1770] text-white font-semibold h-11 px-5 shrink-0 shadow-sm"
                    >
                      <Plus className="w-4 h-4 mr-1.5" /> Adicionar à Galeria
                    </Button>
                  </div>

                  {detectedDriveId && (
                    <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2 text-xs text-blue-900 animate-in fade-in duration-200">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>
                        <strong>Link do Google Drive Detectado!</strong> ID: <code className="bg-blue-100 px-1 rounded font-mono">{detectedDriveId}</code> — Será convertido automaticamente para alta velocidade.
                      </span>
                    </div>
                  )}

                  {showDriveHelp && (
                    <div className="p-3.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 space-y-2 shadow-inner animate-in fade-in slide-in-from-top-2 duration-200">
                      <p className="font-bold text-slate-800 flex items-center gap-1.5">
                        💡 Passo a passo para usar fotos do Google Drive:
                      </p>
                      <ol className="list-decimal list-inside space-y-1 ml-1 text-slate-600">
                        <li>No seu Google Drive, clique com o <strong>botão direito</strong> na foto do carro.</li>
                        <li>Selecione <strong>Compartilhar ➔ Compartilhar</strong>.</li>
                        <li>Em &quot;Acesso geral&quot;, mude de <em>Restrito</em> para <strong className="text-green-700">&quot;Qualquer pessoa com o link&quot;</strong>.</li>
                        <li>Clique em <strong>Copiar link</strong> e cole no campo acima!</li>
                      </ol>
                    </div>
                  )}
                </div>
              ) : (
                /* Tab 2: Multi-file Upload Dropzone */
                <div className="space-y-3">
                  <div className="border-2 border-dashed border-slate-300 hover:border-[#D60404] rounded-xl p-6 bg-white hover:bg-red-50/20 transition-all text-center relative cursor-pointer group shadow-sm">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleMultiFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                        {isCompressing ? (
                          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Upload className="w-6 h-6" />
                        )}
                      </div>
                      <p className="font-semibold text-sm text-slate-800">
                        {isCompressing ? "⏳ Otimizando fotos e adicionando..." : "Clique aqui para selecionar N fotos do computador ou celular"}
                      </p>
                      <p className="text-xs text-slate-500 max-w-sm">
                        Selecione <strong>várias imagens de uma só vez</strong> (segurando Ctrl ou Shift). As fotos serão otimizadas no navegador para carregamento instantâneo.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Visual N-Photo Grid */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
                <span>Fotos do Veículo na Ordem ({photos.length})</span>
                <span className="text-[11px] font-normal text-slate-400">
                  ⭐ A foto 1 é a capa do site. Clique em &quot;Tornar Capa&quot; para mudar!
                </span>
              </div>

              {photos.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {photos.map((photoUrl, index) => {
                    const isCover = index === 0;
                    return (
                      <div
                        key={`${index}-${photoUrl.slice(0, 20)}`}
                        className={`group relative bg-white rounded-xl overflow-hidden border-2 transition-all flex flex-col shadow-sm ${
                          isCover ? "border-[#D60404] ring-2 ring-[#D60404]/20 shadow-md" : "border-slate-200 hover:border-slate-400"
                        }`}
                      >
                        {/* Top Badge */}
                        <div className="absolute top-2 left-2 z-10 flex items-center gap-1">
                          {isCover ? (
                            <Badge className="bg-[#D60404] hover:bg-[#D60404] text-white text-[10px] font-extrabold px-2 py-0.5 shadow-md flex items-center gap-1">
                              <Star className="w-3 h-3 fill-current" /> CAPA PRINCIPAL
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-black/70 text-white hover:bg-black/80 text-[10px] font-bold backdrop-blur-sm">
                              # {index + 1}
                            </Badge>
                          )}
                        </div>

                        {/* Thumbnail Image */}
                        <div className="w-full h-36 relative bg-slate-100 overflow-hidden">
                          <img
                            src={photoUrl}
                            alt={`Foto ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              // If CDN fails, try thumbnail fallback
                              const fallback = getDriveThumbnailFallback(photoUrl);
                              if ((e.target as HTMLImageElement).src !== fallback) {
                                (e.target as HTMLImageElement).src = fallback;
                              } else {
                                (e.target as HTMLImageElement).src = "/car-hatchback.png";
                              }
                            }}
                          />
                        </div>

                        {/* Card Footer Actions */}
                        <div className="p-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-1">
                          {!isCover ? (
                            <button
                              type="button"
                              onClick={() => handleMakeCover(index)}
                              title="Transformar na foto de capa principal"
                              className="text-[11px] font-semibold text-[#323062] hover:text-[#D60404] flex items-center gap-1 px-1.5 py-1 rounded hover:bg-slate-200/70 transition-colors"
                            >
                              <Star className="w-3 h-3 text-amber-500" /> Tornar Capa
                            </button>
                          ) : (
                            <span className="text-[11px] font-bold text-slate-400 px-1.5 py-1 flex items-center gap-1">
                              <Check className="w-3 h-3 text-green-600" /> Foto 1 (Capa)
                            </span>
                          )}

                          <div className="flex items-center gap-0.5">
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() => handleMoveLeft(index)}
                                title="Mover para a esquerda"
                                className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded transition-colors"
                              >
                                <ArrowLeft className="w-3.5 h-3.5" />
                              </button>
                            )}
                            {index < photos.length - 1 && (
                              <button
                                type="button"
                                onClick={() => handleMoveRight(index)}
                                title="Mover para a direita"
                                className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded transition-colors"
                              >
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemovePhoto(index)}
                              title="Remover foto"
                              className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors ml-0.5"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-slate-50 rounded-2xl p-10 text-center border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-2">
                  <ImageIcon className="w-12 h-12 text-slate-300" />
                  <p className="font-bold text-slate-700 text-sm">Nenhum foto adicionada</p>
                  <p className="text-xs text-slate-500 max-w-md">
                    Use o campo acima para adicionar links do Google Drive ou carregar fotos do seu computador. A primeira foto adicionada será a capa do veículo.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Section 3: Descrição */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 space-y-4">
            <h3 className="font-semibold text-lg text-slate-800 flex items-center gap-2 border-b pb-3">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">3</span>
              Descrição e Detalhes
            </h3>

            <div className="space-y-1.5">
              <Label htmlFor="description" className="text-sm font-medium">Descrição do Veículo</Label>
              <Textarea
                id="description"
                placeholder="Descreva o estado do carro, manutenções, histórico..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>
          </div>

          {/* Section 4: Itens e Opcionais */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 space-y-4">
            <h3 className="font-semibold text-lg text-slate-800 flex items-center gap-2 border-b pb-3">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">4</span>
              Itens e Opcionais (Clique para selecionar)
            </h3>

            <div className="flex flex-wrap gap-2">
              {COMMON_FEATURES.map((feat) => {
                const isSelected = features.includes(feat);
                return (
                  <button
                    key={feat}
                    type="button"
                    onClick={() => toggleFeature(feat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 border ${
                      isSelected
                        ? "bg-[#323062] text-white border-[#323062] shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded flex items-center justify-center ${
                        isSelected ? "bg-[#D60404] text-white" : "border border-slate-300"
                      }`}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5" />}
                    </div>
                    {feat}
                  </button>
                );
              })}
            </div>

            {/* Custom feature add */}
            <div className="flex gap-2 pt-2 max-w-md">
              <Input
                placeholder="Outro item..."
                value={customFeature}
                onChange={(e) => setCustomFeature(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCustomFeature();
                  }
                }}
                className="text-sm h-9"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddCustomFeature}
                className="shrink-0 h-9"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Adicionar
              </Button>
            </div>

            {/* Selected items list if not in COMMON_FEATURES */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {features
                .filter((f) => !COMMON_FEATURES.includes(f))
                .map((feat) => (
                  <Badge
                    key={feat}
                    variant="secondary"
                    className="bg-primary/10 text-primary flex items-center gap-1 py-1 px-2.5 text-xs"
                  >
                    {feat}
                    <button
                      type="button"
                      onClick={() => toggleFeature(feat)}
                      className="hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
            </div>
          </div>

          {/* Section 5: Extras / Destaques */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 space-y-4">
            <h3 className="font-semibold text-lg text-slate-800 flex items-center gap-2 border-b pb-3">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">5</span>
              Destaques e Condições (Extras)
            </h3>

            <div className="flex flex-wrap gap-2">
              {COMMON_EXTRAS.map((ext) => {
                const isSelected = extras.includes(ext);
                return (
                  <button
                    key={ext}
                    type="button"
                    onClick={() => toggleExtra(ext)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 border ${
                      isSelected
                        ? "bg-[#D60404] text-white border-[#D60404] shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <Sparkles className="w-3 h-3" />
                    {ext}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-2 pt-2 max-w-md">
              <Input
                placeholder="Outro destaque..."
                value={customExtra}
                onChange={(e) => setCustomExtra(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCustomExtra();
                  }
                }}
                className="text-sm h-9"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddCustomExtra}
                className="shrink-0 h-9"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Adicionar
              </Button>
            </div>
          </div>

          {/* Section 6: Status / Arquivar */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <Label htmlFor="archived" className="font-semibold text-slate-800 text-base cursor-pointer">
                Ocultar do site (Arquivar)
              </Label>
              <p className="text-xs text-slate-500 mt-0.5">
                Veículos arquivados não aparecem no catálogo de clientes, mas continuam salvos no painel.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="archived"
                checked={archived}
                onCheckedChange={(checked) => setArchived(!!checked)}
                className="w-5 h-5"
              />
            </div>
          </div>

          <DialogFooter className="pt-4 border-t gap-3 sticky bottom-0 bg-slate-50 p-4 -mx-6 -mb-6 shadow-inner z-20">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-6 border-slate-300"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isCompressing}
              className="bg-[#D60404] hover:bg-[#A81818] text-white px-8 font-semibold shadow-md shadow-red-500/20"
            >
              <Check className="w-4 h-4 mr-2" />
              {isEditing ? "Salvar Alterações" : "Adicionar Veículo"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
