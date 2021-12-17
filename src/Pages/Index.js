// import logo from './logo.svg';
// import './App.css';
import { Autocomplete, TextField, Typography } from '@mui/material';
import {GetBeers} from '../Api/BeerApi'
import { useEffect, useState} from 'react';
import {makeStyles} from '@mui/styles';
import {AlphabeticalBeerSort} from '../Helpers/AlphabeticalSort';
// import {Redirect} from 'react-router-dom';

import { Navigate } from 'react-router-dom'
import { Grid } from '@material-ui/core';


const useFetch = (setBeers)=>{useEffect(() => {
    GetBeers().then(result=>{

        result.sort(AlphabeticalBeerSort);
        setBeers(result);
    }).catch(error=>{

    });
}, [setBeers])}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        margin: '20px',
        justifyContent: 'center'
    },
    search: {
        borderRadius: '10px',
        background: '#FFFFFFAF',
        display: 'flex',
        width: '70%'
    }
});
 
function Index() {
    const classes = useStyles();
    const [beers, setBeers] = useState([]);
    const [selection, setSelection] = useState(null);
    useFetch(setBeers)
    return (
        <Grid container justifyContent='center'>
            <Grid item xs={12} className={classes.root}>
                {selection && <Navigate to={`/beer/${selection.id}`} /> }
                <Autocomplete  className={classes.search}
                    freeSolo
                    id="combo-box-demo"
                    options={beers}
                    getOptionLabel={(beer)=>beer.name}
                    onChange={(event, newInputValue) => {
                        setSelection(newInputValue);
                    }}
                    // sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Leitaðu bjórs" />}
                    
                    
                />
                < br />
            </Grid>
            <Grid item xs={6}>
                <Typography align="center">Þessi síða er í smíði, og er vís til að breytast gjarna. Ef eitthvað virkar ekki, eða hegðar sér skringilega, er mögulegt að þú þurfir að skrá þig aftur inn.</Typography> <br />
            </Grid>
        </Grid>
    );
}

export default Index;
