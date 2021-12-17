import AddIcon from '@mui/icons-material/Add';
import { Accordion, AccordionDetails, AccordionSummary, Button, CircularProgress, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import UserState from '../Atoms/UserAtom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { CreateGroup, GetMyGroups } from '../Api/AuthenticationApi';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
  paper: {
    padding: '15px'
  },
  loginInput: {
    paddingBottom: '15px !important',
  },
});


const useFetch = (setGroups, user)=>{useEffect(() => {
  console.log(user);
  if(user == null){ return; }
  GetMyGroups(user.token).then(result=>{
      setGroups(result);
  }).catch(error=>{

  });
}, [setGroups, user])}




function MyGroups() {
  const classes = useStyles();
  const user = useRecoilValue(UserState);
  const [groups, setGroups] = useState(null);
  useFetch(setGroups, user); 

  
  const [newGroupTitle, setNewGroupTitle] = useState("");
  function AddGroup(){
    if(user === null){ return; }
    CreateGroup(user.token, newGroupTitle).then(result=>{
      // window.location.reload();
    })
  }
  console.log(groups);
  
  return (
    <Grid className="" container spacing={2}>
      <Grid item xs={8}>
        <Accordion>
          <AccordionSummary
            expandIcon={<AddIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography>Búa til nýjan hóp</Typography>
          </AccordionSummary>
          <AccordionDetails>
            Title: <TextField value={newGroupTitle} onChange={(e)=>setNewGroupTitle(e.target.value)}/>
            <Button variant="contained" color="primary" onClick={AddGroup}>Add</Button>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paper}>
            {groups === null && <Grid item xs={12}> <CircularProgress /> </Grid> }
            {groups !== null && <Grid item xs={12} container>
            {groups.map(group=><Grid item xs={12} key={`${group.id}:${group.title}`} > <Link href={`/groups/${group.id}`}>{group.title}</Link> </Grid> )}
          </Grid>}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default MyGroups;
