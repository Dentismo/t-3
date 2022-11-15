import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import ClinicPage from './pages/ClinicPage'
import HomePage from './pages/HomePage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: "/homepage",
    element: <HomePage />},
  {
    path: '/clinic/:pageId',
    element: <ClinicPage />
  }
])

export default router
