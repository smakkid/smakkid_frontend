// import logo from './logo.svg';
// import './App.css';
import { Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow,  FormControlLabel, Checkbox, Link, Typography} from '@mui/material';


import { useState } from 'react';

import {useMediaQuery} from '@mui/material'
import { makeStyles } from '@mui/styles';
import { ClassNames } from '@emotion/react';

const useStyles = makeStyles({
    bar: {
        width: '100%',
        // background: 'red',//'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        // backgroundColor: 'red',
        marginBottom: '15px',
    },
    toolBar: {
        // backgroundImage: 'url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fvectors%2Fchristmas-seamless-pattern-with-snowflakes-snowflake-pattern-paper-vector-id1185239497%3Fk%3D6%26m%3D1185239497%26s%3D612x612%26w%3D0%26h%3DsNp8gZfDXWL_zFoEEm2o--CDfKH2H4SNF84HImq1fk0%3D&f=1&nofb=1)',
        // backgroundImage: 'url(https://media.istockphoto.com/vectors/knitting-scandinavian-texture-knit-christmas-seamless-pattern-vector-vector-id850128092)',
        // 
        // backgroundColor: '#791c0d', // red 
        backgroundColor: '#204a24', // green
        backgroundPositionY: '140px',
        backgroundRepeat: 'repeat',
        backgroundSize: '215px',
        background: '#FFFFFF'
    },
    hrefButton: { 
        color: 'white !important',
        // backgroundColor: 'green !important'
    }, 
    hrefButtonBold: {
        fontWeight: 'bold'
    },
    mobileTd: {
        fontSize: '40% !important',
        paddingLeft: '0px',
        paddingRight: '0px',
        marginLeft: '1px',
        marginRight: '1px'
    }
});



// abv: 0.085
// averageScore: 0
// id: 861
// lastReview: "0001-01-01T00:00:00"
// manufacturerId: 32
// manufacturerName: "Böl Brugghús"
// ml: 330
// name: "Þriðji í jólum belgian tripel"
// numReviews: 0
// price: 795
// typeId: 21
// typeName: "Belgian Tripel"


function strRound(n){ return Math.floor(n*100)/100}

const absortFn = (a,b)=>{
    if(a.name > b.name){ return 1 }
    if(a.name < b.name){ return -1 }
    return 0;
}

function UserBeerDataTable(props) {
    const {beers}=props;
    // console.log(beers);
    
    const [displayBeers, setDisplayBeers] = useState(beers.sort(absortFn));
    
    const classes= useStyles();
    const [showReviewedBeers, setShowReviewedBeers] = useState(true);
    
    function handleFilterChange(){
        setShowReviewedBeers(!showReviewedBeers)
        setDisplayBeers(beers.filter(i=> (!showReviewedBeers||i.numReviewsByUser===0)).sort(absortFn))
    }
    const isMobile = !useMediaQuery('(min-width:900px)');
    
    return (
        // <div style={{width:'100%'}}>
        
        <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12}>
                <FormControlLabel
                    control={
                        <Checkbox checked={showReviewedBeers} onChange={handleFilterChange} name="gilad" />
                    }
                    label="Sýna bjóra sem þú hefur smakkað"
                    />
                    {isMobile?"T": "F"}
            </Grid>
            <Grid item xs={12}>
            <Paper>
                <Table  size="small"  aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={isMobile?classes.mobileTd:""} align="left"></TableCell>
                            <TableCell className={isMobile?classes.mobileTd:""}>Nafn</TableCell>
                            <TableCell className={isMobile?classes.mobileTd:""} align="center">{isMobile?'🏭':'Brugghús'}</TableCell>
                            <TableCell className={isMobile?classes.mobileTd:""} align="center">Týpa</TableCell>
                            <TableCell className={isMobile?classes.mobileTd:""} align="center">{isMobile?"%":"Prósenta"}</TableCell>
                            {!isMobile && <TableCell align="center">Meðaleinkunn</TableCell> }
                            {!isMobile && <TableCell align="center">Þín einkunn</TableCell> }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayBeers.map((beer) => (
                            <TableRow key={beer.name} sx={{ '&:last-child td, &:last-child th': { border: 0, paddingLeft: 0, paddingRight: 0, margin: 0 } }} >
                                <TableCell className={isMobile?classes.mobileTd:""} component="th" align="left" scope="row"  > {beer.numReviewsByUser !== 0&&'🍻'}</TableCell>
                                <TableCell className={isMobile?classes.mobileTd:""} component="th" align="left" scope="row"  > <Link href={`/beer/${beer.id}`}>{beer.name}</Link> </TableCell>
                                <TableCell className={isMobile?classes.mobileTd:""} component="th" align="center" scope="row"> <Link href={`/brewery/${beer.manufacturerId}`}>{beer.manufacturerName}</Link> </TableCell>
                                <TableCell className={isMobile?classes.mobileTd:""} component="th" align="center" scope="row"> <Link href={`/type/${beer.typeId}`}>{beer.typeName}</Link> </TableCell>
                                <TableCell className={isMobile?classes.mobileTd:""} component="th" align="center" scope="row"> {strRound(beer.abv*100)}%</TableCell>
                                {!isMobile && <TableCell component="th" align="center" scope="row"> {beer.numTotalReviews !== 0? `${strRound(beer.globalAverageScore)}`:''} </TableCell>  }
                                {!isMobile && <TableCell component="th" align="center" scope="row"> {beer.numReviewsByUser !== 0? `${strRound(beer.averageScoreByUser)}`:''} </TableCell> }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            </Grid>
        </Grid>
    );
}

export default UserBeerDataTable;
