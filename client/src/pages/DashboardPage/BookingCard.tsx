import sendEmail from '../../util/sendEmail'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import EmailIcon from '@mui/icons-material/Email'
import { Divider, Stack, StackProps, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useSnackbar } from 'notistack'
import React from 'react'
import IconAction from './IconAction'
import { Booking } from './types'

// TODO: use backend model

type Props = {
  booking: Booking
  openModalWithParams: Function
  setBookingState: (
    bookingId: Booking['_id'],
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
  const {
    _id,
    user: { name, email },
    clinicId,
    reason,
    date,
    state,
    start,
    issuance,
    end
  } = booking
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
            {start} - {end}
          </Typography>
        </Stack>
        <Box alignSelf="stretch">
          <Divider orientation="vertical" />
        </Box>
        <Typography fontWeight={600} noWrap overflow="visible">
          {name}:
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
                  description: `You're about to deny ${name}'s appointment on ${date}. This will also send a confirmation email to ${email}. Are you sure?`,
                  onAccept: () => {
                    sendEmail({
                      booking,
                      type: 'denied'
                    })
                    enqueueSnackbar(`Appointment ${_id} successfully denied!`, {
                      variant: 'success'
                    })
                    setBookingState(_id, 'denied')
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
                  description: `You're about to accept ${name}'s appointment on ${date}. This will also send a confirmation email to ${email}. Are you sure?`,
                  onAccept: () => {
                    sendEmail({
                      booking,
                      type: 'approved'
                    })
                    enqueueSnackbar(
                      `Appointment ${_id} successfully approved!`,
                      {
                        variant: 'success'
                      }
                    )

                    setBookingState(_id, 'approved')
                  }
                })
              }
            />
          </>
        ) : (
          <>
            <>
              <IconAction
                tooltip="Resend email"
                icon={<EmailIcon htmlColor="grey" />}
                onClick={() =>
                  openModalWithParams({
                    title: 'Confirm Action',
                    description: `You're about to resend an email to ${name} confirming their appointment is ${state}. Please avoid resending emails unless they failed to send. Are you sure you want to proceed?`,
                    onAccept: () => {
                      sendEmail({
                        booking,
                        type: state
                      })
                      enqueueSnackbar(
                        `Appointment ${_id}'s status successfully resent!`,
                        {
                          variant: 'success'
                        }
                      )
                    }
                  })
                }
              />
            </>
            <IconAction
              tooltip="Delete Appointment"
              icon={<DeleteIcon htmlColor="grey" />}
              onClick={() =>
                openModalWithParams({
                  title: 'Confirm Action',
                  description: `You're about to delete ${name}'s appointment on ${date}. Are you sure?`,
                  onAccept: () => {
                    enqueueSnackbar(
                      `Appointment ${_id} successfully approved!`,
                      {
                        variant: 'success'
                      }
                    )
                    setBookingState(_id, 'deleted')
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
