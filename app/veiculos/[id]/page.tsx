import { vehicles } from "@/lib/vehicles";
import { VehicleDetailView } from "@/components/vehicles/vehicle-detail-view";
import { Metadata, ResolvingMetadata } from "next";

export function generateStaticParams() {
    return vehicles.map((vehicle) => ({
        id: vehicle.id.toString(),
    }));
}

export async function generateMetadata(
    { params }: { params: { id: string } },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const id = parseInt(params.id);
    const vehicle = vehicles.find((v) => v.id === id);

    if (!vehicle) {
        return {
            title: "Veículo Não Encontrado | VipVeículos",
        };
    }

    const priceFormatted = vehicle.price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 0,
    });

    const title = `${vehicle.brand} ${vehicle.model} ${vehicle.version} (${vehicle.modelYear}) - ${priceFormatted}`;
    const description = `${vehicle.brand} ${vehicle.model} ${vehicle.version} ano ${vehicle.modelYear}/${vehicle.year}, cor ${vehicle.color}, ${vehicle.km} km rodados, câmbio ${vehicle.transmission}, ${vehicle.fuel}. Confira fotos, opcionais e garantia na VipVeículos em Rio Grande - RS.`;
    const image = vehicle.image || "/O home.png";

    return {
        title,
        description,
        keywords: [
            `${vehicle.brand} ${vehicle.model}`,
            `${vehicle.brand} usado Rio Grande`,
            `${vehicle.model} seminovo RS`,
            `${vehicle.brand} ${vehicle.model} ${vehicle.modelYear}`,
            "carros usados Rio Grande",
            "VipVeículos Rio Grande",
        ],
        openGraph: {
            title: `${title} | VipVeículos Rio Grande`,
            description,
            url: `https://vipveiculosriogrande.com.br/veiculos/${id}`,
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: `${vehicle.brand} ${vehicle.model} - VipVeículos Rio Grande`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} | VipVeículos`,
            description,
            images: [image],
        },
    };
}

export default function VehicleDetailsPage({ params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    const vehicle = vehicles.find((v) => v.id === id);

    return <VehicleDetailView id={id} initialVehicle={vehicle} />;
}
