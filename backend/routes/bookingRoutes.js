const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const bookingController = require("../controllers/bookingController");

//routes
router
    .route('/get-all-bookings')
    .get(authMiddleware, bookingController.getMyBookings);

router
    .route('/get-booking/:id')
    .get(authMiddleware, bookingController.getBookingById);


router
    .route('/book-trip')
    .post(authMiddleware, bookingController.bookTrip);

router
    .route('/cancel/:id')
    .delete(authMiddleware, bookingController.cancelBooking);

module.exports = router;