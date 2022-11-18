import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Router,
  Routes
} from 'react-router-dom'
import App from './App'
import ClinicPage from './pages/ClinicPage'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/clinic/:pageId',
    element: <ClinicPage />
  },
  {
    path: '/dashboard',
    element: <DashboardPage />
  }
])

export default router
