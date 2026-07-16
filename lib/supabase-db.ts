import { supabase } from "./supabase";
import { Vehicle } from "./vehicles";

// Converts a database vehicle record (with relations) into a frontend Vehicle object
export function mapDbToVehicle(dbRow: any): Vehicle {
  const imagesList = dbRow.vehicle_images || [];
  
  // Find the main image
  const mainImageObj = imagesList.find((img: any) => img.is_main);
  const mainImageUrl = mainImageObj ? mainImageObj.image_url : (imagesList[0]?.image_url || "/car-hatchback.png");
  
  // Extract gallery images sorted by order
  const galleryUrls = imagesList
    .filter((img: any) => !img.is_main)
    .sort((a: any, b: any) => a.display_order - b.display_order)
    .map((img: any) => img.image_url);

  // Extract features
  const featuresList = (dbRow.vehicle_features || [])
    .map((vf: any) => vf.features?.name)
    .filter(Boolean);

  // Extract extras
  const extrasList = (dbRow.vehicle_extras || [])
    .map((ve: any) => ve.extras?.name)
    .filter(Boolean);

  // Parse price (number to BRL currency string or "Consulte")
  let priceStr = "Consulte";
  if (dbRow.price !== null && dbRow.price !== undefined) {
    priceStr = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(Number(dbRow.price));
  }

  // Parse km (number to BRL string or "Consulte")
  let kmStr = "Consulte";
  if (dbRow.km !== null && dbRow.km !== undefined) {
    kmStr = Number(dbRow.km).toLocaleString("pt-BR");
  }

  return {
    id: Number(dbRow.id),
    brand: dbRow.brand,
    model: dbRow.model,
    version: dbRow.version || "",
    year: dbRow.year,
    modelYear: dbRow.model_year,
    price: priceStr,
    fuel: dbRow.fuel,
    km: kmStr,
    transmission: dbRow.transmission,
    color: dbRow.color,
    description: dbRow.description || "",
    image: mainImageUrl,
    images: galleryUrls.length > 0 ? galleryUrls : undefined,
    features: featuresList,
    extras: extrasList.length > 0 ? extrasList : undefined,
    archived: !!dbRow.archived,
  };
}

// Clean and parse price string to number/null
export function parsePriceToDb(priceStr: string | null | undefined): number | null {
  if (!priceStr || priceStr.toLowerCase().includes("consulte")) return null;
  const digitsOnly = priceStr.replace(/[^\d]/g, "");
  return digitsOnly ? parseFloat(digitsOnly) : null;
}

// Clean and parse km string to integer/null
export function parseKmToDb(kmStr: string | null | undefined): number | null {
  if (!kmStr || kmStr.toLowerCase().includes("consulte")) return null;
  const digitsOnly = kmStr.replace(/[^\d]/g, "");
  return digitsOnly ? parseInt(digitsOnly, 10) : null;
}

// Get all vehicles sorted by id descending
export async function getVehicles() {
  const { data, error } = await supabase
    .from("vehicles")
    .select(`
      *,
      vehicle_images (id, image_url, display_order, is_main),
      vehicle_features (features (name)),
      vehicle_extras (extras (name))
    `)
    .order("id", { ascending: false });

  if (error) {
    console.error("Error fetching vehicles from Supabase:", error);
    throw error;
  }

  return (data || []).map(mapDbToVehicle);
}

// Get a single vehicle by id
export async function getVehicleById(id: number) {
  const { data, error } = await supabase
    .from("vehicles")
    .select(`
      *,
      vehicle_images (id, image_url, display_order, is_main),
      vehicle_features (features (name)),
      vehicle_extras (extras (name))
    `)
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // Row not found
      return null;
    }
    console.error(`Error fetching vehicle id ${id} from Supabase:`, error);
    throw error;
  }

  return data ? mapDbToVehicle(data) : null;
}

// Helper to save relations for a vehicle
async function saveRelations(vehicleId: number, image: string, images?: string[], features: string[] = [], extras: string[] = []) {
  // 1. Save images
  // Delete existing images for this vehicle
  await supabase.from("vehicle_images").delete().eq("vehicle_id", vehicleId);

  const imagesToInsert = [];
  
  // Insert main image
  if (image) {
    imagesToInsert.push({
      vehicle_id: vehicleId,
      image_url: image,
      display_order: 0,
      is_main: true,
    });
  }

  // Insert gallery images
  if (images && Array.isArray(images)) {
    images.forEach((imgUrl, index) => {
      if (imgUrl && imgUrl !== image) {
        imagesToInsert.push({
          vehicle_id: vehicleId,
          image_url: imgUrl,
          display_order: index + 1,
          is_main: false,
        });
      }
    });
  }

  if (imagesToInsert.length > 0) {
    const { error: imgError } = await supabase.from("vehicle_images").insert(imagesToInsert);
    if (imgError) throw imgError;
  }

  // 2. Save features
  await supabase.from("vehicle_features").delete().eq("vehicle_id", vehicleId);
  const cleanFeatures = Array.from(new Set(features.map((f) => f.trim()).filter(Boolean)));
  
  if (cleanFeatures.length > 0) {
    // Upsert all features into the features table
    const featureRows = cleanFeatures.map((name) => ({ name }));
    const { data: upsertedFeatures, error: featError } = await supabase
      .from("features")
      .upsert(featureRows, { onConflict: "name" })
      .select("id, name");

    if (featError) throw featError;

    // Link vehicle with feature ids
    const vehicleFeatureRows = (upsertedFeatures || []).map((feat: any) => ({
      vehicle_id: vehicleId,
      feature_id: feat.id,
    }));

    if (vehicleFeatureRows.length > 0) {
      const { error: linkError } = await supabase.from("vehicle_features").insert(vehicleFeatureRows);
      if (linkError) throw linkError;
    }
  }

  // 3. Save extras
  await supabase.from("vehicle_extras").delete().eq("vehicle_id", vehicleId);
  const cleanExtras = Array.from(new Set((extras || []).map((e) => e.trim()).filter(Boolean)));

  if (cleanExtras.length > 0) {
    // Upsert all extras into the extras table
    const extraRows = cleanExtras.map((name) => ({ name }));
    const { data: upsertedExtras, error: extError } = await supabase
      .from("extras")
      .upsert(extraRows, { onConflict: "name" })
      .select("id, name");

    if (extError) throw extError;

    // Link vehicle with extra ids
    const vehicleExtraRows = (upsertedExtras || []).map((ext: any) => ({
      vehicle_id: vehicleId,
      extra_id: ext.id,
    }));

    if (vehicleExtraRows.length > 0) {
      const { error: linkError } = await supabase.from("vehicle_extras").insert(vehicleExtraRows);
      if (linkError) throw linkError;
    }
  }
}

// Create a new vehicle
export async function createVehicle(vehicleData: Omit<Vehicle, "id"> & { id?: number }) {
  const vehicleRow = {
    brand: vehicleData.brand,
    model: vehicleData.model,
    version: vehicleData.version,
    year: vehicleData.year,
    model_year: vehicleData.modelYear,
    price: parsePriceToDb(vehicleData.price),
    fuel: vehicleData.fuel,
    km: parseKmToDb(vehicleData.km),
    transmission: vehicleData.transmission,
    color: vehicleData.color,
    description: vehicleData.description,
    archived: !!vehicleData.archived,
  };

  // If a specific ID is provided (e.g. during reset), we can insert it
  const payload = vehicleData.id ? { id: vehicleData.id, ...vehicleRow } : vehicleRow;

  const { data: inserted, error } = await supabase
    .from("vehicles")
    .insert([payload])
    .select("id")
    .single();

  if (error) {
    console.error("Error inserting vehicle into Supabase:", error);
    throw error;
  }

  const newId = inserted.id;

  // Save relations
  await saveRelations(newId, vehicleData.image, vehicleData.images, vehicleData.features, vehicleData.extras);

  return getVehicleById(newId);
}

// Update a vehicle
export async function updateVehicle(id: number, vehicleData: Omit<Vehicle, "id">) {
  const vehicleRow = {
    brand: vehicleData.brand,
    model: vehicleData.model,
    version: vehicleData.version,
    year: vehicleData.year,
    model_year: vehicleData.modelYear,
    price: parsePriceToDb(vehicleData.price),
    fuel: vehicleData.fuel,
    km: parseKmToDb(vehicleData.km),
    transmission: vehicleData.transmission,
    color: vehicleData.color,
    description: vehicleData.description,
    archived: !!vehicleData.archived,
  };

  const { error } = await supabase
    .from("vehicles")
    .update(vehicleRow)
    .eq("id", id);

  if (error) {
    console.error(`Error updating vehicle id ${id} in Supabase:`, error);
    throw error;
  }

  // Save relations
  await saveRelations(id, vehicleData.image, vehicleData.images, vehicleData.features, vehicleData.extras);

  return getVehicleById(id);
}

// Delete a vehicle
export async function deleteVehicle(id: number) {
  const { error } = await supabase
    .from("vehicles")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(`Error deleting vehicle id ${id} from Supabase:`, error);
    throw error;
  }

  return true;
}

// Reset database with default vehicles
export async function resetDatabase(defaultVehicles: Vehicle[]) {
  // 1. Delete all vehicles (cascade deletes images, features links, and extras links)
  const { error: deleteError } = await supabase
    .from("vehicles")
    .delete()
    .neq("id", 0); // deletes all

  if (deleteError) {
    console.error("Error clearing vehicles table during reset:", deleteError);
    throw deleteError;
  }

  // 2. Insert all default vehicles one by one to properly handle relations
  // Sorting defaults by ID ascending to keep order
  const sortedDefaults = [...defaultVehicles].sort((a, b) => a.id - b.id);
  
  for (const v of sortedDefaults) {
    await createVehicle(v);
  }

  return getVehicles();
}
