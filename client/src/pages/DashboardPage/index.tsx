import React, { useEffect, useState } from 'react'
import { Stack, Typography, Box } from '@mui/material'
import { Booking, OpenModalParams } from './types'
import BookingList from './BookingList'
import ConfirmationModal from './ConfirmationModal'
import bookingsJson from './bookings'
import Sideview from './Sideview'
import { useSearchParams } from 'react-router-dom'
import { Api } from '../../Api'
import clinics from '../ClinicPage/clinics'
import { Dentist } from './types'

// TODO: use react context instead of nested state
// TODO: put type declarations into separate file
// TODO: get bookings from backend
const DentistPage: React.FC = () => {
  const [onModalAccept, setOnModalAccept] = useState<Function>(() => {})
  const [modalTitle, setModalTitle] = useState<string>('')
  const [modalDescription, setModalDescription] = useState<string>('')
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const loginId = localStorage.getItem('loginId')

  const [dentist, setDentist] = useState<Dentist>({
    _id: "",
    clinicId: "",
    name: "",
    username: "",
    password: "",
    email: "",
    token: ""
  })

  useEffect(() => {
    const queryClinic = async () => {
      const response = await Api.post(`/request/clinic/${loginId}`, {
        _id: loginId
      })
      setDentist(response.data)
      console.log(response.data)
    }

    queryClinic().catch((err) => console.log(err))
  }, [])

  const [searchParams] = useSearchParams() // updates state on query change
  const [bookings, setBookings] = useState<Booking[]>(
    bookingsJson.sort((b1, b2) =>
      b1.date > b2.date ? 1 : b1.date < b2.date ? -1 : 0
    )
  )
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

  const setBookingState = (
    bookingId: Booking['_id'],
    state: Booking['state'] | 'deleted'
  ) =>
    setBookings(
      state === 'deleted'
        ? bookings.filter((booking) => booking._id !== bookingId)
        : bookings.map((booking) =>
            booking._id === bookingId
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
      <Sideview tab={tab} />

      <Stack
        sx={{
          backgroundColor: 'rgb(220, 220, 220)',
          padding: 5,
          flexGrow: 1
        }}
        spacing={2}
      >
        <Stack>
          <Typography variant="h3">Welcome, {dentist.name}</Typography>
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
