const bookingModel = require("../models/bookingModel");
const paymentModel = require("../models/paymentModel");
const tripModel = require("../models/tripModel");

exports.getUpcomingTrips = async (req, res) => {
    try{
        console.log(new Date());
        const trips = await tripModel.find({
            tripDate: { $gt: new Date() }, 
            availableSlots: {$gt: 0}
        });
        res.status(200).json({
            status: 'success',
            results: trips.length,
            data: {
                trips
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'Internal Server Error',
            message: error
        });
    }
};

exports.getTripById = async (req, res) => {
    try{
        const { id } = req.params;
        const trip = await tripModel.findById(id).populate('organizer');
        res.status(200).json({
            status: 'success',
            trip
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'Internal Server Error',
            message: error
        });
    }
}

// exports.getUpcomingTrips = async (req, res) => {
//     try {
//         const trips = await tripModel.find({ tripDate: { $gt: new Date() } });
//         res.status(200).json({
//             status: 'success',
//             results: trips.length,
//             data: {
//                 trips,
//             },
//         });
//     } catch (err) {
//         res.status(500).json({
//             status: 'error',
//             message: 'Failed to retrieve trips',
//         });
//     }    
// };

exports.createTrip = async (req, res) => {
    try {
        req.body.organizer = req.body.id;
        await tripModel.create(req.body);
        res.status(201).json({
            status: 'success',
        });
    } catch (error) {
        res.status(500).json({
            status: 'Internal Server Error',
            message: error
        });
    }
};

exports.getMyOrganizings = async (req, res) => {
    try{
        console.log(req.body.id);
        const trips = await tripModel.find({ organizer: req.body.id});
        console.log(trips);
        res.status(200).json({
            status: 'success',
            results: trips.length,
            trips
        });
    } catch (error) {
        res.status(500).json({
            status: 'Internal Server Error',
            message: error
        });
    }
}

exports.editTrip = async (req, res) => {
    try{
        const { id } = req.params;
        await tripModel.findByIdAndUpdate(id, req.body);
        res.status(200).json({
            status: 'success',
            message: 'Trip updated successfully'
        });
    }
    catch(error){
        res.status(500).json({
            status: 'Internal Server Error',
            message: error
        });
    }
}

exports.deleteMyOrganizings = async (req, res) => {
    try{
        const { id } = req.params;
        const trip = await tripModel.findById(id);
        trip.status = 'CANCELLED';
        await trip.save();

        const bookings = await bookingModel.find({ trip: id });
        bookings.forEach(async (booking) => {
            booking.status = 'CANCELLED';
            await booking.save();
        });

        const payments = await paymentModel.find({ trip: id, status: 'SUCCESS' });
        payments.forEach(async (payment) => {
            payment.status = 'REFUNDED';
            payment.amountRefunded = payment.amount;
            await payment.save();
        });

        res.status(200).json({
            status: 'success',
            message: 'Trip deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'Internal Server Error',
            message: error
        });
    }
}