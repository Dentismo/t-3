import React from 'react'
import { AppBar, Box, Toolbar, Drawer, Divider, List } from '@mui/material'

const Sideview: React.FC = () => {
  const drawerWidth = 200
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
      <Toolbar />
      <Divider />
      <List>taw</List>
    </Drawer>
  )
}

export default Sideview
