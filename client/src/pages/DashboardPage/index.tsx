import React, { useEffect, useState } from 'react'
import { Stack, Typography, Box } from '@mui/material'
import BookingList from './BookingList'
import ConfirmationModal from './ConfirmationModal'
import Sideview from './Sideview'
import { Api } from '../../Api'
import { useSearchParams } from 'react-router-dom'
import { Booking, Dentist, OpenModalParams } from './types'

// TODO: use react context instead of nested state
// TODO: put type declarations into separate file
// TODO: get bookings from backend
const DentistPage: React.FC = () => {
  const [onModalAccept, setOnModalAccept] = useState<Function>(() => {})
  const [modalTitle, setModalTitle] = useState<string>('')
  const [modalDescription, setModalDescription] = useState<string>('')
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [fetching, setFetching] = useState<boolean>(false)
  const loginId = localStorage.getItem('loginId')

  const [dentist, setDentist] = useState<Dentist>({
    _id: '',
    clinicId: '',
    name: '',
    username: '',
    password: '',
    email: '',
    token: ''
  })

  useEffect(() => {
    const queryClinic = async () => {
      const response = await Api.post(`/request/clinic/${loginId}`, {
        _id: loginId
      })
      setDentist(response.data)
      console.log(response.data)
    }

    const queryBookings = async () => {
      setFetching(true)
      const id = Math.random().toString(36).substring(2, 7)
      try {
        const fetchedBookings = await Api.post(
          `/request/booking-requests/${id}`, { clinicID: localStorage.getItem('clinicId') } /*{"clinicId":"1"}*/
        )
        setFetching(false)
        setBookings(
          (fetchedBookings.data as Booking[]).sort((b1, b2) =>
            b1.date > b2.date ? 1 : b1.date < b2.date ? -1 : 0
          )
        )
      } catch (err) {
        console.log(err)
      }
    }

    queryBookings()
    queryClinic().catch((err) => console.log(err))
  }, [loginId])

  const [searchParams] = useSearchParams() // updates state on query change
  const [bookings, setBookings] = useState<Booking[]>([])

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
  if (fetching) return <>Loading...</>

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: 'calc(100vh - 45px - 3rem)',
        boxShadow: 2,
      }}
    >
      <Sideview tab={tab} />

      <Stack
        sx={{
          backgroundColor: '#F9FFF',
          boxShadow: 2,
          padding: 5,
          flexGrow: 1,
          fontFamily: "'playfair-display'",
        }}
        spacing={2}
      >
   
        <Stack>
          <Typography variant="h3" font-weight="bold" fontFamily="'playfair-display'" sx={{color: '#51989A'}}>Welcome, {dentist.name}</Typography>
          {bookingsForTab === 0 ? (
            <Typography variant="h4" color="#696969" mt={3}>
              Sorry, we couldn't find any {tab} appointments :(
            </Typography>
          ) : (
            <Typography variant="h4" color="#696969" fontFamily="'playfair-display'">
              You have {bookingsForTab} {tab} apppointments
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
