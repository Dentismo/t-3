import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Stack,
  Divider
} from '@mui/material'
import { height } from '@mui/system'
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
        width: '480px',
        height: '280px'
      }}
    >
      <div
        style={{ paddingLeft: '2rem', paddingRight: '2rem', height: '100%' }}
      >
        <CardHeader sx={{ paddingBottom: '0rem' }} title={props.clinic.name} />
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            paddingBottom: '0rem'
          }}
        >
          <Typography>Clinic Owner: {props.clinic.owner}</Typography>
          <Divider />
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
          </Typography>
          <Divider />

          <Typography>Opening Times:</Typography>
        </CardContent>
        <CardContent
          style={{
            gap: '0.6rem',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            paddingTop: '0.4rem',
            height: '30%'
          }}
        >
          {times.map((timeslot) => (
            <Typography variant="body2">{timeslot} </Typography>
          ))}
        </CardContent>
      </div>
    </Card>
  )
}

export default ClinicCard
