import sendEmail from '../../util/sendEmail'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import EmailIcon from '@mui/icons-material/Email'
import {
  CircularProgress,
  Divider,
  Stack,
  StackProps,
  Typography
} from '@mui/material'
import { Box } from '@mui/system'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { Api } from '../../Api'
import IconAction from './IconAction'
import { Booking } from './types'

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
    details,
    date,
    state,
    start,
    issuance,
    end
  } = booking
  const [denyLoading, setDenyLoading] = useState<boolean>(false)
  const [acceptLoading, setAcceptLoading] = useState<boolean>(false)
  const startTime = new Date(start)
  const endTime = new Date(end)

  return (
    <Stack
      direction="row"
      padding={2}
      boxShadow="0 0 2px rgba(0, 0, 0, 0.9)"
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
          {startTime.getHours()}:{startTime.getMinutes() < 10 ?  "0" + startTime.getMinutes() : startTime.getMinutes()} - {endTime.getHours()}:{endTime.getMinutes() < 10 ? "0" + endTime.getMinutes() : endTime.getMinutes()}
          </Typography>
        </Stack>
        <Box alignSelf="stretch">
          <Divider orientation="vertical" />
        </Box>
        <Typography fontWeight={600} noWrap overflow="visible" fontFamily="'Apple SD Gothic Neo UltraLight'">
          {name}:
        </Typography>
        <Typography flexGrow={1}>{details}</Typography>
      </Stack>
      <Stack direction="row" ml="auto" alignSelf="center">
        {state === 'pending' ? (
          <>
            {denyLoading ? (
              <CircularProgress size={20} sx={{ padding: '0.5rem' }} />
            ) : (
              <IconAction
                tooltip="Deny Appointment"
                icon={<CloseIcon color="error" />}
                onClick={() => {
                  if (!acceptLoading) {
                    const id = Math.random().toString(36).substring(2, 7)

                    openModalWithParams({
                      title: 'Confirm Action',
                      description: `You're about to deny ${name}'s appointment on ${date}. This will also send a confirmation email to ${email}. Are you sure?`,
                      onAccept: async () => {
                        try {
                          setDenyLoading(true)
                          await Api.patch('/request/denied/' + id, { _id })
                          setDenyLoading(false)
                          sendEmail({ booking, type: 'denied' })
                          enqueueSnackbar(`Appointment successfully denied!`, {
                            variant: 'success'
                          })
                          setBookingState(_id, 'denied')
                        } catch (err) {
                          enqueueSnackbar('Failed to accept appointment!', {
                            variant: 'error'
                          })
                          setDenyLoading(false)
                          console.log(err)
                        }
                      }
                    })
                  } else {
                    enqueueSnackbar('Request in progress - Try again later', {
                      variant: 'error'
                    })
                  }
                }}
              />
            )}
            {acceptLoading ? (
              <CircularProgress size={20} sx={{ padding: '0.5rem' }} />
            ) : (
              <IconAction
                tooltip="Accept Appointment"
                icon={<CheckIcon color="success" />}
                onClick={() => {
                  if (!denyLoading) {
                    const id = Math.random().toString(36).substring(2, 7)

                    openModalWithParams({
                      title: 'Confirm Action',
                      description: `You're about to accept ${name}'s appointment on ${date}. This will also send a confirmation email to ${email}. Are you sure?`,
                      onAccept: async () => {
                        try {
                          setAcceptLoading(true)
                          await Api.patch('/request/approve/' + id, { _id })
                          await sendEmail({ booking, type: 'approved' })
                          setAcceptLoading(false)
                          enqueueSnackbar(
                            `Appointment successfully accepted!`,
                            {
                              variant: 'success'
                            }
                          )
                          setBookingState(_id, 'approved')
                        } catch (err) {
                          enqueueSnackbar('Failed to accept appointment!', {
                            variant: 'error'
                          })
                          setAcceptLoading(false)
                          console.log(err)
                        }
                      }
                    })
                  } else {
                    enqueueSnackbar('Request in progress - Try again later', {
                      variant: 'error'
                    })
                  }
                }}
              />
            )}
          </>
        ) : (
          <>
            <IconAction
              tooltip="Resend email"
              icon={<EmailIcon htmlColor="#457b9d" />}
              onClick={() =>
                openModalWithParams({
                  title: 'Confirm Action',
                  description: `You're about to resend an email to ${name} (${email}) confirming their appointment is ${state}. Please avoid resending emails unless they failed to send. Are you sure you want to proceed?`,
                  onAccept: () => {
                    sendEmail({
                      booking,
                      type: state
                    })
                    enqueueSnackbar(
                      `Appointment's status successfully resent!`,
                      {
                        variant: 'success'
                      }
                    )
                  }
                })
              }
            />
            <IconAction
              tooltip="Delete Appointment"
              icon={<DeleteIcon htmlColor="#e63946" />}
              onClick={() =>
                openModalWithParams({
                  title: 'Confirm Action',
                  description: `You're about to delete ${name}'s appointment on ${date}. Are you sure?`,
                  onAccept: () => {
                    enqueueSnackbar(`Appointment successfully deleted!`, {
                      variant: 'success'
                    })
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
