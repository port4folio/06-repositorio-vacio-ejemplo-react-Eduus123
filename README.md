# 🐾 Veterinaria Huellitas
Aplicación web de una sola página (SPA) desarrollada en **React + Vite**, que
permite gestionar el registro de mascotas de una veterinaria mediante
operaciones CRUD persistidas en `localStorage`, e integra el consumo de una
API externa para consultar razas de perro.
## Integrantes
- Eduardo Lepileo
## Repositorio
https://github.com/port4folio/06-repositorio-vacio-ejemplo-react-Eduus123
## Descripción del proyecto
### 1. CRUD de mascotas (localStorage)
- Formulario con 5 campos: **nombre**, **especie**, **dueño/a**, **edad** y
  **observaciones**
- Validación de datos antes de guardar (longitudes, rangos, campos obligatorios).
- Tabla dinámica con funciones de **editar** y **eliminar**.
- Persistencia automática en `localStorage`, con manejo de errores por si los
  datos guardados están corruptos o el storage no está disponible.
- Separado en 3 componentes:
  - `PetForm`: formulario de alta/edición.
  - `PetTable`: tabla contenedora.
  - `PetRow`: fila individual (recibe datos y callbacks vía props).
### 2. Consumo de API externa
- Componente `BreedGallery`, que consume la API pública **[Dog CEO](https://dog.ceo/api)**
  usando `fetch`, con manejo de estados de carga y error.
- Permite elegir una raza y ver imágenes de referencia.
- Integrado al SPA como una segunda pestaña de navegación, accesible desde la
  misma aplicación (no es una página aparte).
### 3. Estilos
- Bootstrap 5 + Bootstrap Icons.
- Paleta propia (verde salvia + terracota) para diferenciarse del estilo por
  defecto de Bootstrap.
- Formularios estilizados, botones con íconos y tablas responsivas.
## Cómo ejecutar el proyecto
```bash
# 1. Clonar el repositorio
git clone https://github.com/port4folio/06-repositorio-vacio-ejemplo-react-Eduus123.git
cd 06-repositorio-vacio-ejemplo-react-Eduus123
# 2. Instalar dependencias
npm install
# 3. Levantar el servidor de desarrollo
npm run dev
```
Luego abrir la URL que indica la consola (por defecto `http://localhost:5173`).
## Estructura del proyecto
```
src/
├── components/
│   ├── PetForm.jsx        # Formulario CRUD
│   ├── PetTable.jsx       # Tabla contenedora
│   ├── PetRow.jsx         # Fila individual
│   └── BreedGallery.jsx   # Consumo de API externa
├── hooks/
│   └── useLocalStorage.js # Hook de persistencia
├── utils/
│   └── validation.js      # Validaciones del formulario
├── App.jsx                # Componente raíz / navegación
├── App.css                # Estilos propios
└── main.jsx                # Punto de entrada
```
