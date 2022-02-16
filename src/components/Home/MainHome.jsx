import React, {useState} from "react";

import {Box, Button, Grid, Typography} from "@mui/material";
import {TabContext, TabPanel} from "@mui/lab";

import RegisterForm from "../auth/components/RegisterForm";
import LoginForm from "../auth/components/LoginForm";

import bgImageHome from "../../assets/svg/together-bg.svg";

function MainHome() {
    const [value, setValue] = useState('1');
    const [start, setStart] = useState(false);

    return (
        <Grid container width='90%' mx='auto' sx={{mt: {xs: 4, md: 12}, minHeight: {md: '100vh'}}}>
            <Grid item md={4} xs={12} >
                <Typography variant='h3' color='rgba(0,0,0,0.6)' fontWeight='bold'>Find your life partner with a
                    simple way</Typography>
                {!start &&
                    <>
                        <Typography variant='h6' textAlign='justify' my={4}>
                            Simple register on our website and we will find the girl or boy of your dreams. In few
                            simple steps you are joining the Dating website
                        </Typography>
                        <Button onClick={() => setStart(true)} variant='contained' size='large'>Sign Up Now</Button>
                    </>
                }
                {start &&
                    <TabContext value={value}>
                        <TabPanel sx={{p: 0, mt: 4}} value="1"><RegisterForm setValue={setValue}/></TabPanel>
                        <TabPanel sx={{p: 0, mt: 4}} value="2"><LoginForm setValue={setValue}/></TabPanel>
                    </TabContext>
                }
            </Grid>
            <Grid container item md={8} xs={12} sx={{justifyContent: {md: 'flex-end', xs: 'center'}, my: {xs: 8, md: 0}}}>
                <Box sx={{width: {xs: '100%', md: '90%'}}}>
                    <img width='100%' style={{objectFit: 'contain'}} src={bgImageHome} aria-hidden alt='bg-home'/>
                </Box>
            </Grid>
        </Grid>
    )
}

export default MainHome;