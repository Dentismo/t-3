import { styled } from '@mui/material'
import Divider from '@mui/material/Divider'
import moment from 'moment'
import {Api} from '../../Api'
import { useSnackbar } from 'notistack'
import { useCallback, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import AppointmentModal from './AppointmentModal'
import ClinicCard from './ClinicCard'
import clinics from './clinics'
import { Booking } from './types'

const localizer = momentLocalizer(moment)

function ClinicPage() {
  //example clinic to help populate page without database
  const clinic = clinics[0]

  const [openModal, setOpenModal] = useState<boolean>(false)

  const { enqueueSnackbar } = useSnackbar()
  const screenWidth = window.matchMedia('all and (min-width: 767px)')

  //Maps: location of the clinic
  const apiKey = process.env.REACT_APP_API_KEY
  let location = clinic.address

  //fetch events from server
  const events: any[] | undefined = []

  //start and end times of clinic {Find way to do that for each day individually}
  const startTime = 8
  const endTime = 16
  const today = new Date()

  const [myEvents, setMyEvents] = useState(events)

  let [showDefaultText] = useState(false)

  const [start, setStart] = useState<Date>(new Date())
  const [end, setEnd] = useState<Date>(new Date())

  /**
   * Checks if the given slot is in the past,
   * if so it dissallows the form to open
   *
   * @param start date of the appointment
   * @param end date of the appointment
   * @returns message based on appointment success
   */
  const openForm = ({ start, end }: { start: Date; end: Date }) => {
    if (start < today) {
      return enqueueSnackbar('Cannot create Appointment for Past Date', {
        variant: 'error'
      })
    }

    //not working
    myEvents.forEach((element) => {
      if (element.start === start || element.end === end) {
        return enqueueSnackbar('Appointment not available', {
          variant: 'error'
        })
      }
    })
    setStart(start)
    setEnd(end)
    //open form (try catch - if error return)
    setOpenModal(true)
  }

  /**
   * Creation of the appointment after it was sent to the availability
   * checker. Also checks that the required fields are entered
   */
   const onAccept = useCallback(
    async (
      start: Date,
      end: Date,
      email: String,
      name: String,
      inssurance: String,
      details: String
    ) => {
      try {
        if (name === '' || email === '' || inssurance === '') {
          enqueueSnackbar('Fill out the required fields', {
            variant: 'error'
          })
          return false
        }
        //create booking
        const booking: Booking = {
          user: {
            email: email,
            name: name
          },
          clinicId: 'comes from website',
          issuance: inssurance,
          date: 'not sure how',
          state: 'pending',
          start: start.toString(),
          end: end.toString(),
          details: details
        }
        const success = await Api.post('request/booking', booking)

        if (success.data.user) {
          setMyEvents((prev) => [
            ...prev,
            {
              start: booking.start,
              end: booking.end
            }
          ])

          enqueueSnackbar('Appointment created Successfully', {
            variant: 'success'
          })
          setOpenModal(false)
          return true
        } else {
          //if the timeslot is not available for booking
          enqueueSnackbar('Timeslot was not available', {
            variant: 'error'
          })
          return false
        }
      } catch (error) {
        enqueueSnackbar('Could not create Appointment', { variant: 'error' })
        setOpenModal(false)
      }
    },
    [setMyEvents]
  )

  //if location is undefined or null, set default location
  if (location === undefined || location === null) {
    showDefaultText = true

    location = 'Spannmålsgatan 20'
  }

  // formatting of google maps query parameter
  // must replace space char for either '+' or '%20'
  if (location.includes(' ')) {
    location = location.replace(' ', '+')
  }

  const MainContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  })

  const CardMapContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    gap: '4rem',
    paddingBottom: '3rem',
    flexWrap: 'wrap'
  })

  const BoxShadowDiv = styled('div')({
    boxShadow:
      '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column'
  })

  return (
    <div>
      <MainContainer
        style={{
          backgroundColor: '#fffdf7',
          marginBottom: '0.75rem'
        }}
      >
        <div
          style={{
            height: '12rem',
            backgroundColor: '#22443d',
            width: '100%'
          }}
        ></div>
        <div
          style={{
            backgroundColor: 'white',
            marginTop: '0.5rem',
            padding: '1.5rem',
            width: '71%',
            boxShadow: '0px 0px 2px #888888'
          }}
        >
          <CardMapContainer>
            <ClinicCard clinic={clinic} />
            <BoxShadowDiv>
              <iframe
                title="google-map-element"
                style={{
                  border: 0,
                  width: '405px',
                  height: '290px'
                }}
                loading="lazy"
                src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${location}`}
              />
              <span
                style={{
                  display: showDefaultText ? '' : 'none',
                  padding: '0.5rem 0rem 0.5rem 0rem',
                  textAlign: 'center'
                }}
              >
                This is a default location, the clinic has not set a location
              </span>
            </BoxShadowDiv>
          </CardMapContainer>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <h1>Book an Appointment</h1>
            <Divider style={{ width: '88%', marginBottom: '1.5rem' }} />

            {screenWidth.matches ? (
              <Calendar
                localizer={localizer}
                events={myEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500, width: '88%' }}
                view={'week'}
                views={['week']}
                step={30}
                timeslots={1}
                selectable={true}
                onSelectSlot={openForm}
                min={
                  new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    startTime
                  )
                }
                max={
                  new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    endTime
                  )
                }
              />
            ) : (
              <Calendar
                localizer={localizer}
                events={myEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500, width: '88%' }}
                view={'day'}
                views={['day']}
                step={30}
                timeslots={1}
                selectable={true}
                onSelectSlot={openForm}
                min={
                  new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    startTime
                  )
                }
                max={
                  new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    endTime
                  )
                }
              />
            )}
            <AppointmentModal
              open={openModal}
              onAccept={onAccept}
              setOpen={setOpenModal}
              start={start}
              end={end}
            />
          </div>
        </div>
      </MainContainer>
    </div>
  )
}

export default ClinicPage
