import { NextRequest, NextResponse } from "next/server";
import { getAppStats, recordAppInstall } from "@/lib/app-stats";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stats = await getAppStats();
    return NextResponse.json(stats);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to fetch app stats" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { deviceId, platform, source } = body;

    if (!deviceId) {
      return NextResponse.json(
        { error: "deviceId is required" },
        { status: 400 }
      );
    }

    const userAgent = req.headers.get("user-agent") || undefined;
    const result = await recordAppInstall({
      deviceId,
      platform: platform || "other",
      source: source || "unknown",
      userAgent,
    });

    const updatedStats = await getAppStats();

    return NextResponse.json({
      success: result.success,
      isNew: result.isNew,
      stats: updatedStats,
    });
  } catch (error: any) {
    console.error("Error in /api/app/stats POST:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
