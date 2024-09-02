require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env
const mongoose = require('mongoose'); // Importar mongoose para manejar la conexión con MongoDB

const connectDB = async () => {
    try {
        // Intentar conectar a la base de datos MongoDB
        await mongoose.connect('mongodb://localhost:27017/TattlerDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB conectado exitosamente'); // Confirmación de conexión exitosa
    } catch (error) {
        console.error('Error conectando con MongoDB:', error.message); // Mostrar mensaje de error
        process.exit(1); // Terminar el proceso si hay un error de conexión
    }
};

module.exports = connectDB; // Exportar la función para usar en otros módulos
