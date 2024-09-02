const mongoose = require('mongoose'); // Importar mongoose para trabajar con MongoDB
const bcrypt = require('bcryptjs'); // Importar bcrypt para encriptar contraseñas
const jwt = require('jsonwebtoken'); // Importar jsonwebtoken para generar y verificar tokens

// Definir el esquema para el modelo de Usuario
const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Nombre del usuario
    email: { 
        type: String, 
        required: true, 
        unique: true, // Correo electrónico único para evitar duplicados
        lowercase: true // Convertir el correo electrónico a minúsculas
    },
    password: { type: String, required: true } 
});

// Método estático para encontrar un usuario por correo y contraseña
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('No se encontró el usuario'); // Usuario no encontrado
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Contraseña incorrecta'); // Contraseña incorrecta
    }

    return user; // Retornar el usuario si las credenciales son válidas
};

// Middleware para encriptar la contraseña antes de guardar
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) { // Verificar si la contraseña ha sido modificada
        this.password = await bcrypt.hash(this.password, 8); // Encriptar la contraseña
    }
    next(); // Continuar con el proceso de guardado
});

// Crear y exportar el modelo de Users
const User = mongoose.model('User', userSchema); 
module.exports = User; 
