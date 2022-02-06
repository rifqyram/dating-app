import Header from "../../../shared/header/Header";
import Footer from "../../../shared/footer/Footer";
import {Box, Grid, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {listChoosenPartner} from "../services/PartnerService";
import {getUserFromLocalStorage} from "../../auth/services/AuthService";
import {errorAlert} from "../../../shared/notification/SweetAlert";
import CardListPartner from "./CardListPartner";

function ListPartner() {
    const [listPartner, setListPartner] = useState([]);

    useEffect(() => {
        listChoosenPartner(getUserFromLocalStorage().memberId)
            .then((r) => {
                setListPartner(r.data);
            })
            .catch((err) => {
                errorAlert(err.response.data.ErrorDescription.message);
            })
    }, [])

    return (
        <>
            <Header/>
            <Grid container item width='90%' mx='auto' minHeight='100vh'>
                <Box>
                    <Typography mt={4} variant='h4' color='rgba(0,0,0,0.6)' fontWeight='bold'>Your Matches Partner</Typography>
                    <Grid item container columnSpacing={3}>
                        {listPartner.map((i, idx) => {
                            return (
                                <Grid sx={{my: {xs: 4}}} item md={4} xs={12} key={idx}>
                                    <CardListPartner data={i} />
                                </Grid>
                            )
                        })}

                    </Grid>
                </Box>
            </Grid>
            <Footer/>
        </>
    )
}

export default ListPartner;