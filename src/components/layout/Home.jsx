import React from "react";
import Header from "../../shared/header/Header";
import {Container} from "@mui/material";

function Home({user, setUser, openDrawer, setOpenDrawer}) {

    return <>
        <Header user={user} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} setUser={setUser}/>
        <Container>

        </Container>
    </>;
}

export default Home;
