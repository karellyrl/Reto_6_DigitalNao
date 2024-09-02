const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const authenticate = require('../middleware/authenticate');

// Endpoint para crear un rating
/**
 * @openapi
 * /ratings:
 *   post:
 *     tags:
 *       - Ratings
 *     summary: Crea un nuevo rating
 *     description: Registra un nuevo rating para un restaurante.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Datos del nuevo rating
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               restaurant:
 *                 type: string
 *                 description: ID del restaurante al que se le asigna el rating
 *                 example: "60b5f8a2c1a1e8d0c8f79a1b"
 *               author:
 *                 type: string
 *                 description: ID del autor del rating
 *                 example: "60b5f8a2c1a1e8d0c8f79a1c"
 *               rating:
 *                 type: number
 *                 description: Valoración numérica del rating
 *                 example: 4
 *     responses:
 *       '201':
 *         description: Rating creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID del nuevo rating
 *                   example: "60b5f8a2c1a1e8d0c8f79a1d"
 *                 restaurant:
 *                   type: string
 *                   description: ID del restaurante
 *                   example: "60b5f8a2c1a1e8d0c8f79a1b"
 *                 author:
 *                   type: string
 *                   description: ID del autor
 *                   example: "60b5f8a2c1a1e8d0c8f79a1c"
 *                 rating:
 *                   type: number
 *                   description: Valoración
 *                   example: 4
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha del rating
 *                   example: "2024-09-01T12:34:56Z"
 *       '400':
 *         description: Error al crear el rating
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Datos inválidos."
 */
router.post('/', authenticate, ratingController.createRating);

// Endpoint para obtener ratings de un restaurante
/**
 * @openapi
 * /ratings/restaurants/{restaurantId}/ratings:
 *   get:
 *     tags:
 *       - Ratings
 *     summary: Obtiene todos los ratings de un restaurante
 *     description: Devuelve una lista de ratings para un restaurante específico.
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del restaurante para el cual se obtienen los ratings.
 *     responses:
 *       '200':
 *         description: Lista de ratings para el restaurante
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID del rating
 *                     example: "60b5f8a2c1a1e8d0c8f79a1d"
 *                   restaurant:
 *                     type: string
 *                     description: ID del restaurante
 *                     example: "60b5f8a2c1a1e8d0c8f79a1b"
 *                   author:
 *                     type: string
 *                     description: ID del autor
 *                     example: "60b5f8a2c1a1e8d0c8f79a1c"
 *                   rating:
 *                     type: number
 *                     description: Valoración
 *                     example: 4
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha del rating
 *                     example: "2024-09-01T12:34:56Z"
 *       '500':
 *         description: Error al obtener los ratings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Error interno del servidor."
 */
router.get('/restaurants/:restaurantId/ratings', ratingController.getRatingsForRestaurant);

// Endpoint para obtener todos los ratings
/**
 * @openapi
 * /ratings/{id}:
 *   get:
 *     tags:
 *       - Ratings
 *     summary: Obtiene un rating por ID
 *     description: Devuelve los detalles de un rating específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del rating a obtener.
 *     responses:
 *       '200':
 *         description: Rating encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID del rating
 *                   example: "60b5f8a2c1a1e8d0c8f79a1d"
 *                 restaurant:
 *                   type: string
 *                   description: ID del restaurante
 *                   example: "60b5f8a2c1a1e8d0c8f79a1b"
 *                 author:
 *                   type: string
 *                   description: ID del autor
 *                   example: "60b5f8a2c1a1e8d0c8f79a1c"
 *                 rating:
 *                   type: number
 *                   description: Valoración
 *                   example: 4
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha del rating
 *                   example: "2024-09-01T12:34:56Z"
 *       '404':
 *         description: Rating no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Rating no encontrado."
 *       '500':
 *         description: Error al obtener el rating
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Error interno del servidor."
 */
router.get('/:id', ratingController.getRatingById);

// Endpoint para actualizar un rating
/**
 * @openapi
 * /ratings/{id}:
 *   put:
 *     tags:
 *       - Ratings
 *     summary: Actualiza un rating por ID
 *     description: Actualiza los detalles de un rating específico.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del rating a actualizar.
 *     requestBody:
 *       description: Datos actualizados del rating
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               restaurant:
 *                 type: string
 *                 description: ID del restaurante al que se le asigna el rating
 *                 example: "60b5f8a2c1a1e8d0c8f79a1b"
 *               author:
 *                 type: string
 *                 description: ID del autor del rating
 *                 example: "60b5f8a2c1a1e8d0c8f79a1c"
 *               rating:
 *                 type: number
 *                 description: Valoración numérica del rating
 *                 example: 4
 *     responses:
 *       '200':
 *         description: Rating actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID del rating
 *                   example: "60b5f8a2c1a1e8d0c8f79a1d"
 *                 restaurant:
 *                   type: string
 *                   description: ID del restaurante
 *                   example: "60b5f8a2c1a1e8d0c8f79a1b"
 *                 author:
 *                   type: string
 *                   description: ID del autor
 *                   example: "60b5f8a2c1a1e8d0c8f79a1c"
 *                 rating:
 *                   type: number
 *                   description: Valoración
 *                   example: 4
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha del rating
 *                   example: "2024-09-01T12:34:56Z"
 *       '404':
 *         description: Rating no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Rating no encontrado."
 *       '400':
 *         description: Error al actualizar el rating
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Datos inválidos."
 *       '500':
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Error interno del servidor."
 */
router.put('/:id', authenticate, ratingController.updateRating);

// Endpoint para eliminar un rating
/**
 * @openapi
 * /ratings/{id}:
 *   delete:
 *     tags:
 *       - Ratings
 *     summary: Elimina un rating por ID
 *     description: Elimina un rating específico por ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del rating a eliminar.
 *     responses:
 *       '200':
 *         description: Rating eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *                   example: "Rating eliminado."
 *       '404':
 *         description: Rating no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Rating no encontrado."
 *       '500':
 *         description: Error al eliminar el rating
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Error interno del servidor."
 */
router.delete('/:id', authenticate, ratingController.deleteRating);

module.exports = router;
