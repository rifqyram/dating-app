import {AppBar, Avatar, Grid, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography} from "@mui/material";
import {Box} from "@mui/system";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
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
        navigate("/login")
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar
                    sx={{
                        margin: "auto",
                        width: {lg: '1200px', xs: '100%'},
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Link to="/" style={{color: "white", textDecoration: "none"}}>
                        <Typography variant="h5">Dating App</Typography>
                    </Link>
                    <Grid item justifyContent={"space-evenly"} sx={{display: {xs: "none", md: "flex"}, width: '30%'}}>
                        <NavButton text='Home' path=''/>
                        <NavButton text='About' path='about '/>
                        {user ? (<Box>
                            <Tooltip title='Open Settings'>
                                <IconButton sx={{p: 0}} onClick={handleMenu}>
                                    <Avatar alt='Rifqi Ramadhan' src='/static/images/avatar/2.png'/>
                                </IconButton>
                            </Tooltip>
                            <MenuI navigate={navigate} handleLogout={handleLogout} anchorEl={anchorEl} handleClose={handleClose}/>
                        </Box>) : <NavButton text='Login' path='login'/>
                        }
                    </Grid>
                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        sx={{display: {xs: "flex", md: "none"}}}
                        onClick={() => setOpenDrawer(!openDrawer)}
                    >
                        <MenuIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;
