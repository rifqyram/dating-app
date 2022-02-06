import Header from "../../../shared/header/Header";
import {Grid, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {findPartner, matchPartner} from "../services/PartnerService";
import {getUserFromLocalStorage} from "../../auth/services/AuthService";
import Footer from "../../../shared/footer/Footer";
import {errorAlert, successAlert} from "../../../shared/notification/SweetAlert";
import RESPONSE_MESSAGE from "../../../constant/response-message";
import CardFindPartner from "./CardFindPartner";
import {useParams} from "react-router";
import {Skeleton} from "@mui/lab";

function FindPartner() {
    const [partner, setPartner] = useState(null);
    const [page, setPage] = useState(0);
    const params = useParams()

    const nextPartner = () => {
        setPage(initialValue => initialValue + 1);
    }

    console.log(page)

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
                console.log(err.response);
            });
    }

    useEffect(() => {
        fetchPartner();
    }, [page])

    return (
        <>
            <Header/>
            <Grid container width='90%' mx='auto' minHeight='90vh' mb={4}>
                <Grid container>
                    <Typography sx={{my: {xs: 2, md: 4}}} variant='h4' fontWeight='bold' color='rgba(0,0,0,0.6)'>Find your
                        partner</Typography>
                    <Grid item container xs={12} justifyContent='center'>
                        {partner?.map((p, idx) => {
                            return <CardFindPartner key={idx} data={p} idx={idx} nextPartner={nextPartner} handleMatchPartner={handleMatchPartner} />
                        })}
                    </Grid>
                </Grid>
            </Grid>
            <Footer/>
        </>
    )
}

export default FindPartner;