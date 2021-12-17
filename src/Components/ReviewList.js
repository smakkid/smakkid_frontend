
import { Grid } from '@mui/material';
import ReviewListItem from '../Components/ReviewListItem';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    
    root: {
        marginBottom: '25px'
    }
});

function Register(props) {
    const {reviews, displayBeerName} = props;
    const classes = useStyles();
    reviews.sort((a, b)=> new Date(b.timestamp)-new Date(a.timestamp))
    return (
        <Grid container className={classes.root} justifyContent="center" spacing={2}>
            {reviews.map(review=><ReviewListItem key={`review:${review.id}`} review={review} displayBeerName={displayBeerName===true} />)}
        </Grid>
    );
}

export default Register;
