import React from "react";
import {Box, List, ListItem, ListItemText, SwipeableDrawer} from "@mui/material";
import {Link} from "react-router-dom";

function Drawer({openDrawer, setOpenDrawer}) {
    return (
        <SwipeableDrawer
            anchor='right'
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            onOpen={() => setOpenDrawer(true)}
        >
            <Box
                sx={{width: 250}}
                role="presentation"
                onClick={() => setOpenDrawer(false)}
                onKeyDown={() => setOpenDrawer(false)}
            >
                <List>
                    <Link style={{textDecoration: 'none', color: 'black'}} to='/login'>
                        <ListItem button>
                            <ListItemText primary='Login'/>
                        </ListItem>
                    </Link>
                    <Link style={{textDecoration: 'none', color: 'black'}} to='/about'>
                        <ListItem button>
                            <ListItemText primary='About'/>
                        </ListItem>
                    </Link>
                </List>
            </Box>
        </SwipeableDrawer>
    )
}

export default Drawer;
