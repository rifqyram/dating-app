import Header from "../../../shared/header/Header";
import Footer from "../../../shared/footer/Footer";
import {Box, Grid, Typography} from "@mui/material";
import {useContext, useEffect} from "react";
import CardListPartner from "./CardListPartner";
import {GlobalContext} from "../../../context/GlobalContext";
import heartBreakImage from '../../../assets/image/heart-break.jpg';
import {useNavigate} from "react-router";
import {getUserFromLocalStorage} from "../../auth/services/AuthService";

function ListPartner() {
    const {isLoading, partners, fetchListPartner} = useContext(GlobalContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (partners === null && getUserFromLocalStorage()) return
        fetchListPartner(getUserFromLocalStorage().memberId);
    }, [])

    return (
        <>
            <Header/>
            {!partners &&
                <Grid container justifyContent='center' alignItems='center' my={2} direction='column'>
                    <Typography color='rgba(0,0,0,0.6)' variant='h4' component='p'>Partner Missing?
                        <Typography variant='h5' component='span' color='primary' sx={{cursor: 'pointer'}} onClick={() => navigate('/find')}> Find Partner</Typography>
                    </Typography>
                    <img src={heartBreakImage} width='60%' aria-hidden alt='bg-image' />
                </Grid> }
            {partners &&
                <Grid container item width='90%' mx='auto' minHeight='100vh'>
                    <Box>
                        <Typography mt={4} variant='h4' color='rgba(0,0,0,0.6)' fontWeight='bold'>Your Matches
                            Partner</Typography>
                        <Grid item container columnSpacing={3}>
                            {partners && partners.map((i, idx) => {
                                return (
                                    <Grid sx={{my: {xs: 4}}} item md={partners.length === 1 ? 12 : 4} xs={12} key={idx}>
                                        <CardListPartner data={i} isLoading={isLoading}/>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Box>
                </Grid>}
            <Footer/>
        </>
    )
}

export default ListPartner;