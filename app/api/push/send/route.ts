import { NextRequest, NextResponse } from "next/server";
import { broadcastCustomPush } from "@/lib/push-notifications";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, message, url, image } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Mensagem é obrigatória" },
        { status: 400 }
      );
    }

    const result = await broadcastCustomPush({
      title: title || "🔔 VipVeículos",
      body: message,
      url: url || "/veiculos",
      image,
    });

    return NextResponse.json({
      success: true,
      sent: result.sent,
      failed: result.failed,
      message: `Notificação enviada para ${result.sent} dispositivo(s).`,
    });
  } catch (error: any) {
    console.error("Erro na rota de envio push:", error);
    return NextResponse.json(
      { error: error?.message || "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

