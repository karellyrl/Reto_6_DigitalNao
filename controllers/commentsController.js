const Comment = require('../models/comments');

// Crear un nuevo comentario 
exports.createComment = async (req, res) => {
    try {
        // Crear una instancia del modelo Comment con los datos del cuerpo de la solicitud
        const comment = new Comment(req.body);
        // Guardar el comentario en la base de datos
        await comment.save();
        // Enviar el comentario creado 
        res.status(201).json(comment);
    } catch (error) {
        // En caso de error, enviar un mensaje de error
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los comentarios de un restaurante específico
exports.getCommentsForRestaurant = async (req, res) => {
    try {
        // Buscar comentarios asociados al restaurante especificado por el ID en los parámetros de la solicitud
        // Usar populate para incluir información del autor en los comentarios
        const comments = await Comment.find({ restaurant: req.params.restaurantId }).populate('author', 'name');
        // Enviar los comentarios encontrados 
        res.status(200).json(comments);
    } catch (error) {
        // En caso de error, enviar un mensaje de error 
        res.status(500).json({ error: error.message });
    }
};

// Obtener un comentario específico por ID
exports.getCommentById = async (req, res) => {
    try {
        // Buscar un comentario por su ID proporcionado en los parámetros de la solicitud
        // Usar populate para incluir información del autor en el comentario
        const comment = await Comment.findById(req.params.id).populate('author', 'name');
        if (!comment) {
            // Si no se encuentra el comentario, enviar un mensaje de no encontrado
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }
        // Enviar el comentario encontrado 
        res.status(200).json(comment);
    } catch (error) {
        // En caso de error, enviar un mensaje de error 
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un comentario específico por ID
exports.updateComment = async (req, res) => {
    try {
        // Buscar y actualizar el comentario por su ID con los datos del cuerpo de la solicitud
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!comment) {
            // Si no se encuentra el comentario, enviar un mensaje de no encontrado
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }
        // Enviar el comentario actualizado 
        res.status(200).json(comment);
    } catch (error) {
        // En caso de error, enviar un mensaje de error 
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un comentario específico por ID
exports.deleteComment = async (req, res) => {
    try {
        // Buscar y eliminar el comentario por su ID
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) {
            // Si no se encuentra el comentario, enviar un mensaje de no encontrado
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }
        // Enviar un mensaje de éxito 
        res.status(200).json({ message: 'Comentario eliminado' });
    } catch (error) {
        // En caso de error, enviar un mensaje de error 
        res.status(500).json({ error: error.message });
    }
};
