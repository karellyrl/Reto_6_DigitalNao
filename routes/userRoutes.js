const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas de usuarios

// Endpoint para crear un nuevo usuario
/**
 * @openapi
 * /users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Crea un nuevo usuario
 *     description: Registra un nuevo usuario en la base de datos.
 *     requestBody:
 *       description: Datos del nuevo usuario
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del usuario
 *                 example: "Juan Pérez"
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *                 example: "usuario@example.com"
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: "contraseña123"
 *     responses:
 *       '201':
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID del nuevo usuario
 *                   example: "60b5f8a2c1a1e8d0c8f79a1b"
 *                 name:
 *                   type: string
 *                   description: Nombre del usuario
 *                   example: "Juan Pérez"
 *                 email:
 *                   type: string
 *                   description: Correo electrónico del usuario
 *                   example: "usuario@example.com"
 *       '400':
 *         description: Error al crear el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "El nombre de usuario ya está en uso."
 */
router.post('/', userController.createUser);

// Endpoint para iniciar sesión
/**
 * @openapi
 * /users/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Inicia sesión y obtiene un token JWT
 *     description: Permite a un usuario autenticado iniciar sesión y obtener un token JWT para acceder a recursos protegidos.
 *     requestBody:
 *       description: Credenciales del usuario para iniciar sesión
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *                 example: "usuario@example.com"
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: "contraseña123"
 *     responses:
 *       '200':
 *         description: Inicio de sesión exitoso, devuelve el usuario y el token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: ID del usuario
 *                       example: "60b5f8a2c1a1e8d0c8f79a1b"
 *                     name:
 *                       type: string
 *                       description: Nombre del usuario
 *                       example: "Juan Pérez"
 *                     email:
 *                       type: string
 *                       description: Correo electrónico del usuario
 *                       example: "usuario@example.com"
 *                 token:
 *                   type: string
 *                   description: Token JWT generado
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJf...Xf9wQ"
 *       '400':
 *         description: Error en las credenciales
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Credenciales inválidas."
 */
router.post('/login', userController.login);

// Endpoint para obtener todos los usuarios
/**
 * @openapi
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtiene todos los usuarios
 *     description: Recupera una lista de todos los usuarios registrados en la base de datos.
 *     responses:
 *       '200':
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID del usuario
 *                     example: "60b5f8a2c1a1e8d0c8f79a1b"
 *                   name:
 *                     type: string
 *                     description: Nombre del usuario
 *                     example: "Juan Pérez"
 *                   email:
 *                     type: string
 *                     description: Correo electrónico del usuario
 *                     example: "usuario@example.com"
 *       '500':
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Error al obtener los usuarios."
 */
router.get('/', userController.getUsers);

// Endpoint para obtener un usuario por ID
/**
 * @openapi
 * /users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtiene un usuario por ID
 *     description: Recupera un usuario específico utilizando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID del usuario
 *           example: "60b5f8a2c1a1e8d0c8f79a1b"
 *     responses:
 *       '200':
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID del usuario
 *                   example: "60b5f8a2c1a1e8d0c8f79a1b"
 *                 name:
 *                   type: string
 *                   description: Nombre del usuario
 *                   example: "Juan Pérez"
 *                 email:
 *                   type: string
 *                   description: Correo electrónico del usuario
 *                   example: "usuario@example.com"
 *       '404':
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Usuario no encontrado."
 *       '500':
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Error al obtener el usuario."
 */
router.get('/:id', userController.getUserById);

// Endpoint para actualizar un usuario por ID
/**
 * @openapi
 * /users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Actualiza un usuario por ID
 *     description: Permite actualizar la información de un usuario específico utilizando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID del usuario
 *           example: "60b5f8a2c1a1e8d0c8f79a1b"
 *     requestBody:
 *       description: Datos actualizados del usuario
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del usuario
 *                 example: "Juan Pérez"
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *                 example: "usuario@example.com"
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: "nuevaContraseña123"
 *     responses:
 *       '200':
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID del usuario
 *                   example: "60b5f8a2c1a1e8d0c8f79a1b"
 *                 name:
 *                   type: string
 *                   description: Nombre del usuario
 *                   example: "Juan Pérez"
 *                 email:
 *                   type: string
 *                   description: Correo electrónico del usuario
 *                   example: "usuario@example.com"
 *       '404':
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Usuario no encontrado."
 *       '400':
 *         description: Error en los datos de entrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Error al actualizar el usuario."
 */
router.put('/:id', userController.updateUser);

// Endpoint para eliminar un usuario por ID
/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Elimina un usuario por ID
 *     description: Elimina un usuario específico utilizando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID del usuario
 *           example: "60b5f8a2c1a1e8d0c8f79a1b"
 *     responses:
 *       '200':
 *         description: Usuario eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *                   example: "Usuario eliminado."
 *       '404':
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Usuario no encontrado."
 *       '500':
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Error al eliminar el usuario."
 */
router.delete('/:id', userController.deleteUser);

module.exports = router;
