const bookingModel = require("../models/bookingModel");
const tripModel = require("../models/tripModel");
const paymentModel = require("../models/paymentModel");

exports.getMyBookings = async (req, res) => {
    try {
        const bookings = await bookingModel.find({ user: req.body.id }).populate('trip');
        res.status(200).json({
            status: 'success',
            results: bookings.length,
            bookings,
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve bookings',
        });
    }
};

exports.getBookingById = async (req, res) => {
    try {
        const booking = await bookingModel.findById(req.params.id).populate('trip');
        if (!booking) {

            return res.status(404).json({ status: 'NotFound', message: 'Booking not found' });
        }
        res.status(200).json({
            status: 'success',
            booking,
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',  
            message: 'Failed to retrieve booking',
        });
    }
};

exports.bookTrip = async (req, res) => {
  try {
    const { postData } = req.body;
    const booking = await bookingModel.create({
      user: postData.user,
      trip: postData.trip,
      passengers: postData.passengers,
      bookingDate: new Date(),
    });
    await booking.save();
    
    const tripData = await tripModel.findById(postData.trip);
    if (!tripData){
      await bookingModel.findByIdAndDelete(booking._id);
      return res.status(404).json({
        status: 'NotFound',
        message: 'Trip not found',
      });
    }

    const slotsToBook = postData.passengers.length;
    if (tripData.availableSlots < slotsToBook) {
      return res.status(400).json({
        status: 'NoSlots',
        message: 'No slots available for booking',
      });
    }

    tripData.availableSlots -= slotsToBook;

    await tripData.save();

    const paymentAmount = tripData.tripPrice * slotsToBook;
    const payment = await paymentModel.create({
      user: postData.user,
      trip: postData.trip,
      amount: paymentAmount,
      status: 'SUCCESS',
    });

    await payment.save();

    
    if (payment.status === 'FAILED') {
      trip.availableSlots += slotsToBook;
      await trip.save();
      await bookingModel.findByIdAndDelete(booking._id);

      return res.status(400).json({
        message: 'Payment failed. Please try again.',
        status: 'PaymentFailed',
      });
    }

    booking.status = 'CONFIRMED';
    await booking.save();
    
    res.status(201).json({
      message: 'Booking successful with payment.',
      status: 'success',
      booking,
      payment,
    });
  } catch (error) {
    if (error.name === 'VersionError') {
      return res.status(409).json({
        status: 'ExpiredData',
        message: 'Some Error occured. Please try again.',
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Failed to book trip',
    });
  }
};

exports.cancelBooking = async (req, res) => {
    try {
        const booking = await bookingModel.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({
                status: 'NotFound',
                message: 'Booking not found',
            });
        }

        const tripData = await tripModel.findById(booking.trip);
        if (!tripData) {
            return res.status(404).json({
                status: 'NotFound',
                message: 'Trip not found',
            });
        }

        const slotsToCancel = booking.passengers.length;
        tripData.availableSlots += slotsToCancel;
        await tripData.save();

        const payment = await paymentModel.findOne({ trip: booking.trip, user: booking.user });
        if (!payment) {
            return res.status(404).json({
                status: 'NotFound',
                message: 'Payment not found',
            });
        }

        const currentDate = new Date();
        const tripStartDate = new Date(tripData.tripDate);
        
        const msPerDay = 24 * 60 * 60 * 1000;
        const daysBeforeStart = Math.floor((tripStartDate - currentDate) / msPerDay);

        let refundPercentage = 0;
        if (daysBeforeStart >= 15) {
          refundPercentage = 100;
        } else if (daysBeforeStart >= 7) {
          refundPercentage = 50;
        } else {
          refundPercentage = 0;
        }
          
        payment.status = 'REFUNDED';
        payment.refundAmount = (payment.amount * refundPercentage) / 100;
        
        await payment.save();

        booking.status = 'CANCELLED';
        booking.amountRefunded = payment.refundAmount;
        await booking.save();

        res.status(200).json({
            status: 'success',
            message: 'Booking cancelled successfully',
            refundAmount: payment.refundAmount
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to cancel booking',
        });
    }
}