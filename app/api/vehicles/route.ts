import { NextResponse } from "next/server";
import { getVehicles, createVehicle } from "@/lib/supabase-db";
import { broadcastVehiclePush } from "@/lib/push-notifications";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const list = await getVehicles();
    return NextResponse.json(list);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch vehicles" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newVehicle = await createVehicle(body);

    // Envia notificação push para todos os clientes inscritos em segundo plano
    if (newVehicle && newVehicle.id) {
      broadcastVehiclePush({
        id: newVehicle.id,
        brand: newVehicle.brand,
        model: newVehicle.model,
        version: newVehicle.version,
        year: newVehicle.year || newVehicle.modelYear,
        price: newVehicle.price,
        image: newVehicle.image,
      }).catch((err) => {
        console.error("Erro ao disparar push broadcast do novo veículo:", err);
      });
    }

    return NextResponse.json(newVehicle, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create vehicle" },
      { status: 500 }
    );
  }
}
