import { Button, ContainerProps, styled } from '@mui/material'
import { useState } from 'react'
import logo from '../images/logo.png'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Link } from 'react-router-dom'
import LinkButton from './LinkButton'

const Navbar = (props: ContainerProps) => {
  const NavbarContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between'
  })

  const NavbarGroup = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem 1.25rem 1rem 1.25rem'
  })

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <NavbarContainer>
      <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
        <NavbarGroup>
          <img
            src={logo}
            style={{ width: '40px', height: '40px' }}
            alt="logo"
          />
          <span style={{ fontSize: '2em' }}>Dentismo</span>
        </NavbarGroup>
      </Link>
      <NavbarGroup>
        {!isLoggedIn ? (
          <LinkButton variant="outlined" buttonText="Login" linkTo="/login" />
        ) : (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <LinkButton
              variant="contained"
              linkTo="/dashboard"
              startIcon={
                <AccountCircleIcon style={{ paddingRight: '0.3rem' }} />
              }
              buttonText="My Account"
            />
            <LinkButton variant="outlined" buttonText="Logout" linkTo="/" />
          </div>
        )}
      </NavbarGroup>
    </NavbarContainer>
  )
}

export default Navbar
