var express = require('express');
var router = express.Router({mergeParams: true});
var BookingRequest = require('../models/bookingRequest');

//Get bookingRequest by id
router.get('/:id', function(req, res, next) {
    var id = req.params.id
    BookingRequest.findById(id, function(err, bookingRequest) {
        if (err) { return next(err); }
        if (bookingRequest === null) {
            return res.status(404).json({'message': 'Booking request was not found!'});
        }
        res.status(200).json(bookingRequest);
    });
});

//Update entire booking request
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    BookingRequest.findById(id, function(err, bookingRequest) {
        if (err) { return next(err); }
        if (bookingRequest == null) {
            return res.status(404).json({"message": "Booking request not found"});
        }
        bookingRequest.request_id = req.body.request_id
        bookingRequest.user_id = req.body.user_id
        bookingRequest.dentist_id = req.body.dentist_id
        bookingRequest.issuance = req.body.issuance
        bookingRequest.date = Date.now()
        bookingRequest.save();
        res.status(200).json(bookingRequest);
    });
});

