const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Manejar el inicio de sesión del usuario
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Verificar las credenciales del usuario (debe estar implementado en el modelo User)
        const user = await User.findByCredentials(email, password);

        // Crear un token JWT para el usuario autenticado
        const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Enviar el usuario y el token en la respuesta
        res.send({ user, token });
    } catch (error) {
        // En caso de error, enviar un mensaje de error
        res.status(400).send({ error: error.message });
    }
};

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
    try {
        // Normalizar el nombre del usuario a minúsculas para comparaciones case-insensitive
        const normalizedUserName = req.body.name.trim().toLowerCase();

        // Buscar si ya existe un usuario con un nombre similar
        const existingUser = await User.findOne({ name: new RegExp(`^${normalizedUserName}$`, 'i') });

        if (existingUser) {
            // Si el nombre de usuario ya está en uso, enviar un mensaje de que ya se usó
            return res.status(400).json({ message: 'El nombre de usuario ya está en uso.' });
        }

        // Si no existe un usuario con ese nombre, crear un nuevo usuario
        const user = new User(req.body);
        await user.save();
        // Enviar el usuario creado como respuesta 
        res.status(201).json(user);
    } catch (error) {
        // En caso de error, enviar un mensaje de error 
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
    try {
        // Obtener todos los usuarios de la base de datos
        const users = await User.find();
        // Enviar la lista de usuarios como respuesta 
        res.status(200).json(users);
    } catch (error) {
        // En caso de error, enviar un mensaje de error 
        res.status(500).json({ error: error.message });
    }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
    try {
        // Buscar un usuario por su ID proporcionado en los parámetros de la solicitud
        const user = await User.findById(req.params.id);
        if (!user) {
            // Si no se encuentra el usuario, enviar un mensaje de no encontrado
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        // Enviar el usuario encontrado como respuesta 
        res.status(200).json(user);
    } catch (error) {
        // En caso de error, enviar un mensaje de error
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un usuario por ID
exports.updateUser = async (req, res) => {
    try {
        // Buscar y actualizar el usuario por su ID con los datos del cuerpo de la solicitud
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            // Si no se encuentra el usuario, enviar un mensaje de no encontrado
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        // Enviar el usuario actualizado como respuesta 
        res.status(200).json(user);
    } catch (error) {
        // En caso de error, enviar un mensaje de error 
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un usuario por ID
exports.deleteUser = async (req, res) => {
    try {
        // Buscar y eliminar el usuario por su ID
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            // Si no se encuentra el usuario, enviar un mensaje de no encontrado
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        // Enviar un mensaje de éxito 
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        // En caso de error, enviar un mensaje de error 
        res.status(500).json({ error: error.message });
    }
};
