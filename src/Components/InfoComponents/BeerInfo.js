
import { Grid, Link, Paper, Typography } from '@mui/material';
import {makeStyles} from '@mui/styles';
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


function round(n){
  return Math.round(n*100)/100
}

function BeerInfo(props){
    const {beer} = props;
    const classes = useStyles();
    return (




      <Grid item xs={12} container justifyContent="center" spacing={2} className={classes.root}>
        <Grid item xs={6}>
          <Paper style={{height:'90%'}} className={classes.paper}>
            <Typography align="center" variant="h6">
              {beer.name}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={6} container spacing={2} >

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography align="center" >
                  {/* <img src={breweryIcon} className={classes.svgIcon} alt="logo" /> */}
                  Brugghús:
                  <Link color="primary" href={`/brewery/${beer.manufacturerId}`}> {beer.manufacturerName} </Link>
              </Typography>
            </Paper>
          </Grid>
    
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography align="center" >
                      Tegund: 
                  <Link color="primary" href={`/type/${beer.typeId}`}> {beer.typeName} </Link>
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography align="center">
                Áfengismagn: {round(beer.abv*100)}% 
              </Typography>
            </Paper>
          </Grid>


        </Grid>
  
        
      </Grid>
    );
  }

export default BeerInfo;