import { Button, Grid } from '@mui/material';
import useState from 'react'
import { useRecoilValue } from 'recoil';
import { RespondToInvitation } from '../Api/GroupApi';
import UserState from '../Atoms/UserAtom';



const Notification = (props)=>{
    const {notification} = props;
    console.log(props);
    
    const user = useRecoilValue(UserState);

    const handleAccept = ()=>{
        RespondToInvitation(user.token, notification.groupId, true);
        window.location.reload();
    }
    const handleReject = ()=>{
        RespondToInvitation(user.token, notification.groupId, false);
        window.location.reload();
    }

    return (<Grid item xs={12} container>
        {/* <Grid item xs={12}>
            
        </Grid> */}
        <Grid item xs={6}>
            {notification.inviterName} invited you to the group {notification.groupName}.
        </Grid>
        <Grid item xs={6} container>
            <Grid item xs={6}>
                <Button variant="contained" color="primary" onClick={handleAccept}>Accept</Button>
            </Grid>
            <Grid item xs={6}>
                <Button variant="contained" color="error" onClick={handleReject}>Deny</Button>
            </Grid>
        </Grid>
    </Grid>)
}

export default Notification;
