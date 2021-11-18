// import logo from './logo.svg';
// import './App.css';

import { Authenticate } from '../Api/AuthenticationApi'; 

import { Button, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import UserState from '../Atoms/UserAtom';
import { useSetRecoilState } from 'recoil';
import { useState } from 'react';


const useStyles = makeStyles({
  paper: {
    padding: '15px'
  },
  loginInput: {
    paddingBottom: '15px !important',
  },
});




function Login() {

  const setUser = useSetRecoilState(UserState);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const classes = useStyles();

  const [loginError, setLoginError] = useState("");

  const handleClick =()=>{
    Authenticate(userName, password).then(data=>{
      setUser(data);
      localStorage.setItem(
        'user',
        JSON.stringify(data)
      )
      window.location='/'

    }).catch(error=>{
      //display error!
      setLoginError(error.details);
    })
  }
  return (
    <div className="">
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={7}>
          <Paper className={classes.paper}>
            <Typography variant="h5" align="center">
              Skrá inn á jólabjórsmakkið
            </Typography>
            <Typography variant="h5" align="center">
              Áttu ekki aðgang? <Link href="/register">Nýskrá</Link>
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={7}>
          <Paper className={classes.paper}>
            <TextField error={loginError!==''} helperText={loginError} value={userName} className={classes.loginInput} onChange={ev=>{setUserName(ev.target.value)}} label="Notandanafn" variant="outlined" fullWidth/>
            <TextField value={password} className={classes.loginInput} onChange={ev=>{setPassword(ev.target.value)}} label="Leyniorð" type="password" variant="outlined" fullWidth/>
            <Button color="primary" variant="contained" align="center" onClick={handleClick}>Skrá inn</Button>
          </Paper>
        </Grid>
    
      </Grid>
    </div>
  );
}

export default Login;
