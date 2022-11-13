import React from 'react'
import { Stack, Typography } from '@mui/material'
import { Booking } from './BookingCard'
import BookingList from './BookingList'

const DentistPage: React.FC = () => {
  const bookings: Booking[] = [
    {
      id: '1',
      user: 'Ansis Plepis',
      reason: 'idek how i got here',
      date: '28-12-2022',
      state: 'pending'
    },
    {
      id: '2',
      user: 'Ansis Plepis',
      reason: 'idek how i got here',
      date: '28-12-2022',
      state: 'pending'
    },
    {
      id: '3',
      user: 'Ivan Vidackovic',
      reason: 'special provisions for teeth health',
      date: '30-12-2022',
      state: 'pending'
    },
    {
      id: '4',
      user: 'Ansis Plepis',

      reason: 'idek how i got here either',
      date: '01-01-2023',
      state: 'pending'
    },
    {
      id: '5',
      user: 'Ansis Plepis',
      reason: 'idek how i got here either',
      date: '01-01-2023',
      state: 'denied'
    }
  ]

  const pendingBookings: Booking[] = bookings.filter(
    (booking) => booking.state === 'pending'
  )
  const approvedBookings: Booking[] = bookings.filter(
    (booking) => booking.state === 'approved'
  )
  const deniedBookings: Booking[] = bookings.filter(
    (booking) => booking.state === 'denied'
  )

  return (
    <Stack
      sx={{
        backgroundColor: 'rgb(220, 220, 220)',
        minHeight: '100vh',
        padding: 5
      }}
      spacing={2}
    >
      <Typography variant="h3">Welcome, Arbitrary Clinic!</Typography>
      <Typography variant="h4">Gaze upon your pending reviews:</Typography>
      <BookingList bookings={pendingBookings} />
    </Stack>
  )
}

export default DentistPage
