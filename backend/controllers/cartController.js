const cartModel = require("../models/cartModel");
const tripModel = require("../models/tripModel");

exports.addTripToCart = async (req, res) => {
    try {
        const { id, tripId } = req.body;

        if (!tripId) {
            return res.status(400).json({ message: 'User ID and Trip ID are required' });
        }

        // Check if the trip exists
        const trip = await tripModel.findById(tripId);
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        // Check if the cart exists for the user
        let cart = await cartModel.findOne({ user: id });
        if (!cart) {
            // Create a new cart if it doesn't exist
            cart = await cartModel.create({ user: id, trips: [tripId] });
            return res.status(201).json({
                message: 'Trip added to cart successfully',
                cart,
            });
        }

        // Check if the trip is already in the cart
        const tripExists = cart.trips.some(trip => trip.toString() === tripId);
        if (tripExists) {
            return res.status(400).json({ message: 'Trip already in cart' });
        }

        // Add the new trip to the cart
        cart.trips.push(tripId);
        await cart.save();

        res.status(201).json({
            status: 'success',
            message: 'Trip added to cart successfully',
            cart,
        });
    } catch (error) {
        console.error('Error adding trip to cart:', error);
        res.status(500).json({ message: 'An error occurred while adding the trip to the cart', error });
    }
};


exports.getCartItems = async (req, res) => {
    try{
        const { id } = req.body;
        const cart = await cartModel.findOne({ user: id }).populate('trips') || {};
        res.status(200).json({
            status: 'success',
            cart
        });
    } catch (error) {
        res.status(500).json({
            status: 'Error getting cart items',
            message: error
        });
    }
};

exports.removeCartItem = async (req, res) => {
    try{
        const id = req.params.id;
        const cart = await cartModel.findOne({ user: req.body.id });
        if(!cart){
            return res.status(404).json({
                status: 'error',
                message: 'Cart not found'
            });
        }

        await cartModel.updateOne(
            { user: req.body.id },
            { $pull: { trips: id } }
        );     

        res.status(200).json({
            status: 'success',
            message: 'Trip removed from cart successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'Error removing trip from cart',
            message: error
        });
    }
}