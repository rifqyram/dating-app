import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import React from "react";

export default function NavButton({text, path}) {
    return (
        <Link to={`/${path}`} style={{color: "white", textDecoration: "none"}}>
            <Button variant="inherit">{text}</Button>
        </Link>
    )
}