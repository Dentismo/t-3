import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material'

import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PendingIcon from '@mui/icons-material/Pending'
import { useNavigate } from 'react-router-dom'

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
  const drawerWidth = 190

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
          backgroundColor: '#e0e1dd',
          //'rgb(251,	249,	245)',
          color: 'grey',
          borderRight: 0.5,
          boxShadow: 1,
        },
        '& .MuiDivider-root': {
          background: 'ccd5ae'
        }
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar
        sx={{
          py: 4,
          padding: 5,
        }}
      >
        <Typography sx={{
          fontSize: 24,
          color: 'black'
        }}
        >Appointments</Typography>
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
              <ListItemText
                sx={{
                  color: "black",
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
