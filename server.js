const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const fs = require('fs');

// Configuración del servidor
const app = express();
const port = 3000;

// Importar y configurar la conexión a MongoDB
// Se utiliza un archivo de configuración externo para gestionar la conexión a la base de datos.
const connectDB = require('./config/config');
connectDB();  // Conectar a la base de datos MongoDB

// Configuración de Swagger para documentar la API
const swaggerDefinition = {
  openapi: '3.0.0',  
  info: {
    title: 'API de Restaurantes',  
    version: '1.0.0',  
    description: 'Documentación de la API de Restaurantes'  // Descripción general de la API
  },
  servers: [
    {
      url: 'http://localhost:3000/api',  // URL base del servidor de desarrollo
      description: 'Servidor de desarrollo'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',  // Tipo de autenticación
        scheme: 'bearer',  // Esquema de autenticación JWT
        bearerFormat: 'JWT'
      }
    }
  },
  security: [
    {
      bearerAuth: []  // Aplica el esquema de autenticación a toda la API
    }
  ],
  tags: [
    {
      name: 'Restaurants',  // Etiqueta para los endpoints relacionados con restaurantes
      description: 'Endpoints relacionados con restaurantes'
    },
    {
      name: 'Users',  // Etiqueta para los endpoints relacionados con usuarios
      description: 'Endpoints relacionados con usuarios'
    },
    {
      name: 'Comments',  // Etiqueta para los endpoints relacionados con comentarios
      description: 'Endpoints relacionados con comentarios'
    },
    {
      name: 'Ratings',  // Etiqueta para los endpoints relacionados con calificaciones
      description: 'Endpoints relacionados con calificaciones'
    }
  ]
};

// Opciones para Swagger
const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],  // Define qué archivos contienen las definiciones de los endpoints
};

// Generar la especificación Swagger basada en las opciones configuradas
const swaggerSpec = swaggerJsdoc(options);

// Guardar el swaggerSpec en un archivo JSON 
fs.writeFileSync(path.join(__dirname, 'swagger.json'), JSON.stringify(swaggerSpec, null, 2));

// Middleware
app.use(express.json());  

// Ruta para servir el archivo swagger.json
app.use('/swagger.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'swagger.json'));
});

// Configuración de Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Importar las rutas de las diferentes funcionalidades de la API
const restaurantRoutes = require('./routes/restaurantRoutes');
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentsRoutes');
const ratingRoutes = require('./routes/ratingRoutes');

// Usar las rutas con el prefijo '/api'
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/ratings', ratingRoutes);

// Iniciar el servidor en el puerto configurado
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
