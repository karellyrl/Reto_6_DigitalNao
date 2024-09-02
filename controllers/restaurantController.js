const Restaurant = require('../models/restaurant');

// Obtener todos los restaurantes
exports.getAllRestaurants = async (req, res) => {
    try {
        // Buscar todos los restaurantes en la base de datos
        const restaurants = await Restaurant.find();
        // Enviar la lista de restaurantes 
        res.status(200).json(restaurants);
    } catch (error) {
        // En caso de error, enviar un mensaje de error
        res.status(500).json({ message: error.message });
    }
};

// Obtener un restaurante por ID
exports.getRestaurantById = async (req, res) => {
    try {
        // Buscar un restaurante por su ID proporcionado en los parámetros de la solicitud
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            // Si no se encuentra el restaurante, enviar un mensaje de no encontrado
            return res.status(404).json({ message: 'Restaurante no encontrado' });
        }
        // Enviar el restaurante encontrado 
        res.status(200).json(restaurant);
    } catch (error) {
        // En caso de error, enviar un mensaje de error 
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo restaurante
exports.createRestaurant = async (req, res) => {
    try {
        // Crear un nuevo objeto de restaurante usando los datos del cuerpo de la solicitud
        const restaurant = new Restaurant(req.body);
        // Guardar el nuevo restaurante en la base de datos
        await restaurant.save();
        // Enviar el restaurante creado 
        res.status(201).json(restaurant);
    } catch (error) {
        // En caso de error, enviar un mensaje de error
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un restaurante
exports.updateRestaurant = async (req, res) => {
    try {
        // Buscar y actualizar el restaurante por su ID con los datos del cuerpo de la solicitud
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!restaurant) {
            // Si no se encuentra el restaurante, enviar un mensaje de no encontrado
            return res.status(404).json({ message: 'Restaurante no encontrado' });
        }
        // Enviar el restaurante actualizado 
        res.status(200).json(restaurant);
    } catch (error) {
        // En caso de error, enviar un mensaje de error 
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un restaurante
exports.deleteRestaurant = async (req, res) => {
    try {
        // Buscar y eliminar el restaurante por su ID
        const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
        if (!restaurant) {
            // Si no se encuentra el restaurante, enviar un mensaje de no encontrado
            return res.status(404).json({ message: 'Restaurante no encontrado' });
        }
        // Enviar un mensaje de éxito 
        res.status(200).json({ message: 'Restaurante eliminado' });
    } catch (error) {
        // En caso de error, enviar un mensaje de error 
        res.status(500).json({ message: error.message });
    }
};

// Buscar y filtrar restaurantes
exports.searchRestaurants = async (req, res) => {
    try {
        const { name, cuisine, userLat, userLong } = req.query;
        
        // Construir el objeto de filtros basado en los parámetros de consulta
        let filter = {};
        if (name) {
            filter.name = { $regex: name, $options: 'i' }; // Búsqueda aproximada por nombre 
        }
        if (cuisine) {
            filter.cuisine = { $regex: cuisine, $options: 'i' }; // Búsqueda aproximada por tipo de comida 
        }

        // Consultar los restaurantes con los filtros aplicados
        let restaurants = await Restaurant.find(filter);

        // Ordenar los resultados por proximidad si se proporcionan coordenadas de usuario
        if (userLat && userLong) {
            restaurants = await Restaurant.aggregate([
                {
                    $geoNear: {
                        near: {
                            type: 'Point',
                            coordinates: [parseFloat(userLong), parseFloat(userLat)]
                        },
                        distanceField: 'distance',
                        maxDistance: 5000, // Filtrar dentro de un radio de 5 km
                        spherical: true
                    }
                },
                { $match: filter } // Aplicar los filtros adicionales después de la consulta geoespacial
            ]);
        }

        // Enviar los resultados de la búsqueda 
        res.status(200).json(restaurants);
    } catch (error) {
        // En caso de error, enviar un mensaje de error 
        res.status(500).json({ error: error.message });
    }
};
