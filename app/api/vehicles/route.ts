import { NextResponse } from "next/server";
import { getVehicles, createVehicle } from "@/lib/supabase-db";

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
    return NextResponse.json(newVehicle, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create vehicle" },
      { status: 500 }
    );
  }
}
