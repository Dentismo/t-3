import Navbar from '../components/Navbar'
import { Button } from '@mui/material'
import DentistCard from '../components/DentistCard'
import '../styles/HomePage.css'
import { NoEncryption } from '@mui/icons-material'

function ErrorPage() {
  return (
    <div>
      <div className="error-page" style = {{
        textAlign: 'center'
      }}>
        <h1>Error 404: Page not found</h1>
        <a href="/" style={{
          color: 'blue'
        }}>Back home</a>
      </div>
    </div>
  )
}

export default ErrorPage