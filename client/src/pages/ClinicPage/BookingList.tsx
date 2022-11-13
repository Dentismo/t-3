import React, { Dispatch, SetStateAction } from 'react'
import BookingCard, { Booking } from './BookingCard'
import { Stack, Typography } from '@mui/material'

type Props = {
  bookings: Booking[]
  openModalWithParams: Function
  setBookingState: (bookingId: Booking['id'], state: Booking['state']) => void
}

type BookingsMap = {
  [date: string]: Booking[]
}

type BookingItem = {
  date: string
  bookings: Booking[]
}

/**
 * Component for displaying a list of bookings. Bookings will be separated by their dates, under which all the bookings corresponding to that date will be displayed.
 * @param props.bookings Array of `Booking` objects to be displayed
 * @returns
 */
const BookingList: React.FC<Props> = ({
  bookings,
  openModalWithParams,
  setBookingState
}) => {
  const bookingsMap: BookingsMap = {}
  bookings.forEach((booking) => {
    const { date } = booking
    const bookingsOnDate = bookingsMap[date]
    if (bookingsOnDate) return bookingsOnDate.push(booking) // if key exists, push onto arr
    bookingsMap[date] = [booking] // else initialize arr with current booking
  })

  const bookingsArray: BookingItem[] = []
  for (const x in bookingsMap) {
    bookingsArray.push({
      date: x,
      bookings: bookingsMap[x]
    })
  }

  const sharpRadius = '4px'
  const smoothRadius = '10px'
  const createBorderRadius = (index: number, arrLength: number) => {
    if (index === 0) {
      if (arrLength === 1)
        return `${smoothRadius} ${smoothRadius} ${smoothRadius} ${smoothRadius}`
      return `${smoothRadius} ${smoothRadius} ${sharpRadius} ${sharpRadius}`
    }
    if (index === arrLength - 1) {
      return `${sharpRadius} ${sharpRadius} ${smoothRadius} ${smoothRadius}`
    }
  }

  return (
    <Stack spacing={3}>
      {bookingsArray.map((item: BookingItem) => {
        const { date, bookings } = item
        return (
          <Stack key={bookings[0].id} spacing={2}>
            <Typography
              variant="h5"
              sx={{
                textDecoration: 'underline'
              }}
            >
              Bookings for {date}:
            </Typography>
            {bookings.map((booking, index) => (
              <BookingCard
                openModalWithParams={openModalWithParams}
                setBookingState={setBookingState}
                booking={booking}
                key={booking.id}
                sx={{
                  borderRadius: createBorderRadius(index, bookings.length)
                }}
              />
            ))}
          </Stack>
        )
      })}
    </Stack>
  )
}

export default BookingList
