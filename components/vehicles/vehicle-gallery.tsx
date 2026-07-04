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
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    const [currentIndex, setCurrentIndex] = useState(0);

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

    const handleThumbnailClick = (index: number) => {
        if (!api) return;
        api.scrollTo(index);
        setCurrentIndex(index);
    };

    const handlePrev = () => {
        if (!api) return;
        api.scrollPrev();
    };

    const handleNext = () => {
        if (!api) return;
        api.scrollNext();
    };

    const canScrollPrev = api?.canScrollPrev() ?? false;
    const canScrollNext = api?.canScrollNext() ?? false;

    return (
        <div className="space-y-4">
            {/* Main Carousel Wrapper */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-lg bg-white border border-slate-100 group">
                <Carousel setApi={setApi} className="w-full h-full">
                    <CarouselContent className="h-full">
                        {galleryList.map((imgUrl, index) => (
                            <CarouselItem key={index} className="relative aspect-video w-full h-full">
                                <Image
                                    src={imgUrl}
                                    alt={`${brand} ${model} - Foto ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                {/* Floating Badges */}
                {extras?.includes("Único dono") && (
                    <Badge className="absolute top-4 left-4 bg-blue-900/90 hover:bg-blue-900 text-base py-1 px-3 shadow-lg backdrop-blur-sm border-0 z-10 transition-transform duration-300">
                        Único dono
                    </Badge>
                )}
                {extras?.includes("Segundo dono") && (
                    <Badge className="absolute top-4 left-4 bg-indigo-900/90 hover:bg-indigo-900 text-base py-1 px-3 shadow-lg backdrop-blur-sm border-0 z-10 transition-transform duration-300">
                        Segundo dono
                    </Badge>
                )}

                {/* Left/Right Overlays (Interactive Navigation) */}
                {galleryList.length > 1 && (
                    <>
                        <button
                            onClick={handlePrev}
                            disabled={!canScrollPrev}
                            className={cn(
                                "absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-black/55 text-white backdrop-blur-sm opacity-90 sm:opacity-0 group-hover:opacity-100 disabled:opacity-0 hover:bg-black/75 active:scale-90 transition-all z-10 border border-white/20 shadow-lg",
                                !canScrollPrev && "pointer-events-none"
                            )}
                            aria-label="Foto anterior"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={!canScrollNext}
                            className={cn(
                                "absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-black/55 text-white backdrop-blur-sm opacity-90 sm:opacity-0 group-hover:opacity-100 disabled:opacity-0 hover:bg-black/75 active:scale-90 transition-all z-10 border border-white/20 shadow-lg",
                                !canScrollNext && "pointer-events-none"
                            )}
                            aria-label="Próxima foto"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </>
                )}

                {/* Picture Counter Indicator */}
                {galleryList.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm z-10 border border-white/15 shadow-md">
                        {currentIndex + 1} / {galleryList.length}
                    </div>
                )}
            </div>

            {/* Thumbnail Row - Responsive Horizontal Scroll on Mobile / Grid on Desktop */}
            {galleryList.length > 1 && (
                <div className="flex sm:grid sm:grid-cols-4 md:grid-cols-5 gap-2.5 sm:gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
                    {galleryList.map((imgUrl, index) => (
                        <button
                            key={index}
                            onClick={() => handleThumbnailClick(index)}
                            className={cn(
                                "relative aspect-video w-24 sm:w-auto shrink-0 rounded-xl overflow-hidden cursor-pointer bg-slate-100 transition-all duration-300 border-2 snap-start",
                                currentIndex === index
                                    ? "border-primary shadow-md ring-2 ring-primary/20 scale-[0.98]"
                                    : "border-transparent opacity-70 hover:opacity-100 hover:scale-[1.02]"
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
            )}
        </div>
    );
}
