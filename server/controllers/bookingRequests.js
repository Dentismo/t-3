const { response } = require('express');
const express = require('express');
const { nextTick } = require('process');
const bookingRequest = require('../models/bookingRequest.js');
router = express.Router();

// Post a specific booking/appointement
router.post("/bookings", function(req, res, next) {
    var newBooking = new bookingRequest(req.body);

    newBooking.save(function(err, addBooking) {
        if (err) {
            return next(err);
        }

        res.status(201).json(addBooking)
    })
})

// Get all appointements
router.get("/bookings", async(req, res) => {
    bookingRequest.find().exec(function(err, result) {
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

    bookingRequest.findOneAndDelete({ _id: id }, function(err, booking) {
        if (err) {
            return next(err);
        }

        if (booking === null) {
            return res.status(404).json({ "message": "Booking doesn't exist" });
        }

        res.status(200).json(booking)
    })
})