const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const cartController = require("../controllers/cartController");
//routes
/**
 * @swagger
 * /get-cart-items:
 *   get:
 *     summary: Get all cart items for the authenticated user
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of items in the user's cart
 *       400:
 *         description: bad request
 *       401:
 *         description: invalid token
 *       500:
 *         description: Internal server error
 */
router
    .route('/get-cart-items')
    .get(authMiddleware, cartController.getCartItems);

/**
 * @swagger
 * /add-to-cart:
 *   post:
 *     summary: Add a trip to the user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             tripId:
 *               type: string
 *     responses:
 *       201:
 *         description: Trip added to cart successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Trip not found
 *       500:
 *         description: Internal server error
 */
router
    .route('/add-to-cart')
    .post(authMiddleware, cartController.addTripToCart);

/**
 * @swagger
 * /remove/{id}:
 *   delete:
 *     summary: Remove an item from the cart by its ID
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart item ID
 *     responses:
 *       200:
 *         description: Item removed from cart successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Cart item not found
 *       500:
 *         description: Internal server error
*/
router
    .route('/remove/:id')
    .delete(authMiddleware, cartController.removeCartItem);

module.exports = router;