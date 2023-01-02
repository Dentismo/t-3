import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { ContainerProps, styled } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'
import LinkButton from './LinkButton'

const Navbar = (props: ContainerProps) => {
  const { enqueueSnackbar } = useSnackbar()

  const [tokenExists, setTokenExists] = useState<boolean>(
    localStorage.getItem('token') === null
  )

  useEffect(() => {
    if (localStorage.getItem('token') && tokenExists === false) {
      setTokenExists(true)
    } else if (!localStorage.getItem('token')) {
      setTokenExists(false)
    }
  }, [tokenExists])

  const NavbarContainer = styled('div')({
    height: '45px',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1.5rem 1.75rem 1.5rem 1.75rem',
    boxShadow: '0px 1px  #e0e0e0'
  })

  const NavbarGroup = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  })

  //remove loginToken and loginId to display logout occured
  const logout = () => {
    setTokenExists(false)
    localStorage.clear()

    enqueueSnackbar('Logged out successfully', {
      variant: 'success'
    })
  }

  return (
    <NavbarContainer>
      <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
        <NavbarGroup>
          <img
            src={logo}
            style={{ width: '45px', height: '45px' }}
            alt="logo"
          />
          <span style={{ fontSize: '2em', fontWeight: 500, fontFamily: 'playfair-display'}}>Dentismo</span>
        </NavbarGroup>
      </Link>
      <NavbarGroup>
        {!tokenExists ? (
          <LinkButton
            style={{ fontSize: '1rem', textTransform: 'none', fontFamily: 'playfair-display'}}
            variant="outlined"
            buttontext="Login"
            linkto="/login"
          />
        ) : (
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <LinkButton
              style={{ fontSize: '1rem', textTransform: 'none' }}
              variant="contained"
              linkto="/dashboard"
              startIcon={<AccountCircleIcon />}
              buttontext="Profile"
            />

            <LinkButton
              style={{ fontSize: '1rem', textTransform: 'none' }}
              onClick={logout}
              variant="outlined"
              buttontext="Logout"
              linkto="/"
            />
          </div>
        )}
      </NavbarGroup>
    </NavbarContainer>
  )
}

export default Navbar
