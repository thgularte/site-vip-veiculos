import { MetadataRoute } from "next";
import { getVehicles } from "@/lib/supabase-db";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://vipveiculosriogrande.com.br";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/veiculos`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/vender`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  let vehicleRoutes: MetadataRoute.Sitemap = [];
  try {
    const dbVehicles = await getVehicles();
    vehicleRoutes = dbVehicles.map((vehicle) => ({
      url: `${baseUrl}/veiculos/${vehicle.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch (e) {
    console.error("Error generating sitemap:", e);
  }

  return [...staticRoutes, ...vehicleRoutes];
}
