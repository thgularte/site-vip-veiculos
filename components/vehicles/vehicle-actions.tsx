"use client";

import { useState } from "react";
import { Vehicle } from "@/lib/vehicles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { MessageCircle, ArrowRightLeft, Calendar } from "lucide-react";
import { sendGAEvent } from "@next/third-parties/google";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface VehicleActionsProps {
    vehicle: Vehicle;
}

export function VehicleActions({ vehicle }: VehicleActionsProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        brandModel: "",
        year: "",
        km: "",
        details: "",
    });
    const [error, setError] = useState("");

    const [isScheduleOpen, setIsScheduleOpen] = useState(false);
    const [scheduleData, setScheduleData] = useState({
        name: "",
        phone: "",
        date: "",
        turn: "morning",
    });
    const [scheduleError, setScheduleError] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (error && name === "brandModel" && value.trim()) {
            setError("");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.brandModel.trim()) {
            setError("Por favor, informe a marca e o modelo do seu veículo.");
            return;
        }

        // Format WhatsApp message
        const targetNumber = "5553984139110";
        const intro = `Olá! Tenho interesse no *${vehicle.brand} ${vehicle.model}* (${vehicle.version}, ${vehicle.modelYear}/${vehicle.year}) anunciado no site e gostaria de propor uma troca.`;
        const details = `\n\n*Dados do meu veículo para troca:*\n- *Marca/Modelo:* ${formData.brandModel.trim()}\n- *Ano:* ${formData.year.trim() || "Não informado"}\n- *KM:* ${formData.km.trim() || "Não informado"}\n- *Observações/Opcionais:* ${formData.details.trim() || "Nenhuma"}`;
        
        const fullMessage = encodeURIComponent(intro + details);
        const whatsappUrl = `https://wa.me/${targetNumber}?text=${fullMessage}`;

        // Track GA4 event
        sendGAEvent({
            event: "submit_trade_proposal",
            value: `${vehicle.brand} ${vehicle.model}`,
        });

        window.open(whatsappUrl, "_blank");
        setIsOpen(false);
        // Reset form
        setFormData({
            brandModel: "",
            year: "",
            km: "",
            details: "",
        });
    };

    const handleDirectContactClick = () => {
        sendGAEvent({
            event: "click_whatsapp_direct",
            value: `${vehicle.brand} ${vehicle.model}`,
        });
    };

    const handleScheduleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setScheduleData((prev) => ({ ...prev, [name]: value }));
        if (scheduleError) {
            setScheduleError("");
        }
    };

    const handleScheduleSelectChange = (value: string) => {
        setScheduleData((prev) => ({ ...prev, turn: value }));
    };

    const handleScheduleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!scheduleData.name.trim() || !scheduleData.phone.trim() || !scheduleData.date) {
            setScheduleError("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        sendGAEvent({
            event: "schedule_visit_click",
            value: `${vehicle.brand} ${vehicle.model}`,
        });

        const targetNumber = "5553984139110";
        const [yearStr, monthStr, dayStr] = scheduleData.date.split("-");
        const formattedDate = `${dayStr}/${monthStr}/${yearStr}`;
        
        const turnLabel = 
            scheduleData.turn === "morning" ? "Manhã (09:00 - 12:00)" :
            scheduleData.turn === "afternoon" ? "Tarde (14:00 - 18:00)" : 
            "Sábado Pela Manhã (09:00 - 12:00)";

        const intro = `Olá! Gostaria de agendar uma visita/test-drive para ver o *${vehicle.brand} ${vehicle.model}* (${vehicle.version}, ${vehicle.modelYear}/${vehicle.year}).`;
        const body = `\n\n*Dados do Agendamento:*\n- *Nome:* ${scheduleData.name.trim()}\n- *WhatsApp:* ${scheduleData.phone.trim()}\n- *Data da Visita:* ${formattedDate}\n- *Turno Preferido:* ${turnLabel}`;
        
        const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(intro + body)}`;

        window.open(whatsappUrl, "_blank");
        setIsScheduleOpen(false);
        setScheduleData({
            name: "",
            phone: "",
            date: "",
            turn: "morning",
        });
    };

    return (
        <div className="mt-4 flex flex-col sm:flex-row gap-4 p-6 bg-white rounded-xl shadow-lg border border-primary/10 sticky bottom-4 lg:static z-40">
            <div className="flex-1">
                <p className="text-sm text-slate-500 mb-1">Valor do veículo</p>
                {vehicle.price === "Consulte" ? (
                    <p className="text-2xl font-bold text-primary">Sob Consulta</p>
                ) : (
                    <p className="text-3xl font-bold text-primary">{vehicle.price}</p>
                )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 flex-2 w-full sm:w-auto">
                <Button
                    asChild
                    size="lg"
                    className="flex-1 bg-green-600 hover:bg-green-700 shadow-xl shadow-green-600/20 text-white font-bold text-base h-auto py-4"
                >
                    <a
                        href={`https://wa.me/5553984139110?text=${encodeURIComponent(
                            `Olá! Estou vendo o ${vehicle.brand} ${vehicle.model} no site e gostaria de mais informações.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleDirectContactClick}
                    >
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Tenho Interesse
                    </a>
                </Button>

                {/* Propose Trade-In Button */}
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button
                            variant="outline"
                            size="lg"
                            className="flex-1 border-[#323062] text-[#323062] hover:bg-[#323062] hover:text-white font-bold text-base h-auto py-4 transition-all"
                        >
                            <ArrowRightLeft className="w-5 h-5 mr-2" />
                            Propor Troca
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[480px] rounded-2xl bg-white border border-slate-100 p-6 shadow-2xl">
                        <DialogHeader className="space-y-2">
                            <DialogTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                <ArrowRightLeft className="w-6 h-6 text-[#D60404]" />
                                Proposta de Troca
                            </DialogTitle>
                            <DialogDescription className="text-slate-500">
                                Envie os dados do seu veículo atual. Vamos avaliar e responder com a melhor proposta pelo *{vehicle.brand} {vehicle.model}*.
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="brandModel" className="text-sm font-semibold text-slate-700">
                                    Seu Veículo (Marca, Modelo e Versão) *
                                </Label>
                                <Input
                                    id="brandModel"
                                    name="brandModel"
                                    value={formData.brandModel}
                                    onChange={handleInputChange}
                                    placeholder="Ex: Chevrolet Onix 1.4 LTZ"
                                    className={`bg-slate-50 border-slate-200 focus:ring-2 focus:ring-primary/20 ${
                                        error ? "border-red-500 focus:ring-red-200" : ""
                                    }`}
                                />
                                {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="year" className="text-sm font-semibold text-slate-700">
                                        Ano (Modelo/Fabricação)
                                    </Label>
                                    <Input
                                        id="year"
                                        name="year"
                                        value={formData.year}
                                        onChange={handleInputChange}
                                        placeholder="Ex: 2018/2019"
                                        className="bg-slate-50 border-slate-200 focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="km" className="text-sm font-semibold text-slate-700">
                                        Quilometragem (KM)
                                    </Label>
                                    <Input
                                        id="km"
                                        name="km"
                                        value={formData.km}
                                        onChange={handleInputChange}
                                        placeholder="Ex: 65.000"
                                        className="bg-slate-50 border-slate-200 focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="details" className="text-sm font-semibold text-slate-700">
                                    Observações e Opcionais
                                </Label>
                                <Textarea
                                    id="details"
                                    name="details"
                                    rows={3}
                                    value={formData.details}
                                    onChange={handleInputChange}
                                    placeholder="Ex: Único dono, completo, bancos em couro, todas as revisões feitas na concessionária..."
                                    className="bg-slate-50 border-slate-200 focus:ring-2 focus:ring-primary/20 resize-none"
                                />
                            </div>

                            <div className="pt-2 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsOpen(false)}
                                    className="border-slate-200 text-slate-700 font-medium"
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold flex items-center justify-center shadow-lg shadow-green-600/20"
                                >
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    Enviar no WhatsApp
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Schedule Visit Button / Dialog */}
                <Dialog open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
                    <DialogTrigger asChild>
                        <Button
                            variant="outline"
                            size="lg"
                            className="flex-1 border-[#323062] text-[#323062] hover:bg-[#323062] hover:text-white font-bold text-base h-auto py-4 transition-all"
                        >
                            <Calendar className="w-5 h-5 mr-2" />
                            Agendar Visita
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[480px] rounded-2xl bg-white border border-slate-100 p-6 shadow-2xl">
                        <DialogHeader className="space-y-2">
                            <DialogTitle className="text-2xl font-bold text-[#323062] flex items-center gap-2">
                                <Calendar className="w-6 h-6 text-[#D60404]" />
                                Agendar Visita / Test-Drive
                            </DialogTitle>
                            <DialogDescription className="text-slate-500">
                                Agende um horário para conhecer o <strong>{vehicle.brand} {vehicle.model}</strong> pessoalmente e fazer um test-drive.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleScheduleSubmit} className="space-y-4 mt-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="scheduleName" className="text-sm font-semibold text-slate-700">Seu Nome Completo *</Label>
                                <Input
                                    id="scheduleName"
                                    name="name"
                                    value={scheduleData.name}
                                    onChange={handleScheduleChange}
                                    placeholder="Ex: Carlos Silva"
                                    className="bg-slate-50 border-slate-200 focus:ring-2 focus:ring-primary/20"
                                    required
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="schedulePhone" className="text-sm font-semibold text-slate-700">WhatsApp / Telefone *</Label>
                                <Input
                                    id="schedulePhone"
                                    name="phone"
                                    value={scheduleData.phone}
                                    onChange={handleScheduleChange}
                                    placeholder="Ex: (53) 99999-9999"
                                    className="bg-slate-50 border-slate-200 focus:ring-2 focus:ring-primary/20"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="scheduleDate" className="text-sm font-semibold text-slate-700">Data Preferida *</Label>
                                    <Input
                                        id="scheduleDate"
                                        name="date"
                                        type="date"
                                        value={scheduleData.date}
                                        onChange={handleScheduleChange}
                                        className="bg-slate-50 border-slate-200 focus:ring-2 focus:ring-primary/20 block w-full animate-none"
                                        required
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="scheduleTurn" className="text-sm font-semibold text-slate-700">Turno Preferido</Label>
                                    <Select
                                        value={scheduleData.turn}
                                        onValueChange={handleScheduleSelectChange}
                                    >
                                        <SelectTrigger id="scheduleTurn" className="bg-slate-50 border-slate-200 focus:ring-2 focus:ring-primary/20">
                                            <SelectValue placeholder="Selecione o turno" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            <SelectItem value="morning">Manhã (09:00 - 12:00)</SelectItem>
                                            <SelectItem value="afternoon">Tarde (14:00 - 18:00)</SelectItem>
                                            <SelectItem value="saturday">Sábado Pela Manhã</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {scheduleError && (
                                <p className="text-sm text-red-500 font-medium">{scheduleError}</p>
                            )}

                            <div className="pt-2 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsScheduleOpen(false)}
                                    className="border-slate-200 text-slate-700 font-medium"
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold flex items-center justify-center shadow-lg shadow-green-600/20"
                                >
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    Confirmar no WhatsApp
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
