import { Grid, Typography, Paper, Link } from '@mui/material';
import { useEffect, useState } from 'react';
import { GetTypeBeerList, GetTypeBeerListForUser } from '../Api/BeerApi';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import UserState from '../Atoms/UserAtom';
import UserBeerDataTable from '../Components/DataTables/UserBeerDataTable';
import BeerDataTable from '../Components/DataTables/BeerDataTable';

const useFetch = (token, typeId, setBeers)=>{useEffect(() => {
    if(token){
        GetTypeBeerListForUser(typeId, token).then(result=>{
            setBeers(result);
        }).catch(error=>{
        });
    } else {
        GetTypeBeerList(typeId).then(result=>{
            setBeers(result);
        }).catch(error=>{
        });
    }
}, [token, typeId, setBeers])}

function TypeProfile() {
    
    const {id} = useParams();
    
    const [type, setType] = useState(null);
    const [beers, setBeers] = useState(null);

    const user = useRecoilValue(UserState);

    useFetch(user?user.token:null,id, setBeers)

    return (
        <Grid container justifyContent="center">
            <Paper>
                
                {user && beers && <UserBeerDataTable beers={beers}/>}
                {!user && beers && <BeerDataTable beers={beers}/>}
            </Paper>
        </Grid>
    );
}

export default TypeProfile;
