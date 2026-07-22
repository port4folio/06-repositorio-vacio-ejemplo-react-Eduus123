import { useState, useEffect, useCallback } from "react";

const API_BASE = "https://dog.ceo/api";

/**
 * Tercer componente: consume la API externa "Dog CEO" (https://dog.ceo/api)
 * usando fetch. Se integra al SPA como una pestaña adicional dentro de la
 * misma aplicación (ver App.jsx), permitiendo al usuario buscar razas de
 * perro para usarlas de referencia al registrar una mascota.
 */
function BreedGallery({ onUseBreed }) {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [images, setImages] = useState([]);
  const [loadingBreeds, setLoadingBreeds] = useState(true);
  const [loadingImages, setLoadingImages] = useState(false);
  const [error, setError] = useState(null);

  // Cargar la lista de razas disponibles al montar el componente
  useEffect(() => {
    let cancelled = false;

    async function fetchBreeds() {
      setLoadingBreeds(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/breeds/list/all`);
        if (!res.ok) {
          throw new Error(`Error del servidor: ${res.status}`);
        }
        const data = await res.json();
        if (data.status !== "success") {
          throw new Error("La API respondió con un estado inesperado.");
        }
        if (!cancelled) {
          setBreeds(Object.keys(data.message).sort());
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.name === "TypeError"
              ? "No se pudo conectar con la API. Verifica tu conexión a internet."
              : err.message
          );
        }
      } finally {
        if (!cancelled) setLoadingBreeds(false);
      }
    }

    fetchBreeds();
    return () => {
      cancelled = true;
    };
  }, []);

  const fetchImages = useCallback(async (breed) => {
    if (!breed) return;
    setLoadingImages(true);
    setError(null);
    setImages([]);
    try {
      const res = await fetch(`${API_BASE}/breed/${breed}/images/random/6`);
      if (!res.ok) {
        throw new Error(`Error del servidor: ${res.status}`);
      }
      const data = await res.json();
      if (data.status !== "success") {
        throw new Error("No se encontraron imágenes para esta raza.");
      }
      setImages(data.message);
    } catch (err) {
      setError(
        err.name === "TypeError"
          ? "No se pudo conectar con la API. Verifica tu conexión a internet."
          : err.message
      );
    } finally {
      setLoadingImages(false);
    }
  }, []);

  function handleBreedChange(e) {
    const breed = e.target.value;
    setSelectedBreed(breed);
    fetchImages(breed);
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h5 card-title mb-1 d-flex align-items-center gap-2">
          <i className="bi bi-cloud-arrow-down"></i>
          Galería de razas (API Dog CEO)
        </h2>
        <p className="text-muted small mb-3">
          Consumo en vivo de una API externa (fetch) para explorar razas de perro
          como referencia antes de registrar una mascota.
        </p>

        {error && (
          <div className="alert alert-danger d-flex align-items-center gap-2" role="alert">
            <i className="bi bi-exclamation-triangle-fill"></i>
            <span>{error}</span>
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="breedSelect" className="form-label">
            Selecciona una raza
          </label>
          <select
            id="breedSelect"
            className="form-select"
            value={selectedBreed}
            onChange={handleBreedChange}
            disabled={loadingBreeds}
          >
            <option value="">
              {loadingBreeds ? "Cargando razas..." : "-- Elige una raza --"}
            </option>
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </div>

        {loadingImages && (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando imágenes...</span>
            </div>
          </div>
        )}

        {!loadingImages && images.length > 0 && (
          <>
            <div className="row g-3">
              {images.map((url) => (
                <div className="col-6 col-md-4" key={url}>
                  <img
                    src={url}
                    alt={`Perro de raza ${selectedBreed}`}
                    className="img-fluid rounded-3 shadow-sm w-100"
                    style={{ aspectRatio: "1 / 1", objectFit: "cover" }}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-outline-primary mt-3 d-flex align-items-center gap-2"
              onClick={() => onUseBreed(selectedBreed)}
            >
              <i className="bi bi-arrow-return-left"></i>
              Usar "{selectedBreed}" en el formulario de registro
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default BreedGallery;
