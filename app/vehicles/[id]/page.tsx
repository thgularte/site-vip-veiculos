import { vehicles } from "@/lib/vehicles";
import { VehicleDetailView } from "@/components/vehicles/vehicle-detail-view";

export function generateStaticParams() {
    return vehicles.map((vehicle) => ({
        id: vehicle.id.toString(),
    }));
}

export default function VehicleDetailsPage({ params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    const vehicle = vehicles.find((v) => v.id === id);

    return <VehicleDetailView id={id} initialVehicle={vehicle} />;
}
