const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentsController');
const authenticate = require('../middleware/authenticate');

// Endpoint para crear un comentario
/**
 * @openapi
 * /comments:
 *   post:
 *     tags:
 *       - Comments
 *     summary: Crea un nuevo comentario
 *     description: Permite a un usuario crear un nuevo comentario para un restaurante.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Datos del nuevo comentario
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               restaurant:
 *                 type: string
 *                 description: ID del restaurante al que pertenece el comentario
 *                 example: "60b5f8a2c1a1e8d0c8f79a1b"
 *               author:
 *                 type: string
 *                 description: ID del usuario que hace el comentario
 *                 example: "60b5f8a2c1a1e8d0c8f79a2c"
 *               comment:
 *                 type: string
 *                 description: Contenido del comentario
 *                 example: "Excelente comida y servicio."
 *     responses:
 *       '201':
 *         description: Comentario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID del comentario
 *                   example: "60b5f8a2c1a1e8d0c8f79a3c"
 *                 restaurant:
 *                   type: string
 *                   description: ID del restaurante
 *                   example: "60b5f8a2c1a1e8d0c8f79a1b"
 *                 author:
 *                   type: string
 *                   description: ID del usuario
 *                   example: "60b5f8a2c1a1e8d0c8f79a2c"
 *                 comment:
 *                   type: string
 *                   description: Contenido del comentario
 *                   example: "Excelente comida y servicio."
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha del comentario
 *                   example: "2024-09-01T12:00:00Z"
 *       '400':
 *         description: Error al crear el comentario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Datos de comentario inválidos."
 */
router.post('/', authenticate, commentController.createComment);

// Endpoint para obtener comentarios de un restaurante
/**
 * @openapi
 * /comments/restaurants/{restaurantId}/comments:
 *   get:
 *     tags:
 *       - Comments
 *     summary: Obtiene todos los comentarios de un restaurante
 *     description: Devuelve una lista de comentarios para un restaurante específico.
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del restaurante para el cual se obtienen los comentarios
 *         example: "60b5f8a2c1a1e8d0c8f79a1b"
 *     responses:
 *       '200':
 *         description: Comentarios obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID del comentario
 *                     example: "60b5f8a2c1a1e8d0c8f79a3c"
 *                   restaurant:
 *                     type: string
 *                     description: ID del restaurante
 *                     example: "60b5f8a2c1a1e8d0c8f79a1b"
 *                   author:
 *                     type: string
 *                     description: ID del usuario
 *                     example: "60b5f8a2c1a1e8d0c8f79a2c"
 *                   comment:
 *                     type: string
 *                     description: Contenido del comentario
 *                     example: "Excelente comida y servicio."
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha del comentario
 *                     example: "2024-09-01T12:00:00Z"
 *       '500':
 *         description: Error al obtener los comentarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Error al obtener los comentarios."
 */
router.get('/restaurants/:restaurantId/comments', commentController.getCommentsForRestaurant);

// Endpoint para obtener un comentario por ID
/**
 * @openapi
 * /comments/{id}:
 *   get:
 *     tags:
 *       - Comments
 *     summary: Obtiene un comentario por ID
 *     description: Devuelve los detalles de un comentario específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del comentario a obtener
 *         example: "60b5f8a2c1a1e8d0c8f79a3c"
 *     responses:
 *       '200':
 *         description: Comentario obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID del comentario
 *                   example: "60b5f8a2c1a1e8d0c8f79a3c"
 *                 restaurant:
 *                   type: string
 *                   description: ID del restaurante
 *                   example: "60b5f8a2c1a1e8d0c8f79a1b"
 *                 author:
 *                   type: string
 *                   description: ID del usuario
 *                   example: "60b5f8a2c1a1e8d0c8f79a2c"
 *                 comment:
 *                   type: string
 *                   description: Contenido del comentario
 *                   example: "Excelente comida y servicio."
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha del comentario
 *                   example: "2024-09-01T12:00:00Z"
 *       '404':
 *         description: Comentario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Comentario no encontrado"
 *       '500':
 *         description: Error al obtener el comentario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Error al obtener el comentario."
 */
router.get('/:id', commentController.getCommentById);

// Endpoint para actualizar un comentario por ID
/**
 * @openapi
 * /comments/{id}:
 *   put:
 *     tags:
 *       - Comments
 *     summary: Actualiza un comentario por ID
 *     description: Permite actualizar un comentario existente.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del comentario a actualizar
 *         example: "60b5f8a2c1a1e8d0c8f79a3c"
 *     requestBody:
 *       description: Datos actualizados del comentario
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 description: Nuevo contenido del comentario
 *                 example: "El servicio fue aún mejor esta vez."
 *     responses:
 *       '200':
 *         description: Comentario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID del comentario
 *                   example: "60b5f8a2c1a1e8d0c8f79a3c"
 *                 restaurant:
 *                   type: string
 *                   description: ID del restaurante
 *                   example: "60b5f8a2c1a1e8d0c8f79a1b"
 *                 author:
 *                   type: string
 *                   description: ID del usuario
 *                   example: "60b5f8a2c1a1e8d0c8f79a2c"
 *                 comment:
 *                   type: string
 *                   description: Contenido actualizado del comentario
 *                   example: "El servicio fue aún mejor esta vez."
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha del comentario
 *                   example: "2024-09-01T12:00:00Z"
 *       '400':
 *         description: Error al actualizar el comentario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Datos de comentario inválidos."
 *       '404':
 *         description: Comentario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Comentario no encontrado."
 *       '500':
 *         description: Error al actualizar el comentario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Error al actualizar el comentario."
 */
router.put('/:id', authenticate, commentController.updateComment);

// Endpoint para eliminar un comentario
/**
 * @openapi
 * /comments/{id}:
 *   delete:
 *     tags:
 *       - Comments
 *     summary: Elimina un comentario por ID
 *     description: Permite eliminar un comentario específico.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del comentario a eliminar
 *         example: "60b5f8a2c1a1e8d0c8f79a3c"
 *     responses:
 *       '200':
 *         description: Comentario eliminado exitosamente
 *       '404':
 *         description: Comentario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Comentario no encontrado."
 *       '500':
 *         description: Error al eliminar el comentario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Error al eliminar el comentario."
 */
router.delete('/:id', authenticate, commentController.deleteComment);

module.exports = router;
