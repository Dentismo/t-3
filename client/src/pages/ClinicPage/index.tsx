import React, { useState } from 'react'
import { Stack, Typography } from '@mui/material'
import { Booking, OpenModalParams } from './types'
import BookingList from './BookingList'
import ConfirmationModal from './ConfirmationModal'
import bookingsJson from './bookings'

// TODO: use react context instead of nested state
// TODO: put type declarations into separate file
const DentistPage: React.FC = () => {
  const [onModalAccept, setOnModalAccept] = useState<Function>(() => {})
  const [modalTitle, setModalTitle] = useState<string>('')
  const [modalDescription, setModalDescription] = useState<string>('')
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const [bookings, setBookings] = useState<Booking[]>(bookingsJson)

  const pendingBookings: Booking[] = bookings.filter(
    (booking) => booking.state === 'pending'
  )
  const approvedBookings: Booking[] = bookings.filter(
    (booking) => booking.state === 'approved'
  )
  const deniedBookings: Booking[] = bookings.filter(
    (booking) => booking.state === 'denied'
  )

  const openModalWithParams = ({
    title,
    description,
    onAccept
  }: OpenModalParams) => {
    setOnModalAccept(() => onAccept)
    setModalTitle(title)
    setModalDescription(description)
    setModalOpen(true)
  }

  const setBookingState = (bookingId: Booking['id'], state: Booking['state']) =>
    setBookings(
      bookings.map((booking) =>
        booking.id === bookingId
          ? {
              ...booking,
              state
            }
          : booking
      )
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
      <BookingList
        bookings={pendingBookings}
        setBookingState={setBookingState}
        openModalWithParams={openModalWithParams}
      />
      <ConfirmationModal
        open={modalOpen}
        setOpen={setModalOpen}
        title={modalTitle}
        description={modalDescription}
        onAccept={onModalAccept}
      />
    </Stack>
  )
}

export default DentistPage
