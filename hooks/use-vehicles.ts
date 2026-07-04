"use client";

import { useState, useEffect, useCallback } from "react";
import { Vehicle, vehicles as defaultVehicles } from "@/lib/vehicles";

const STORAGE_KEY = "vipveiculos_local_data_v1";

export function useVehicles() {
  const [vehiclesList, setVehiclesList] = useState<Vehicle[]>(defaultVehicles);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: Vehicle[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setVehiclesList(parsed);
        } else {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultVehicles));
          setVehiclesList(defaultVehicles);
        }
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultVehicles));
        setVehiclesList(defaultVehicles);
      }
    } catch (e) {
      console.error("Erro ao ler do localStorage:", e);
      setVehiclesList(defaultVehicles);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Listen for custom storage events across components/tabs
  useEffect(() => {
    const handleUpdate = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setVehiclesList(JSON.parse(stored));
        }
      } catch (e) {
        console.error("Erro no event listener:", e);
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
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        window.dispatchEvent(new Event("vipveiculos_storage_update"));
      } catch (e) {
        console.error("Erro ao salvar veículo no localStorage:", e);
      }
      return updated;
    });
  }, []);

  const updateVehicle = useCallback((updatedVehicle: Vehicle) => {
    setVehiclesList((prev) => {
      const updated = prev.map((v) => (v.id === updatedVehicle.id ? updatedVehicle : v));
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        window.dispatchEvent(new Event("vipveiculos_storage_update"));
      } catch (e) {
        console.error("Erro ao atualizar veículo no localStorage:", e);
      }
      return updated;
    });
  }, []);

  const deleteVehicle = useCallback((id: number) => {
    setVehiclesList((prev) => {
      const updated = prev.filter((v) => v.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        window.dispatchEvent(new Event("vipveiculos_storage_update"));
      } catch (e) {
        console.error("Erro ao remover veículo no localStorage:", e);
      }
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
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        window.dispatchEvent(new Event("vipveiculos_storage_update"));
      } catch (e) {
        console.error("Erro ao arquivar/desarquivar no localStorage:", e);
      }
      return updated;
    });
  }, []);

  const resetToDefault = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultVehicles));
      setVehiclesList(defaultVehicles);
      window.dispatchEvent(new Event("vipveiculos_storage_update"));
    } catch (e) {
      console.error("Erro ao resetar localStorage:", e);
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
