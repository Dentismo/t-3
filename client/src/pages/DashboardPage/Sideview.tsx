import React, { Dispatch, SetStateAction, MouseEventHandler } from 'react'
import {
  Toolbar,
  Drawer,
  Divider,
  List,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton
} from '@mui/material'

import { useSearchParams, useNavigate } from 'react-router-dom'
import PendingIcon from '@mui/icons-material/Pending'
import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

type AppointmentType = {
  title: string
  icon: React.ReactElement
  onClick: () => void
}

type Props = {
  setTab?: Dispatch<SetStateAction<string>>
}

const Sideview: React.FC<Props> = ({ setTab }) => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const drawerWidth = 150

  const listItems: AppointmentType[] = [
    {
      icon: <PendingIcon fontSize="large" color="info" />,
      title: 'Pending',
      onClick: () =>
        navigate({
          search: '?tab=pending'
        })
    },
    {
      icon: <CheckCircleIcon fontSize="large" color="success" />,
      title: 'Approved',
      onClick: () =>
        navigate({
          search: '?tab=approved'
        })
    },
    {
      icon: <CancelIcon fontSize="large" color="error" />,
      title: 'Denied',
      onClick: () =>
        navigate({
          search: '?tab=denied'
        })
    }
  ]

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box'
        }
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <Typography variant="h6">Appointment Types</Typography>
      </Toolbar>
      <Divider />
      <List>
        {listItems.map((li, index) => (
          <Box key={li.title}>
            <ListItem
              sx={{
                flexDirection: 'column'
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0
                }}
              >
                <IconButton onClick={li.onClick}>{li.icon}</IconButton>
              </ListItemIcon>
              <ListItemText>{li.title}</ListItemText>
            </ListItem>
            {index !== listItems.length - 1 && <Divider variant="middle" />}
          </Box>
        ))}
      </List>
    </Drawer>
  )
}

export default Sideview
