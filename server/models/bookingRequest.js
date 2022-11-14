var mongoose = require("mongoose")
var Schema = mongoose.Schema

var bookingRequestSchema = new Schema({
user_id : {
    type: String, 
    minLength: 1,
    required: true, 
    match: [/^[0-9]*$/, 'Field may only contain numbers.']
},
dentist_id : {
    /*
    Type String for now as dentist schema exists on separate branch.
    type: Schema.Types.ObjectId,
    ref: 'Dentist',*/
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
}
});

module.exports = mongoose.model('BookingRequests', bookingRequestSchema)