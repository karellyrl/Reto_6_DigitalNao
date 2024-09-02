const Rating = require('../models/rating');

// Crear un nuevo rating
exports.createRating = async (req, res) => {
    try {
        // Crear una instancia del modelo Rating con los datos del cuerpo de la solicitud
        const rating = new Rating(req.body);
        // Guardar el rating en la base de datos
        await rating.save();
        // Enviar el rating creado 
        res.status(201).json(rating);
    } catch (error) {
        // En caso de error, enviar un mensaje de error 
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los ratings de un restaurante específico
exports.getRatingsForRestaurant = async (req, res) => {
    try {
        // Buscar ratings asociados al restaurante especificado por el ID en los parámetros de la solicitud
        // Usar populate para incluir información del autor en los ratings
        const ratings = await Rating.find({ restaurant: req.params.restaurantId }).populate('author', 'name');
        // Enviar los ratings encontrados 
        res.status(200).json(ratings);
    } catch (error) {
        // En caso de error, enviar un mensaje de error 
        res.status(500).json({ error: error.message });
    }
};

// Obtener un rating específico por ID
exports.getRatingById = async (req, res) => {
    try {
        // Buscar un rating por su ID proporcionado en los parámetros de la solicitud
        // Usar populate para incluir información del autor en el rating
        const rating = await Rating.findById(req.params.id).populate('author', 'name');
        if (!rating) {
            // Si no se encuentra el rating, enviar un mensaje de no encontrado
            return res.status(404).json({ message: 'Rating no encontrado' });
        }
        // Enviar el rating encontrado 
        res.status(200).json(rating);
    } catch (error) {
        // En caso de error, enviar un mensaje de error
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un rating específico por ID
exports.updateRating = async (req, res) => {
    try {
        // Buscar y actualizar el rating por su ID con los datos del cuerpo de la solicitud
        const rating = await Rating.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!rating) {
            // Si no se encuentra el rating, enviar un mensaje de no encontrado
            return res.status(404).json({ message: 'Rating no encontrado' });
        }
        // Enviar el rating actualizado 
        res.status(200).json(rating);
    } catch (error) {
        // En caso de error, enviar un mensaje de error 
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un rating específico por ID
exports.deleteRating = async (req, res) => {
    try {
        // Buscar y eliminar el rating por su ID
        const rating = await Rating.findByIdAndDelete(req.params.id);
        if (!rating) {
            // Si no se encuentra el rating, enviar un mensaje de no encontrado
            return res.status(404).json({ message: 'Rating no encontrado' });
        }
        // Enviar un mensaje de éxito 
        res.status(200).json({ message: 'Rating eliminado' });
    } catch (error) {
        // En caso de error, enviar un mensaje de error
        res.status(500).json({ error: error.message });
    }
};
