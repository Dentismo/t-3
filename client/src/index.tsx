import { SnackbarProvider } from 'notistack'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router'
import './index.css'
import router from './router'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <SnackbarProvider
    maxSnack={3}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    autoHideDuration={3000}
  >
    <RouterProvider router={router} />
  </SnackbarProvider>
)
