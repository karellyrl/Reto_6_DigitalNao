const mongoose = require('mongoose'); // Importar mongoose 

// Definir el esquema para los comentarios
const commentSchema = new mongoose.Schema({
    restaurant: { 
        type: mongoose.Schema.Types.ObjectId, // Referencia al modelo Restaurant
        ref: 'Restaurant', 
        required: true // Campo obligatorio
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, // Referencia al modelo User
        ref: 'User', 
        required: true // Campo obligatorio
    },
    comment: { type: String, required: true }, // Texto del comentario
    date: { type: Date, default: Date.now } // Fecha del comentario, por defecto es la fecha actual
});

// Crear y exportar el modelo de Comments
const Comment = mongoose.model('Comment', commentSchema); 
module.exports = Comment; 
