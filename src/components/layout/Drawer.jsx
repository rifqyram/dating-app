import React from "react";
import {Box, List, ListItem, ListItemText, SwipeableDrawer} from "@mui/material";
import {Link} from "react-router-dom";

function Drawer({open, setOpen}) {
    return (
        <SwipeableDrawer
            anchor='right'
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
        >
            <Box
                sx={{width: 250}}
                role="presentation"
                onClick={() => setOpen(false)}
                onKeyDown={() => setOpen(false)}
            >
                <List>
                    {[{text: 'About', path: '/about'}, {text: 'Login', path: '/login'}].map((text) => (
                        <Link style={{textDecoration: 'none', color: 'black'}} to={text.path} key={text.text}>
                            <ListItem button>
                                <ListItemText primary={text.text}/>
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Box>
        </SwipeableDrawer>
    )
}

export default Drawer;
