"use client";

import { useState, useEffect, useCallback } from "react";
import { AppStats } from "@/lib/app-stats";

function getOrGenerateDeviceId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("vip_device_id");
  if (!id) {
    id = "dev_" + Math.random().toString(36).substring(2, 12) + "_" + Date.now().toString(36);
    localStorage.setItem("vip_device_id", id);
  }
  return id;
}

function detectPlatform(): "android" | "ios" | "desktop" | "other" {
  if (typeof window === "undefined") return "other";
  const ua = window.navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua)) return "ios";
  if (/android/.test(ua)) return "android";
  if (/windows|macintosh|linux/.test(ua)) return "desktop";
  return "other";
}

export async function registerAppInstallClient(
  source: "pwa_prompt" | "modal" | "standalone" | "button" = "standalone"
) {
  if (typeof window === "undefined") return null;

  const deviceId = getOrGenerateDeviceId();
  const platform = detectPlatform();

  // If already registered with this source in the last 24h, skip
  const lastRecordedKey = `vip_app_installed_recorded_${source}`;
  const alreadyRecorded = localStorage.getItem(lastRecordedKey);
  if (alreadyRecorded) {
    const elapsed = Date.now() - parseInt(alreadyRecorded, 10);
    // 24 hours
    if (elapsed < 24 * 60 * 60 * 1000) {
      return null;
    }
  }

  try {
    const res = await fetch("/api/app/stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        deviceId,
        platform,
        source,
      }),
    });

    if (res.ok) {
      localStorage.setItem(lastRecordedKey, Date.now().toString());
      localStorage.setItem("vip_app_is_installed", "true");
    }
    return await res.json();
  } catch (err) {
    console.warn("Failed to record app install:", err);
    return null;
  }
}

export function useAppStats() {
  const [stats, setStats] = useState<AppStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/app/stats", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error("Failed to load app stats:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    refreshStats: fetchStats,
    totalDownloads: stats?.totalDownloads ?? 0,
    pushSubscribers: stats?.pushSubscribers ?? 0,
    platforms: stats?.platforms ?? { android: 0, ios: 0, desktop: 0, other: 0 },
  };
}
