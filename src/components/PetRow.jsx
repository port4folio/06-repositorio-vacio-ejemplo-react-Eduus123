/**
 * Componente de fila: representa una mascota dentro de la tabla.
 * Recibe la mascota y callbacks (props) para editar/eliminar,
 * sin conocer cómo el padre implementa esas acciones.
 */
function PetRow({ pet, onEdit, onDelete }) {
  return (
    <tr>
      <td className="fw-semibold">{pet.nombre}</td>
      <td>
        <span className="badge text-bg-light border">{pet.especie}</span>
      </td>
      <td>{pet.dueño}</td>
      <td className="text-center">{pet.edad}</td>
      <td className="text-muted small">{pet.observaciones || "—"}</td>
      <td className="text-end">
        <div className="btn-group btn-group-sm" role="group">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => onEdit(pet)}
            title="Editar"
          >
            <i className="bi bi-pencil"></i>
          </button>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => onDelete(pet.id)}
            title="Eliminar"
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default PetRow;
