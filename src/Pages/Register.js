
import { Button, Grid, Link, Paper, TextField, Typography } from '@mui/material';

import UserState from '../Atoms/UserAtom';
import { useRecoilValue } from 'recoil';
import { Navigate } from 'react-router';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import {RegisterApi} from '../Api/AuthenticationApi';

const useStyles = makeStyles({
  paper: {
    padding: '15px'
  },
  loginInput: {
    paddingBottom: '15px !important',
  },
});


function Register() {

  const classes = useStyles();
  const handleClick =()=>{
    if(findPasswordError()!==""){
      return
    }
    RegisterApi(userName, password1).then(data=>{
      window.location = '/login'
    }).catch(e=>{
      setUserNameError(e.details);
    })
  }
  const user = useRecoilValue(UserState);
  
  const [userName, setUserName] = useState("");
  const [password1, setPassword1] = useState("");  
  const [password2, setPassword2] = useState("");
  const [userNameError, setUserNameError] = useState("");

  const findPasswordError = ()=>{
    if(password1.length < 8){return "Password must be 8 characters minimum.";}
    if(password1 !== password2){return "Passwords must match";}
    return ""
  }


  return (
    <div className="">
      {user && <Navigate to='/' />}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={7}>
          <Paper className={classes.paper}>
            <Typography variant="h5" align="center">
              Nýskrá inn á jólabjórsmakkið. Áttu þegar aðgang? <Link href="login">skráðu þig inn í staðinn</Link>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={7}>
          <Paper className={classes.paper}>
            <TextField value={userName} className={classes.loginInput} onChange={ev=>{setUserName(ev.target.value)}} label="Username" variant="outlined" fullWidth error={userNameError!==""} helperText={userNameError} />
            <Typography variant="caption">There is no requirement for password complexity except for a minimum length of 8 characters, but at least try.</Typography>
            <TextField error={findPasswordError()!==""}   value={password1} className={classes.loginInput} onChange={ev=>{setPassword1(ev.target.value)}} label="Password" type="password" variant="outlined" fullWidth/>
            <TextField error={findPasswordError()!==""} helperText={findPasswordError()}  value={password2} className={classes.loginInput} onChange={ev=>{setPassword2(ev.target.value)}} label="Repeat password" type="password" variant="outlined" fullWidth/>
            <Button color="primary" variant="contained" align="center" onClick={handleClick} disabled={findPasswordError()!==""}>Register</Button>
          </Paper>
        </Grid>

      </Grid>
    </div>
  );
}

export default Register;
