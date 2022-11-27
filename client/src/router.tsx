import { createBrowserRouter, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import ClinicPage from './pages/ClinicPage'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      {
        path: 'clinic/:pageId',
        element: <ClinicPage />
      },
      {
        path: 'dashboard',
        element: <DashboardPage />
      },
      {
        path: '/login',
        element: <LoginPage />
      }
    ]
  }
])

export default router
