const mongoose = require('mongoose'); // Importar mongoose 

// Definir el esquema para el modelo de Rating
const ratingSchema = new mongoose.Schema({
    restaurant: { 
        type: mongoose.Schema.Types.ObjectId, // Referencia al modelo Restaurant
        ref: 'Restaurant', 
        required: true 
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, // Referencia al modelo User
        ref: 'User', 
        required: true 
    },
    rating: { 
        type: Number, // Calificación numérica
        required: true 
    },
    date: { 
        type: Date, 
        default: Date.now // Fecha por defecto es la fecha actual
    }
});

// Crear y exportar el modelo de Ratings
const Rating = mongoose.model('Rating', ratingSchema); 
module.exports = Rating; 
