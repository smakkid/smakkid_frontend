import { Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Link} from '@mui/material';

function strRound(n){ return Math.floor(n*100)/100}

function BeerDataTable(props) {
    const {beers}=props;
    

    return (
        <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12}>
            <Paper>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Brewery</TableCell>
                            <TableCell align="center">Type</TableCell>
                            <TableCell align="center">ABV %</TableCell>
                            <TableCell align="center">Score/reviews</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {beers.map((beer) => (
                        <TableRow key={beer.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                            <TableCell component="th" align="center" scope="row"> <Link href={`/beer/${beer.id}`}>{beer.name}</Link>  </TableCell>
                            <TableCell component="th" align="center" scope="row">  <Link href={`/brewery/${beer.manufacturerId}`}>{beer.manufacturerName}</Link></TableCell>
                            <TableCell component="th" align="center" scope="row"> <Link href={`/type/${beer.typeId}`}>{beer.typeName}</Link></TableCell>
                            <TableCell component="th" align="center" scope="row"> {strRound(beer.abv*100)}%</TableCell>
                            <TableCell component="th" align="center" scope="row"> {beer.numTotalReviews !== 0? `${strRound(beer.globalAverageScore)}/${beer.numTotalReviews}`:''}</TableCell>
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
