import React, {useState} from "react";
import Header from "../../shared/header/Header";
import {Box, Grid, Tab, Typography} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import LoginForm from "../auth/components/LoginForm";
import RegisterForm from "../auth/components/RegisterForm";
import Footer from "../../shared/footer/Footer";

function Home({user, setUser, openDrawer, setOpenDrawer}) {

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Header user={user} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} setUser={setUser}/>
            <Grid container width='90%' mx='auto' minHeight='100vh' py={4}>
                <Grid item md={8}>

                </Grid>
                <Grid item md={4}>
                    <Typography variant='h3' color='rgba(0,0,0,0.6)' fontWeight='bold'>Find your life partner with a simple way</Typography>
                    <TabContext value={value}>
                        <TabPanel value="1"><LoginForm setValue={setValue} /></TabPanel>
                        <TabPanel value="2"><RegisterForm /></TabPanel>
                    </TabContext>
                </Grid>
            </Grid>
            <Footer />
        </>
    );
}

export default Home;
