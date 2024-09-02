const mongoose = require('mongoose'); // Importar mongoose

// Definir el esquema del restaurante
const restaurantSchema = new mongoose.Schema({
    address: {
        building: String,
        coord: {
            type: [Number], // Coordenadas geográficas (DD)
            required: true,
            unique: true // Unicidad de coordenadas
        },
        street: String,
        zipcode: String
    },
    borough: String,
    cuisine: String,
    name: String,
    restaurant_id: {
        type: String,
        unique: true // ID único del restaurante
    },
    hours: {
        Monday: { type: String, default: '' },
        Tuesday: { type: String, default: '' },
        Wednesday: { type: String, default: '' },
        Thursday: { type: String, default: '' },
        Friday: { type: String, default: '' },
        Saturday: { type: String, default: '' },
        Sunday: { type: String, default: '' }
    }
});

// Crear y exportar el modelo de Restaurante
const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;
