import { useState, useEffect } from "react";

/**
 * Hook para sincronizar un estado con localStorage.
 * Incluye manejo de errores para no romper la app si localStorage
 * no está disponible o los datos guardados están corruptos.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (!stored) return initialValue;
      const parsed = JSON.parse(stored);
      // Validación de integridad: nos aseguramos de que sea el tipo esperado (array)
      if (!Array.isArray(parsed)) {
        console.warn(`Datos corruptos en localStorage para "${key}", se restauran valores por defecto.`);
        return initialValue;
      }
      return parsed;
    } catch (error) {
      console.error(`Error leyendo localStorage["${key}"]:`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error guardando en localStorage["${key}"]:`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
