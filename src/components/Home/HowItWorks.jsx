import {Box, Grid, Typography} from "@mui/material";
import profileDetailImage from "../../assets/svg/profile-detail.svg";
import searchProfileImage from "../../assets/svg/search-people.svg";
import syncImage from "../../assets/svg/sync-match.svg";
import React from "react";

function HowItWorks() {
    return (
        <Grid container width='90%' mx='auto' my={6}>
            <Grid item xs={12} my={4}>
                <Typography variant='h4' textAlign='center' fontWeight='bold'>How it Works</Typography>
                <Typography variant='h6' component='p' textAlign='center' color='primary'>We Always Care About Our Users, So We Decided to Make it Simple Just for You!</Typography>
            </Grid>
            <Grid item container spacing={4}>
                <Grid item container md={4} xs={12} direction='column' justifyContent='center' alignItems='center'>
                    <Box borderRadius='50%' bgcolor='white' width={150} height={150} sx={{bgcolor: '#ff9691'}}>
                        <img width='100%' src={profileDetailImage} alt='profile-detail-img' aria-hidden/>
                    </Box>
                    <Typography mt={3} variant='p' component='p' color='primary' sx={{textTransform: 'uppercase'}}>Step
                        1</Typography>
                    <Typography variant='p' component='p' color='rgba(0,0,0,0.6)'>Set up your profile
                        details</Typography>
                </Grid>
                <Grid item container md={4} xs={12} direction='column' justifyContent='center' alignItems='center'>
                    <Box borderRadius='50%' bgcolor='white' width={150} height={150} sx={{bgcolor: '#ff9691'}}>
                        <img width='100%' src={searchProfileImage} alt='profile-detail-img' aria-hidden/>
                    </Box>
                    <Typography mt={3} variant='p' component='p' color='primary' sx={{textTransform: 'uppercase'}}>Step
                        2</Typography>
                    <Typography variant='p' component='p' color='rgba(0,0,0,0.6)'>Find your Partners</Typography>
                </Grid>
                <Grid item container md={4} xs={12} direction='column' justifyContent='center' alignItems='center'>
                    <Box borderRadius='50%' bgcolor='white' width={150} height={150} sx={{bgcolor: '#ff9691'}}>
                        <img width='100%' src={syncImage} alt='profile-detail-img' aria-hidden/>
                    </Box>
                    <Typography mt={3} variant='p' component='p' color='primary' sx={{textTransform: 'uppercase'}}>Step
                        3</Typography>
                    <Typography variant='p' component='p' color='rgba(0,0,0,0.6)'>Gotcha!</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default HowItWorks;