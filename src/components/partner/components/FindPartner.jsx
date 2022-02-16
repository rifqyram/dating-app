import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../../context/GlobalContext";

import {Box, Button, Grid, Typography} from "@mui/material";
import RESPONSE_MESSAGE from "../../../constant/response-message";

import CardFindPartner from "./CardFindPartner";
import Header from "../../../shared/header/Header";
import Footer from "../../../shared/footer/Footer";
import {findPartner, matchPartner} from "../services/PartnerService";
import {getUserFromLocalStorage} from "../../auth/services/AuthService";
import {errorAlert, successAlert} from "../../../shared/notification/SweetAlert";

import bgFind from '../../../assets/svg/missing.svg';
import {useNavigate} from "react-router";

function FindPartner() {
    const [partner, setPartner] = useState(null);
    const [page, setPage] = useState(0);
    const navigate = useNavigate();

    const nextPartner = () => {
        setPage(initialValue => initialValue + 1);
    }

    const handleMatchPartner = (e) => {
        e.preventDefault();

        const {memberId} = getUserFromLocalStorage();
        const partnerMemberId = partner[0].MemberId;

        matchPartner(memberId, partnerMemberId)
            .then((r) => {
                successAlert('Success Match', r.message);
            })
            .catch((err) => {
                if (err.response.data.ErrorDescription.message === RESPONSE_MESSAGE.MATCH_PARTNER_FAILED) {
                    errorAlert('you already match');
                }
            })
    }

    const fetchPartner = () => {
        findPartner(getUserFromLocalStorage().memberId, page)
            .then((r) => {
                if (r.data === null) setPage(0);
                setPartner(r.data);
            })
            .catch(err => {
            });
    }

    useEffect(() => {
        fetchPartner();
    }, [page])

    return (
        <Box>
            <Header/>
            <Grid container width='90%' mx='auto' minHeight='100vh' alignItems='flex-start'>
                {partner &&
                    <Grid item container xs={12}>
                        <Grid item xs={12}>
                            <Typography sx={{my: {xs: 2, md: 4}}} textAlign='center' variant='h4' fontWeight='bold'
                                        color='rgba(0,0,0,0.6)'>
                                Find your partner
                            </Typography>
                        </Grid>
                        <Grid item container xs={12} justifyContent='center' mb={4}>
                            {partner?.map((p, idx) => {
                                return <CardFindPartner
                                    key={idx}
                                    data={p}
                                    nextPartner={nextPartner}
                                    handleMatchPartner={handleMatchPartner}/>
                            })}
                        </Grid>
                    </Grid>}
                {!partner &&
                    <Grid item container xs={12} my={4}>
                        <Grid item container xs={12} mb={4} justifyContent='space-between'>
                            <Typography variant='h4' color='rgba(0,0,0,0.6)'>
                                Partner is Missing
                            </Typography>
                            <Button sx={{my: {xs: 2, md: 0}}}
                                    variant='contained'
                                    onClick={() => navigate('/profile-update')}>
                                Update your
                                Profile</Button>
                        </Grid>
                        <Grid item container justifyContent='center' mt={3} xs={12}>
                            <Box sx={{width: {xs: '100%', md: '80%'}}}>
                                <img src={bgFind} width='100%' aria-hidden alt="bg-find-partner"/>
                            </Box>
                        </Grid>
                    </Grid>}
            </Grid>
            <Footer/>
        </Box>
    )
}

export default FindPartner;