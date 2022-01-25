import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import {Box} from "@mui/system";
import React from "react";
import {Link} from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import NavButton from "../../shared/button-nav/ButtonNav";

function Header({openDrawer, setOpenDrawer}) {
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
                    <Box sx={{display: {xs: "none", md: "flex"}}}>
                        <NavButton text='Home' path=''/>
                        <NavButton text='About' path='about '/>
                        <NavButton text='Login' path='login'/>
                    </Box>
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
