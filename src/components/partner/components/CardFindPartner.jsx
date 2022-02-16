import {Button, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {calculateAge, genderToString} from "../../../utils/util";
import LightTooltip from "../../../shared/tooltip/LightToolTip";
import {ArrowForward, Favorite} from "@mui/icons-material";
import Card from "@mui/material/Card";
import {Skeleton} from "@mui/lab";

function CardFindPartner({data, handleMatchPartner, nextPartner}) {

    const loadingComp =
        <Grid container width={500}>
            <Skeleton variant="rectangular" width={500} height={600}/>
            <Grid container item justifyContent='space-between'>
                <Skeleton variant="text" width={200}/>
                <Skeleton variant="text" width={200}/>
            </Grid>
        </Grid>

    return (
        <Card sx={{
            borderRadius: '12px',
            position: 'relative',
            width: {xs: '100%',md: 600}
        }}>
            <CardMedia
                component='img'
                image={`data:image;base64,${data.RecentPhotoPath}`}
                sx={{height: {xs: 600, md: 800}}}
                alt='name'/>
            <Grid px={4} item sx={{
                position: 'absolute',
                bottom: '0',
                backgroundColor: 'rgba(255,255,255,0.60)',
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <CardContent>
                    <Typography variant='h5'
                                fontWeight='bold'>{data.Name}, {calculateAge(new Date(data.Bod))} Tahun</Typography>
                    <Typography color='#333'
                                variant='h6'>{genderToString(data.Gender)}</Typography>
                </CardContent>
                <CardActions>
                    <LightTooltip title='Match' placement='top'>
                        <Button variant='contained'
                                onClick={handleMatchPartner}><Favorite/></Button>
                    </LightTooltip>
                    <LightTooltip title='Next Partner' placement='top'>
                        <Button variant="contained" color='secondary'
                                onClick={nextPartner}><ArrowForward color='primary'/></Button>
                    </LightTooltip>
                </CardActions>
            </Grid>
        </Card>
    )
}

export default CardFindPartner;