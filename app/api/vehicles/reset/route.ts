import { NextResponse } from "next/server";
import { resetDatabase } from "@/lib/supabase-db";
import { vehicles as defaultVehicles } from "@/lib/vehicles";

export async function POST() {
  try {
    const list = await resetDatabase(defaultVehicles);
    return NextResponse.json(list);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to reset database" },
      { status: 500 }
    );
  }
}
