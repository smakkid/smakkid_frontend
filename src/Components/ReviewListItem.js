import { Typography, Grid, Paper, Chip, Button, Avatar, useMediaQuery} from '@mui/material';
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
    const {review, displayBeerName} = props;
    const user = useRecoilValue(UserState);
    const classes = useStyles()
    const handleDelete = () => {
        DeleteReview(review.id, user.token).then(()=>{
            window.location.reload();
        }).catch(e=>{
            console.log(e);
        })
    }


    const isMobile = !useMediaQuery('(min-width:700px)');


    // if any extra info is filled out, show an accordion with that information... 
    const ShowExtraInfoAccordion = (review.appearanceDescription !== null || review.aromaBalance !== null || review.aromaDescription !== null || 
        review.aromaImpression !== null || review.aromaIntensity !== null || review.clarity !== null || review.color !== null || review.flavorBalance !== null ||
        review.flavorDescription !== null || review.flavorImpression !== null || review.flavorIntensity !== null || review.headQuality !== null)

    const dateCreated = new Date(review.timestamp);
    const weeksDelta = (new Date() - dateCreated) / (1000 * 60 * 60 * 24 * 7)
    const daysDelta = (new Date() - dateCreated) / (1000 * 60 * 60 * 24); 
    const hoursDelta = (new Date() - dateCreated) / (1000 * 60 * 60); 
    const minutesDelta = (new Date() - dateCreated) / (1000 * 60 )
    
    let timeString = "";
    if(weeksDelta < 1){
        if(minutesDelta < 60){
            timeString = `Fyrir ${saneFormat(minutesDelta)} mínútum`;    
        }
        else if(hoursDelta < 24){
            timeString = `Fyrir ${saneFormat(hoursDelta)} klukkutímum`;
        } else {
            timeString = `Fyrir ${saneFormat(daysDelta)} dögum`;
        }
    } else {
        timeString = `Fyrir ${saneFormat(weeksDelta)} vikum`;
    }

    return (
        <Grid item xs={10} className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>

                    <Grid item xs={12} container spacing={2} justifyContent="space-evenly">
                        {displayBeerName && <Grid item xs={12}>
                            {review.beerName}    
                        </Grid>}
                        <Grid item xs={isMobile?6:1}>
                            <Chip label={`${review.userName}`} className={classes.chip}/> 
                        </Grid>

                        <Grid item xs={isMobile?6:4}>
                            { `${timeString}` }
                            {/* {!isMobile && `${(dateCreated.getHours())}:${dateCreated.getMinutes()} ${dateCreated.getDate() }/${dateCreated.getUTCMonth()}/${dateCreated.getFullYear()}  (${timeString})  `  } */}
                            {/* <Chip className={classes.chip} label={`${(dateCreated.getHours())}:${dateCreated.getMinutes()} ${dateCreated.getDate() }/${dateCreated.getUTCMonth()}/${dateCreated.getFullYear()}  (Fyrir ${saneFormat(daysDelta)} dögum)  ` }/>  */}
                        </Grid>
              
                        <Grid item xs={1}>

                            <Avatar>{review.score}</Avatar> 
                        </Grid>

                        <Grid item xs={2}>
                            <Typography>Fjöldi bjóra: {review.beerNumber}</Typography> 
                        </Grid>

                        <Grid item xs={1}>
                            {user && user.id === review.userId && <Button onClick={handleDelete} variant="contained" fullWidth color="error">X</Button> }
                        </Grid>
                        {/* Extra info if there is any... */}
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
