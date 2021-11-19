import { Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Link, useMediaQuery} from '@mui/material';
import { makeStyles } from '@mui/styles';

function strRound(n){ return Math.floor(n*100)/100}


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
        fontSize: '35% !important',
        paddingLeft: '1px',
        paddingRight: '1px',
        marginLeft: '1px',
        marginRight: '1px'
    }
});

function BeerDataTable(props) {
    const {beers}=props;
    const classes = useStyles();

    const isMobile = !useMediaQuery('(min-width:900px)');
    return (
        <Grid container item xs={12} justifyContent="center" spacing={2}>
            <Grid item xs={12}>
            <Paper>
                <Table  size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" className={isMobile?classes.mobileTd:""} >Nafn</TableCell>
                            <TableCell className={isMobile?classes.mobileTd:""}  align="center">{isMobile?"🏭":"Brugghús"}</TableCell>
                            <TableCell className={isMobile?classes.mobileTd:""}  align="center">Tegund</TableCell>
                            <TableCell className={isMobile?classes.mobileTd:""}  align="center">%</TableCell>
                            <TableCell className={isMobile?classes.mobileTd:""}  align="center">Einkunn</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {beers.map((beer) => (
                        <TableRow key={beer.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                            <TableCell className={isMobile?classes.mobileTd:""} component="th" align="left" scope="row"> <Link href={`/beer/${beer.id}`}>{beer.name}</Link>  </TableCell>
                            <TableCell className={isMobile?classes.mobileTd:""} component="th" align="center" scope="row">  <Link href={`/brewery/${beer.manufacturerId}`}>{beer.manufacturerName}</Link></TableCell>
                            <TableCell className={isMobile?classes.mobileTd:""} component="th" align="center" scope="row"> <Link href={`/type/${beer.typeId}`}>{beer.typeName}</Link></TableCell>
                            <TableCell className={isMobile?classes.mobileTd:""} component="th" align="center" scope="row"> {strRound(beer.abv*100)}%</TableCell>
                            <TableCell className={isMobile?classes.mobileTd:""} component="th" align="center" scope="row"> {beer.numTotalReviews !== 0? `${strRound(beer.globalAverageScore)}/${beer.numTotalReviews}`:''}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            </Grid>
        </Grid>
    );
}

export default BeerDataTable;
