import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Modal,
  TextField
} from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const AppointmentModal: React.FC<Props> = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false)
  return (
    <Dialog open={open} onClose={handleClose}>
      <div
        style={{
          padding: '0rem 1rem 0rem 1rem'
        }}
      >
        <DialogTitle sx={{ fontSize: '1.5rem', fontWeight: 600 }}>
          {'Book an appointment'}
        </DialogTitle>
        <Divider sx={{ margin: '0rem 1.5rem 0rem 1.5rem' }} />
        <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <DialogContentText id="alert-dialog-description">
            Please fill out the relevant information so that your Dentist can
            correctly assess your needs. Filling out all the fields gives the
            Dentist a better understanding of your problem.
          </DialogContentText>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '5rem',
              padding: '2rem 0rem 1rem 0rem'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}
            >
              <TextField
                id="standard-basic"
                label="Email"
                variant="outlined"
                size={'small'}
              />
              <TextField
                id="standard-basic"
                label="Full Name"
                variant="outlined"
                size={'small'}
              />
              <TextField
                id="standard-basic"
                label="Issurance"
                variant="outlined"
                size={'small'}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <TextField
                id="standard-basic"
                multiline
                rows={5}
                label="Describe your problem"
                variant="outlined"
                sx={{ height: '100%' }}
              />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '1rem',
              paddingTop: '1rem'
            }}
          >
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" onClick={handleClose}>
              Submit
            </Button>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  )
}

export default AppointmentModal
