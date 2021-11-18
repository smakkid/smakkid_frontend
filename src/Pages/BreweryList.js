import { Grid, Typography, Paper, Link } from '@mui/material';
import { useEffect, useState } from 'react';

import { GetBreweryList } from '../Api/BeerApi';

const useFetch = (setBreweries)=>{useEffect(() => {
    GetBreweryList().then(result=>{
        setBreweries(result);
    }).catch(error=>{

    });
}, [setBreweries])}


function BreweryList() {
    
    const [breweries, setBreweries] = useState(null);


    useFetch(setBreweries)

    return (
        <Grid container justifyContent="center">
            <Paper>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12}>
                        <Typography variant="h2">Brugghús</Typography>
                    </Grid>
                    {breweries &&
                    <Grid container spacing={2} item xs={8}>
                        {breweries.map(brewery=><Grid item xs={12}><Link href={`/brewery/${brewery.id}`}>{brewery.name}</Link></Grid>)}
                    </Grid>}
                    {!breweries && <Grid item xs={4}>Loading</Grid>}
                </Grid>


            </Paper>
        </Grid>
    );
}

export default BreweryList;
