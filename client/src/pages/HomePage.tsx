import { Button } from '@mui/material'
import { useRef } from 'react'
import DentistCard from '../components/DentistCard'
import clinic from '../images/elegant-clinic.jpg'
import picker from '../images/picker.jpg'
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
    { name: 'Dentist 4' },
    { name: 'Dentist 5' }
  ]

  const ref = useRef<null | HTMLDivElement>(null)

  const showCards = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div>
      <div className="main-container">
        <div className="home-image-holder">
          <div className="text-button-holder">
            <div className="text-holder">
              <span>Every dental experience personalized to you.</span>
            </div>
            <div className="button-holder">
              <Button
                onClick={showCards}
                className="dentist-button"
                variant="outlined"
              >
                {' '}
                See available dentist
              </Button>
            </div>
          </div>
          <div className="image-holder">
            <img src={clinic} alt="" />
          </div>
        </div>
        <div className="banner-below-image">
          <div>
            <h2 className="banner-text">
              Dentismo is a web-service based in Gothenburg, to provide
              available dentist to customers.
            </h2>
          </div>
        </div>
        <div className="about-us-container">
          <div className="about-us-image">
            <img id="us-image" src={picker} alt="" />
          </div>
          <div className="about-us-text">
            <div>
              <span>ABOUT US</span>
            </div>
            <div>
              <h2>
                Dentismo is a platform that provides services to customers
                looking for dentist.
              </h2>
            </div>
            <div>
              <p id="us-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>
        <div className="available-dentist">
          <p>Available Dentists:</p>
        </div>
        <div
          id="card-section"
          ref={ref}
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
        <div className="footer">
          <span>Copyright © 2022. T3-project. All Rights reserved</span>
        </div>
      </div>
    </div>
  )
}

export default HomePage
