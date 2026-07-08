"use client";

import { useState, useEffect, useCallback } from "react";
import { Vehicle, vehicles as defaultVehicles } from "@/lib/vehicles";
import { saveVehiclesToDB, getVehiclesFromDB } from "@/lib/db";

const STORAGE_KEY = "vipveiculos_local_data_v1";

export function useVehicles() {
  const [vehiclesList, setVehiclesList] = useState<Vehicle[]>(defaultVehicles);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from database on mount
  useEffect(() => {
    async function loadData() {
      try {
        const stored = await getVehiclesFromDB();
        if (stored && Array.isArray(stored) && stored.length > 0) {
          setVehiclesList(stored);
        } else {
          // Check localStorage as legacy fallback
          const localStored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
          if (localStored) {
            const parsed = JSON.parse(localStored);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setVehiclesList(parsed);
              await saveVehiclesToDB(parsed);
              return;
            }
          }
          await saveVehiclesToDB(defaultVehicles);
          setVehiclesList(defaultVehicles);
        }
      } catch (e) {
        console.error("Erro ao ler do banco de dados local:", e);
        setVehiclesList(defaultVehicles);
      } finally {
        setIsLoaded(true);
      }
    }
    loadData();
  }, []);

  // Listen for custom storage events across components/tabs
  useEffect(() => {
    const handleUpdate = async () => {
      try {
        const stored = await getVehiclesFromDB();
        if (stored) {
          setVehiclesList(stored);
        }
      } catch (e) {
        console.error("Erro no event listener do banco:", e);
      }
    };
    window.addEventListener("vipveiculos_storage_update", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("vipveiculos_storage_update", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const addVehicle = useCallback((newVehicleData: Omit<Vehicle, "id">) => {
    setVehiclesList((prev) => {
      const maxId = prev.length > 0 ? Math.max(...prev.map((v) => v.id)) : 0;
      const newVehicle: Vehicle = {
        ...newVehicleData,
        id: maxId + 1,
      };
      const updated = [newVehicle, ...prev];
      
      // Async save to IndexedDB (virtually unlimited quota for images)
      saveVehiclesToDB(updated).then(() => {
        // Fallback save to localStorage (with try/catch to ignore QuotaExceededError)
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {
          console.warn("localStorage quota exceeded, but successfully saved to IndexedDB!");
        }
        window.dispatchEvent(new Event("vipveiculos_storage_update"));
      });

      return updated;
    });
  }, []);

  const updateVehicle = useCallback((updatedVehicle: Vehicle) => {
    setVehiclesList((prev) => {
      const updated = prev.map((v) => (v.id === updatedVehicle.id ? updatedVehicle : v));
      
      saveVehiclesToDB(updated).then(() => {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {
          console.warn("localStorage quota exceeded, but successfully saved to IndexedDB!");
        }
        window.dispatchEvent(new Event("vipveiculos_storage_update"));
      });

      return updated;
    });
  }, []);

  const deleteVehicle = useCallback((id: number) => {
    setVehiclesList((prev) => {
      const updated = prev.filter((v) => v.id !== id);
      
      saveVehiclesToDB(updated).then(() => {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {
          console.warn("localStorage error, but successfully updated in IndexedDB!");
        }
        window.dispatchEvent(new Event("vipveiculos_storage_update"));
      });

      return updated;
    });
  }, []);

  const toggleArchive = useCallback((id: number) => {
    setVehiclesList((prev) => {
      const updated = prev.map((v) => {
        if (v.id === id) {
          return { ...v, archived: !v.archived };
        }
        return v;
      });
      
      saveVehiclesToDB(updated).then(() => {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {
          console.warn("localStorage error, but successfully updated in IndexedDB!");
        }
        window.dispatchEvent(new Event("vipveiculos_storage_update"));
      });

      return updated;
    });
  }, []);

  const resetToDefault = useCallback(() => {
    saveVehiclesToDB(defaultVehicles).then(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultVehicles));
      } catch (e) {
        console.error("Erro ao resetar localStorage:", e);
      }
      setVehiclesList(defaultVehicles);
      window.dispatchEvent(new Event("vipveiculos_storage_update"));
    });
  }, []);

  return {
    vehicles: vehiclesList,
    activeVehicles: vehiclesList.filter((v) => !v.archived),
    archivedVehicles: vehiclesList.filter((v) => v.archived),
    isLoaded,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    toggleArchive,
    resetToDefault,
  };
}
