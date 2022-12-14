import { styled } from '@mui/material'
import Divider from '@mui/material/Divider'
import moment from 'moment'
import { useSnackbar } from 'notistack'
import { useCallback, useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { Api } from '../../Api'
import AppointmentModal from './AppointmentModal'
import ClinicCard from './ClinicCard'
import clinics from './clinics'
import { Booking, Clinic } from './types'
const mongoose = require('mongoose')

const localizer = momentLocalizer(moment)

function ClinicPage() {
  //access clinic id from the paramter
  const { pageId } = useParams()
  const navigate = useNavigate()

  const [clinic, setClinic] = useState<Clinic>(clinics[0])

  if (!mongoose.Types.ObjectId.isValid(pageId)) navigate('/404page')

  useEffect(() => {
    const queryClinic = async () => {
      const response = await Api.post(`/request/clinic/${pageId}`, {
        _id: pageId
      })

      setClinic(response.data)
      console.log(response.data)
    }

    queryClinic().catch((err) => console.log(err))
  }, [])

  const [openModal, setOpenModal] = useState<boolean>(false)

  const { enqueueSnackbar } = useSnackbar()
  const screenWidth = window.matchMedia('all and (min-width: 767px)')

  //Maps: location of the clinic
  const apiKey = process.env.REACT_APP_API_KEY
  let location = clinic.address
  const center = clinic.coordinate.latitude + ',' + clinic.coordinate.longitude

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
      inssurance: string,
      details: String
    ) => {
      try {
        //Check for the required fields. If they are empty, send a snackbar notification that the required fields must be filled.
        if (name === '' || email === '' || inssurance === '') {
          enqueueSnackbar('Fill out the required fields', {
            variant: 'error'
          })
          return false
        }
        //create booking
        const booking: Booking = {
          email: email,
          name: name,
          //ClinicId is taken from the url using useParams() from react. Clinic pages have an id associated with them in the router: clinic/:pageId
          clinicId: pageId ?? '',
          clinicName: clinic.name,
          issuance: parseInt(inssurance),
          //Format the date so it is ready for the availability checker to process the date.
          date:
            start.getUTCFullYear() +
            '/' +
            (start.getUTCMonth() + 1) +
            '/' +
            ('0' + start.getUTCDate()),
          state: 'pending',
          start: start.toString(),
          end: end.toString(),
          details: details
        }
        const id = Math.random().toString(36).substring(2, 7)
        const endpoint = `/request/availability/${id}`
        // console.log(`Sending POST request to ${endpoint} with payload:`)
        // console.log({ payload: booking })
        const success = await Api.post(endpoint, booking)

        //if the booking request is accepted by the availability checker....
        if (success.data.accepted) {
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
          //if the timeslot is not available for booking (accepted will have a value of false)
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
                src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${location}&center=${center}`}
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
