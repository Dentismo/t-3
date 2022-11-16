import React, { SetStateAction, Dispatch } from 'react'
import { Modal, Typography, Button, Stack } from '@mui/material'

type Props = {
  title: string
  description: string
  onAccept: Function
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const ConfirmationModal: React.FC<Props> = ({
  title,
  description,
  onAccept,
  open,
  setOpen
}) => {
  const handleClose = () => setOpen(false)

  return (
    <Modal open={open} onClose={handleClose}>
      <Stack
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 400,
          backgroundColor: 'white',
          transform: 'translate(-50%, -50%)',
          padding: 3,
          borderRadius: '5px'
        }}
        spacing={1}
      >
        <Typography variant="h4">{title}</Typography>
        <Typography variant="subtitle1">{description}</Typography>
        <Stack direction="row" spacing={1}>
          <Button
            disableElevation
            color="error"
            variant="contained"
            sx={{
              marginLeft: 'auto'
            }}
            onClick={() => handleClose()}
          >
            No
          </Button>
          <Button
            disableElevation
            color="success"
            variant="contained"
            onClick={() => {
              handleClose()
              onAccept()
            }}
          >
            Yes
          </Button>
        </Stack>
      </Stack>
    </Modal>
  )
}

export default ConfirmationModal
