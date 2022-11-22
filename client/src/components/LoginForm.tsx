import { ThemeProvider } from "@emotion/react";
import { Button, createTheme, Grid, Paper, TextField, Typography } from "@mui/material";

const paperStyle = {padding: 20, height: '18rem', width: '25rem'}
const textStyle = {margin: 4}

const theme = createTheme({
    typography: {
        fontFamily: [
            '-Playfair-Display'
        ].join(','),
    },
});

function LoginForm() {
    return (
        <ThemeProvider theme={theme}>
        <Grid textAlign='center'>
            <Paper elevation={10} style={paperStyle}>
                <Grid textAlign='center'>
                    
                    <Typography variant='h3'>Login</Typography>
                </Grid>
                <TextField style={textStyle} label='Email' placeholder="Enter Email" fullWidth required></TextField>
                <TextField style={textStyle} label='Password' placeholder="Enter Password" type='password' fullWidth required></TextField>
                <Button type='submit' color='primary' variant='contained' style={{margin: '8px 0', backgroundColor: '#22443d'}} >Login</Button>
            </Paper>
        </Grid>
        </ThemeProvider>
    )
}

export default LoginForm;