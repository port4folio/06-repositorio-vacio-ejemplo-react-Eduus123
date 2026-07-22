export function validatePet(pet) {
  const errors = {};

  const nombre = pet.nombre?.trim() ?? "";
  const especie = pet.especie?.trim() ?? "";
  const raza = pet.raza?.trim() ?? "";
  const dueño = pet.dueño?.trim() ?? "";
  const edad = pet.edad;

  if (nombre.length < 2) {
    errors.nombre = "El nombre debe tener al menos 2 caracteres.";
  } else if (nombre.length > 40) {
    errors.nombre = "El nombre no puede superar 40 caracteres.";
  }

  if (especie.length < 2) {
    errors.especie = "Indica la especie (ej: perro, gato, ave).";
  }

  if (raza.length < 2) {
    errors.raza = "Indica la raza o escribe una si no aparece en la lista.";
  }

  if (dueño.length < 2) {
    errors.dueño = "El nombre del dueño es obligatorio.";
  }

  const edadNum = Number(edad);
  if (edad === "" || edad === null || edad === undefined) {
    errors.edad = "La edad es obligatoria.";
  } else if (Number.isNaN(edadNum) || edadNum < 0 || edadNum > 40) {
    errors.edad = "La edad debe ser un número entre 0 y 40.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitized: {
      ...pet,
      nombre,
      especie,
      raza,
      dueño,
      edad: edadNum,
    },
  };
}


export function sanitizeText(text) {
  return String(text)
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}