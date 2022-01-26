import Card from '@mui/material/Card';
import Header from "../../../shared/header/Header";
import {CardContent, CardMedia, Container, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {findPartner} from "../services/PartnerService";
import {getUserFromLocalStorage} from "../../auth/services/AuthService";

function genderToString(gender) {
    return gender === 'M' ? 'Laki-laki' : 'Perempuan';
}

function calculateAge(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

function CardPartner() {
    const [partner, setPartner] = useState(null);

    useEffect(() => {
        findPartner(getUserFromLocalStorage().memberId, 1, 1)
            .then((r) => {
                setPartner(r.data);
            })
            .catch(err => {
                console.log(err.response);
            });
    }, [])

    return (
        <>
            <Header/>
            <Container fixed>
                {partner?.map((p, idx) => {
                    return (
                        <Card sx={{
                            my: '1em',
                            borderRadius: '12px',
                        }} key={idx}>
                            <CardMedia
                                component='img'
                                sx={{
                                    height: {xs: 500, md: 600},
                                }}
                                image="https://images.unsplash.com/photo-1504593811423-6dd665756598?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                                alt='name'/>
                            <CardContent>
                                <Typography variant='h5' fontWeight='bold'>{p.Name}, {calculateAge(new Date(p.Bod))} Tahun</Typography>
                                <Typography variant='h6'>{genderToString(p.Gender)}</Typography>
                            </CardContent>
                        </Card>
                    )
                })}
            </Container>
        </>
    )
}

export default CardPartner;