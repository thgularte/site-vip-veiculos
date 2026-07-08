"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sendGAEvent } from "@next/third-parties/google";
import { Car, DollarSign, Gauge, Shield, Zap, Sparkles, MessageCircle } from "lucide-react";

export default function SellPage() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        brandModel: "",
        year: "",
        km: "",
        price: "",
        details: "",
    });
    
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = "O nome é obrigatório.";
        if (!formData.phone.trim()) newErrors.phone = "O WhatsApp/Telefone é obrigatório.";
        if (!formData.brandModel.trim()) newErrors.brandModel = "As informações do carro são obrigatórias.";
        if (!formData.year.trim()) newErrors.year = "O ano é obrigatório.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // GA4 tracking event
        sendGAEvent({
            event: "submit_sell_proposal",
            value: formData.brandModel,
        });

        // Format WhatsApp message
        const targetNumber = "5553984139110";
        const intro = `Olá! Gostaria de oferecer meu veículo para avaliação de compra na VipVeículos.`;
        const body = `\n\n*Informações de Contato:*\n- *Nome:* ${formData.name.trim()}\n- *WhatsApp:* ${formData.phone.trim()}\n\n*Dados do Veículo:*\n- *Carro:* ${formData.brandModel.trim()}\n- *Ano:* ${formData.year.trim()}\n- *Quilometragem:* ${formData.km.trim() || "Não informada"} km\n- *Preço Desejado:* R$ ${formData.price.trim() || "A combinar"}\n- *Observações/Estado Geral:* ${formData.details.trim() || "Nenhuma"}`;
        
        const fullUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(intro + body)}`;
        window.open(fullUrl, "_blank");

        // Clear form
        setFormData({
            name: "",
            phone: "",
            brandModel: "",
            year: "",
            km: "",
            price: "",
            details: "",
        });
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navigation />

            {/* Header Banner */}
            <section className="bg-gradient-to-r from-[#323062] to-[#2A1770] text-white py-16 px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-16 translate-x-16" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-500/10 rounded-full blur-3xl translate-y-10 -translate-x-10" />

                <div className="container mx-auto max-w-6xl relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                        Venda seu Carro
                    </h1>
                    <p className="text-blue-100 text-lg md:text-xl font-light max-w-2xl mx-auto">
                        Quer vender seu veículo? Na VipVeículos avaliamos seu carro de forma justa e desburocratizada. Preencha os dados e receba uma proposta.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <main className="container mx-auto max-w-6xl px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    
                    {/* Left Column: Advantages Card */}
                    <div className="space-y-6 lg:col-span-1">
                        <Card className="border-slate-100 shadow-md bg-white">
                            <CardHeader className="border-b border-slate-50 pb-4">
                                <CardTitle className="text-xl font-bold text-[#323062] flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-[#D60404]" />
                                    Vantagens da Vip
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                                        <Zap className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-800 text-sm">Avaliação Rápida</h4>
                                        <p className="text-xs text-slate-500 mt-1">Preencha as informações e avaliaremos seu veículo em pouquíssimo tempo.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                                        <DollarSign className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-800 text-sm">Pagamento Imediato</h4>
                                        <p className="text-xs text-slate-500 mt-1">Proposta aprovada? O pagamento é realizado na hora, direto via Pix ou transferência.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-[#2A1770] shrink-0">
                                        <Shield className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-800 text-sm">Segurança Total</h4>
                                        <p className="text-xs text-slate-500 mt-1">Com mais de 15 anos no mercado, garantimos trâmite seguro e sem dor de cabeça com papelada.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Form Card */}
                    <div className="lg:col-span-2">
                        <Card className="border-slate-100 shadow-lg bg-white p-6 rounded-2xl">
                            <CardHeader className="px-0 pt-0 pb-6 border-b border-slate-100">
                                <CardTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                    <Car className="w-6 h-6 text-[#D60404]" />
                                    Formulário de Avaliação
                                </CardTitle>
                            </CardHeader>

                            <form onSubmit={handleSubmit} className="space-y-6 pt-6">
                                
                                {/* Client Info Section */}
                                <div className="space-y-4">
                                    <h3 className="font-bold text-sm uppercase text-slate-400 tracking-wider">Informações de Contato</h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <Label htmlFor="name" className="text-sm font-semibold text-slate-700">Seu Nome Completo *</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="Ex: João da Silva"
                                                className={`bg-slate-50 border-slate-200 focus:ring-2 focus:ring-primary/20 ${errors.name ? "border-red-500 focus:ring-red-200" : ""}`}
                                            />
                                            {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name}</p>}
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="phone" className="text-sm font-semibold text-slate-700">WhatsApp / Telefone *</Label>
                                            <Input
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="Ex: (53) 99999-9999"
                                                className={`bg-slate-50 border-slate-200 focus:ring-2 focus:ring-primary/20 ${errors.phone ? "border-red-500 focus:ring-red-200" : ""}`}
                                            />
                                            {errors.phone && <p className="text-xs text-red-500 font-medium">{errors.phone}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Vehicle Info Section */}
                                <div className="space-y-4 pt-4 border-t border-slate-100">
                                    <h3 className="font-bold text-sm uppercase text-slate-400 tracking-wider">Dados do seu Carro</h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <Label htmlFor="brandModel" className="text-sm font-semibold text-slate-700">Marca, Modelo e Versão *</Label>
                                            <Input
                                                id="brandModel"
                                                name="brandModel"
                                                value={formData.brandModel}
                                                onChange={handleInputChange}
                                                placeholder="Ex: Ford Ka 1.0 SE Flex"
                                                className={`bg-slate-50 border-slate-200 focus:ring-2 focus:ring-primary/20 ${errors.brandModel ? "border-red-500 focus:ring-red-200" : ""}`}
                                            />
                                            {errors.brandModel && <p className="text-xs text-red-500 font-medium">{errors.brandModel}</p>}
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="year" className="text-sm font-semibold text-slate-700">Ano (Modelo / Fabricação) *</Label>
                                            <Input
                                                id="year"
                                                name="year"
                                                value={formData.year}
                                                onChange={handleInputChange}
                                                placeholder="Ex: 2017/2018"
                                                className={`bg-slate-50 border-slate-200 focus:ring-2 focus:ring-primary/20 ${errors.year ? "border-red-500 focus:ring-red-200" : ""}`}
                                            />
                                            {errors.year && <p className="text-xs text-red-500 font-medium">{errors.year}</p>}
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <Label htmlFor="km" className="text-sm font-semibold text-slate-700">Quilometragem (KM)</Label>
                                            <Input
                                                id="km"
                                                name="km"
                                                value={formData.km}
                                                onChange={handleInputChange}
                                                placeholder="Ex: 45.000"
                                                className="bg-slate-50 border-slate-200 focus:ring-2 focus:ring-primary/20"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="price" className="text-sm font-semibold text-slate-700">Preço Desejado (R$)</Label>
                                            <Input
                                                id="price"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleInputChange}
                                                placeholder="Ex: R$ 38.500"
                                                className="bg-slate-50 border-slate-200 focus:ring-2 focus:ring-primary/20"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Details Section */}
                                <div className="space-y-1.5 pt-4 border-t border-slate-100">
                                    <Label htmlFor="details" className="text-sm font-semibold text-slate-700">Detalhes / Opcionais / Estado de Conservação</Label>
                                    <Textarea
                                        id="details"
                                        name="details"
                                        rows={4}
                                        value={formData.details}
                                        onChange={handleInputChange}
                                        placeholder="Descreva detalhes como: direção hidráulica, ar condicionado, único dono, se possui amassados, riscos, revisões feitas, etc."
                                        className="bg-slate-50 border-slate-200 focus:ring-2 focus:ring-primary/20 resize-none"
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className="pt-6 flex justify-end">
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1fba59] text-white font-extrabold h-14 px-8 rounded-xl shadow-xl shadow-green-600/25 active:scale-[0.98] transition-all text-base flex items-center justify-center gap-2.5"
                                    >
                                        <MessageCircle className="w-6 h-6 fill-current shrink-0" />
                                        <span>Enviar Proposta via WhatsApp</span>
                                    </Button>
                                </div>

                            </form>
                        </Card>
                    </div>

                </div>
            </main>
        </div>
    );
}
