const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/tattler', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error de conexión:', err));

// Conexión a MongoDB con el cliente nativo
const client = new MongoClient('mongodb://localhost:27017');

// Esquema para la colección Restaurants
const restaurantSchema = new mongoose.Schema({
    address: {
        building: String,
        coord: {
            type: [Number],
            required: true,
            unique: true
        },
        street: String,
        zipcode: String
    },
    borough: String,
    cuisine: String,
    name: String,
    restaurant_id: {
        type: String,
        unique: true 
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

// Índices en la colección Restaurants
restaurantSchema.index({ name: 1 }); 
restaurantSchema.index({ cuisine: 1 }); 
restaurantSchema.index({ address: 1 }); 
restaurantSchema.index({ hours: 1 }); 
restaurantSchema.index({ restaurant_id: 1 }, { unique: true }); 
restaurantSchema.index({ 'address.coord': '2dsphere' }); 
restaurantSchema.index({ 'address.coord': 1 }); 

// Esquema para la colección Users
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true 
    },
    password: { type: String, required: true },
});

// Índices en la colección Users
userSchema.index({ name: 1 });
userSchema.index({ email: 1 });

// Esquema para la colección Comments
const commentSchema = new mongoose.Schema({
    restaurant: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Restaurant', 
        required: true 
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

// Índices en la colección Comments
commentSchema.index({ restaurant: 1 });
commentSchema.index({ author: 1 });

// Esquema para la colección Ratings
const ratingSchema = new mongoose.Schema({
    restaurant: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Restaurant', 
        required: true 
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    rating: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

// Índices en la colección Ratings
ratingSchema.index({ restaurant: 1 });
ratingSchema.index({ author: 1 });
ratingSchema.index({ rating: 1 });

// Modelos
const Restaurant = mongoose.model('Restaurant', restaurantSchema);
const User = mongoose.model('User', userSchema);
const Comment = mongoose.model('Comment', commentSchema);
const Rating = mongoose.model('Rating', ratingSchema);

async function createCollections() {
    try {
      // Conectar al cliente MongoDB
      await client.connect();
      const db = client.db('tattler');
  
      // Crear las colecciones
      await db.createCollection('restaurants');
      await db.createCollection('users');
      await db.createCollection('comments');
      await db.createCollection('ratings');
  
      console.log('Colecciones creadas exitosamente');
    } catch (err) {
      console.error('Error al crear colecciones:', err);
    } finally {
      // Cerrar la conexión del cliente
      await client.close();
      // Desconectar Mongoose
      await mongoose.disconnect();
    }
  }

// Creación de ejemplo de documentos en las colecciones
async function createData() {
  const restaurant = new Restaurant({
    address: {
        building: '437', 
        coord: [-73.975393, 40.757365],
        street: 'Madison Avenue', 
        zipcode: '10022'
    }, 
    borough: 'Manhattan', 
    cuisine: 'American', 
    name: 'Berkely', 
    restaurant_id: '40363685',
    hours: {
        Monday: "11:00 AM - 23:00 PM",
        Tuesday: "9:00 AM - 21:00 PM",
        Wednesday: "7:00 AM - 19:00 PM",
        Thursday: "8:00 AM - 20:00 PM",
        Friday: "10:00 AM - 19:00 PM",
        Saturday: "11:00 AM - 23:00 PM",
        Sunday: "11:00 AM - 20:00 PM"
    }
  });

  const savedRestaurant = await restaurant.save();

  console.log('Datos creados exitosamente');
}

createData()
createCollections()
  .then(() => mongoose.disconnect())
  .catch(err => console.error('Error al crear datos:', err));
