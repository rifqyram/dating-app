import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {Box} from "@mui/system";
import {AppBar, Avatar, Badge, Grid, IconButton, Skeleton, Toolbar, Tooltip, Typography} from "@mui/material";
import {Notifications} from "@mui/icons-material";

import {GlobalContext} from "../../context/GlobalContext";
import {getUserFromLocalStorage} from "../../components/auth/services/AuthService";
import logoImage from '../../assets/svg/logo.svg';
import MenuHeader from "../menu-header/MenuHeader";

function Header() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const {logout, user, isLoading, fetchUser, partners, fetchListPartner} = useContext(GlobalContext);
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

    useEffect(() => {
        if (getUserFromLocalStorage() === null) return;
        fetchListPartner(getUserFromLocalStorage().memberId);
    }, [])

    return (
        <AppBar position='static'>
            <Toolbar sx={{width: '90%', mx: 'auto'}}>
                <Grid container item md={8}>
                    <Typography variant='h5'><img src={logoImage} aria-hidden alt="logo-image"/> Eniglove</Typography>
                </Grid>
                {user && userLocal &&
                    <Grid container item md={4} justifyContent='flex-end'>
                        <Tooltip title='List Match'>
                            <IconButton color='inherit' size='large' onClick={() => navigate('/list-match')}>
                                <Badge badgeContent={partners?.length && partners?.length} color="error">
                                    <Notifications/>
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        {isLoading ?
                            <Skeleton variant="circular" width={40} height={40}/> :
                            <Box>
                                <Tooltip title='Open Profile'>
                                    <IconButton size='large' onClick={handleMenu}>
                                        <Avatar
                                            alt={user?.userData?.PersonalInfo?.Name}
                                            src={user?.userData?.PersonalInfo?.RecentPhotoPath && `data:image;base64,${user?.userData?.PersonalInfo?.RecentPhotoPath}`}/>
                                    </IconButton>
                                </Tooltip>
                                <MenuHeader navigate={navigate} handleLogout={handleLogout} anchorEl={anchorEl}
                                            handleClose={handleClose}/>
                            </Box>
                        }
                    </Grid>
                }
            </Toolbar>
        </AppBar>
    );
}

export default Header;
