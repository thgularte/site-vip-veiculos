import { NextRequest, NextResponse } from "next/server";
import { saveSubscription, removeSubscription } from "@/lib/push-notifications";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { subscription, action } = body;

    if (!subscription || !subscription.endpoint) {
      return NextResponse.json(
        { error: "Invalid subscription payload" },
        { status: 400 }
      );
    }

    if (action === "unsubscribe") {
      await removeSubscription(subscription.endpoint);
      return NextResponse.json({ success: true, message: "Unsubscribed" });
    }

    const saved = await saveSubscription({
      endpoint: subscription.endpoint,
      keys: {
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth,
      },
      userAgent: req.headers.get("user-agent") || undefined,
      subscribedAt: new Date().toISOString(),
    });

    if (!saved) {
      return NextResponse.json(
        { error: "Failed to persist subscription" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Subscription saved" });
  } catch (error: any) {
    console.error("Push subscribe error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
