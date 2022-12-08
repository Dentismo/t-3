export type Clinic = {
  name: String
  dentist: Number
  owner: String
  address: String
  city: String
  _id?: String
  coordinate: {
    latitude: String
    longitutde: String
  }
  openinghours: {
    monday: {
      start: Number
      end: Number
    }
    tuesday: {
      start: Number
      end: Number
    }
    wednesday: {
      start: Number
      end: Number
    }
    thursday: {
      start: Number
      end: Number
    }
    friday: {
      start: Number
      end: Number
    }
  }
}

export type Booking = {
  user: {
    email: String
    name: String
  }
  clinicName: String
  clinicId: String
  issuance: String
  date: String
  state: 'approved' | 'pending' | 'denied'
  start: String
  end: String
  details: String
}
