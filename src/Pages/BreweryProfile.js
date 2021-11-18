import { Grid, Typography, Paper, Link } from '@mui/material';
import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import UserState from '../Atoms/UserAtom';
import { useRecoilValue } from 'recoil';
import { GetBreweryBeerList, GetBreweryBeerListForUser } from '../Api/BeerApi';
import UserBeerDataTable from '../Components/DataTables/UserBeerDataTable';
import BeerDataTable from '../Components/DataTables/BeerDataTable';

const useFetch = (token, id, setBeers)=>{useEffect(() => {
    if(token){

        GetBreweryBeerListForUser(id, token).then(result=>{
            console.log("setting beers");
            setBeers(result);
        }).catch(error=>{
    
        });


    } else {

        GetBreweryBeerList(id).then(result=>{
            setBeers(result);
        }).catch(error=>{
    
        });
    }
}, [token, id, setBeers])}


function BreweryProfile() {
    const {id} = useParams();
    const [brewery, setBrewery] = useState(null);
    const [beers, setBeers] = useState(null);

    const user = useRecoilValue(UserState);
    
    useFetch(user?user.token:null, id, setBeers)

    return (
        <Grid container justifyContent="center">
            <Paper>
                
                {user && beers && <UserBeerDataTable beers={beers}/>}
                {!user && beers && <BeerDataTable beers={beers}/>}
                
            </Paper>
        </Grid>
    );
}

export default BreweryProfile;
