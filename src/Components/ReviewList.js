
import { Grid } from '@mui/material';
import ReviewListItem from '../Components/ReviewListItem';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    
    root: {
        marginBottom: '25px'
    }
});

function Register(props) {
    const {reviews} = props;
    const classes = useStyles();
  return (
      <Grid container className={classes.root} justifyContent="center">
          {reviews.map(review=><ReviewListItem review={review} />)}
      </Grid>
  );
}

export default Register;
