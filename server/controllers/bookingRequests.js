var express = require('express');
var mqtt = require('mqtt');
var router = express.Router({ mergeParams: true });
var BookingRequest = require('../models/bookingRequest.js');


//Get BookingRequest by id
router.get('/:id', function(req, res, next) {
    var id = req.params.id
    BookingRequest.findById(id, function(err, BookingRequest) {
        if (err) { return next(err); }
        if (!BookingRequest) {
            return res.status(404).json({ 'message': 'Booking request was not found!' });
        }
        res.status(200).json(BookingRequest);
    });
});

//Update entire booking request
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    BookingRequest.findById(id, function(err, BookingRequest) {
        if (err) { return next(err); }
        if (!BookingRequest) {
            return res.status(404).json({ "message": "Booking request not found" });
        }
        BookingRequest.user_id = req.body.user_id
        BookingRequest.dentist_id = req.body.dentist_id
        BookingRequest.issuance = req.body.issuance
        BookingRequest.date = req.body.date
        BookingRequest.save();
        res.status(200).json(BookingRequest);
    });
});

//Update all/part of a booking request
router.patch('/:id', function(req, res, next) {
    var id = req.params.id;
    BookingRequest.findById(id, function(err, BookingRequest) {
        if (err) { return next(err); }
        if (!BookingRequest) {
            return res.status(404).json({ "message": "Booking request was not found" });
        }
        BookingRequest.user_id = (req.body.user_id || BookingRequest.user_id)
        BookingRequest.dentist_id = (req.body.dentist_id || BookingRequest.dentist_id)
        BookingRequest.issuance = (req.body.issuance || BookingRequest.issuance)
        BookingRequest.date = (req.body.date || BookingRequest.date)
        BookingRequest.save();
        res.status(200).json(BookingRequest);
    });
});

// Post a specific booking/appointement
router.post("/bookings", function(req, res, next) {
    var newBooking = new BookingRequest(req.body);

    newBooking.save(function(err, addBooking) {
        if (err) {
            return next(err);
        }

        res.status(201).json(addBooking)
    })
})

// Get all appointements
router.get("/bookings", async(req, res) => {
    BookingRequest.find().exec(function(err, result) {
        if (err) {
            return next(err);
        }

        if (!result) {
            return res.status(404).json({ "message": "Bookings not found" });
        }

        res.status(200).json(result);
    });
});

// Delete a specific booking
router.delete("/bookings/:id", async(req, res) => {
    const id = req.params.id;

    BookingRequest.findOneAndDelete({ _id: id }, function(err, booking) {
        if (err) {
            return next(err);
        }

        if (booking === null) {
            return res.status(404).json({ "message": "Booking doesn't exist" });
        }
    });
});