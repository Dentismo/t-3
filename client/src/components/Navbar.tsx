import { Button, ContainerProps, styled } from '@mui/material'
import { useState } from 'react'
import logo from '../images/logo.png'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Link } from 'react-router-dom'
import LinkButton from './LinkButton'
import { useSnackbar } from 'notistack'

const Navbar = (props: ContainerProps) => {
  const { enqueueSnackbar } = useSnackbar()

  const NavbarContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1.5rem 1.25rem 1.5rem 1.25rem'
  })

  const NavbarGroup = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  })

  //remove loginToken and loginId to display logout occured
  const logout = () => {
    localStorage.clear()

    enqueueSnackbar('Appointment created Successfully', {
      variant: 'success'
    })
  }

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
        {localStorage.loginToken ? (
          <LinkButton
            style={{ fontSize: '1rem' }}
            size="large"
            variant="outlined"
            buttonText="Login"
            linkTo="/login"
          />
        ) : (
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <LinkButton
              style={{ fontSize: '1rem' }}
              variant="contained"
              linkTo="/dashboard"
              startIcon={
                <AccountCircleIcon style={{ paddingRight: '0.3rem' }} />
              }
              buttonText="My Account"
            />

            <LinkButton
              style={{ fontSize: '1rem' }}
              onClick={logout}
              variant="outlined"
              buttonText="Logout"
              linkTo="/"
            />
          </div>
        )}
      </NavbarGroup>
    </NavbarContainer>
  )
}

export default Navbar
