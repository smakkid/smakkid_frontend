import { Grid, Link, Paper, Typography } from '@mui/material';
import {makeStyles} from '@mui/styles';
import { useEffect } from 'react';
const useStyles = makeStyles({
    paper: {
        backgroundColor: '#204a24 !important',
        padding: '10px',
        color: 'white !important'
    },
    svgIcon: {
        height: '50px',
        width: '50px'
    },
    root:{
      paddingBottom: '15px'
    }
});

const useFetch = (setScorings, token)=>{useEffect(() => {
    GetMyHistogram(token).then(result=>{
        setScorings(result);
    }).catch(error=>{

    });
}, [setScorings, token])}



function round(n){
  return Math.round(n*100)/100
}

function BreweryInfo(props){
    const {breweryId} = props;
    const classes = useStyles();
    return (




      <Grid item xs={12} container justifyContent="center" spacing={2} className={classes.root}>
        


      </Grid>
    );
  }

export default BeerInfo;