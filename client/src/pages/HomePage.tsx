import { Button } from '@mui/material';
import '../styles/HomePage.css';


function HomePage() {
    const buttonText = "Press me";
    
    return (
    <div>
        <div className='main-container'>
            <div className="top-div">
                <h1 className="dentist-heading"> Dentismo </h1>
            </div>
            <div className='home-image-holder'>
                <p className='image-text'>Image here</p>
            </div>
            <div className="welcome-button">
                <div>
                    <h3>Welcome to Dentismo</h3>
                </div>
                <div>
                    <Button variant="outlined">{buttonText}</Button>
                </div> 
            </div>
            <div style={{border: "1px solid black", marginTop: "2rem", marginBottom: "2rem"}}></div>
            <div className="available-dentist">
                <p>Available Dentists:</p>
            </div>
        </div>
    </div>
    );
}

export default HomePage;