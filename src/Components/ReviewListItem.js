import { MergeTypeSharp } from '@mui/icons-material';
import { Typography, Grid, Paper, Chip, Button} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {useRecoilValue} from 'recoil'
import { DeleteReview } from '../Api/BeerApi';
import UserState from '../Atoms/UserAtom'
import ReviewExtraComponents from './ReviewExtraCompoenents';


const useStyles = makeStyles({
    paper: {
        backgroundColor: '#204a24 !important',
        color: 'white !important',
        padding: '15px',
    },
    root: {
        paddingBottom: '1px'
    },
    chip: {
        color: 'white !important'
    }
});

const saneFormat = (n)=>Math.floor(n*2)/2

function ReviewListItem(props) {
    const {review} = props;
    const user = useRecoilValue(UserState);
    const classes = useStyles()
    const handleDelete = () => {
        DeleteReview(review.id, user.token).then(()=>{
            window.location.reload();
        }).catch(e=>{
            console.log(e);
        })
    }



    // if any extra info is filled out, show an accordion with that information... 
    const ShowExtraInfoAccordion = (review.appearanceDescription !== null || review.aromaBalance !== null || review.aromaDescription !== null || 
        review.aromaImpression !== null || review.aromaIntensity !== null || review.clarity !== null || review.color !== null || review.flavorBalance !== null ||
        review.flavorDescription !== null || review.flavorImpression !== null || review.flavorIntensity !== null || review.headQuality !== null)

    console.log(review.timestamp);
    const dateCreated = new Date(review.timestamp);
    const daysDelta = (new Date() - dateCreated) / (1000 * 60 * 60 * 24); 
    return (
        <Grid item xs={10} className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12} container spacing={2} justifyContent="space-evenly">
                        <Grid item xs={10}>
                            <Chip label={`${review.userName}`} className={classes.chip}/> 
                            <Chip className={classes.chip} label={`${(dateCreated.getHours())}:${dateCreated.getMinutes()} ${dateCreated.getDate() }/${dateCreated.getUTCMonth()}/${dateCreated.getFullYear()}  (Fyrir ${saneFormat(daysDelta)} dögum)  ` }/> 
                        </Grid>
                        <Grid item xs={1}>
                            {user && user.id === review.userId && <Button onClick={handleDelete} variant="contained" fullWidth color="error">X</Button> }
                        </Grid>
                    </Grid>
                
                    <Grid item container xs={12}justifyContent="space-evenly">
                        <Grid item xs={3}>
                            <Typography variant="h5">Einkunn:</Typography> 
                        </Grid>
                        
                        <Grid item xs={3}>
                            <Typography variant="h5">{review.score}/10</Typography> 
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="h5">Fjöldi bjóra: {review.beerNumber}</Typography> 
                        </Grid>
                        {ShowExtraInfoAccordion && 
                            <Grid item xs={12}>
                                <ReviewExtraComponents review={review} />
                            </Grid>
                        }

                        
                    </Grid>
                
                
                
                
                </Grid>

            </Paper>
        </Grid>
    );
}

export default ReviewListItem;
