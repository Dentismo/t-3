import { styled } from '@mui/material'
import logo from '../images/dead_tooth.png'
import '../styles/HomePage.css'

function ErrorPage() {
  const ErrorImage = styled('div')({
    margin: 'auto'
  })

  const Body = styled('div')({
    margin: '10%'
  })

  return (
    <div>
      <Body>
        <div
          className="error-page"
          style={{
            color: '',
            textAlign: 'center',
            height: '100%'
          }}
        >
          <img
            src={logo}
            alt="404image"
            style={{ width: '150px', height: '150px' }}
          />
          <h1>Error 404: Page not found</h1>
          <a
            href="/"
            style={{
              color: 'blue'
            }}
          >
            Back home
          </a>
          <ErrorImage></ErrorImage>
        </div>
      </Body>
    </div>
  )
}

export default ErrorPage
