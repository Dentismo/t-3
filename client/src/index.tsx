import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { SnackbarProvider } from 'notistack'
import { RouterProvider } from 'react-router'
import router from './router'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <SnackbarProvider maxSnack={3}>
    <RouterProvider router={router} />
  </SnackbarProvider>
)
