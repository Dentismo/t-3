export type Booking = {
  _id: string
  user: {
    email: string
    name: string
  }
  clinicId: string
  clinicName: string
  issuance: string
  details: string
  date: string
  start: string
  end: string
  state: 'pending' | 'approved' | 'denied'
}

export type BookingsMap = {
  [date: string]: Booking[]
}

export type BookingItem = {
  date: string
  bookings: Booking[]
}

export type OpenModalParams = {
  title: string
  description: string
  onAccept: Function
}

export type Dentist = {
  _id: String
  name: String
  username: String
  password: String
  email: String
  clinicId: String
  token: String
}
