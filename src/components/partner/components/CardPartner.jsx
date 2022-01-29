import Card from '@mui/material/Card';
import Header from "../../../shared/header/Header";
import {
    Button,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Tooltip,
    tooltipClasses,
    Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import {findPartner, matchPartner} from "../services/PartnerService";
import {getUserFromLocalStorage} from "../../auth/services/AuthService";
import {calculateAge, genderToString} from "../../../utils/util";
import {ArrowForward, Favorite} from "@mui/icons-material";
import styled from "@emotion/styled";
import Footer from "../../../shared/footer/Footer";

const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}));

function CardPartner() {
    const [partner, setPartner] = useState(null);
    const [page, setPage] = useState(1);

    const nextPartner = () => {
        setPage(initialValue => initialValue + 2);
    }

    const handleMatchPartner = (e) => {
        e.preventDefault();

        const {memberId} = getUserFromLocalStorage();
        const partnerMemberId = partner[0].MemberId;

        matchPartner(memberId, partnerMemberId)
            .then((r) => {
                console.log(r)
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    const fetchPartner = () => {
        findPartner(getUserFromLocalStorage().memberId, page)
            .then((r) => {
                console.log(r)
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
            <Container sx={{
                display: 'grid',
                height: {md: '100vh', xs: '80vh'},
                alignItems: 'center'
            }}>
                {partner?.map((p, idx) => {
                    return (
                        <Card sx={{
                            my: '1em',
                            borderRadius: '12px',
                            position: 'relative'
                        }} key={idx}>
                            <CardMedia
                                component='img'
                                sx={{
                                    height: {xs: 500, md: 800},
                                }}
                                // image={`data:image;base64,${img}`}
                                image="https://images.unsplash.com/photo-1553272725-086100aecf5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80"
                                alt='name'/>
                            <Grid px={4} item sx={{
                                position: 'absolute',
                                bottom: '0',
                                backgroundColor: '#ffffff8f',
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}>
                                <CardContent>
                                    <Typography variant='h5'
                                                fontWeight='bold'>{p.Name}, {calculateAge(new Date(p.Bod))} Tahun</Typography>
                                    <Typography color='#333' variant='h6'>{genderToString(p.Gender)}</Typography>
                                </CardContent>
                                <CardActions>
                                    <LightTooltip title='Match' placement='top'>
                                        <Button variant='contained' onClick={handleMatchPartner}><Favorite/></Button>
                                    </LightTooltip>
                                    <LightTooltip title='Next Partner' placement='top'>
                                        <Button variant="contained" color='secondary'
                                                onClick={nextPartner}><ArrowForward color='primary'/></Button>
                                    </LightTooltip>
                                </CardActions>
                            </Grid>
                        </Card>
                    )
                })}
            </Container>
            <Footer />
        </>
    )
}

export default CardPartner;