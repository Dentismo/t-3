import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import ClinicPage from './pages/ClinicPage'
import DentistPage from './pages/DentistPage'
import HomePage from './pages/HomePage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/homepage',
    element: <HomePage />
  },
  {
    path: '/clinic/:pageId',
    element: <ClinicPage />
  },
  {
    path: '/dentist',
    element: <DentistPage />
  }
])

export default router
