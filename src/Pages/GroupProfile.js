import { Button, Grid, IconButton, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useRecoilValue } from "recoil";
import { GetGroupFeed, GetGroupInfo, GetGroupMembers, InviteToGroup, KickUserFromGroup, LeaveGroup} from "../Api/GroupApi";
import UserState from "../Atoms/UserAtom";
import ReviewList from '../Components/ReviewList'
import StarIcon from '@mui/icons-material/Star';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from "@mui/styles";
import GroupProfileAdministrationPanel from "../Components/GroupProfileAdministrationPanel";


const useStyles = makeStyles({
    paper: {
      padding: '15px'
    },
    loginInput: {
      paddingBottom: '15px !important',
    },
  });

const useFetch = (groupId, setGroup, setMembers, setCurrentUserIsAdmin, setCurrentUserIsOwner, setFeed, user)=>{useEffect(() => {
    if(user == null){ return; }
    // GetGroupInfo(user.token, groupId).then
    GetGroupFeed(user.token, groupId).then(result=>{
        // console.log(result);
        setFeed(result);
    }).catch(error=>{
    });
    GetGroupMembers(user.token, groupId).then(result=>{
        let thisUser = result.filter(u=>u.id === user.id);
        setCurrentUserIsAdmin(thisUser[0].isAdministrator)
        setMembers(result)
    });
    GetGroupInfo(user.token, groupId).then(result=>{
        setGroup(result)
        setCurrentUserIsOwner(result.ownerId === user.id);
    });
}, [groupId, setGroup, setMembers, setCurrentUserIsAdmin, setCurrentUserIsOwner, setFeed, user])}


const GroupProfile = ()=>{
    
    const {id} = useParams();
    const classes = useStyles();
    const [members, setMembers] = useState(null);
    const [feed, setFeed] = useState(null);
    const user = useRecoilValue(UserState);
    const [group, setGroup] = useState(null);
    const [currentUserIsAdmin, setCurrentUserIsAdmin] = useState(null);
    const [currentUserIsOwner, setCurrentUserIsOwner] = useState(null);
    
    useFetch(id, setGroup, setMembers, setCurrentUserIsAdmin, setCurrentUserIsOwner, setFeed, user)

    const [inviteName, setInviteName] = useState("");

   
    

    const handleLeave = ()=>{
        LeaveGroup(user.token, id).then(result=>{
            window.location.navigate('/')
        }).catch(error=>{
            console.log('caught a leave errror...');
        });
    }

    // const handleInviteButton = ()=>{
    //     InviteToGroup(user.token, id, inviteName);
    // }

    const kickUser = (userId) => {
        console.log("kicking user ", userId);
        KickUserFromGroup(user.token, id, userId).then(()=>{
            window.location.refresh();
        }).catch(error=>{

        });
    }

    const RenderGroupMember = (member)=>{
        return (<Grid item container xs={12}key={`{member.id}${member.username}`} >
        <Grid item xs={6}> {member.username} </Grid>
        <Grid item xs={2}>
            {/* The  */}
            {(currentUserIsAdmin || member.id === user.id)&&<IconButton onClick={member.id===user.id?handleLeave:()=>{kickUser(member.id)}}><PersonRemoveIcon /></IconButton>}
        </Grid>
    </Grid>);
    }

    // console.log(id, members, feed, user)

    return (
        <Grid container spacing={2}>
            <Grid item xs={4} container>
                <Paper className={classes.paper}>
                    
                    {!group && <CircularProgress />}
                    {group && <Grid item xs={12}>{group.title}</Grid>}
                    {/* Group #1 */}
                </Paper>
            </Grid>

            {currentUserIsAdmin && <Grid item xs={6}>
                {/* <Paper className={classes.paper}>
                    Administration
                    <Grid container spacing={2}>
                        <Grid item xs={9}><TextField className="form-control" fullWidth value={inviteName} onChange={ev=>{setInviteName(ev.target.value)}} /></Grid>
                        <Grid item xs={2}><Button variant="contained" color="primary" align="center" onClick={handleInviteButton}>Invite</Button></Grid>
                    </Grid>
                </Paper>     */}
                <GroupProfileAdministrationPanel id={id} /> 
            </Grid>}

            <Grid item xs={12} container spacing={2}>
                <Grid item xs={4} >
                    <Paper className={classes.paper}>
                        {!members && <CircularProgress />}
                        {members && <Grid item xs={12} container spacing={2}>
                            
                            {/* Render administrators */}
                            <Typography>Stjórnendur</Typography>
                            {members.filter(m=>m.isAdministrator).map(RenderGroupMember)}
                            {/* Render members */}
                            <Typography>Meðlimir</Typography>
                            {members.filter(m=>!m.isAdministrator).map(RenderGroupMember)}

                        </Grid>}
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    {/* <Paper> */}
                    {!feed && <CircularProgress />}
                    {feed && <ReviewList reviews={feed} displayBeerName/>}
                        
                    {/* </Paper> */}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default GroupProfile;