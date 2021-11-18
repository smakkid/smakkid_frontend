// import logo from './logo.svg';
// import './App.css';
import { Autocomplete, TextField } from '@mui/material';
import {GetBeers} from '../Api/BeerApi'
import { useEffect, useState} from 'react';
import {makeStyles} from '@mui/styles';
// import {Redirect} from 'react-router-dom';

import { Navigate } from 'react-router-dom'


const useFetch = (setBeers)=>{useEffect(() => {
    GetBeers().then(result=>{
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
        <div className={classes.root}>
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
        </div>
    );
}

export default Index;
