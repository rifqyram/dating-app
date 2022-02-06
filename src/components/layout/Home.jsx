import React, {useState} from "react";
import Header from "../../shared/header/Header";
import {Button, Grid, Typography} from "@mui/material";
import image from '../../assets/image/home-image.svg'
import {TabContext, TabPanel} from "@mui/lab";
import LoginForm from "../auth/components/LoginForm";
import RegisterForm from "../auth/components/RegisterForm";
import Footer from "../../shared/footer/Footer";

function Home({user, setUser, openDrawer, setOpenDrawer}) {

    const [value, setValue] = useState('1');
    const [start, setStart] = useState(false);

    return (
        <>
            <Header user={user} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} setUser={setUser}/>
            <Grid container width='90%' mx='auto' minHeight='100vh' py={4}>
                <Grid item md={8} xs={12}>
                    <img width='90%' style={{objectFit: 'cover'}} src={image} aria-hidden alt=''/>
                </Grid>
                <Grid item md={4} xs={12} mt={10}>
                    <Typography variant='h3' color='rgba(0,0,0,0.6)' fontWeight='bold'>Find your life partner with a
                        simple way</Typography>
                    {!start &&
                        <>
                            <Typography variant='h6' textAlign='justify' my={5}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has been the industry's standard dummy text ever since the 1500s
                            </Typography>
                            <Button onClick={() => setStart(true)} variant='contained' size='large'>Get Started</Button>
                        </>
                    }
                    {/*Show after user click get started*/}
                    {start &&
                        <TabContext value={value}>
                            <TabPanel sx={{p: 0, mt: 4}} value="1"><RegisterForm setValue={setValue} /></TabPanel>
                            <TabPanel sx={{p: 0, mt: 4}} value="2"><LoginForm setValue={setValue}/></TabPanel>
                        </TabContext>
                    }
                </Grid>
            </Grid>
            <Footer/>
        </>
    );
}

export default Home;
