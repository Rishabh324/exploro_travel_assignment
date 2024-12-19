const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const tripController = require("../controllers/tripController");

//routes
router
    .route('/get-trip/:id')
    .get(tripController.getTripById);

router
    .route('/get-upcoming-trips')
    .get(tripController.getUpcomingTrips);

router
    .route('/create-trip')
    .post(authMiddleware, tripController.createTrip);

router
    .route('/get-my-organizings')
    .get(authMiddleware, tripController.getMyOrganizings);

router
    .route('/delete-my-organizings/:id')
    .delete(authMiddleware, tripController.deleteMyOrganizings);

router
    .route('/edit-trip/:id')
    .patch(authMiddleware, tripController.editTrip);

module.exports = router;