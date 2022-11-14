var express = require('express');
var mqtt = require('mqtt');
var router = express.Router({mergeParams: true});
var BookingRequest = require('../models/bookingRequest');


//Get bookingRequest by id
router.get('/:id', function(req, res, next) {
    var id = req.params.id
    BookingRequest.findById(id, function(err, bookingRequest) {
        if (err) { return next(err); }
        if (!bookingRequest) {
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
        if (!bookingRequest) {
            return res.status(404).json({"message": "Booking request not found"});
        }
        var date = req.body.date
        var user_id = req.body.user_id
        var issuance = req.body.issuance
        var dentist_id = req.body.dentist_id
        if (!(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/.test(date))){
            return res.json({"message": "Date must be in DD-MM-YYYY format"});
        } else if (date === null) {
            return res.json({"message": "Date is required"});
        } else {
        bookingRequest.user_id = user_id
        bookingRequest.dentist_id = dentist_id
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
            return res.status(404).json({"message": "Booking request was not found"});
        }
        bookingRequest.user_id = (req.body.user_id || bookingRequest.user_id)
        bookingRequest.dentist_id = (req.body.dentist_id || bookingRequest.dentist_id)
        bookingRequest.issuance = (req.body.issuance || bookingRequest.issuance)
        bookingRequest.date = (req.body.date || bookingRequest.date)
        bookingRequest.save();
        res.status(200).json(bookingRequest);
    });
});

module.exports=router;