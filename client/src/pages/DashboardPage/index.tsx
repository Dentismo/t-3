import React, { useState } from 'react'
import { Stack, Typography, Box } from '@mui/material'
import { Booking, OpenModalParams } from './types'
import BookingList from './BookingList'
import ConfirmationModal from './ConfirmationModal'
import bookingsJson from './bookings'
import Sideview from './Sideview'
import { useSearchParams } from 'react-router-dom'

// TODO: use react context instead of nested state
// TODO: put type declarations into separate file
// TODO: get bookings from backend
const DentistPage: React.FC = () => {
  const [onModalAccept, setOnModalAccept] = useState<Function>(() => {})
  const [modalTitle, setModalTitle] = useState<string>('')
  const [modalDescription, setModalDescription] = useState<string>('')
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const [searchParams] = useSearchParams() // updates state on query change
  const tab = searchParams.get('tab') || 'pending'
  const [bookings, setBookings] = useState<Booking[]>(bookingsJson)

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
    <Box
      sx={{
        display: 'flex'
      }}
    >
      <Sideview />

      <Stack
        sx={{
          backgroundColor: 'rgb(220, 220, 220)',
          minHeight: '100vh',
          padding: 5,
          flexGrow: 1
        }}
        spacing={2}
      >
        <Typography variant="h3">Welcome, Arbitrary Clinic!</Typography>
        <Typography variant="h4">Gaze upon your {tab} appointments:</Typography>
        <BookingList
          bookings={bookings.filter((booking) => booking.state === tab)}
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
    </Box>
  )
}

export default DentistPage
