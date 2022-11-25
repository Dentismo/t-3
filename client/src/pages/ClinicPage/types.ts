export type Clinic = {
    name: String,
    dentist: Number,
    owner: String,
    address: String, 
    city: String, 
    coordinate: {
        latitude: String,
        longitutde: String
    },
    openinghours: {
        monday: {
            start: Number,
            end: Number
        },
        tuesday: {
            start: Number,
            end: Number
        },
        wednesday: {
            start: Number,
            end: Number
        },
        thursday: {
            start: Number,
            end: Number
        },
        friday: {
            start: Number,
            end: Number
        },
    }
}