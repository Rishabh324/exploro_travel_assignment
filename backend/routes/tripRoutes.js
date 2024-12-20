const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const tripController = require("../controllers/tripController");

//routes
/**
 * @swagger
 * /get-trip/{id}:
 *   get:
 *     summary: Get details of a specific trip by its ID
 *     tags: [Trips]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Trip ID
 *     responses:
 *       200:
 *         description: Trip details retrieved successfully
 *       500:
 *         description: Internal server error
 */
router
    .route('/get-trip/:id')
    .get(tripController.getTripById);

/**
 * @swagger
 * /get-upcoming-trips:
 *   get:
 *     summary: Get a list of upcoming trips
 *     responses:
 *       200:
 *         description: List of upcoming trips
 *       500:
 *         description: Internal server error
 */
router
    .route('/get-upcoming-trips')
    .get(tripController.getUpcomingTrips);

/**
 * @swagger
 * /create-trip:
 *   post:
 *     summary: Create a new trip (organizers only)
 *     tags: [Trips]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tripName:
 *                 type: string
 *               tripDescription:
 *                 type: string
 *               tripDate:
 *                 type: string
 *                 format: date
 *               tripPrice:
 *                 type: number
 *               tripDuration:
 *                 type: number
 *               availableSlots:
 *                 type: number
 *     responses:
 *       201:
 *         description: Trip created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router
    .route('/create-trip')
    .post(authMiddleware, tripController.createTrip);

/**
 * @swagger
 * /get-my-organizings:
 *   get:
 *     summary: Get a list of trips organized by the authenticated user
 *     tags: [Trips]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of organized trips retrieved successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router
    .route('/get-my-organizings')
    .get(authMiddleware, tripController.getMyOrganizings);

/**
 * @swagger
 * /delete-my-organizings/{id}:
 *   delete:
 *     summary: Delete a trip organized by the authenticated user
 *     tags: [Trips]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Trip ID
 *     responses:
 *       200:
 *         description: Trip deleted successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router
    .route('/delete-my-organizings/:id')
    .delete(authMiddleware, tripController.deleteMyOrganizings);

/**
 * @swagger
 * /edit-trip/{id}:
 *   patch:
 *     summary: Edit details of a trip organized by the authenticated user
 *     tags: [Trips]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Trip ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tripName:
 *                 type: string
 *               tripDescription:
 *                 type: string
 *               tripDate:
 *                 type: string
 *                 format: date
 *               tripPrice:
 *                 type: number
 *               tripDuration:
 *                 type: number
 *               availableSlots:
 *                 type: number
 *             example:
 *               name: "Updated Beach Adventure"
 *               description: "An updated description of the beach trip"
 *               startDate: "2024-01-18"
 *               price: 600
 *               availableSlots: 15
 *     responses:
 *       200:
 *         description: Trip updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router
    .route('/edit-trip/:id')
    .patch(authMiddleware, tripController.editTrip);

module.exports = router;