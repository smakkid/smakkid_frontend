
import { Button, Grid, Paper, Typography } from '@mui/material';
import UserState from '../Atoms/UserAtom';
import { useSetRecoilState } from 'recoil';


function Profile() {
  
  const setUser = useSetRecoilState(UserState);

  const handleLogout =()=>{
    localStorage.removeItem('user');
    setUser(null);
    window.location.replace('/')
  }

  return (
    <Grid className="">
      <Paper>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleLogout}>Logout</Button>
        </Grid> 
      </Paper>
      <Typography>
        </Typography>
    </Grid>
  );
}

export default Profile;
