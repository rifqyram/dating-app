import {AppBar, Avatar, Badge, Grid, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography} from "@mui/material";
import {Box} from "@mui/system";
import React, {useContext, useEffect, useState} from "react";
import NavButton from "../button-nav/ButtonNav";
import {useNavigate} from "react-router";
import {AuthContext} from "../../components/auth/reducers/AuthContext";
import {getUserFromLocalStorage} from "../../components/auth/services/AuthService";
import {Notifications} from "@mui/icons-material";
import {Skeleton} from "@mui/material";

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
                navigate('/find')
            }}>Find Match</MenuItem>
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

function Header() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const {logout, user, isLoading, fetchUser} = useContext(AuthContext);
    const userLocal = getUserFromLocalStorage();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
    }

    useEffect(() => {
        if (getUserFromLocalStorage() === null) return;
        fetchUser(getUserFromLocalStorage().memberId);
    }, [])

    return (
        <AppBar position='static'>
            <Toolbar sx={{width: '90%', mx: 'auto'}}>
                <Grid container item md={8}>
                    <Typography variant='h5'>Dating App</Typography>
                </Grid>
                {user && userLocal ?
                    <Grid container item md={4} columnGap={2}
                          sx={{
                              display: {xs: 'flex', md: 'flex'},
                              justifyContent: {xs: 'space-between', md: 'flex-end'}
                          }}>
                        <Tooltip title='List Match'>
                            <IconButton color='inherit' onClick={() => navigate('/list-match')}>
                                <Badge badgeContent={0} color="error">
                                    <Notifications/>
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        {isLoading ?
                            <Skeleton variant="circular" width={40} height={40}/> :
                            <Box>
                                <Tooltip title='Open Profile'>
                                    <IconButton onClick={handleMenu}>
                                        <Avatar alt={user?.userData?.PersonalInfo?.Name}
                                                src={`data:image;base64,${user?.userData?.PersonalInfo?.RecentPhotoPath}`}/>
                                    </IconButton>
                                </Tooltip>
                                <MenuI navigate={navigate} handleLogout={handleLogout} anchorEl={anchorEl}
                                       handleClose={handleClose}/>
                            </Box>
                        }
                    </Grid> :
                    <Grid container item columnGap={2} md={4} justifyContent='flex-end'
                          sx={{display: {xs: 'none', md: 'flex'}}}>
                        <NavButton text='Home' path=''/>
                        <NavButton text='About' path='about'/>
                    </Grid>
                }
            </Toolbar>
        </AppBar>
    );
}

export default Header;
