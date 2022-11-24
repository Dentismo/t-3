import { ThemeProvider } from "@emotion/react";
import { Button, createTheme, Grid, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";


const paperStyle = {padding: 20, height: '18rem', width: '25rem'}
const textStyle = {margin: 4}

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column' as 'column'
    }
}

const theme = createTheme(  {
    typography: {
        fontFamily: [
            '-Playfair-Display'
        ].join(','),
    },
});

    function LoginForm() {
        const navigate = useNavigate();

        const formik = useFormik({
            initialValues: {
                email: '',
                password: ''
            },
            validationSchema: Yup.object({
                email: Yup.string()
                .email("Invalid Email")
                .required("Required"),
                
                password: Yup.string()
                .required("Required")
            }),
            onSubmit: (values, {resetForm}) => {
                if(values.email === 'ivan@gmail.com' && values.password === 'ivan123') {
                    ///navigate("/dashboard")
                    resetForm()
                }
            }
        });

    return (
        <ThemeProvider theme={theme}>
        <Grid textAlign='center'>
            <Paper elevation={10} style={paperStyle}>
                <Grid textAlign='center'>  
                    <Typography variant='h3'>Login</Typography>
                </Grid>
                <form onSubmit={formik.handleSubmit}>
                    <div style={styles.form}>
                        <TextField 
                            id='email' 
                            name='email' 
                            type='email' 
                            variant='outlined'
                            error={formik.touched.email} 
                            placeholder="Enter Email"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange} 
                            value={formik.values.email}>
                        </TextField>
                        {formik.touched.email && formik.errors.email ? <span style={{color: 'red', fontFamily: '-Playfair-Display', textAlign: "left"}}>{formik.errors.email}</span> : null}
                        <TextField 
                            id='password' 
                            name='password' 
                            type='password'
                            error={formik.touched.password} 
                            placeholder="Enter Password" 
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange} 
                            value={formik.values.password}>
                        </TextField>
                        {formik.touched.password && formik.errors.password ? <span style={{color: 'red', fontFamily: '-Playfair-Display', textAlign: "left"}}>{formik.errors.password}</span> : null}
                    </div>
                    <Button type='submit' color='primary' variant='contained' style={{margin: '8px 0', backgroundColor: '#22443d'}} >Login</Button>
                </form>
            </Paper>
        </Grid>
        </ThemeProvider>
    )
}

export default LoginForm;