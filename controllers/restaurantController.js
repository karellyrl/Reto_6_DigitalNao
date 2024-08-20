const Restaurant = require('../models/restaurant');
const User = require('../models/user');

// Crear un nuevo restaurante
exports.createRestaurant = async (req, res) => {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.send(restaurant);
};

// Obtener todos los restaurantes
exports.getAllRestaurants = async (req, res) => {
    const restaurants = await Restaurant.find();
    res.send(restaurants);
};

// Obtener un restaurante por ID
exports.getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id)
            .populate('comments.author', 'name email');  // Poblamos el autor con los campos name y email
        res.send(restaurant);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving restaurant', error });
    }
};


// Actualizar un restaurante
exports.updateRestaurant = async (req, res) => {
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(restaurant);
};

// Eliminar un restaurante
exports.deleteRestaurant = async (req, res) => {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.send({ message: 'Restaurant deleted' });
};

// Añadir un comentario a un restaurante
exports.addComment = async (req, res) => {
    try {
        // Buscar el restaurante por ID
        const restaurant = await Restaurant.findById(req.params.id);

        // Verificar si el restaurante existe
        if (!restaurant) {
            return res.status(404).send({ message: 'Restaurant not found' });
        }

        // Verificar si el usuario existe
        const user = await User.findById(req.body.userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Añadir el comentario con referencia al usuario
        restaurant.comments.push({
            author: user._id,
            comment: req.body.comment
        });

        // Guardar el restaurante actualizado
        await restaurant.save();
        res.send(restaurant);
    } catch (error) {
        res.status(500).send({ message: 'Error adding comment', error });
    }
};

// Calificar un restaurante
exports.rateRestaurant = async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id);
    restaurant.rating = req.body.rating;
    await restaurant.save();
    res.send(restaurant);
};
