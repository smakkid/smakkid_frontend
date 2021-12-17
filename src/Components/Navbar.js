
import {AppBar, Grid, Toolbar, IconButton, Button, Drawer, Badge, Popover, Typography} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
// import MenuIcon from '@mui/icons-material/Menu';
// import { Link } from 'react-router-dom';

import { makeStyles } from '@mui/styles';

import {useRecoilValue, useSetRecoilState} from 'recoil'

import UserState from '../Atoms/UserAtom'


import {useMediaQuery} from '@mui/material'
import { useEffect, useState } from 'react';
import { GridMenuIcon } from '@mui/x-data-grid';
import { GetNotifications } from '../Api/AuthenticationApi';
import Notification from './Notification';

const useStyles = makeStyles({
    bar: {
        width: '100%',
        // background: 'red',//'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        // backgroundColor: 'red',
        marginBottom: '15px',
    },
    paper: {
        padding: 15
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


const useFetch = (setNotifications, user, setUser)=>{useEffect(() => {
    if(user == null){ return; }
    GetNotifications(user.token).then(result=>{
        setNotifications(result);
    }).catch(error=>{
        console.log("Caught a notification error...");
        //delete the user from the storage.
        setUser(null);
        // window.location.replace('/')
    });
}, [setNotifications, user, setUser])}

const linkos = [
    {title: 'Innkaupalisti', href: '/shoppinglist'},
    {title: 'Brugghús', href: '/breweries'},
    {title: 'Mínir hópar', href: '/groups'}
]

function Navbar() {

    const user = useRecoilValue(UserState);
    const classes = useStyles();
    const [menuDrawerIsOpen, setMenuDrawerIsOpen] = useState(false);
    const isMobile = !useMediaQuery('(min-width:700px)');

    const [notifications, setNotifications] = useState(null);
    
    const setUser = useSetRecoilState(UserState);
    useFetch(setNotifications, user, setUser);
    
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

    console.log(notifications);

    

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
                            <Button className={classes.hrefButton} href="/shoppinglist">Innkaupalisti </Button>
                            {user !== null && <Button className={classes.hrefButton} href="/groups">Mínir hópar</Button> }
                        </Grid>

                    </>}

                    {notifications != null && 
                        <Grid item xs={1}>

                            {(notifications!==null) && <>

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
                                    <Grid container  className={classes.paper}>
                                        {notifications.length === 0 && <Typography>Engar tilkynningar ennþá...</Typography>}
                                        {notifications.length !== 0 && 
                                            notifications.map(notification=><Notification notification={notification}/>)
                                        }
                                    </Grid>
                                </Popover>
                            </> }
                        </Grid>
                    }

                    {!isMobile && 
                        <Grid item xs={1}>    
                            {user === null && <Button color="primary" className={classes.hrefButton} align="right" href="/login">🔑Skrá Inn</Button> }
                            {user !== null && <Button className={classes.hrefButton} align="right" href="/profile">Prófíll</Button> }
                        </Grid>
                    }

                    {isMobile&&<Grid item xs={3}>
                        <Button onClick={toggleDrawer(true)}><GridMenuIcon /></Button>
                        <Drawer
                            anchor='right'
                            open={menuDrawerIsOpen}
                            onClose={toggleDrawer(false)}
                            className={classes.drawer}
                        >  
                            {user !== null && <Button color="primary" variant="link" className={classes.hrefButtonMobile} href="/">Minir hópar</Button>}
                            <Button color="primary" variant="link" className={classes.hrefButtonMobile} href="/shoppinglist">Innkaupalisti </Button>

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
