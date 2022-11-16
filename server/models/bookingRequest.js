var mongoose = require("mongoose")
var Schema = mongoose.Schema

var bookingRequestSchema = new Schema({
user_ID : {
    type: String, 
    minLength: 1,
    required: true, 
    match: [/^[0-9]*$/, 'Field may only contain numbers.']
},
clinic_ID : {
    /*
    Type String for now as clinic schema exists on separate branch.
    type: Schema.Types.ObjectId,
    ref: 'Clinic',*/
    type: String, 
    minLength: 1,
    required: true, 
    match: [/^[0-9]*$/, 'Field may only contain numbers.']
},
issuance : {
    type: String, 
    minLength: 1,
    maxLength: 13,
    required: true, 
    match: [/^[0-9]*$/, 'Field may only contain numbers.']
},
date : {
    type: Date, 
    required: true
},
state : {
    type: String,
    required: true, 
    default: 'pending',
    enum: ['approved','pending','denied']
}
});

module.exports = mongoose.model('BookingRequests', bookingRequestSchema)