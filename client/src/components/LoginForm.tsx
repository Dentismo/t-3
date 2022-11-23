import { ThemeProvider } from "@emotion/react";
import { Button, createTheme, Grid, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";

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
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[error, setError] = useState(false);
    const[passwordError, setPasswordError] = useState(false);

    const loginClick = () => {
        if(!email) {
            setError(true);
            return null;
        } 
            setError(false);
            return null;
        
    };

    return (
        <ThemeProvider theme={theme}>
        <Grid textAlign='center'>
            <Paper elevation={10} style={paperStyle}>
                <Grid textAlign='center'>
                    
                    <Typography variant='h3'>Login</Typography>
                </Grid>
                <TextField style={textStyle} label='Email' placeholder="Enter Email" fullWidth required value={email} error={error} name='email' onChange={(e) => setEmail(e.target.value)}></TextField>
                <TextField style={textStyle} label='Password' placeholder="Enter Password" type='password' fullWidth required value={password} error={error} name='password' onChange={(e) => setPassword(e.target.value) }></TextField>
                <Button onClick={loginClick} type='submit' color='primary' variant='contained' style={{margin: '8px 0', backgroundColor: '#22443d'}} >Login</Button>
            </Paper>
        </Grid>
        </ThemeProvider>
    )
}

export default LoginForm;