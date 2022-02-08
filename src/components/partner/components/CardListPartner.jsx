import {CardActionArea, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import Card from "@mui/material/Card";
import {calculateAge, genderToString} from "../../../utils/util";
import {useState} from "react";
import ProfilePartner from "./ProfilePartner";
import {getProfile} from "../../auth/services/AuthService";
import {Skeleton} from "@mui/material";

function CardListPartner({data, isLoading}) {
    const [open, setOpen] = useState(false);
    const [partner, setPartner] = useState(null);

    const handleOpen = () => {
        setOpen(true);

        getProfile(data.MemberId)
            .then((res) => {
                setPartner(res.data);
            })
    }

    const loadingComp =
        <Grid container width={500}>
            <Skeleton variant="rectangular" width={500} height={600}/>
            <Grid container item justifyContent='space-between'>
                <Skeleton variant="text" width={200}/>
                <Skeleton variant="text" width={200}/>
            </Grid>
        </Grid>

    return (
        isLoading ? loadingComp :
            <Card>
                <CardActionArea onClick={handleOpen}>
                    <CardMedia
                        component='img'
                        alt={data.Name}
                        sx={{width: '100%', height: 700}}
                        image={`data:image;base64,${data.RecentPhotoPath}`}
                    />
                    <Grid px={4} item sx={{
                        position: 'absolute',
                        bottom: '0',
                        backgroundColor: '#ffffff8f',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                        <CardContent>
                            <Typography variant='h6'
                                        fontWeight='bold'>{data.Name}, {calculateAge(new Date(data.Bod))} Tahun</Typography>
                            <Typography color='#333'
                                        variant='h6' component='p'>{genderToString(data.Gender)}</Typography>
                        </CardContent>
                    </Grid>
                </CardActionArea>
                {partner && <ProfilePartner open={open} setOpen={setOpen} data={partner}/>}
            </Card>
    )
}

export default CardListPartner;