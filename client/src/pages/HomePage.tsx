import Navbar from '../components/Navbar'
import { Button } from '@mui/material'
import DentistCard from '../components/DentistCard'
import '../styles/HomePage.css'

function HomePage() {
  const buttonText = 'Press me'
  const dentists = [
    {
      name: 'Dentist 1',
      details: '08.00 to 17:00 Monday to Friday',
      id: '1',
      location: 'Lindholmen'
    },
    { name: 'Dentist 2' },
    { name: 'Dentist 3' },
    { name: 'Dentist 4' }
  ]

  return (
    <div>
      <div className="main-container">
        <div className="home-image-holder">
          <p className="image-text">Image here</p>
        </div>
        <div className="welcome-button">
          <div>
            <h3>Welcome to Dentismo</h3>
          </div>
          <div>
            <Button variant="outlined">{buttonText}</Button>
          </div>
        </div>
        <div
          style={{
            border: '1px solid black',
            marginTop: '2rem',
            marginBottom: '2rem'
          }}
        ></div>
        <div className="available-dentist">
          <p>Available Dentists:</p>
        </div>
        <div
          className={
            dentists.length > 3 && dentists.length !== 5
              ? 'dentist-cards'
              : 'alt-dentist-cards'
          }
        >
          {dentists.map((dentist) => (
            <DentistCard dentist={dentist} key={dentist.name}></DentistCard>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage
