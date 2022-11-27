export type Booking = {
  id: string
  user: string
  reason: string
  date: string
  startTime: string
  endTime: string
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
