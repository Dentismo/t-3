export type Booking = {
  id: string
  user: {
    email: string,
    name: string
  },
  clinicId: string
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
