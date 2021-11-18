import { Grid, Link, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { GetTypeList } from '../Api/BeerApi';


const useFetch = (setTypes)=>{useEffect(() => {
    GetTypeList().then(result=>{
        setTypes(result);
    }).catch(error=>{

    });
}, [setTypes])}


function TypeList() {
    
    const [types, setTypes] = useState(null);

    useFetch(setTypes)
    return (
        <Grid container justifyContent="center">
            <Paper>

                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12}>
                        <Typography variant="h2">Bjór tegundir.</Typography>
                    </Grid>
                    {types &&
                        <Grid container spacing={2} item xs={8}>
                    {types.map(type=><Grid item xs={12}><Link href={`/type/${type.id}`}>{type.name}</Link></Grid>)}
                        </Grid>}
                    {!types && <Grid item xs={4}>Loading</Grid>}
                </Grid>


            </Paper>
        </Grid>
    );
}

export default TypeList;
