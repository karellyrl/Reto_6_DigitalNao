# Reto_6_DigitalNao

# Tattler API
Tattler es una API REST que permite gestionar información sobre restaurantes, incluyendo la capacidad de añadir, actualizar, eliminar, y consultar restaurantes, así como añadir comentarios y calificar los establecimientos. La base de datos está implementada en MongoDB y la API se desarrolla utilizando Express.js.

## Descripción del Proyecto

Este proyecto tiene como objetivo proporcionar una API RESTful para interactuar con una base de datos de restaurantes. Los usuarios pueden realizar operaciones CRUD sobre la información de los restaurantes, así como añadir comentarios y calificaciones. Además, la API permite registrar nuevos restaurantes y realizar búsquedas y filtrado de la información.

## Estructura del Proyecto

- **`backup_data/`**: Carpeta para almacenar respaldos de la base de datos.
- **`controllers/`**: Contiene la lógica de negocio y maneja las solicitudes para cada ruta.
- **`models/`**: Define la estructura de los datos en MongoDB.
- **`routes/`**: Define las rutas y vincula cada ruta con su controlador correspondiente.
- **`server.js`**: Configura el servidor Express y conecta a MongoDB.
- **`node_modules/`**: Contiene las dependencias del proyecto.
- **`package.json`**: Archivo de configuración del proyecto que lista las dependencias y scripts.
- **`package-lock.json`**: Archivo de bloqueo de versiones de las dependencias.

## Instalación

Para poder ejecutar este proyecto primero se siguen estos pasos para instalar las dependencias y configurar el proyecto:

1. **Clona el Repositorio:**

   ```bash
   git clone https://github.com/karellyrl/Reto_6_DigitalNao
   cd Reto_6_DigitalNao

2. **Instala las Dependencias:**
    Se deben de tener Node.js y npm instalados. Luego, ejecuta el siguiente comando para instalar las dependencias del proyecto:

   ```bash
   npm install

## Ejecutar la API
Para iniciar el servidor, se usa el siguiente comando:
    ```bash
    npm install

El servidor estará escuchando en http://localhost:3000.

## Endpoints de la API

### 1. Crear un Restaurante

- **Método**: `POST`
- **Ruta**: `/api/restaurants`
- **Descripción**: Crea un nuevo restaurante.
- **Cuerpo de Solicitud**:

  ```json
  {
    "address": {
      "building": "364",
      "coord": [-73.96084119999999, 40.8014307],
      "street": "West  110 Street", "zipcode": "10025"
    },
    "borough": "Manhattan",
    "cuisine": "American",
    "hours": {
      "Monday": "18:00",
      "Tuesday": "18:00",
      "Wednesday": "15:00",
      "Thursday": "11:00",
      "Friday": "12:00",
      "Saturday": "16:00",
      "Sunday": "14:00"
    },
    "name": "Spoon Bread Catering",
    "restaurant_id": "40364179"
  }

  ### 2. Obtener Todos los Restaurantes

- **Método**: `GET`
- **Ruta**: `/api/restaurants`
- **Descripción**: Obtiene una lista de todos los restaurantes.

### 3. Obtener un Restaurante por ID

- **Método**: `GET`
- **Ruta**: `/api/restaurants/:id`
- **Descripción**: Obtiene un restaurante específico por ID.
- **Parámetros de Ruta**:
  - `id` (string): ID del restaurante.

### 4. Actualizar un Restaurante

- **Método**: `PUT`
- **Ruta**: `/api/restaurants/:id`
- **Descripción**: Actualiza un restaurante específico por ID.
- **Parámetros de Ruta**:
  - `id` (string): ID del restaurante.
- **Cuerpo de Solicitud**: Campos que deseas actualizar. Ejemplo:

  ```json
  {
    "name": "New Name",
    "hours": {
      "Monday": "09:00",
      "Tuesday": "09:00",
      "Wednesday": "09:00",
      "Thursday": "09:00",
      "Friday": "09:00",
      "Saturday": "09:00",
      "Sunday": "09:00"
    }
  }
### 5. Eliminar un Restaurante

- **Método**: `DELETE`
- **Ruta**: `/api/restaurants/:id`
- **Descripción**: Elimina un restaurante específico por ID.
- **Parámetros de Ruta**:
  - `id` (string): ID del restaurante que deseas eliminar.

    ```json
    {
      "message": "Restaurant deleted successfully"
    }
    ```
### 6. Crear un nuevo usuario

- **Método**: `POST`
- **Ruta**: `/api/users`
- **Descripción**: Añade un nuevo usuario por ID.
- **Parámetros de Ruta**:
  - `id` (string): ID del restaurante al que se le añadirá el comentario.
- **Cuerpo de Solicitud**:

  ```json
  {
    "name": "",
    "email": "",
    "password": ""
  }

### 6. Añadir un Comentario

- **Método**: `POST`
- **Ruta**: `/api/restaurants/:id/comments`
- **Descripción**: Añade un comentario a un restaurante específico por ID.
- **Parámetros de Ruta**:
  - `id` (string): ID del restaurante al que se le añadirá el comentario.
- **Cuerpo de Solicitud**:

  ```json
  {
    "userId": "",  // Reemplazar con el ID del usuario 
    "comment": "¡La comida fue increíble!"
  }

### 7. Calificar un Restaurante

- **Endpoint:** `POST /api/restaurants/:id/rating`
- **Descripción:** Califica un restaurante específico.
- **Parámetros de Ruta:** `id` - ID del restaurante.
- **Cuerpo de la Solicitud:**
  ```json
  {
    "rating": 5
  }
