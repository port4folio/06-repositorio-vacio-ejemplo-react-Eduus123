import PetRow from "./PetRow";

function PetTable({ pets, onEdit, onDelete }) {
  if (pets.length === 0) {
    return (
      <div className="text-center text-muted py-5 border rounded-3 bg-light-subtle">
        <i className="bi bi-clipboard-x fs-1 d-block mb-2"></i>
        Aún no hay mascotas registradas. Agrega la primera con el formulario de arriba.
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>Nombre</th>
            <th>Especie</th>
            <th>Raza</th>
            <th>Dueño/a</th>
            <th className="text-center">Edad</th>
            <th>Observaciones</th>
            <th className="text-end">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <PetRow key={pet.id} pet={pet} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PetTable;