import { Button, Grid, Paper, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import react, { useState } from 'react'
import { useRecoilValue } from 'recoil';
import { InviteToGroup } from '../Api/GroupApi';
import UserState from '../Atoms/UserAtom';


const useStyles = makeStyles({
    paper: {
    padding: '15px'
    },
    loginInput: {
        paddingBottom: '15px !important',
    },
});

const GroupProfileAdministrationPanel = (props)=>{
    const {id} = props;
    const user = useRecoilValue(UserState)
    const [inviteName, setInviteName] = useState("");
    const classes = useStyles();
    const handleInviteButton = ()=>{
        InviteToGroup(user.token, id, inviteName);
    }

    return (<Paper className={classes.paper}>
        Administration
        <Grid container spacing={2}>
            <Grid item xs={9}><TextField className="form-control" fullWidth value={inviteName} onChange={ev=>{setInviteName(ev.target.value)}} /></Grid>
            <Grid item xs={2}><Button variant="contained" color="primary" align="center" onClick={handleInviteButton}>Invite</Button></Grid>
        </Grid>
    </Paper>)

}
export default GroupProfileAdministrationPanel;