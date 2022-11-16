var mongoose = require("mongoose")
var Schema = mongoose.Schema

var bookingRequestSchema = new Schema({
user_id : {
    type: String, 
    minLength: 1,
    required: true, 
    match: [/^[0-9]*$/, 'Field may only contain numbers.']
},
clinic_id : {
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
}
/* Add state e.g approved, pending, denied */
});

module.exports = mongoose.model('BookingRequests', bookingRequestSchema)