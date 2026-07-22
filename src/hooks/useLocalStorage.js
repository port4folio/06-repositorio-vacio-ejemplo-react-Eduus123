import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (!stored) return initialValue;
      const parsed = JSON.parse(stored);
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
