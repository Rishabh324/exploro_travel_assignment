const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const bookingController = require("../controllers/bookingController");

//routes

/**
 * @swagger
 * /get-all-bookings:
 *   get:
 *     summary: Get all bookings for the authenticated user
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's bookings
 *       400:
 *         description: Bad request 
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router
    .route('/get-all-bookings')
    .get(authMiddleware, bookingController.getMyBookings);

/**
 * @swagger
 * /get-booking/{id}:
 *   get:
 *     summary: Get details of a specific booking by ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking details retrieved successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Internal server error
 */
router
    .route('/get-booking/:id')
    .get(authMiddleware, bookingController.getBookingById);

/**
 * @swagger
 * /book-trip:
 *   post:
 *     summary: Book a trip for the authenticated user
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               trip:
 *                 type: string
 *                 description: ID of the trip to book
 *               passengers:
 *                 type: array
 *                 description: List of passengers for the trip
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: Name of the passenger
 *                     age:
 *                       type: number
 *                       description: Age of the passenger
 *     responses:
 *       201:
 *         description: Trip booked successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Trip not found
 *       409:
 *         description: Conflict
 *       500:
 *         description: Internal server error
 */
router
    .route('/book-trip')
    .post(authMiddleware, bookingController.bookTrip);

/**
 * @swagger
 * /cancel/{id}:
 *   delete:
 *     summary: Cancel a booking by ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking cancelled successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Internal server error
 */
router
    .route('/cancel/:id')
    .delete(authMiddleware, bookingController.cancelBooking);

module.exports = router;