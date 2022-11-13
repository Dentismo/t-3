import React from 'react'
import {
  Stack,
  Typography,
  StackProps,
  IconButton,
  Tooltip
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import IconAction from './IconAction'

// TODO: use backend model
export type Booking = {
  id: string
  user: string
  reason: string
  date: string
  state: 'pending' | 'approved' | 'denied'
}

type Props = {
  booking: Booking
} & StackProps

// TODO: different cards based on state (denied should have delete option)
const BookingCard: React.FC<Props> = ({ booking, ...props }) => {
  const { user, reason, date, state } = booking
  return (
    <Stack
      direction="row"
      {...props}
      sx={{
        backgroundColor: 'white',
        padding: 2,
        boxShadow: '0 0 2px rgba(0, 0, 0, 0.2)',
        alignItems: 'center',
        ...props.sx,
        transition: 'border-radius 500ms',
        '&:active': {
          boxShadow: 'none'
        },
        '&:hover': {
          borderRadius: '10px'
        }
      }}
    >
      <Typography fontWeight={600}>{user}:&nbsp;</Typography>
      <Typography>{reason}</Typography>
      <Stack direction="row" ml="auto">
        <IconAction
          tooltip="Deny Appointment"
          icon={<CloseIcon color="error" />}
          onClick={() => {}}
        />
        <IconAction
          tooltip="Accept Appointment"
          icon={<CheckIcon color="success" />}
          onClick={() => {}}
        />
      </Stack>
    </Stack>
  )
}

export default BookingCard
