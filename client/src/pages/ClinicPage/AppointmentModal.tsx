import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  TextField,
  Typography
} from '@mui/material'
import { useSnackbar } from 'notistack'
import { Dispatch, SetStateAction, useState } from 'react'

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  onAccept: Function
  start: Date
  end: Date
}

const AppointmentModal: React.FC<Props> = ({
  open,
  setOpen,
  onAccept,
  start,
  end
}) => {
  const handleClose = () => setOpen(false)
  let clicks = 0
  const { enqueueSnackbar } = useSnackbar()

  const [disableSubmit, setDisableSubmit] = useState<boolean>(false)

  const [email, setEmail] = useState<String>('')
  const [name, setName] = useState<String>('')
  const [inssurance, setInssurance] = useState<String>('')
  const [details, setDetails] = useState<String>('')

  const [emailValid, setEmailValid] = useState<boolean>(true)
  const [nameValid, setNameValid] = useState<boolean>(true)
  const [inssuranceValid, setInssuranceValid] = useState<boolean>(true)

  const checkField = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
    targetField: String
  ) => {
    if (e.target.value === '' && targetField === 'email') setEmailValid(false)
    else if (e.target.value === '' && targetField === 'name')
      setNameValid(false)
    else if (e.target.value === '' && targetField === 'inssurance')
      setInssuranceValid(false)
  }

  const checkAllFields = () => {
    if (email === '') setEmailValid(false)
    if (name === '') setNameValid(false)
    if (inssurance === '') setInssuranceValid(false)
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <div
        style={{
          padding: '0rem 1rem 0rem 1rem',
        }}
      >
        <DialogTitle sx={{ fontSize: '1.5rem', fontWeight: 600}}>
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
                label="Email*"
                variant="outlined"
                size={'small'}
                onChange={(e) => {
                  setEmailValid(true)
                  setEmail(e.target.value)
                }}
                error={!emailValid}
                onBlur={(e) => checkField(e, 'email')}
              />
              <TextField
                label="Name*"
                variant="outlined"
                size={'small'}
                onChange={(e) => {
                  setNameValid(true)
                  setName(e.target.value)
                }}
                error={!nameValid}
                onBlur={(e) => checkField(e, 'name')}
              />
              <TextField
                label="Inssurance*"
                variant="outlined"
                size={'small'}
                onChange={(e) => {
                  setInssuranceValid(true)
                  setInssurance(e.target.value)
                }}
                error={!inssuranceValid}
                onBlur={(e) => checkField(e, 'inssurance')}
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
                onChange={(e) => {
                  setDetails(e.target.value)
                }}
              />
            </div>
          </div>
          <Typography variant="subtitle2" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
            * fields are required
          </Typography>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '1rem',
              paddingTop: '1rem'
            }}
          >
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              variant="contained"
              disabled={disableSubmit}
              onClick={() => {
                clicks++
                if (clicks === 15) {
                  setDisableSubmit(true)
                  enqueueSnackbar('Too many requests - please try again', {
                    variant: 'error'
                  })
                  setTimeout(() => {
                    setDisableSubmit(false)
                  }, 2000)
                }
                checkAllFields()
                if (emailValid && nameValid && inssuranceValid) {
                  onAccept(start, end, email, name, inssurance, details)
                }
              }}
            >
              Submit
            </Button>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  )
}

export default AppointmentModal
