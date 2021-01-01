import React, { useState } from "react"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, SwipeableDrawer, Container, Button } from "@material-ui/core";

import {Link, NavLink} from "react-router-dom"

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import HomeIcon from '@material-ui/icons/Home';
import HelpIcon from '@material-ui/icons/Help';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DevicesIcon from '@material-ui/icons/Devices';
import WhiteTypography from "../Misc/WhiteTypography"

const useStyles = makeStyles(theme => ({
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            marginLeft: theme.spacing(2),
        },
        list: {
            width: 250,
        },
        userContent: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
            display: "flex",
            alignItems: "center",
            justifyContent:"flex-start"
        },
        paper: {
            backgroundColor: "#323232"
        },
        light: {
            backgroundColor: "#FFE7D0"
        },
        button: {
            color: "#FFE7D0"
        },
        policy: {
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: theme.spacing(4),
            marginTop: theme.spacing(4),
        },
    }),
);

const buttons = [
    {
        name: "Home",
        comp: <HomeIcon />,
        path: "/"
    },
    {
        name: "Builds",
        comp: <DesktopWindowsIcon />,
        path: "/builds"
    },
    {
        name: "Parts",
        comp: <DevicesIcon />,
        path: "/parts"
    },
]

const MainDrawer = () => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)

    const handleDrawerOpen = () => { setOpen(true) }
    const handleDrawerClose = () => { setOpen(false) }

    const ItemList = () => {
        return(
            <div
                className={classes.list}
                role="presentation"
                onClick={handleDrawerClose}
                onKeyDown={handleDrawerClose}
            >
                <List>
                    {buttons.map((button) => {
                        return (
                            <Link key={button.name} onClick={() => { setOpen(false) }} to={button.path} style={{ textDecoration: 'none', color: "black" }}>
                                <ListItem button key={button.name}>
                                    <ListItemIcon style={{ color: "#FFE7D0"}} color="secondary">{button.comp}</ListItemIcon>
                                    <ListItemText className="text-capitalize" primary={<WhiteTypography>{button.name}</WhiteTypography>} />
                                </ListItem>
                            </Link>
                        )
                    })}
                </List>
            </div>
        )
    }

    return(
        <div>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}      
                edge="start"
            >
                <MenuIcon />
            </IconButton>
            <SwipeableDrawer classes={{ paper: classes.paper }} anchor="left" open={open} onClose={handleDrawerClose} onOpen={handleDrawerOpen} swipeAreaWidth={20}>
                <Container className={classes.userContent}>
                    <IconButton onClick={handleDrawerClose} color="secondary"><ArrowBackIosIcon /></IconButton>
                    <WhiteTypography variant="h5">UtterLabs</WhiteTypography>
                </Container>
                <Divider variant="middle" light classes={{light: classes.light}} />
                <ItemList />
                <Divider variant="middle" light classes={{ light: classes.light }} />
                <Container className={classes.policy}>
                    <WhiteTypography>Need help?</WhiteTypography>
                    <Link to="/help" style={{textDecoration: "none"}} onClick={handleDrawerClose}><Button color="secondary">Learn More</Button></Link>
                </Container>
            </SwipeableDrawer>
        </div>
    )
}

const Appbar = () => {
    const classes = useStyles();
    return(
        <AppBar position="sticky">
            <Toolbar>
                <MainDrawer />
                <Typography className={classes.title} variant="h6" noWrap>
                    <NavLink to="/" style={{ textDecoration: "none", color: "#FFE7D0"}} >UtterLabs</NavLink>
                </Typography>
                <Link to="/help"><HelpIcon style={{ color: "#FFE7D0", marginLeft: 20 }} fontSize="large" /></Link>
            </Toolbar>
        </AppBar>
    )
}

export default Appbar