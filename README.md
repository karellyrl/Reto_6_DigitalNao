# Reto_6_DigitalNao

# Tattler API
Tattler es una API REST que permite gestionar información sobre restaurantes, incluyendo la capacidad de añadir, actualizar, eliminar, y consultar restaurantes, así como añadir comentarios y calificar los establecimientos. La base de datos está implementada en MongoDB y la API se desarrolla utilizando Express.js.

## Descripción del Proyecto

Este proyecto tiene como objetivo proporcionar una API RESTful para interactuar con una base de datos de restaurantes. Los usuarios pueden realizar operaciones CRUD sobre la información de los restaurantes, así como añadir comentarios y calificaciones. Además, la API permite registrar nuevos restaurantes y realizar búsquedas y filtrado de la información.

## Estructura del Proyecto

- **`backup_data/`**: Carpeta para almacenar respaldos de la base de datos.
- **`config/`**: Configuración para conectar a la base de datos.
- **`controllers/`**: Contiene la lógica de negocio y maneja las solicitudes para cada ruta.
- **`middleware/`**: Middleware para manejo de autenticación.
- **`models/`**: Define la estructura de los datos en MongoDB.
- **`routes/`**: Define las rutas y vincula cada ruta con su controlador correspondiente.
- **`server.js`**: Configura el servidor Express y conecta a MongoDB.
- **`scripts.js`**: Script para la creación de la base de datos.
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

    node server.js

El servidor estará escuchando en http://localhost:3000.



## Endpoints de la API
A continuación se presentan ejemplos de cómo utilizar los endpoints de la API de Restaurantes utilizando Postman, incluyendo ejemplos de las respuestas.

## Autenticación
Antes de realizar solicitudes a ciertos endpoints, es necesario autenticarse y obtener un token JWT.

### **Iniciar Sesión**
- **Endpoint**: `POST /api/users/login`
- **Body**:
    ```json
    {
      "email": "usuario@example.com",
      "password": "password123"
    }
    ```
- **Respuesta Exitosa**:
    ```json
    {
      "token": "jwt-token-aqui"
    }
    ```

Guarda el token proporcionado para usarlo en los encabezados de las siguientes solicitudes que lo requieran.

---

## Endpoints de Restaurantes

### **Obtener todos los Restaurantes**
- **Endpoint**: `GET /api/restaurants`
- **Ejemplo en Postman**:
    - Método: `GET`
    - URL: `http://localhost:3000/api/restaurants`
- **Respuesta Exitosa**:
    ```json
    [
      {
        "_id": "64f7d3a3b5a4b9c1e0000001",
        "name": "Nuevo Restaurante",
        "cuisine": "Mexicana",
        "borough": "Centro",
        "address": {
          "building": "123",
          "street": "Calle Principal",
          "zipcode": "64000"
        },
        "coord": [-99.1332, 19.4326],
        "hours": {
          "monday": "09:00-18:00",
          "tuesday": "09:00-18:00"
        },
        "rating": 4.5
      }
    ]
    ```

### **Obtener un Restaurante por ID**
- **Endpoint**: `GET /api/restaurants/:id`
- **Ejemplo en Postman**:
    - Método: `GET`
    - URL: `http://localhost:3000/api/restaurants/64f7d3a3b5a4b9c1e0000001`
- **Respuesta Exitosa**:
    ```json
    {
      "_id": "64f7d3a3b5a4b9c1e0000001",
      "name": "Nuevo Restaurante",
      "cuisine": "Mexicana",
      "borough": "Centro",
      "address": {
        "building": "123",
        "street": "Calle Principal",
        "zipcode": "64000"
      },
      "coord": [-99.1332, 19.4326],
      "hours": {
        "monday": "09:00-18:00",
        "tuesday": "09:00-18:00"
      },
      "rating": 4.5
    }
    ```

### **Agregar un Restaurante**
- **Endpoint**: `POST /api/restaurants`
- **Body**:
    ```json
    {
      "name": "Nuevo Restaurante",
      "cuisine": "Mexicana",
      "borough": "Centro",
      "address": {
        "building": "123",
        "street": "Calle Principal",
        "zipcode": "64000"
      },
      "coord": [-99.1332, 19.4326],
      "hours": {
        "monday": "09:00-18:00",
        "tuesday": "09:00-18:00"
      }
    }
    ```
- **Encabezados**:
    - `Authorization`: `Bearer jwt-token-aqui`
- **Respuesta Exitosa**:
    ```json
    {
      "_id": "64f7d3a3b5a4b9c1e0000002",
      "name": "Nuevo Restaurante",
      "cuisine": "Mexicana",
      "borough": "Centro",
      "address": {
        "building": "123",
        "street": "Calle Principal",
        "zipcode": "64000"
      },
      "coord": [-99.1332, 19.4326],
      "hours": {
        "monday": "09:00-18:00",
        "tuesday": "09:00-18:00"
      },
      "rating": 0
    }
    ```

### **Actualizar un Restaurante**
- **Endpoint**: `PUT /api/restaurants/:id`
- **Body**:
    ```json
    {
      "name": "Restaurante Actualizado",
      "cuisine": "Italiana"
    }
    ```
- **Encabezados**:
    - `Authorization`: `Bearer jwt-token-aqui`
- **Respuesta Exitosa**:
    ```json
    {
      "_id": "64f7d3a3b5a4b9c1e0000001",
      "name": "Restaurante Actualizado",
      "cuisine": "Italiana",
      "borough": "Centro",
      "address": {
        "building": "123",
        "street": "Calle Principal",
        "zipcode": "64000"
      },
      "coord": [-99.1332, 19.4326],
      "hours": {
        "monday": "09:00-18:00",
        "tuesday": "09:00-18:00"
      },
      "rating": 4.5
    }
    ```

### **Eliminar un Restaurante**
- **Endpoint**: `DELETE /api/restaurants/:id`
- **Encabezados**:
    - `Authorization`: `Bearer jwt-token-aqui`
- **Ejemplo en Postman**:
    - Método: `DELETE`
    - URL: `http://localhost:3000/api/restaurants/64f7d3a3b5a4b9c1e0000001`
- **Respuesta Exitosa**:
    ```json
    {
      "message": "Restaurante eliminado correctamente."
    }
    ```

### **Buscar Restaurantes por Criterio**
- **Endpoint**: `GET /api/restaurants/search`
- **Parámetros de Consulta**:
    - `name`: (opcional) Nombre del restaurante para buscar.
    - `cuisine`: (opcional) Tipo de cocina para filtrar.
- **Encabezados**:
    - `Authorization`: `Bearer jwt-token-aqui`
- **Ejemplo en Postman**:
    - Método: `GET`
    - URL: `http://localhost:3000/api/restaurants/search?name=Berkely`
- **Respuesta Exitosa**:
    ```json
    [
      {
        "address": {
            "building": "437",
            "coord": [-73.975393, 40.757365],
            "street": "Madison Avenue",
            "zipcode": "10022"
        },
        "borough": "Manhattan",
        "cuisine": "American",
        "name": "Berkely",
        "restaurant_id": "40363685",
        "hours": {
            "Monday": "11:00 AM - 23:00 PM",
            "Tuesday": "9:00 AM - 21:00 PM",
            "Wednesday": "7:00 AM - 19:00 PM",
            "Thursday": "8:00 AM - 20:00 PM",
            "Friday": "10:00 AM - 19:00 PM",
            "Saturday": "11:00 AM - 23:00 PM",
            "Sunday": "11:00 AM - 20:00 PM"
        }
      }
    ]
    ```
- **Respuesta Sin Resultados**:
    ```json
    []
    ```

---


## Endpoints de Usuarios

### **Registrar un Nuevo Usuario**
- **Endpoint**: `POST /api/users/register`
- **Body**:
    ```json
    {
      "name": "Juan Pérez",
      "email": "juan@example.com",
      "password": "password123"
    }
    ```
- **Respuesta Exitosa**:
    ```json
    {
      "_id": "64f7d3a3b5a4b9c1e0000003",
      "name": "Juan Pérez",
      "email": "juan@example.com"
    }
    ```

### **Iniciar Sesión**
- **Endpoint**: `POST /api/users/login`
- **Body**:
    ```json
    {
      "email": "juan@example.com",
      "password": "password123"
    }
    ```
- **Respuesta Exitosa**:
    ```json
    {
      "token": "jwt-token-aqui"
    }
    ```

### **Obtener Perfil del Usuario**
- **Endpoint**: `GET /api/users/me`
- **Encabezados**:
    - `Authorization`: `Bearer jwt-token-aqui`
- **Ejemplo en Postman**:
    - Método: `GET`
    - URL: `http://localhost:3000/api/users/me`
- **Respuesta Exitosa**:
    ```json
    {
      "_id": "64f7d3a3b5a4b9c1e0000003",
      "name": "Juan Pérez",
      "email": "juan@example.com"
    }
    ```
### **Obtener Todos los Usuarios**
- **Endpoint**: `GET /api/users`
- **Descripción**: Recupera una lista de todos los usuarios registrados en el sistema.
- **Respuesta Exitosa**:
    - **Código de Estado**: `200 OK`
    - **Body**:
    ```json
    [
      {
        "_id": "64f7d3a3b5a4b9c1e0000001",
        "name": "Ana López",
        "email": "ana@example.com"
      },
      {
        "_id": "64f7d3a3b5a4b9c1e0000002",
        "name": "Carlos Martínez",
        "email": "carlos@example.com"
      },
      {
        "_id": "64f7d3a3b5a4b9c1e0000003",
        "name": "Juan Pérez",
        "email": "juan@example.com"
      }
    ]
    ```
- **Respuesta de Error**:
    ```
    - **Código de Estado**: `500 Internal Server Error` (si ocurre un error en el servidor)
    - **Body**:
    ```json
    {
      "message": "Error en el servidor"
    }
    ```

### **Actualizar Perfil del Usuario**
- **Endpoint**: `PUT /api/users/me`
- **Body**:
    ```json
    {
      "name": "Juan Pérez Actualizado",
      "password": "nuevo_password123"
    }
    ```
- **Encabezados**:
    - `Authorization`: `Bearer jwt-token-aqui`
- **Respuesta Exitosa**:
    ```json
    {
      "_id": "64f7d3a3b5a4b9c1e0000003",
      "name": "Juan Pérez Actualizado",
      "email": "juan@example.com"
    }
    ```

### **Eliminar Usuario**
- **Endpoint**: `DELETE /api/users/me`
- **Encabezados**:
    - `Authorization`: `Bearer jwt-token-aqui`
- **Ejemplo en Postman**:
    - Método: `DELETE`
    - URL: `http://localhost:3000/api/users/me`
- **Respuesta Exitosa**:
    ```json
    {
      "message": "Usuario eliminado correctamente."
    }
    ```

---

## Endoints de Comentarios
### **1. Agregar un Comentario a un Restaurante**
- **Endpoint**: `POST /api/comments`
- **Body**:
    ```json
    {
      "restaurant": "64f7d3a3b5a4b9c1e0000002",
      "author": "64f7d3a3b5a4b9c1e0000003",
      "comment": "¡Excelente comida!",
    }
    ```
- **Encabezados**:
    - `Authorization`: `Bearer jwt-token-aqui`
- **Respuesta Exitosa**:
    ```json
    {
      "_id": "64f7d3a3b5a4b9c1e0000004",
      "restaurant": "64f7d3a3b5a4b9c1e0000002",
      "author": "64f7d3a3b5a4b9c1e0000003",
      "comment": "¡Excelente comida!",
      "date": "2024-09-01T10:00:00Z"
    }
    ```

### **2. Obtener Comentarios de un Restaurante**
- **Endpoint**: `GET /api/comments?restaurant=64f7d3a3b5a4b9c1e0000002`
- **Respuesta Exitosa**:
    ```json
    [
      {
        "_id": "64f7d3a3b5a4b9c1e0000004",
        "restaurant": "64f7d3a3b5a4b9c1e0000002",
        "author": "64f7d3a3b5a4b9c1e0000003",
        "comment": "¡Excelente comida!",
        "date": "2024-09-01T10:00:00Z"
      }
    ]
    ```

### **3. Obtener un Comentario Específico**
- **Endpoint**: `GET /api/comments/64f7d3a3b5a4b9c1e0000004`
- **Respuesta Exitosa**:
    ```json
    {
      "_id": "64f7d3a3b5a4b9c1e0000004",
      "restaurant": "64f7d3a3b5a4b9c1e0000002",
      "author": "64f7d3a3b5a4b9c1e0000003",
      "comment": "¡Excelente comida!",
      "date": "2024-09-01T10:00:00Z"
    }
    ```

### **4. Actualizar un Comentario**
- **Endpoint**: `PUT /api/comments/64f7d3a3b5a4b9c1e0000004`
- **Body**:
    ```json
    {
      "comment": "¡Comida excepcional y servicio excelente!",
    }
    ```
- **Encabezados**:
    - `Authorization`: `Bearer jwt-token-aqui`
- **Respuesta Exitosa**:
    ```json
    {
      "_id": "64f7d3a3b5a4b9c1e0000004",
      "restaurant": "64f7d3a3b5a4b9c1e0000002",
      "author": "64f7d3a3b5a4b9c1e0000003",
      "comment": "¡Comida excepcional y servicio excelente!",
      "date": "2024-09-01T11:00:00Z"
    }
    ```

### **5. Eliminar un Comentario**
- **Endpoint**: `DELETE /api/comments/64f7d3a3b5a4b9c1e0000004`
- **Encabezados**:
    - `Authorization`: `Bearer jwt-token-aqui`
- **Respuesta Exitosa**:
    ```json
    {
      "message": "Comentario eliminado con éxito",
      "deletedId": "64f7d3a3b5a4b9c1e0000004"
    }
    ```

# Endpoints de Ratings

## **Agregar una Calificación a un Restaurante**
- **Endpoint**: `POST /api/ratings`
- **Body**:
    ```json
    {
      "restaurant": "64f7d3a3b5a4b9c1e0000002",
      "author": "64f7d3a3b5a4b9c1e0000003",
      "rating": 5
    }
    ```
- **Encabezados**:
    - `Authorization`: `Bearer jwt-token-aqui`
- **Respuesta Exitosa**:
    ```json
    {
      "_id": "64f7d3a3b5a4b9c1e0000005",
      "restaurant": "64f7d3a3b5a4b9c1e0000002",
      "author": "64f7d3a3b5a4b9c1e0000003",
      "rating": 5,
      "comment": "Excelente servicio y comida.",
      "date": "2024-09-01T00:00:00.000Z"
    }
    ```

## **Obtener todas las Calificaciones para un Restaurante**
- **Endpoint**: `GET /api/ratings/restaurant/:id`
- **Parámetros de Ruta**:
    - `id`: ID del restaurante (e.g., `64f7d3a3b5a4b9c1e0000002`)
- **Respuesta Exitosa**:
    ```json
    [
      {
        "_id": "64f7d3a3b5a4b9c1e0000005",
        "restaurant": "64f7d3a3b5a4b9c1e0000002",
        "author": "64f7d3a3b5a4b9c1e0000003",
        "rating": 5,
        "comment": "Excelente servicio y comida.",
        "date": "2024-09-01T00:00:00.000Z"
      },
      {
        "_id": "64f7d3a3b5a4b9c1e0000006",
        "restaurant": "64f7d3a3b5a4b9c1e0000002",
        "author": "64f7d3a3b5a4b9c1e0000004",
        "rating": 4,
        "comment": "Muy bueno, pero el servicio puede mejorar.",
        "date": "2024-09-02T00:00:00.000Z"
      }
    ]
    ```

## **Obtener una Calificación Específica**
- **Endpoint**: `GET /api/ratings/:id`
- **Parámetros de Ruta**:
    - `id`: ID de la calificación (e.g., `64f7d3a3b5a4b9c1e0000005`)
- **Respuesta Exitosa**:
    ```json
    {
      "_id": "64f7d3a3b5a4b9c1e0000005",
      "restaurant": "64f7d3a3b5a4b9c1e0000002",
      "author": "64f7d3a3b5a4b9c1e0000003",
      "rating": 5,
      "comment": "Excelente servicio y comida.",
      "date": "2024-09-01T00:00:00.000Z"
    }
    ```

## **Actualizar una Calificación**
- **Endpoint**: `PUT /api/ratings/:id`
- **Parámetros de Ruta**:
    - `id`: ID de la calificación (e.g., `64f7d3a3b5a4b9c1e0000005`)
- **Body**:
    ```json
    {
      "rating": 4
    }
    ```
- **Encabezados**:
    - `Authorization`: `Bearer jwt-token-aqui`
- **Respuesta Exitosa**:
    ```json
    {
      "_id": "64f7d3a3b5a4b9c1e0000005",
      "restaurant": "64f7d3a3b5a4b9c1e0000002",
      "author": "64f7d3a3b5a4b9c1e0000003",
      "rating": 4,
      "comment": "Buena comida, pero el ambiente podría mejorar.",
      "date": "2024-09-01T00:00:00.000Z"
    }
    ```

## **Eliminar una Calificación**
- **Endpoint**: `DELETE /api/ratings/:id`
- **Parámetros de Ruta**:
    - `id`: ID de la calificación (e.g., `64f7d3a3b5a4b9c1e0000005`)
- **Encabezados**:
    - `Authorization`: `Bearer jwt-token-aqui`
- **Respuesta Exitosa**:
    ```json
    {
      "message": "Calificación eliminada exitosamente."
    }
    ```
# Documentación en Notion
He creado una documentación detallada en Notion que cubre los siguientes aspectos:

1. **Estructura General de la API**:
   - Resumen de los recursos disponibles y cómo se relacionan entre sí.
   - Información sobre los modelos de datos utilizados en la API.

2. **Detalles de los Endpoints**:
   - Descripción de todos los endpoints disponibles, incluidos los parámetros de entrada y salida.
   - Ejemplos de solicitudes y respuestas para cada endpoint.

3. **Configuración y Uso**:
   - Instrucciones sobre cómo configurar y ejecutar la API en un entorno de desarrollo.
   - Información sobre cómo autenticar y autorizar solicitudes a la API.

4. **Ejemplos de Uso**:
   - Ejemplos prácticos de cómo realizar solicitudes a la API usando herramientas como Postman.

5. **Errores**:
   - Lista de posibles errores que pueden ocurrir dentro de la prueba de cada Endpoint.

Para acceder a la documentación completa en Notion, se accede a el siguiente enlace:

[Documentación de la API en Notion](https://www.notion.so/Reto-6-2eb8fc1de6884559ad58da9a268dccfc)

