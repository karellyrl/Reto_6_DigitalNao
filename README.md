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
   node server.js

El servidor estará escuchando en http://localhost:3000.

## Endpoints de la API
1. **Clona el Repositorio:**
- **Método: POST**
- **Ruta: /api/restaurants**
- **Descripción: Crea un nuevo restaurante.**

   ```bash
   Cuerpo de Solicitud:
   {
     "address": {
       "building": "469",
       "coord": [-73.961704, 40.662942],
       "street": "Flatbush Avenue",
       "zipcode": "11225"
     },
     "borough": "Brooklyn",
     "cuisine": "Hamburgers",
     "hours": {
       "Monday": "18:00",
       "Tuesday": "18:00",
       "Wednesday": "15:00",
       "Thursday": "11:00",
       "Friday": "12:00",
       "Saturday": "16:00",
       "Sunday": "14:00"
     },
     "name": "Wendy'S",
     "restaurant_id": "30112340"
   }
