import { useState, useEffect } from "react";
import { validatePet } from "../utils/validation";

const EMPTY_FORM = {
  nombre: "",
  especie: "",
  raza: "",
  razaOtra: "",
  dueño: "",
  edad: "",
  observaciones: "",
};

const RAZAS_COMUNES = [
  "Labrador",
  "Golden Retriever",
  "Bulldog Francés",
  "Chihuahua",
  "Pastor Alemán",
  "Poodle",
  "Criollo / Mestizo",
  "Persa",
  "Siamés",
  "Otra (especificar)",
];

/**
 * Formulario controlado para crear o editar una mascota.
 * Recibe `editingPet` (o null) y notifica al padre vía callback `onSave`.
 */
function PetForm({ editingPet, onSave, onCancelEdit, suggestedBreed }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  // Cuando el padre selecciona una mascota para editar, precargamos el form
  useEffect(() => {
    if (editingPet) {
      const razaConocida = RAZAS_COMUNES.includes(editingPet.raza);
      setForm({
        nombre: editingPet.nombre,
        especie: editingPet.especie,
        raza: razaConocida ? editingPet.raza : "Otra (especificar)",
        razaOtra: razaConocida ? "" : editingPet.raza || "",
        dueño: editingPet.dueño,
        edad: editingPet.edad,
        observaciones: editingPet.observaciones || "",
      });
      setErrors({});
    }
  }, [editingPet]);

  // Cuando el usuario elige "Usar en el formulario" desde la galería de razas
  // (API externa), autocompletamos el campo raza automáticamente.
  useEffect(() => {
    if (!suggestedBreed?.value) return;

    const breedLabel = suggestedBreed.value
      .split("/")
      .reverse()
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

    const coincide = RAZAS_COMUNES.find(
      (r) => r.toLowerCase() === breedLabel.toLowerCase()
    );

    setForm((prev) => ({
      ...prev,
      raza: coincide ?? "Otra (especificar)",
      razaOtra: coincide ? "" : breedLabel,
    }));
  }, [suggestedBreed]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const razaFinal = form.raza === "Otra (especificar)" ? form.razaOtra.trim() : form.raza;

    const { isValid, errors: validationErrors, sanitized } = validatePet({
      ...form,
      raza: razaFinal,
    });

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    onSave(sanitized);
    setForm(EMPTY_FORM);
    setErrors({});
  }

  function handleCancel() {
    setForm(EMPTY_FORM);
    setErrors({});
    onCancelEdit();
  }

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h2 className="h5 card-title mb-3 d-flex align-items-center gap-2">
          <i className={`bi ${editingPet ? "bi-pencil-square" : "bi-clipboard2-plus"}`}></i>
          {editingPet ? "Editar mascota" : "Registrar nueva mascota"}
        </h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="nombre" className="form-label">
                Nombre de la mascota
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-tag"></i>
                </span>
                <input
                  type="text"
                  className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
                  id="nombre"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Ej: Firulais"
                  maxLength={40}
                />
                {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
              </div>
            </div>

            <div className="col-md-6">
              <label htmlFor="especie" className="form-label">
                Especie
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-heart-pulse"></i>
                </span>
                <input
                  type="text"
                  className={`form-control ${errors.especie ? "is-invalid" : ""}`}
                  id="especie"
                  name="especie"
                  value={form.especie}
                  onChange={handleChange}
                  placeholder="Ej: Perro, Gato, Conejo"
                />
                {errors.especie && <div className="invalid-feedback">{errors.especie}</div>}
              </div>
            </div>

            <div className="col-md-6">
              <label htmlFor="raza" className="form-label">
                Raza
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-award"></i>
                </span>
                <select
                  className="form-select"
                  id="raza"
                  name="raza"
                  value={form.raza}
                  onChange={handleChange}
                >
                  <option value="">-- Selecciona una raza --</option>
                  {RAZAS_COMUNES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              {form.raza === "Otra (especificar)" && (
                <input
                  type="text"
                  className={`form-control mt-2 ${errors.raza ? "is-invalid" : ""}`}
                  name="razaOtra"
                  value={form.razaOtra}
                  onChange={handleChange}
                  placeholder="Escribe la raza de la mascota"
                  maxLength={40}
                />
              )}
              {errors.raza && <div className="text-danger small mt-1">{errors.raza}</div>}
            </div>

            <div className="col-md-6">
              <label htmlFor="dueño" className="form-label">
                Dueño/a
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-person"></i>
                </span>
                <input
                  type="text"
                  className={`form-control ${errors.dueño ? "is-invalid" : ""}`}
                  id="dueño"
                  name="dueño"
                  value={form.dueño}
                  onChange={handleChange}
                  placeholder="Ej: María Pérez"
                />
                {errors.dueño && <div className="invalid-feedback">{errors.dueño}</div>}
              </div>
            </div>

            <div className="col-md-6">
              <label htmlFor="edad" className="form-label">
                Edad (años)
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-calendar3"></i>
                </span>
                <input
                  type="number"
                  className={`form-control ${errors.edad ? "is-invalid" : ""}`}
                  id="edad"
                  name="edad"
                  value={form.edad}
                  onChange={handleChange}
                  placeholder="Ej: 3"
                  min="0"
                  max="40"
                />
                {errors.edad && <div className="invalid-feedback">{errors.edad}</div>}
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="observaciones" className="form-label">
                Observaciones (opcional)
              </label>
              <textarea
                className="form-control"
                id="observaciones"
                name="observaciones"
                value={form.observaciones}
                onChange={handleChange}
                placeholder="Ej: Alergia a ciertos alimentos, vacunas pendientes..."
                rows={2}
                maxLength={200}
              ></textarea>
            </div>
          </div>

          <div className="d-flex gap-2 mt-3">
            <button type="submit" className="btn btn-primary d-flex align-items-center gap-2">
              <i className={`bi ${editingPet ? "bi-check2-circle" : "bi-plus-circle"}`}></i>
              {editingPet ? "Guardar cambios" : "Agregar mascota"}
            </button>
            {editingPet && (
              <button
                type="button"
                className="btn btn-outline-secondary d-flex align-items-center gap-2"
                onClick={handleCancel}
              >
                <i className="bi bi-x-circle"></i>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default PetForm;