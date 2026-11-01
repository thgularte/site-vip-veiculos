import { supabase } from "./supabase";
import webpush from "web-push";

const BUCKET_NAME = "app_data";
const FILE_NAME = "push_subscriptions.json";

export interface PushSubscriptionItem {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
  userAgent?: string;
  subscribedAt: string;
}

export function initWebPush() {
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const subject = process.env.VAPID_SUBJECT || "mailto:vipveiculos@gmail.com";

  if (publicKey && privateKey) {
    webpush.setVapidDetails(subject, publicKey, privateKey);
  }
}

export async function getSubscriptions(): Promise<PushSubscriptionItem[]> {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .download(FILE_NAME);

    if (error || !data) {
      return [];
    }

    const text = await data.text();
    return JSON.parse(text);
  } catch (err) {
    console.error("Error reading subscriptions:", err);
    return [];
  }
}

export async function saveSubscription(sub: PushSubscriptionItem): Promise<boolean> {
  try {
    const currentList = await getSubscriptions();

    // Remove if already exists to update
    const filtered = currentList.filter((s) => s.endpoint !== sub.endpoint);
    filtered.push(sub);

    const content = JSON.stringify(filtered);
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(FILE_NAME, content, {
        contentType: "application/json",
        upsert: true,
      });

    if (error) {
      console.error("Error saving subscription:", error);
      return false;
    }

    return true;
  } catch (err) {
    console.error("Error in saveSubscription:", err);
    return false;
  }
}

export async function removeSubscription(endpoint: string): Promise<boolean> {
  try {
    const currentList = await getSubscriptions();
    const filtered = currentList.filter((s) => s.endpoint !== endpoint);

    const content = JSON.stringify(filtered);
    await supabase.storage.from(BUCKET_NAME).upload(FILE_NAME, content, {
      contentType: "application/json",
      upsert: true,
    });
    return true;
  } catch (err) {
    return false;
  }
}

export async function broadcastVehiclePush(vehicle: {
  id: number;
  brand: string;
  model: string;
  version?: string;
  year?: number | string;
  price?: string | number;
  image?: string;
}) {
  initWebPush();
  const subscriptions = await getSubscriptions();
  if (subscriptions.length === 0) {
    console.log("No push subscribers registered.");
    return { sent: 0, failed: 0 };
  }

  const payload = JSON.stringify({
    title: `🚗 Novidade: ${vehicle.brand} ${vehicle.model}!`,
    body: `Acabou de chegar na VipVeículos: ${vehicle.brand} ${vehicle.model} ${vehicle.version || ""} ano ${vehicle.year || ""}. Confira fotos e condições!`,
    icon: "/icon-192x192.png",
    badge: "/icon-192x192.png",
    image: vehicle.image || "/logo_vip.png",
    data: {
      url: `/veiculos/${vehicle.id}`,
    },
  });

  let sent = 0;
  let failed = 0;
  const expiredEndpoints: string[] = [];

  for (const sub of subscriptions) {
    try {
      await webpush.sendNotification(
        {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.keys.p256dh,
            auth: sub.keys.auth,
          },
        },
        payload
      );
      sent++;
    } catch (error: any) {
      failed++;
      // If 410 Gone or 404 Not Found, subscriber has uninstalled or unsubscribed
      if (error?.statusCode === 410 || error?.statusCode === 404) {
        expiredEndpoints.push(sub.endpoint);
      }
    }
  }

  // Clean up expired
  if (expiredEndpoints.length > 0) {
    const updated = subscriptions.filter(
      (s) => !expiredEndpoints.includes(s.endpoint)
    );
    await supabase.storage.from(BUCKET_NAME).upload(
      FILE_NAME,
      JSON.stringify(updated),
      {
        contentType: "application/json",
        upsert: true,
      }
    );
  }

  return { sent, failed };
}

