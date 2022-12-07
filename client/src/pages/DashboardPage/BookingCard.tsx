import sendEmail from '@/util/sendEmail'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  CircularProgress,
  Divider,
  Stack,
  StackProps,
  Typography
} from '@mui/material'
import { Box } from '@mui/system'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import { Api } from '../../Api'
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
  const { _id, user, details, date, state, start, end } = booking
  const [denyLoading, setDenyLoading] = useState<boolean>(false)
  const [acceptLoading, setAcceptLoading] = useState<boolean>(false)
  const startTime = new Date(start)
  const endTime = new Date(end)
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
            {startTime.getHours()}:{startTime.getMinutes()} -{' '}
            {endTime.getHours()}:{endTime.getMinutes()}
          </Typography>
        </Stack>
        <Box alignSelf="stretch">
          <Divider orientation="vertical" />
        </Box>
        <Typography fontWeight={600} noWrap overflow="visible">
          {user.name}:
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
                    openModalWithParams({
                      title: 'Confirm Action',
                      description: `You're about to deny ${user.name}'s appointment on ${date}. Are you sure?`,
                      onAccept: async () => {
                        setDenyLoading(true)
                        const id = Math.random().toString(36).substring(2, 7)
                        try {
                        await Api.patch('/request/denied/' + id, {
                          _id: booking._id
                        })
                            setDenyLoading(false)
                            enqueueSnackbar(
                              `Appointment ${_id} successfully denied!`,
                              {
                                variant: 'success'
                              }
                            )
                            setBookingState(_id, 'denied')
                            sendEmail({booking, type: "denied"})
                          } catch(err) {
                            console.log(err)
                            enqueueSnackbar(
                              `Failed to deny appointment!`,
                              {
                                variant: 'error'
                              }
                    )}
                    )}
                            }
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
                    openModalWithParams({
                      title: 'Confirm Action',
                      description: `You're about to accept ${user.name}'s appointment on ${date}. Are you sure?`,
                      onAccept: async () => {
                        setAcceptLoading(true)
                        const id = Math.random().toString(36).substring(2, 7)
                        try {
                        await Api.patch('/request/approve/' + id, {
                          _id: booking._id
                        })
                        setAcceptLoading(false)
                        enqueueSnackbar(
                          `Appointment ${_id} successfully accepted!`,
                          {
                            variant: 'success'
                          }
                        )
                        setBookingState(_id, 'approved')
                        sendEmail({booking, type: "approved"})
                      } catch(err) {
                        console.log(err)
                        enqueueSnackbar(
                          `Failed to accept appointment!`,
                          {
                            variant: 'error'
                          }
                        )
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
              tooltip="Delete Appointment"
              icon={<DeleteIcon htmlColor="grey" />}
              onClick={() =>
                openModalWithParams({
                  title: 'Confirm Action',
                  description: `You're about to delete ${user.name}'s appointment on ${date}. Are you sure?`,
                  onAccept: () => {
                    enqueueSnackbar(
                      `Appointment ${_id} successfully accepted!`,
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
