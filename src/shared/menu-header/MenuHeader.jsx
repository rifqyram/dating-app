import {Menu, MenuItem} from "@mui/material";
import React from "react";

function MenuHeader({anchorEl, handleClose, handleLogout, navigate}) {
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
                navigate('/profile-preference')
            }}>My Preference</MenuItem>
            <MenuItem onClick={() => {
                handleClose();
                navigate('/profile-update')
            }}>My Profile</MenuItem>
            <MenuItem onClick={() => {
                handleLogout();
                handleClose();
            }}>Logout</MenuItem>
        </Menu>
    )
}

export default MenuHeader;