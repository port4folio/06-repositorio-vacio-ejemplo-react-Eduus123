import { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import PetForm from "./components/PetForm";
import PetTable from "./components/PetTable";
import BreedGallery from "./components/BreedGallery";
import "./App.css";

function App() {
  const [pets, setPets] = useLocalStorage("vet-pets", []);
  const [editingPet, setEditingPet] = useState(null);
  const [activeTab, setActiveTab] = useState("registro");

  function handleSave(petData) {
    if (editingPet) {
      // Actualizar registro existente
      setPets((prev) =>
        prev.map((p) => (p.id === editingPet.id ? { ...petData, id: editingPet.id } : p))
      );
      setEditingPet(null);
    } else {
      // Crear nuevo registro con id único
      const newPet = { ...petData, id: crypto.randomUUID() };
      setPets((prev) => [...prev, newPet]);
    }
  }

  function handleEdit(pet) {
    setEditingPet(pet);
    setActiveTab("registro");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(id) {
    if (window.confirm("¿Seguro que deseas eliminar este registro? Esta acción no se puede deshacer.")) {
      setPets((prev) => prev.filter((p) => p.id !== id));
      if (editingPet?.id === id) setEditingPet(null);
    }
  }

  function handleCancelEdit() {
    setEditingPet(null);
  }

  // Integración funcional: al elegir una raza en la galería (API externa),
  // volvemos a la pestaña de registro para usarla como referencia.
  function handleUseBreed(breed) {
    window.alert(`Raza "${breed}" seleccionada. Puedes usarla como referencia en el campo "Especie".`);
    setActiveTab("registro");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="container py-4">
          <h1 className="d-flex align-items-center gap-2 mb-1">
            <i className="bi bi-heart-pulse-fill"></i>
            Veterinaria Huellitas
          </h1>
          <p className="text-white-50 mb-0">
            Registro de mascotas · SPA en React con CRUD y consumo de API
          </p>
        </div>
      </header>

      <main className="container py-4">
        <ul className="nav nav-pills mb-4 gap-2">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "registro" ? "active" : ""}`}
              onClick={() => setActiveTab("registro")}
            >
              <i className="bi bi-clipboard2-pulse me-2"></i>
              Registro de mascotas
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "razas" ? "active" : ""}`}
              onClick={() => setActiveTab("razas")}
            >
              <i className="bi bi-globe2 me-2"></i>
              Galería de razas (API)
            </button>
          </li>
        </ul>

        {activeTab === "registro" && (
          <>
            <PetForm editingPet={editingPet} onSave={handleSave} onCancelEdit={handleCancelEdit} />
            <div className="card shadow-sm">
              <div className="card-body">
                <h2 className="h5 card-title mb-3 d-flex align-items-center gap-2">
                  <i className="bi bi-list-ul"></i>
                  Mascotas registradas ({pets.length})
                </h2>
                <PetTable pets={pets} onEdit={handleEdit} onDelete={handleDelete} />
              </div>
            </div>
          </>
        )}

        {activeTab === "razas" && <BreedGallery onUseBreed={handleUseBreed} />}
      </main>

      <footer className="text-center text-muted py-4 small">
        Evaluación Unidad 3 · React + localStorage + Dog CEO API
      </footer>
    </div>
  );
}

export default App;
