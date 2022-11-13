import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import ClinicPage from './pages/ClinicPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/dentist',
    element: <ClinicPage />
  }
])

export default router
