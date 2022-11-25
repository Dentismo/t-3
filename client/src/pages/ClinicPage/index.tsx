import { styled } from '@mui/material'
import Divider from '@mui/material/Divider'
import React, { useCallback, useState } from 'react'
import { Calendar, momentLocalizer, SlotInfo } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useSnackbar } from 'notistack'
import Navbar from '../../components/Navbar'
import ClinicCard from './ClinicCard'
import clinics from './clinics'

const localizer = momentLocalizer(moment)

function ClinicPage() {
  //example clinic to help populate page without database
  const clinic = clinics[0]

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

  /**
   * Checks if the given slot is in the past,
   * if so it dissallows the form to open
   *
   * @param start date of the appointment
   * @param end date of the appointment
   * @returns message based on appointment success
   */
  const openForm = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      if (start < today) {
        console.log(start.getDate())
        return enqueueSnackbar('Cannot create Appointment for Past Date', {
          variant: 'error'
        })
      }

      //not working
      myEvents.forEach((element) => {
        console.log(element)

        if (element.start === start || element.end === end) {
          console.log(start, 'Halleluja')
          console.log(element.start)
          return enqueueSnackbar('Appointment not available', {
            variant: 'error'
          })
        }
      })

      //open form (try catch - if error return)
      try {
        setMyEvents((prev) => [
          ...prev,
          {
            start: start,
            end: end
          }
        ])
        enqueueSnackbar('Appointment created Successfully', {
          variant: 'success'
        })
      } catch (error) {
        enqueueSnackbar('Could not create Appointment', { variant: 'error' })
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
            backgroundColor: 'brown',
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
                  height: '280px'
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
          </div>
        </div>
      </MainContainer>
    </div>
  )
}

export default ClinicPage
