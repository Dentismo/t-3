import { Button } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { Api } from '../Api'
import ClinicCard from '../components/ClinicCard'
import clinicImg from '../images/elegant-clinic.jpg'
import picker from '../images/picker.jpg'
import '../styles/HomePage.css'
import { Clinic } from './ClinicPage/types'

function HomePage() {
  const id = Math.random().toString(36).substring(2,7);

  const [clinics, setClinics] = useState<Clinic[]>([]);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const res = await Api.get('request/clinics/' + id)
        setClinics(res.data)
      } catch(error){
          console.log(error)
      }
    };
    fetchClinics();
  }, []);

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
                See available clinics
              </Button>
            </div>
          </div>
          <div className="image-holder">
            <img src={clinicImg} alt="" />
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
          <p>Available Clinics:</p>
        </div>
        <div
          id="card-section"
          ref={ref}
          className={
            clinics.length > 3 && clinics.length !== 5
              ? 'dentist-cards'
              : 'alt-dentist-cards'
          }
        >
          {clinics.map((clinic) => (
            <ClinicCard clinic={clinic} key={clinic.name.toString()}></ClinicCard>
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
