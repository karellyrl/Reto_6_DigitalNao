// /middleware/authenticate.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = async (req, res, next) => {
    try {
        // Obtener el token de la cabecera 'Authorization'
        const token = req.header('Authorization').replace('Bearer ', '');
        
        // Verificar el token y decodificarlo
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        
        // Buscar el usuario asociado al ID decodificado
        const user = await User.findById(decoded._id);

        if (!user) {
            throw new Error('Usuario no encontrado.');
        }

        // Añadir usuario y token a la solicitud
        req.user = user;
        req.token = token; 
        
        next();
    } catch (error) {
        res.status(401).send({ error: 'Autenticación requerida.' });
    }
};

module.exports = authenticate;
