import Navbar from '../components/Navbar'
import { styled } from '@mui/material'
import DentistCard from '../components/DentistCard'
import '../styles/HomePage.css'
import logo from '../images/parodontitis.png'

import { NoEncryption } from '@mui/icons-material'

function ErrorPage() {
  const ErrorImage = styled('div')({
    margin: "auto",
  })

  const Body = styled("div")({
    margin: "10%",
  })

  return (
    <div>
      <Body>
        <div className="error-page" style = {{
          textAlign: 'center'
        }}>
          <h1>Error 404: Page not found</h1>
          <a href="/" style={{
            color: 'blue'
          }}>Back home</a>
          <ErrorImage>
          <img 
            src={logo} 
            alt="image" 
            style={{width:"300px", height:"300px"}}
            />
          </ErrorImage>
        </div>
      </Body>
    </div>
  )
}

export default ErrorPage