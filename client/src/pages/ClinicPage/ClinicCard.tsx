import { Card, CardContent, CardHeader, Typography, Stack } from '@mui/material'
import { Clinic } from './types'

interface Props {
  clinic: Clinic
}

/**
 * Card for populating the clinic information in the respective
 * clinic page to show users where the clinic is, the opening times and the
 * owner
 *
 * @param props
 * @returns
 */

const ClinicCard = (props: Props) => {
  const openingHours = props.clinic.openinghours
  let times: String[] = []

  for (const day in openingHours) {
    const { start, end } = (
      openingHours as {
        [day: string]: { start: Number; end: Number }
      }
    )[day]

    //capitalize day field
    const finalDay = day.charAt(0).toUpperCase() + day.slice(1)
    times.push(`${finalDay}: ${start}:00 - ${end}:00`)
  }

  return (
    <Card
      sx={{
        width: '600px',
        height: '280px'
      }}
    >
      <CardHeader sx={{ paddingLeft: '2rem' }} title={props.clinic.name} />
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          padding: '0rem 1rem 0rem 2rem'
        }}
      >
        <Typography>Clinic Owner: {props.clinic.owner}</Typography>
        <Typography>
          Address:{' '}
          <a
            style={{ textDecoration: 'none', color: 'darkblue' }}
            href={`http://maps.google.com/?q=${props.clinic.address}+${props.clinic.city}`}
            target="_blank"
            rel="noreferrer"
          >
            {props.clinic.address + ', ' + props.clinic.city}
          </a>
          <Typography></Typography>
        </Typography>
        <Typography>Opening Times:</Typography>
      </CardContent>
      <CardContent sx={{ padding: '0.25rem 1rem 0rem 2rem' }}>
        {times.map((timeslot) => (
          <Typography variant="body2">{timeslot}</Typography>
        ))}
      </CardContent>
    </Card>
  )
}

export default ClinicCard
