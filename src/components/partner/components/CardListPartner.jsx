import {CardActionArea, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import Card from "@mui/material/Card";
import {calculateAge, genderToString} from "../../../utils/util";
import {useState} from "react";
import ProfilePartner from "./ProfilePartner";
import {getProfile} from "../../auth/services/AuthService";

function CardListPartner({data}) {
    const [open, setOpen] = useState(false);
    const [partner, setPartner] = useState(null);

    const handleOpen = () => {
        setOpen(true);

        getProfile(data.MemberId)
            .then((res) => {
                setPartner(res.data);
            })
    }

    console.log(partner)

    return (
        <Card>
            <CardActionArea onClick={handleOpen}>
                <CardMedia
                    component='img'
                    height={700}
                    alt='name'
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
            {partner && <ProfilePartner open={open} setOpen={setOpen} data={partner} />}
        </Card>
    )
}

export default CardListPartner;