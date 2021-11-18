
import {AppBar, Grid, Toolbar, IconButton, Button, Drawer, Typography} from '@mui/material';

// import MenuIcon from '@mui/icons-material/Menu';
// import { Link } from 'react-router-dom';

import { makeStyles } from '@mui/styles';

import {useRecoilValue} from 'recoil'

import UserState from '../Atoms/UserAtom'


import {useMediaQuery} from '@mui/material'
import { useState } from 'react';
import { GridMenuIcon } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

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
    hrefButtonMobile: { 
        color: 'black !important',
        // backgroundColor: 'green !important'
    }, 
    hrefButtonBold: {
        fontWeight: 'bold'
    }
});

function Navbar() {

    const user = useRecoilValue(UserState);
    const classes = useStyles();
    const [menuDrawerIsOpen, setMenuDrawerIsOpen] = useState(false);
    const isMobile = !useMediaQuery('(min-width:700px)');
    
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setMenuDrawerIsOpen(open)
      };


    return (
        <AppBar position="static" className={classes.bar}>
            <Toolbar className={classes.toolBar}>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item xs={isMobile?1:2}>
                        <IconButton  size="large" edge="start"
                            color="inherit" aria-label="menu"
                            sx={{ mr: 2 }} href='/'
                        >🍻</IconButton>
                    </Grid>

                    {!isMobile && <>
                        <Grid item xs={5} container spacing={2} alignContent="left">
                            {/* <Button className={classes.hrefButton} href="/shoppinglist">Innkaupalisti </Button>
                            <Button className={classes.hrefButton} href="/breweries">Brugghús</Button>
                            <Button className={classes.hrefButton} href="/types">Tegundir</Button> */}
                            {/* <Typography variant="button"><Link className={classes.hrefButton} to="/">Mínir Bjórar</Link></Typography> */}
                            <Grid item xs={3}> <Typography variant="button"><Link className={classes.hrefButton} to="/shoppinglist">Innkaupalisti </Link> </Typography> </Grid>
                            <Grid item xs={3}> <Typography variant="button"><Link className={classes.hrefButton} to="/breweries">Brugghús</Link> </Typography> </Grid>
                            <Grid item xs={3}> <Typography variant="button"><Link className={classes.hrefButton} to="/types">Tegundir</Link> </Typography> </Grid>
                            {/* <Grid item xs={3}> <Typography variant="button"><Link className={classes.hrefButton} to="/">Mínir Bjórar</Link> </Typography> </Grid> */}
                            
                        </Grid>
                        <Grid item xs={1}>
                            {user === null && <Typography variant="button"><Link className={classes.hrefButton} to="/login">🔑Skrá Inn</Link></Typography> }
                            {user !== null && <Typography variant="button"><Link className={classes.hrefButton} to="/profile">Prófíll</Link></Typography> }
                        </Grid>
                    </>}

                    {isMobile&&<Grid item xs={3}>
                        <Button onClick={toggleDrawer(true)}><GridMenuIcon /></Button>
                        <Drawer
                            anchor='right'
                            open={menuDrawerIsOpen}
                            onClose={toggleDrawer(false)}
                            className={classes.drawer}
                        >  
                            <Typography variant="button"><Link className={classes.hrefButton} to="/shoppinglist">Innkaupalisti </Link></Typography>
                            <Typography variant="button"><Link className={classes.hrefButton} to="/breweries">Brugghús </Link></Typography>
                            <Typography variant="button"><Link className={classes.hrefButton} to="/types">Tegundir </Link></Typography>
                            {/* <Typography variant="button"><Link className={classes.hrefButton} to="/">Mínir Bjórar</Button> */}
                            
                            {user === null && <Typography variant="button"><Link className={classes.hrefButton} to="/login">🔑Skrá Inn</Link></Typography> }
                            {user !== null && <Typography variant="button"><Link className={classes.hrefButton} to="/profile">Prófíll</Link></Typography> }
                        </Drawer>
                    </Grid>}

                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
