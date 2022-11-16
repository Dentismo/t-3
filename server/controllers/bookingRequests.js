var express = require('express');
var mqtt = require('mqtt');
var router = express.Router({ mergeParams: true });
var BookingRequest = require('../models/BookingRequest');


//Get BookingRequest by id
router.get('/:id', function(req, res, next) {
    var id = req.params.id
    BookingRequest.findById(id, function(err, bookingRequest) {
        if (err) { return next(err); }
        if (!bookingRequest) {
            return res.status(404).json({ 'message': 'Booking request was not found!' });
        }
        res.status(200).json(bookingRequest);
    });
});

//Update entire booking request
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    BookingRequest.findById(id, function(err, bookingRequest) {
        if (err) { return next(err); }
        if (!bookingRequest) {
            return res.status(404).json({ "message": "Booking request not found" });
        }
        var date = req.body.date
        var user_id = req.body.user_id
        var issuance = req.body.issuance
        var clinic_id = req.body.clinic_id
        if (!(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/.test(date))){
            return res.json({"message": "Date must be in DD-MM-YYYY format"});
        } else if (date === null) {
            return res.json({"message": "Date is required"});
        } else {
        bookingRequest.user_id = user_id
        bookingRequest.clinic_id = clinic_id
        bookingRequest.issuance = issuance
        bookingRequest.date = date
        bookingRequest.save();
        res.status(200).json(bookingRequest);
        }
    });
});

//Update all/part of a booking request
router.patch('/:id', function(req, res, next) {
    var id = req.params.id;
    BookingRequest.findById(id, function(err, bookingRequest) {
        if (err) { return next(err); }
        if (!bookingRequest) {
            return res.status(404).json({ "message": "Booking request was not found" });
        }
        bookingRequest.user_id = (req.body.user_id || bookingRequest.user_id)
        bookingRequest.clinic_id = (req.body.clinic_id || bookingRequest.clinic_id)
        bookingRequest.issuance = (req.body.issuance || bookingRequest.issuance)
        bookingRequest.date = (req.body.date || bookingRequest.date)
        bookingRequest.save();
        res.status(200).json(bookingRequest);
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

module.exports = router;