import { Card, CardContent, CardHeader, styled } from '@mui/material'
import React, { useState } from 'react'

function ClinicPage() {
  const cardContent = 'sifsd'
  const cardTitle = 'Dentist Clinic Title'
  const apiKey = process.env.REACT_APP_API_KEY
  let location = 'Spannmålsgatan 20'

  let [showDefaultText] = useState(false)

  //if location is undefined or null, set default location
  if (location === undefined || location === null) {
    showDefaultText = true

    location = 'Spannmålsgatan 20'
  }
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
    <MainContainer>
      <div
        style={{
          height: '12rem',
          backgroundColor: 'brown',
          width: '100vw'
        }}
      ></div>
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
            justifyContent: 'center'
          }}
        >
          <h1>Calendar</h1>
        </div>
      </div>
    </MainContainer>
  )
}

export default ClinicPage
