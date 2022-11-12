import { Card, CardContent, CardHeader, styled } from '@mui/material'
import React from 'react'
import { Calendar, momentLocalizer, SlotInfo } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useSnackbar } from 'notistack'

const localizer = momentLocalizer(moment)

function ClinicPage() {
  const { enqueueSnackbar } = useSnackbar()
  const cardContent = 'sifsd'
  const cardTitle = 'Dentist Clinic Title'
  const apiKey = 'AIzaSyDwRByjwDc9rECZ8631Up2NHGFbuk-1qE0'
  let location = 'Spannmålsgatan 20'
  const myEventsList: any[] | undefined = []
  const startTime = 8
  const endTime = 16
  const today = new Date()

  /**
   * Checks if the given slot is in the past,
   * if so it dissallows the form to open
   *
   * @param slotSelected by user in the calendar
   * @returns message about wether the booking was
   * successfully booked or not
   */
  const openForm = (slotSelected: SlotInfo) => {
    if (slotSelected.start < today) {
      console.log(slotSelected.start.getDate())
      return enqueueSnackbar('Cannot create Appointment for Past Date', {
        variant: 'error'
      })
    }

    //open form (try catch - if error return)
    try {
      console.log(slotSelected)
      enqueueSnackbar('Appointment created Successfully', {
        variant: 'success'
      })
    } catch (error) {
      enqueueSnackbar('Could not create Appointment', { variant: 'error' })
    }

    console.log(slotSelected)
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
    borderRadius: '4px'
    //border: '0.1px solid #d1d0cd'
  })

  return (
    <MainContainer>
      <div
        style={{
          height: '12rem',
          backgroundColor: 'brown',
          width: '100vw'
        }}
      >
        Here
      </div>
      <div style={{ padding: '2rem', width: '80%' }}>
        <CardMapContainer>
          <Card
            sx={{
              width: '600px',
              height: '280px'
            }}
          >
            <CardHeader title={cardTitle}></CardHeader>
            <CardContent> {cardContent} </CardContent>
          </Card>
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
          </BoxShadowDiv>
        </CardMapContainer>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Calendar
            localizer={localizer}
            events={myEventsList}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500, width: '88%' }}
            view="day"
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
        </div>
      </div>
    </MainContainer>
  )
}

export default ClinicPage
