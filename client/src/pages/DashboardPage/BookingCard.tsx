import React from 'react'
import { Stack, Typography, StackProps, Divider } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import IconAction from './IconAction'
import { Booking } from './types'
import { useSnackbar } from 'notistack'
import { Box } from '@mui/system'
// TODO: use backend model

type Props = {
  booking: Booking
  openModalWithParams: Function
  setBookingState: (
    bookingId: Booking['id'],
    state: Booking['state'] | 'deleted'
  ) => void
} & StackProps

const BookingCard: React.FC<Props> = ({
  booking,
  openModalWithParams,
  setBookingState,
  ...props
}) => {
  const { enqueueSnackbar } = useSnackbar()
  const { id, user, reason, date, state, startTime, endTime } = booking
  return (
    <Stack
      direction="row"
      padding={2}
      boxShadow="0 0 2px rgba(0, 0, 0, 0.2)"
      bgcolor="white"
      {...props}
      sx={{
        transition: 'border-radius 500ms',
        '&:active': {
          boxShadow: 'none'
        },
        '&:hover': {
          borderRadius: '10px'
        },
        ...props.sx
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <Stack>
          <Typography px={1} noWrap borderRadius="3px" fontSize="1.2rem">
            {startTime} - {endTime}
          </Typography>
        </Stack>
        <Box alignSelf="stretch">
          <Divider orientation="vertical" />
        </Box>
        <Typography fontWeight={600} noWrap overflow="visible">
          {user}:
        </Typography>
        <Typography flexGrow={1}>{reason}</Typography>
      </Stack>
      <Stack direction="row" ml="auto" alignSelf="center">
        {state === 'pending' ? (
          <>
            <IconAction
              tooltip="Deny Appointment"
              icon={<CloseIcon color="error" />}
              onClick={() =>
                openModalWithParams({
                  title: 'Confirm Action',
                  description: `You're about to deny ${user}'s appointment on ${date}. Are you sure?`,
                  onAccept: () => {
                    enqueueSnackbar(`Appointment ${id} successfully denied!`, {
                      variant: 'success'
                    })
                    setBookingState(id, 'denied')
                  }
                })
              }
            />
            <IconAction
              tooltip="Accept Appointment"
              icon={<CheckIcon color="success" />}
              onClick={() =>
                openModalWithParams({
                  title: 'Confirm Action',
                  description: `You're about to accept ${user}'s appointment on ${date}. Are you sure?`,
                  onAccept: () => {
                    enqueueSnackbar(
                      `Appointment ${id} successfully accepted!`,
                      {
                        variant: 'success'
                      }
                    )
                    setBookingState(id, 'approved')
                  }
                })
              }
            />
          </>
        ) : (
          <>
            <IconAction
              tooltip="Delete Appointment"
              icon={<DeleteIcon htmlColor="grey" />}
              onClick={() =>
                openModalWithParams({
                  title: 'Confirm Action',
                  description: `You're about to delete ${user}'s appointment on ${date}. Are you sure?`,
                  onAccept: () => {
                    enqueueSnackbar(
                      `Appointment ${id} successfully accepted!`,
                      {
                        variant: 'success'
                      }
                    )
                    setBookingState(id, 'deleted')
                  }
                })
              }
            />
          </>
        )}
      </Stack>
    </Stack>
  )
}

export default BookingCard
