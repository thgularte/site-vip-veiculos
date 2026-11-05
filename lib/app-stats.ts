import { supabase } from "./supabase";
import { getSubscriptions } from "./push-notifications";

const BUCKET_NAME = "app_data";
const INSTALLS_FILE = "app_installations.json";

export interface AppInstallRecord {
  deviceId: string;
  platform: "android" | "ios" | "desktop" | "other";
  source?: "pwa_prompt" | "modal" | "standalone" | "button" | "unknown";
  userAgent?: string;
  installedAt: string;
  lastSeenAt?: string;
}

export interface AppStats {
  totalDownloads: number;
  pushSubscribers: number;
  platforms: {
    android: number;
    ios: number;
    desktop: number;
    other: number;
  };
  lastUpdated: string;
}

export async function getAppInstalls(): Promise<AppInstallRecord[]> {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .download(INSTALLS_FILE);

    if (error || !data) {
      return [];
    }

    const text = await data.text();
    return JSON.parse(text);
  } catch (err) {
    console.error("Error reading app installations:", err);
    return [];
  }
}

export async function saveAppInstalls(list: AppInstallRecord[]): Promise<boolean> {
  try {
    const content = JSON.stringify(list, null, 2);
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(INSTALLS_FILE, content, {
        contentType: "application/json",
        upsert: true,
      });

    if (error) {
      console.error("Error saving app installations:", error);
      return false;
    }

    return true;
  } catch (err) {
    console.error("Error in saveAppInstalls:", err);
    return false;
  }
}

export async function recordAppInstall(
  item: Omit<AppInstallRecord, "installedAt"> & { installedAt?: string }
): Promise<{ success: boolean; isNew: boolean }> {
  try {
    const current = await getAppInstalls();
    const existingIndex = current.findIndex((i) => i.deviceId === item.deviceId);
    const now = new Date().toISOString();

    let isNew = false;
    if (existingIndex >= 0) {
      current[existingIndex].lastSeenAt = now;
      if (item.platform && current[existingIndex].platform === "other") {
        current[existingIndex].platform = item.platform;
      }
    } else {
      isNew = true;
      current.push({
        deviceId: item.deviceId,
        platform: item.platform || "other",
        source: item.source || "unknown",
        userAgent: item.userAgent,
        installedAt: item.installedAt || now,
        lastSeenAt: now,
      });
    }

    const saved = await saveAppInstalls(current);
    return { success: saved, isNew };
  } catch (err) {
    console.error("Error in recordAppInstall:", err);
    return { success: false, isNew: false };
  }
}

export async function getAppStats(): Promise<AppStats> {
  try {
    const [installs, subscriptions] = await Promise.all([
      getAppInstalls(),
      getSubscriptions().catch(() => []),
    ]);

    const platforms = {
      android: 0,
      ios: 0,
      desktop: 0,
      other: 0,
    };

    installs.forEach((rec) => {
      if (rec.platform in platforms) {
        platforms[rec.platform as keyof typeof platforms]++;
      } else {
        platforms.other++;
      }
    });

    // If some users enabled push before install tracking was deployed,
    // ensure total accounts for at least total unique known devices/subscriptions.
    const uniqueDeviceCount = Math.max(installs.length, subscriptions.length);

    return {
      totalDownloads: uniqueDeviceCount,
      pushSubscribers: subscriptions.length,
      platforms,
      lastUpdated: new Date().toISOString(),
    };
  } catch (err) {
    console.error("Error calculating app stats:", err);
    return {
      totalDownloads: 0,
      pushSubscribers: 0,
      platforms: { android: 0, ios: 0, desktop: 0, other: 0 },
      lastUpdated: new Date().toISOString(),
    };
  }
}
