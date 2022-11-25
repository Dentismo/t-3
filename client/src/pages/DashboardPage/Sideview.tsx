import React, { Dispatch, SetStateAction } from 'react'
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

import { useNavigate } from 'react-router-dom'
import PendingIcon from '@mui/icons-material/Pending'
import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

type AppointmentType = {
  title: string
  icon: React.ReactElement
  onClick: () => void
}

type Props = {
  tab: string
}

const Sideview: React.FC<Props> = ({ tab }) => {
  const navigate = useNavigate()
  const drawerWidth = 170

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
        position: 'relative',
        '& .MuiDrawer-paper': {
          position: 'absolute',
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: 'rgb(80, 80, 80)',
          color: 'white'
        },
        '& .MuiDivider-root': {
          background: 'white'
        }
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar
        sx={{
          py: 3
        }}
      >
        <Typography variant="h6">Appointments</Typography>
      </Toolbar>
      <Divider />
      <List>
        {listItems.map((li, index) => (
          <Box key={li.title} sx={{}}>
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
              <ListItemText
                sx={{
                  textDecoration:
                    tab === li.title.toLowerCase() ? 'underline' : ''
                }}
              >
                {li.title}
              </ListItemText>
            </ListItem>
            {index !== listItems.length - 1 && <Divider variant="middle" />}
          </Box>
        ))}
      </List>
    </Drawer>
  )
}

export default Sideview
