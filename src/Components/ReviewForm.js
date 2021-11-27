
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Paper, Slider, TextField, Typography, useMediaQuery} from '@mui/material';
import {makeStyles} from '@mui/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import { GetMyHistogram, PostReviewForBeer } from '../Api/BeerApi';

import AppearanceAccordion from './ReviewOptionalParts.js/AppearanceAccordion';
import AromaAccordion from './ReviewOptionalParts.js/AromaAccordion';
import FlavorAccordion from './ReviewOptionalParts.js/FlavorAccordion';
const useStyles = makeStyles({
    paper: {
        backgroundColor: '#204a24 !important',
        padding: '10px',
    },
    topLevelAccordion: {
        backgroundColor: 'red'
    },
    bottomLevelAccordion: {
        background: '#00000000'
    },
    input: {
        paddingBottom: '15px',
    },
    foo: {
        margin: 'auto',
        width:'50%'
    },
    root: {
        marginBottom: '10px'
    }
});

const useFetch = (setScorings, token)=>{useEffect(() => {
    GetMyHistogram(token).then(result=>{
        setScorings(result);
    }).catch(error=>{

    });
}, [setScorings, token])}



// "🗸"

function ReviewForm(props){
    const {beerId, token, beerName} = props;
    const [score, setScore] = useState(5);
    const [number, setNumber] = useState(1);
    // looks...
    const [color, setColor] = useState(null);
    const [clarity, setClarity] = useState(null);
    const [headQuality, setHeadQuality] = useState(null);
    const [appearanceDescription, setAppearanceDescription] = useState("")
    // aroma stuff
    const [aromaIntensity, setAromaIntensity] = useState(null);
    const [aromaBalance, setAromaBalance] = useState(null);
    const [aromaImpression, setAromaImpression] = useState(null);
    const [aromaDescription, setAromaDescription] = useState("");
    // Flavor stuff
    const [flavorIntensity, setFlavorIntensity] = useState(null);
    const [flavorBalance, setFlavorBalance] = useState(null);
    const [flavorImpression, setFlavorImpression] = useState(null);
    const [flavorDescription, setFlavorDescription] = useState("");
    // to make your current scoring relative to the other scoring.
    const [scorings, setScorings] = useState([]);

    
    const isMobile = !useMediaQuery('(min-width:600px)');

    useFetch(setScorings, token);

    const handleClick = () =>{
        PostReviewForBeer(token, beerId, score, number, 
                color, clarity, headQuality, appearanceDescription===''?null:appearanceDescription, 
                aromaIntensity, aromaBalance, aromaImpression, aromaDescription===''?null:aromaDescription,
                flavorIntensity, flavorBalance, flavorImpression, flavorDescription===''?null:flavorDescription
            ).then(data=>{
            window.location.reload();
        }).catch(error=>{

        });
    };

    const relatives = 6; // +1..
    let ratingsLessThanCurrentScore = scorings.filter(x=>x.averageScore < score).sort((x, y)=>y.averageScore-x.averageScore);
    let ratingsMoreThanCurrentScore = scorings.filter(x=>x.averageScore > score).sort(x=>x.averageScore)
    

    // if the length of the other options are less than 3, add that difference 
    ratingsLessThanCurrentScore = ratingsLessThanCurrentScore.slice(0, 3 + Math.max(3, 3-ratingsMoreThanCurrentScore.length) ).sort((x, y)=>y.averageScore-x.averageScore);

    ratingsMoreThanCurrentScore = ratingsMoreThanCurrentScore.slice(0, 3 + Math.max(3, 3-ratingsLessThanCurrentScore.length) ).sort((x, y)=>y.averageScore-x.averageScore);

    const handleNumberChange = (increment)=>{
        const newNumber = number + increment;
        if(newNumber < 1){ return; }
        setNumber(newNumber);
    }

    const classes = useStyles();
    return (
        <Grid item xs={12} className={classes.root}>
            {/* {shouldRedirectToMain && <Navigate  to={`/Beer/${beerId}`} />} */}
            {/* <Paper className={classes.paper}> */}
                <Accordion   className={classes.topLevelAccordion}>
                    <AccordionSummary expandIcon={<MenuIcon />} aria-controls="panel1a-content" id="panel1a-header" >
                        <Typography className={classes.heading}>Gefðu {beerName} einkunn</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}  justifyContent="center">
                            <Grid item xs={12} container spacing={2} justifyContent="center">
                                <Grid item xs={isMobile?12:4}>
                                    {/* <TextField value={number} min={1} onChange={ev=>{if(ev.target.value>=1){setNumber(ev.target.value)}}} label="Númer Bjórs" type="number"  InputLabelProps={{ shrink: true, }} fullWidth />   */}
                                    <Typography variant="h6">Númer bjórs í kvöld: {number} {number >= 10 && '😨'}</Typography>
                                </Grid>
                                <Grid item xs={1}> 
                                    <Button variant="contained" fullWidth color="primary" onClick={()=>{handleNumberChange(-1) }} >-</Button>
                                </Grid>
                                <Grid item xs={1}> 
                                    <Button variant="contained" fullWidth color="primary" onClick={()=>{handleNumberChange(1) }} >+</Button>
                                </Grid>

                            </Grid>

                            <Grid item container xs={12} spacing={2}>
                                <Grid item container xs={isMobile?12:4} spacing={2} justifyContent="center">
                                    <Grid item xs={8}>
                                        <Slider value={score} onChange={ev=>{setScore(ev.target.value)}}   min={0} max={10} step={0.1} aria-label="Default" valueLabelDisplay="auto" />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography align="center">{score}/10</Typography>
                                    </Grid>
                                    
                                </Grid>
                                <Grid item xs={isMobile?12:6}>
                                    <Typography variant="h6" fontWeight="bold">Þín einkunn:</Typography>
                                    {/* 6 lines are less messy than this for loopage...
                                    {ratingsMoreThanCurrentScore.length < 3 && <Typography>. . .</Typography> }
                                    {ratingsMoreThanCurrentScore.length < 2 && <Typography>. . .</Typography> }
                                    {ratingsMoreThanCurrentScore.length < 1 && <Typography>. . .</Typography> } */}
                                    {/* Render beers with score greater than the current one */}
                                    {ratingsMoreThanCurrentScore.map(r=><Typography key={`${r.beerName}${r.averageScore}`} >{r.beerName} ({r.averageScore})</Typography> )}
                                    <Typography fontWeight="bold" >{beerName} ({score})</Typography>
                                    {ratingsLessThanCurrentScore.map(r=><Typography key={`${r.beerName}${r.averageScore}`}>{r.beerName} ({r.averageScore})</Typography> )}
                                    {/* 6 lines are less messy than this for loopage... */}
                                    {/* {ratingsLessThanCurrentScore.length < 1 && <Typography> </Typography> }
                                    {ratingsLessThanCurrentScore.length < 2 && <Typography> </Typography> }
                                    {ratingsLessThanCurrentScore.length < 3 && <Typography> </Typography> } */}
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Accordion style={{backgroundColor: '#C5C5C5'}}>
                                    <AccordionSummary expandIcon={<MenuIcon />} aria-controls="panel1a-content">
                                        <Typography className={classes.heading}>Nánar (valkvæmt)</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <AppearanceAccordion color={color} setColor={setColor}
                                            clarity={clarity} setClarity={setClarity} headQuality={headQuality}
                                            setHeadQuality={setHeadQuality} appearanceDescription={appearanceDescription}
                                            setAppearanceDescription={setAppearanceDescription} />
                                        <AromaAccordion aromaIntensity={aromaIntensity} setAromaIntensity={setAromaIntensity}
                                            aromaBalance={aromaBalance} setAromaBalance={setAromaBalance} aromaImpression={aromaImpression} 
                                            setAromaImpression={setAromaImpression} aromaDescription={aromaDescription} 
                                            setAromaDescription={setAromaDescription} />
                                        <FlavorAccordion flavorIntensity={flavorIntensity} setFlavorIntensity={setFlavorIntensity}
                                            flavorBalance={flavorBalance} setFlavorBalance={setFlavorBalance} flavorImpression={flavorImpression} 
                                            setFlavorImpression={setFlavorImpression} flavorDescription={flavorDescription} 
                                            setFlavorDescription={setFlavorDescription} />
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
                            <Grid item xs={2}>
                                <Button fullWidth variant="contained" color="primary" onClick={handleClick}>Post review </Button>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            {/* </Paper> */}
        </Grid>
    );
}

export default ReviewForm;