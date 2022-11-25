import { Clinic } from "./types";

const clinics: Clinic[] = [
    {
        name: "Georg's Dentist Clinic",
        dentist: 3, 
        owner: 'Georg', 
        address: 'Nordstan', 
        city: 'Gothenburg', 
        coordinate: {
            latitude: '',
            longitutde: ''
        }, 
        openinghours: {
            monday: {
                start: 8,
                end: 17
            },
            tuesday: {
                start: 8,
                end: 16
            },
            wednesday: {
                start: 6,
                end: 15
            },
            thursday: {
                start: 8,
                end: 18
            },
            friday: {
                start: 8,
                end: 12
            },
        } 
    }
]

export default clinics