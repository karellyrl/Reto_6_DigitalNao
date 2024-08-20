// models/restaurant.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const restaurantSchema = new mongoose.Schema({
    address: {
        building: String,
        coord: {
            type: [Number],
            required: true
        },
        street: String,
        zipcode: String
    },
    borough: String,
    cuisine: String,
    name: String,
    restaurant_id: String,
    hours: {
        Monday: { type: String, default: '' },
        Tuesday: { type: String, default: '' },
        Wednesday: { type: String, default: '' },
        Thursday: { type: String, default: '' },
        Friday: { type: String, default: '' },
        Saturday: { type: String, default: '' },
        Sunday: { type: String, default: '' }
    },
    comments: [commentSchema],
    rating: { type: Number, default: 0 }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;
