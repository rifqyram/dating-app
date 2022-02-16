import React from "react";
import {Grid} from "@mui/material";

import Header from "../../shared/header/Header";
import Footer from "../../shared/footer/Footer";
import HowItWorks from "./HowItWorks";
import MainHome from "./MainHome";

function Home({user, setUser, openDrawer, setOpenDrawer}) {
    return (
        <>
            <Header user={user} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} setUser={setUser}/>
            <Grid container minHeight='100vh'>
                <MainHome/>
                <HowItWorks/>
            </Grid>
            <Footer/>
        </>
    );
}

export default Home;
