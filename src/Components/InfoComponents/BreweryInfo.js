import { Grid, Link, Paper, Typography } from '@mui/material';
import {makeStyles} from '@mui/styles';
import { useEffect, useState } from 'react';
import { GetBreweryInfo } from '../../Api/BeerApi';
const useStyles = makeStyles({
    paper: {
        backgroundColor: '#204a24 !important',
        padding: '10px',
        color: 'white !important',
        // width: '100%'
        // marginTop: '15px',
        // marginBottom: '15px'
    },
    svgIcon: {
        height: '50px',
        width: '50px'
    },
    root:{
      paddingBottom: '15px'
    }
});

const useFetch = (setBreweryInfo, breweryId)=>{useEffect(() => {
    GetBreweryInfo(breweryId).then(result=>{
      setBreweryInfo(result);
    }).catch(error=>{

    });
}, [setBreweryInfo, breweryId])}



function round(n){
  return Math.round(n*100)/100
}

function BreweryInfo(props){
    const {breweryId} = props;
    const [breweryInfo, setBreweryInfo] = useState(null);
    const classes = useStyles();

    useFetch(setBreweryInfo, breweryId);

    return (




      <Grid item xs={6} container justifyContent="center" spacing={2} className={classes.root} style={{marginBottom: '15px', marginTop: '15px'}} >
        
        <Paper className={classes.paper}>

          {breweryInfo && <Grid container>

            <Grid item xs={12}>
              <Typography variant="h5">{breweryInfo.name} - {breweryInfo.countryName}</Typography>
            </Grid>
              

            
          </Grid>}

          {!breweryInfo && <Typography>Loading</Typography>}

        </Paper>

      </Grid>
    );
  }

export default BreweryInfo;