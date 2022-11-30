export type Booking = {
  _id: string
  user: {
    email: string
    name: string
  }
  clinicId: string
  issuance: string
  date: string
  state: 'approved' | 'pending' | 'denied'
  start: string
  end: string
  reason: string
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
