import { Stack, Typography } from '@mui/material'
import React from 'react'
import BookingCard from './BookingCard'
import { Booking, BookingItem, BookingsMap } from './types'

type Props = {
  bookings: Booking[]
  openModalWithParams: Function
  setBookingState: (
    bookingId: Booking['_id'],
    state: Booking['state'] | 'deleted'
  ) => void
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
          <Stack key={bookings[0]._id} spacing={2}>
            <Typography
              variant="h5"
              sx={{
                textDecoration: 'underline'
              }}
            >
              Bookings for {date}:
            </Typography>
            {bookings
              .sort((b1, b2) =>
                b1.start > b2.start ? 1 : b1.start < b2.start ? -1 : 0
              )
              .map((booking, index) => (
                <BookingCard
                  openModalWithParams={openModalWithParams}
                  setBookingState={setBookingState}
                  booking={booking}
                  key={booking._id}
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
