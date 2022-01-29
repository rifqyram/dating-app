import {AppBar, Avatar, Grid, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography} from "@mui/material";
import {Box} from "@mui/system";
import React, {useState} from "react";
import NavButton from "../button-nav/ButtonNav";
import {authLogout} from "../../components/auth/services/AuthService";
import {useNavigate} from "react-router";

function MenuI({anchorEl, handleClose, handleLogout, navigate}) {

    return (
        <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem onClick={() => {
                handleClose();
                navigate('/dashboard')
            }}>Dashboard</MenuItem>
            <MenuItem onClick={() => {
                handleClose();
                navigate('/profile-update')
            }}>Profile</MenuItem>
            <MenuItem onClick={() => {
                handleLogout();
                handleClose();
            }}>Logout</MenuItem>
        </Menu>
    )
}

function Header({openDrawer, setOpenDrawer, user, setUser}) {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        authLogout();
        setUser(null);
        navigate("/")
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Grid container width='90%' mx='auto'>
                    <Grid item md={8}>
                        <Typography variant='h5'>Dating App</Typography>
                    </Grid>
                    <Grid container columnGap={2} item md={4} justifyContent='flex-end'>
                        <NavButton text='Home' path=''/>
                        <NavButton text='About' path='about'/>
                        {user && (<Box>
                            <Tooltip title='Open Settings'>
                                <IconButton sx={{p: 0}} onClick={handleMenu}>
                                    <Avatar alt='Rifqi Ramadhan' src='/static/images/avatar/2.png'/>
                                </IconButton>
                            </Tooltip>
                            <MenuI navigate={navigate} handleLogout={handleLogout} anchorEl={anchorEl}
                                   handleClose={handleClose}/>
                        </Box>)}
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
