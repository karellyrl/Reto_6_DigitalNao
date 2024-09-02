const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const authenticate = require('../middleware/authenticate');

// Schema de restaurants
/**
 * @openapi
 * components:
 *   schemas:
 *     Restaurant:
 *       type: object
 *       properties:
 *         address:
 *           type: object
 *           properties:
 *             building:
 *               type: string
 *             coord:
 *               type: array
 *               items:
 *                 type: number
 *             street:
 *               type: string
 *             zipcode:
 *               type: string
 *         borough:
 *           type: string
 *         cuisine:
 *           type: string
 *         name:
 *           type: string
 *         restaurant_id:
 *           type: string
 *         hours:
 *           type: object
 *           properties:
 *             Monday:
 *               type: string
 *             Tuesday:
 *               type: string
 *             Wednesday:
 *               type: string
 *             Thursday:
 *               type: string
 *             Friday:
 *               type: string
 *             Saturday:
 *               type: string
 *             Sunday:
 *               type: string
 */

// Endpoint para buscar un restaurante
/**
 * @openapi
 * /restaurants/search:
 *   get:
 *     tags:
 *       - Restaurants
 *     summary: Busca y filtra restaurantes
 *     description: Realiza una búsqueda de restaurantes basada en nombre, tipo de comida, y ubicación del usuario. Este endpoint requiere un token de autenticación.
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Nombre del restaurante para búsqueda aproximada.
 *       - in: query
 *         name: cuisine
 *         schema:
 *           type: string
 *         description: Tipo de cocina para búsqueda aproximada.
 *       - in: query
 *         name: userLat
 *         schema:
 *           type: number
 *         description: Latitud del usuario para ordenar los resultados por proximidad.
 *       - in: query
 *         name: userLong
 *         schema:
 *           type: number
 *         description: Longitud del usuario para ordenar los resultados por proximidad.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Restaurantes encontrados y filtrados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurant'
 *       '500':
 *         description: Error en la búsqueda de restaurantes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Error en la búsqueda de restaurantes."
 */
router.get('/search', authenticate, restaurantController.searchRestaurants);

// Endpoint para crear un nuevo restaurante
/**
 * @openapi
 * /restaurants:
 *   post:
 *     tags:
 *       - Restaurants
 *     summary: Crea un nuevo restaurante
 *     description: Registra un nuevo restaurante en la base de datos.
 *     requestBody:
 *       description: Datos del nuevo restaurante
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurant'
 *     responses:
 *       '201':
 *         description: Restaurante creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       '500':
 *         description: Error al crear el restaurante
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Error al crear el restaurante."
 */
router.post('/', restaurantController.createRestaurant);

// Endpoint para obtener todos los restaurantes
/**
 * @openapi
 * /restaurants:
 *   get:
 *     tags:
 *       - Restaurants
 *     summary: Obtiene todos los restaurantes
 *     description: Devuelve una lista de todos los restaurantes.
 *     responses:
 *       '200':
 *         description: Lista de restaurantes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurant'
 *       '500':
 *         description: Error al obtener los restaurantes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Error al obtener los restaurantes."
 */
router.get('/', restaurantController.getAllRestaurants);

// Endpoint para obtener un restaurante por ID
/**
 * @openapi
 * /restaurants/{id}:
 *   get:
 *     tags:
 *       - Restaurants
 *     summary: Obtiene un restaurante por ID
 *     description: Devuelve los detalles de un restaurante específico basado en el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del restaurante a obtener.
 *     responses:
 *       '200':
 *         description: Restaurante encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       '404':
 *         description: Restaurante no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Restaurante no encontrado."
 *       '500':
 *         description: Error al obtener el restaurante
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Error al obtener el restaurante."
 */
router.get('/:id', restaurantController.getRestaurantById);

// Endpoint para actualizar un restaurante
/**
 * @openapi
 * /restaurants/{id}:
 *   put:
 *     tags:
 *       - Restaurants
 *     summary: Actualiza un restaurante
 *     description: Actualiza los detalles de un restaurante existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del restaurante a actualizar.
 *     requestBody:
 *       description: Datos actualizados del restaurante
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurant'
 *     responses:
 *       '200':
 *         description: Restaurante actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       '404':
 *         description: Restaurante no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Restaurante no encontrado."
 *       '500':
 *         description: Error al actualizar el restaurante
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Error al actualizar el restaurante."
 */
router.put('/:id', restaurantController.updateRestaurant);

// Endpoint para eliminar un restaurante
/**
 * @openapi
 * /restaurants/{id}:
 *   delete:
 *     tags:
 *       - Restaurants
 *     summary: Elimina un restaurante
 *     description: Elimina un restaurante basado en el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del restaurante a eliminar.
 *     responses:
 *       '200':
 *         description: Restaurante eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de confirmación
 *                   example: "Restaurante eliminado."
 *       '404':
 *         description: Restaurante no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Restaurante no encontrado."
 *       '500':
 *         description: Error al eliminar el restaurante
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Error al eliminar el restaurante."
 */
router.delete('/:id', restaurantController.deleteRestaurant);

module.exports = router;
