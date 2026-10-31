import { getVehicleById, getVehicles } from "@/lib/supabase-db";
import { VehicleDetailView } from "@/components/vehicles/vehicle-detail-view";
import { Metadata, ResolvingMetadata } from "next";
import { vehicleSchema, breadcrumbSchema, BASE_URL } from "@/lib/schemas";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
    try {
        const dbVehicles = await getVehicles();
        return dbVehicles.map((vehicle) => ({
            id: vehicle.id.toString(),
        }));
    } catch (e) {
        console.error("Error generating static params:", e);
        return [];
    }
}

export async function generateMetadata(
    { params }: { params: { id: string } },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const id = parseInt(params.id);
    let vehicle = null;
    try {
        vehicle = await getVehicleById(id);
    } catch (e) {
        console.error("Error fetching vehicle for metadata:", e);
    }

    if (!vehicle) {
        return {
            title: "Veículo Não Encontrado | VipVeículos Rio Grande",
            description: "Veículo não encontrado no estoque da VipVeículos em Rio Grande - RS.",
        };
    }

    const priceFormatted = vehicle.price;
    // Otimizado para buscas como: "ford ka em rio grande", "ford ka usado rio grande", etc.
    const title = `${vehicle.brand} ${vehicle.model} ${vehicle.version || ""} ${vehicle.modelYear || vehicle.year || ""} em Rio Grande - RS | ${priceFormatted}`;
    const description = `Procurando ${vehicle.brand} ${vehicle.model} em Rio Grande - RS? Ano ${vehicle.modelYear || vehicle.year}, cor ${vehicle.color || "selecionada"}, ${vehicle.km} km, câmbio ${vehicle.transmission}. Confira fotos, garantia e financiamento na VipVeículos!`;
    const image = vehicle.image || "/fundador.svg";
    const canonicalUrl = `${BASE_URL}/veiculos/${id}`;

    return {
        title,
        description,
        alternates: {
            canonical: canonicalUrl,
        },
        keywords: [
            `${vehicle.brand} ${vehicle.model} em Rio Grande`,
            `${vehicle.brand} ${vehicle.model} Rio Grande RS`,
            `${vehicle.brand} usado Rio Grande`,
            `${vehicle.model} seminovo Rio Grande`,
            `comprar ${vehicle.brand} ${vehicle.model}`,
            `${vehicle.brand} ${vehicle.model} ${vehicle.modelYear || vehicle.year}`,
            "carros usados Rio Grande",
            "seminovos Rio Grande RS",
            "VipVeículos Rio Grande",
        ],
        openGraph: {
            title: `${title} | VipVeículos`,
            description,
            url: canonicalUrl,
            images: [
                {
                    url: image.startsWith("http") ? image : `${BASE_URL}${image}`,
                    width: 1200,
                    height: 630,
                    alt: `${vehicle.brand} ${vehicle.model} em Rio Grande - VipVeículos`,
                },
            ],
            type: "article",
            locale: "pt_BR",
            siteName: "VipVeículos Rio Grande",
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} | VipVeículos Rio Grande`,
            description,
            images: [image.startsWith("http") ? image : `${BASE_URL}${image}`],
        },
    };
}

export default async function VehicleDetailsPage({ params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    let vehicle = null;
    try {
        vehicle = await getVehicleById(id);
    } catch (e) {
        console.error("Error loading vehicle details page:", e);
    }

    const vehicleJsonLd = vehicle ? vehicleSchema(vehicle) : null;
    const breadcrumbsJsonLd = vehicle
        ? breadcrumbSchema([
              { name: "Início", url: BASE_URL },
              { name: "Veículos em Estoque", url: `${BASE_URL}/veiculos` },
              {
                  name: `${vehicle.brand} ${vehicle.model} em Rio Grande`,
                  url: `${BASE_URL}/veiculos/${vehicle.id}`,
              },
          ])
        : null;

    return (
        <>
            {vehicleJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(vehicleJsonLd),
                    }}
                />
            )}
            {breadcrumbsJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(breadcrumbsJsonLd),
                    }}
                />
            )}
            <VehicleDetailView id={id} initialVehicle={vehicle || undefined} />
        </>
    );
}
