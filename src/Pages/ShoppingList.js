// import logo from './logo.svg';
// import './App.css';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { GetBeers, GetBeersForUser} from '../Api/BeerApi';
import UserState from '../Atoms/UserAtom';
import UserBeerDataTable from '../Components/DataTables/UserBeerDataTable';
import BeerDataTable from '../Components/DataTables/BeerDataTable';
import { AlphabeticalBeerSort } from '../Helpers/AlphabeticalSort';

const useFetch = (token, setBeers)=>{useEffect(() => {
    if(token){
        GetBeersForUser(token).then(result=>{
            setBeers(result);
        }).catch(error=>{
            
        });
    }
    else {
        GetBeers().then(result=>{
            result.sort(AlphabeticalBeerSort)
            setBeers(result);
        }).catch(error=>{
    
        });
    }
}, [token, setBeers])}
  


function ShoppingList() {
    const user = useRecoilValue(UserState);
    const [beers, setBeers] = useState(null);
    useFetch(user?user.token:null, setBeers);
    return (
        <div className="">
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={11}>
                    {user && beers && <UserBeerDataTable beers={beers} /> }
                    {!user && beers && <BeerDataTable beers={beers} />}
                </Grid>
            </Grid>
        </div>
    );
}

export default ShoppingList;
