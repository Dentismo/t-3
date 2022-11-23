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
  const [bookings, setBookings] = useState<Booking[]>(bookingsJson)
  const tab = searchParams.get('tab') || 'pending'
  const bookingsForTab = bookings.filter(
    (booking) => booking.state === tab
  ).length

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
        display: 'flex',
        minHeight: 'calc(100vh - 45px - 3rem)'
      }}
    >
      <Sideview />

      <Stack
        sx={{
          backgroundColor: 'rgb(220, 220, 220)',
          padding: 5,
          flexGrow: 1
        }}
        spacing={2}
      >
        <Stack>
          <Typography variant="h3">Welcome, Arbitrary Clinic!</Typography>
          {bookingsForTab === 0 ? (
            <Typography variant="h4" color="grey" mt={3}>
              Couldn't find any {tab} appointments :(
            </Typography>
          ) : (
            <Typography variant="h4">
              Displaying {bookingsForTab} {tab} apppointments
            </Typography>
          )}
        </Stack>
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
