"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { formatGoogleDriveUrl } from "@/lib/drive-helper";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface VehicleGalleryProps {
    image: string;
    images?: string[];
    brand: string;
    model: string;
    extras?: string[];
}

export function VehicleGallery({
    image,
    images,
    brand,
    model,
    extras,
}: VehicleGalleryProps) {
    const [api, setApi] = useState<CarouselApi>();
    const [fullscreenApi, setFullscreenApi] = useState<CarouselApi>();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Combine main image and additional images into an N-photo gallery
    const getGalleryImages = useCallback(() => {
        const all: string[] = [];
        if (image) {
            all.push(formatGoogleDriveUrl(image));
        }
        if (images && images.length > 0) {
            for (const img of images) {
                const formatted = formatGoogleDriveUrl(img);
                if (formatted && !all.includes(formatted)) {
                    all.push(formatted);
                }
            }
        }
        if (all.length > 0) return all;

        return ["/car-hatchback.png"];
    }, [image, images]);

    const galleryList = getGalleryImages();

    useEffect(() => {
        if (!api) return;

        api.on("select", () => {
            setCurrentIndex(api.selectedScrollSnap());
        });
    }, [api]);

    useEffect(() => {
        if (!fullscreenApi) return;

        fullscreenApi.on("select", () => {
            setCurrentIndex(fullscreenApi.selectedScrollSnap());
            if (api) {
                api.scrollTo(fullscreenApi.selectedScrollSnap());
            }
        });
    }, [fullscreenApi, api]);

    const handleThumbnailClick = (index: number) => {
        if (api) api.scrollTo(index);
        if (fullscreenApi) fullscreenApi.scrollTo(index);
        setCurrentIndex(index);
    };

    const handlePrev = () => {
        if (api) api.scrollPrev();
    };

    const handleNext = () => {
        if (api) api.scrollNext();
    };

    const openFullscreen = (index: number) => {
        setCurrentIndex(index);
        setIsFullscreen(true);
        setTimeout(() => {
            if (fullscreenApi) {
                fullscreenApi.scrollTo(index, true);
            }
        }, 50);
    };

    const canScrollPrev = api?.canScrollPrev() ?? false;
    const canScrollNext = api?.canScrollNext() ?? false;

    return (
        <div className="space-y-3 sm:space-y-4 w-full max-w-full">
            {/* Main Carousel Wrapper - Grande e de alto destaque */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-video overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg bg-slate-900 border border-slate-800/40 group select-none touch-pan-y mx-auto">
                <Carousel
                    setApi={setApi}
                    opts={{ loop: galleryList.length > 1 }}
                    className="w-full h-full"
                >
                    <CarouselContent className="h-full ml-0">
                        {galleryList.map((imgUrl, index) => (
                            <CarouselItem
                                key={index}
                                className="relative w-full h-full pl-0 cursor-zoom-in flex items-center justify-center overflow-hidden"
                                onClick={() => openFullscreen(index)}
                            >
                                {/* Imagem principal ocupando todo o espaço com destaque */}
                                <Image
                                    src={imgUrl}
                                    alt={`${brand} ${model} - Foto ${index + 1}`}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 50vw"
                                    className="object-cover transition-transform duration-300"
                                    priority={index === 0}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                {/* Floating Badges */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-col gap-1.5 z-10 pointer-events-none">
                    {extras?.includes("Único dono") && (
                        <Badge className="bg-blue-900/90 text-white text-xs sm:text-sm py-1 px-2.5 sm:px-3 shadow-md backdrop-blur-md border-0">
                            Único dono
                        </Badge>
                    )}
                    {extras?.includes("Segundo dono") && (
                        <Badge className="bg-indigo-900/90 text-white text-xs sm:text-sm py-1 px-2.5 sm:px-3 shadow-md backdrop-blur-md border-0">
                            Segundo dono
                        </Badge>
                    )}
                </div>

                {/* Expand Fullscreen Button */}
                <button
                    onClick={() => openFullscreen(currentIndex)}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-md transition-all active:scale-90 z-10"
                    aria-label="Ver em tela cheia"
                >
                    <Maximize2 className="w-4 h-4" />
                </button>

                {/* Left/Right Overlays (Interactive Navigation) */}
                {galleryList.length > 1 && (
                    <>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handlePrev();
                            }}
                            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-black/55 text-white backdrop-blur-sm opacity-90 sm:opacity-0 group-hover:opacity-100 hover:bg-black/75 active:scale-90 transition-all z-10 border border-white/20 shadow-lg"
                            aria-label="Foto anterior"
                        >
                            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleNext();
                            }}
                            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-black/55 text-white backdrop-blur-sm opacity-90 sm:opacity-0 group-hover:opacity-100 hover:bg-black/75 active:scale-90 transition-all z-10 border border-white/20 shadow-lg"
                            aria-label="Próxima foto"
                        >
                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </>
                )}

                {/* Picture Counter & Dots Indicator */}
                {galleryList.length > 1 && (
                    <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-black/70 text-white text-xs font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full backdrop-blur-md z-10 border border-white/15 shadow-md flex items-center gap-1.5">
                        <span>{currentIndex + 1}</span>
                        <span className="opacity-60">/</span>
                        <span>{galleryList.length}</span>
                    </div>
                )}

                {/* Mobile Dots Bar Indicator */}
                {galleryList.length > 1 && (
                    <div className="sm:hidden absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm">
                        {galleryList.map((_, dotIdx) => (
                            <span
                                key={dotIdx}
                                className={cn(
                                    "h-1.5 rounded-full transition-all duration-300",
                                    currentIndex === dotIdx
                                        ? "w-4 bg-white"
                                        : "w-1.5 bg-white/40"
                                )}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Thumbnail Row - Improved for Mobile Touch Scrolling */}
            {galleryList.length > 1 && (
                <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1.5 pt-0.5 scrollbar-none snap-x -mx-1 px-1">
                    {galleryList.map((imgUrl, index) => (
                        <button
                            key={index}
                            onClick={() => handleThumbnailClick(index)}
                            className={cn(
                                "relative aspect-[4/3] sm:aspect-video w-20 sm:w-28 shrink-0 rounded-xl overflow-hidden cursor-pointer bg-slate-900 transition-all duration-200 border-2 snap-start active:scale-95",
                                currentIndex === index
                                    ? "border-[#D60404] shadow-md ring-2 ring-red-500/20 opacity-100"
                                    : "border-transparent opacity-60 hover:opacity-100"
                            )}
                            aria-label={`Ir para foto ${index + 1}`}
                        >
                            <Image
                                src={imgUrl}
                                alt={`Miniatura ${index + 1}`}
                                fill
                                sizes="120px"
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Fullscreen Modal Lightbox with Gestures */}
            <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
                <DialogContent className="max-w-[100vw] h-[100dvh] w-[100vw] p-0 bg-black/95 border-0 rounded-none flex flex-col justify-between z-50">
                    {/* Top Bar */}
                    <div className="p-4 flex items-center justify-between text-white z-20">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-sm sm:text-base">
                                {brand} {model}
                            </span>
                            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                                {currentIndex + 1} de {galleryList.length}
                            </span>
                        </div>
                        <button
                            onClick={() => setIsFullscreen(false)}
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            aria-label="Fechar tela cheia"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Fullscreen Carousel */}
                    <div className="flex-1 relative flex items-center justify-center overflow-hidden">
                        <Carousel
                            setApi={setFullscreenApi}
                            opts={{ startIndex: currentIndex, loop: galleryList.length > 1 }}
                            className="w-full h-full"
                        >
                            <CarouselContent className="h-full ml-0">
                                {galleryList.map((imgUrl, index) => (
                                    <CarouselItem
                                        key={index}
                                        className="relative w-full h-[75dvh] sm:h-[80dvh] pl-0 flex items-center justify-center"
                                    >
                                        <Image
                                            src={imgUrl}
                                            alt={`${brand} ${model} - Tela cheia ${index + 1}`}
                                            fill
                                            sizes="100vw"
                                            className="object-contain"
                                            priority
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>

                        {/* Navigation Arrows on Fullscreen */}
                        {galleryList.length > 1 && (
                            <>
                                <button
                                    onClick={() => fullscreenApi?.scrollPrev()}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 text-white flex items-center justify-center border border-white/20 hover:bg-black/80"
                                    aria-label="Foto anterior"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={() => fullscreenApi?.scrollNext()}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 text-white flex items-center justify-center border border-white/20 hover:bg-black/80"
                                    aria-label="Próxima foto"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Bottom Thumbnails */}
                    <div className="p-3 bg-black/60 overflow-x-auto flex gap-2 justify-center z-20">
                        {galleryList.map((imgUrl, index) => (
                            <button
                                key={index}
                                onClick={() => handleThumbnailClick(index)}
                                className={cn(
                                    "relative w-14 h-11 rounded-lg overflow-hidden shrink-0 border-2 transition-all",
                                    currentIndex === index
                                        ? "border-[#D60404] scale-105"
                                        : "border-transparent opacity-50"
                                )}
                            >
                                <Image
                                    src={imgUrl}
                                    alt={`Miniatura ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
