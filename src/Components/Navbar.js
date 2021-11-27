
import {AppBar, Grid, Toolbar, IconButton, Button, Drawer, Badge, Popover, Typography} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
// import MenuIcon from '@mui/icons-material/Menu';
// import { Link } from 'react-router-dom';

import { makeStyles } from '@mui/styles';

import {useRecoilValue} from 'recoil'

import UserState from '../Atoms/UserAtom'


import {useMediaQuery} from '@mui/material'
import { useEffect, useState } from 'react';
import { GridMenuIcon } from '@mui/x-data-grid';
import { GetNotifications } from '../Api/AuthenticationApi';

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


const useFetch = (setNotifications, user)=>{useEffect(() => {
    if(user == null){ return; }
    GetNotifications(user.token).then(result=>{
        setNotifications(result);
    }).catch(error=>{

    });
}, [setNotifications, user])}

function Navbar() {

    const user = useRecoilValue(UserState);
    const classes = useStyles();
    const [menuDrawerIsOpen, setMenuDrawerIsOpen] = useState(false);
    const isMobile = !useMediaQuery('(min-width:700px)');

    const [notifications, setNotifications] = useState(null);

    useFetch(setNotifications, user);
    
    const [popOverOpen, setPopoverOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
    }

    setMenuDrawerIsOpen(open)
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
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
                        <Grid item xs={8} >
                            <Button className={classes.hrefButton} href="/types">Tímalína</Button>
                            <Button className={classes.hrefButton} href="/types">Mínir hópar</Button>
                            <Button className={classes.hrefButton} href="/shoppinglist">Innkaupalisti </Button>
                            <Button className={classes.hrefButton} href="/breweries">Brugghús</Button>
                            <Button className={classes.hrefButton} href="/types">Tegundir</Button>
                            {/* <Button className={classes.hrefButton} href="/">Mínir Bjórar</Button> */}
                        </Grid>
                        {notifications != null && 
                            <Grid item xs={1}>
                                <IconButton onClick={handleClick}>
                                <Badge color="secondary" badgeContent={notifications.length} max={999}>
                                        <NotificationsIcon />
                                </Badge>
                                </IconButton>
                                <Popover
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                    }}
                                >
                                    {notifications.length === 0 && <Typography>Engar tilkynningar ennþá...</Typography>}
                                    {notifications.length !== 0 && <Grid container>
                                        {/* {notifications.map(notification=><Notification notification="" />)} */}
                                    </Grid>}
                                </Popover>
                            </Grid>
                        }
                        <Grid item xs={1}>
                            
                            {user === null && <Button color="primary" className={classes.hrefButton} align="right" href="/login">🔑Skrá Inn</Button> }
                            {user !== null && <Button className={classes.hrefButton} align="right" href="/profile">Prófíll</Button> }
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
                            {user !== null && <Button color="primary" variant="link" className={classes.hrefButtonMobile} href="/">Tímalína</Button>}
                            {user !== null && <Button color="primary" variant="link" className={classes.hrefButtonMobile} href="/">Minir hópar</Button>}
                            <Button color="primary" variant="link" className={classes.hrefButtonMobile} href="/shoppinglist">Innkaupalisti </Button>
                            <Button color="primary" variant="link" className={classes.hrefButtonMobile} href="/breweries">Brugghús</Button>
                            <Button color="primary" variant="link" className={classes.hrefButtonMobile} href="/types">Tegundir</Button>
                            {user === null && <Button color="primary" className={classes.hrefButtonMobile} align="right" href="/login">🔑Skrá Inn</Button> }
                            {user !== null && <Button className={classes.hrefButtonMobile} align="right" href="/profile">Prófíll</Button> }
                        </Drawer>
                    </Grid>}

                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
