import { ThemeProvider } from '@emotion/react'
import {
  Button,
  createTheme,
  Grid,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { Api } from '../Api'

const paperStyle = { padding: 20, height: '20rem', width: '25rem' }
const textStyle = { margin: 4 }

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '0.75rem'
  }
}

const theme = createTheme({
  typography: {
    fontFamily: ['-Playfair-Display'].join(',')
  }
})

function LoginForm() {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid Email').required('Required'),
      password: Yup.string().required('Required')
    }),
    onSubmit: async (values, { resetForm }) => {
      await Api.post('request/login', {
        email: values.email,
        password: values.password
      })
        .then((response) => {
          if (response.data.token) {
            localStorage.token = response.data.token
            localStorage.loginId = response.data.id
            localStorage.clinicId = response.data.clinicId
            navigate('/dashboard')
            window.location.reload()
            enqueueSnackbar('Succesfully logged in', {
              variant: 'success'
            })
          } else {
            enqueueSnackbar('Failed to logged in', {
              variant: 'error'
            })
          }
        })
        .catch((error) => {
          console.log(error)
          enqueueSnackbar('Failed to logged in', {
            variant: 'error'
          })
        })
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <Grid textAlign="center">
        <Paper elevation={10} style={paperStyle}>
          <Grid style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Typography variant="h4">Dentist Login</Typography>
          </Grid>
          <form onSubmit={formik.handleSubmit}>
            <div style={styles.form}>
              <div style={styles.form}>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  variant="outlined"
                  error={!!formik.errors.email}
                  placeholder="Enter Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                <div
                  style={{
                    color: 'red',
                    fontFamily: '-Playfair-Display',
                    textAlign: 'left',
                    opacity: formik.errors.email ? 1 : 0
                  }}
                >
                  {formik.errors.email ?? 'All good '}
                </div>
              </div>
              <div style={styles.form}>
                <TextField
                  id="password"
                  name="password"
                  type="password"
                  error={!!formik.errors.password}
                  placeholder="Enter Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <div
                  style={{
                    color: 'red',
                    fontFamily: '-Playfair-Display',
                    textAlign: 'left',
                    opacity: formik.errors.password ? 1 : 0
                  }}
                >
                  {formik.errors.password ?? 'All good '}
                </div>
              </div>
            </div>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={{ marginTop: '2rem', backgroundColor: '#22443d' }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Grid>
    </ThemeProvider>
  )
}

export default LoginForm
