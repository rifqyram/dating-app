import {AppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {Box} from "@mui/system";
import React from "react";
import {Link} from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

function Header({open, setOpen}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            margin: "auto",
            width: "100%",
            maxWidth: "1320px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            <Typography variant="h5">Dating App</Typography>
          </Link>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link style={{ color: "white", textDecoration: "none" }} to="/">
              <Button color="inherit">Home</Button>
            </Link>
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to="/about"
            >
              <Button color="inherit">About</Button>
            </Link>
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to="/login"
            >
              <Button color="inherit">Login</Button>
            </Link>
          </Box>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={() => setOpen(!open)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
