const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const cartController = require("../controllers/cartController");
//routes
router
    .route('/get-cart-items')
    .get(authMiddleware, cartController.getCartItems);

router
    .route('/add-to-cart')
    .post(authMiddleware, cartController.addTripToCart);

router
    .route('/remove/:id')
    .delete(authMiddleware, cartController.removeCartItem);

module.exports = router;