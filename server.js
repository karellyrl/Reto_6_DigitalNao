const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const restaurantRoutes = require('./routes/restaurantRoutes');
const userRoutes = require('./routes/userRoutes');  // Añade esto

// Middleware
app.use(express.json());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/TattlerDB', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Usar las rutas con el prefijo '/api'
app.use('/api', restaurantRoutes);
app.use('/api', userRoutes);  // Añade esto

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
