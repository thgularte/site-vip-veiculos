"use client";

import { useState, useEffect, useCallback } from "react";
import { Vehicle } from "@/lib/vehicles";

export function useVehicles() {
  const [vehiclesList, setVehiclesList] = useState<Vehicle[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from API on mount
  const loadData = useCallback(async () => {
    try {
      const res = await fetch("/api/vehicles");
      if (res.ok) {
        const data = await res.json();
        setVehiclesList(data);
      } else {
        console.error("Failed to load vehicles from API:", res.statusText);
      }
    } catch (e) {
      console.error("Erro ao ler do banco de dados:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Listen for custom storage events or api updates across components/tabs
  useEffect(() => {
    const handleUpdate = () => {
      loadData();
    };
    window.addEventListener("vipveiculos_storage_update", handleUpdate);
    return () => {
      window.removeEventListener("vipveiculos_storage_update", handleUpdate);
    };
  }, [loadData]);

  const addVehicle = useCallback(async (newVehicleData: Omit<Vehicle, "id">) => {
    try {
      const res = await fetch("/api/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newVehicleData),
      });
      if (res.ok) {
        const saved = await res.json();
        setVehiclesList((prev) => [saved, ...prev]);
        window.dispatchEvent(new Event("vipveiculos_storage_update"));
      } else {
        console.error("Failed to add vehicle via API");
      }
    } catch (e) {
      console.error("Error adding vehicle:", e);
    }
  }, []);

  const updateVehicle = useCallback(async (updatedVehicle: Vehicle) => {
    try {
      const res = await fetch(`/api/vehicles/${updatedVehicle.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedVehicle),
      });
      if (res.ok) {
        const saved = await res.json();
        setVehiclesList((prev) => prev.map((v) => (v.id === saved.id ? saved : v)));
        window.dispatchEvent(new Event("vipveiculos_storage_update"));
      } else {
        console.error("Failed to update vehicle via API");
      }
    } catch (e) {
      console.error("Error updating vehicle:", e);
    }
  }, []);

  const deleteVehicle = useCallback(async (id: number) => {
    try {
      const res = await fetch(`/api/vehicles/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setVehiclesList((prev) => prev.filter((v) => v.id !== id));
        window.dispatchEvent(new Event("vipveiculos_storage_update"));
      } else {
        console.error("Failed to delete vehicle via API");
      }
    } catch (e) {
      console.error("Error deleting vehicle:", e);
    }
  }, []);

  const toggleArchive = useCallback(async (id: number) => {
    setVehiclesList((prev) => {
      const current = prev.find((v) => v.id === id);
      if (!current) return prev;
      
      const updated = { ...current, archived: !current.archived };
      
      // Async API call to update database
      fetch(`/api/vehicles/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      }).then((res) => {
        if (res.ok) {
          window.dispatchEvent(new Event("vipveiculos_storage_update"));
        } else {
          console.error("Failed to toggle archive status");
        }
      });

      return prev.map((v) => (v.id === id ? updated : v));
    });
  }, []);

  const resetToDefault = useCallback(async () => {
    try {
      const res = await fetch("/api/vehicles/reset", {
        method: "POST",
      });
      if (res.ok) {
        const data = await res.json();
        setVehiclesList(data);
        window.dispatchEvent(new Event("vipveiculos_storage_update"));
      } else {
        console.error("Failed to reset database via API");
      }
    } catch (e) {
      console.error("Error resetting database:", e);
    }
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
