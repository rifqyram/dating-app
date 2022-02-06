import {Box, Grid, Modal, Typography} from "@mui/material";
import {calculateAge, genderToString} from "../../../utils/util";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {xs: '90%', md: 500},
    bgcolor: 'background.paper',
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
};


function ProfilePartner({open, setOpen, data}) {
    const {PersonalInfo, ContactInfo, AddressInfo} = data;

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Grid container direction='column'>
                    <Grid container item justifyContent='center' xs={12}>
                        <img width='250px' height='250px' style={{borderRadius: '50%', objectFit: 'cover'}} src={`data:image;base64,${PersonalInfo.RecentPhotoPath}`} aria-hidden alt={PersonalInfo.Name} />
                    </Grid>
                    <Grid container item xs={12} my={1}>
                        <Grid item xs={12}>
                            <Typography mb={1} variant='h5' color='primary'>Personal Information</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant='p' component='p' >Name</Typography>
                            <Typography variant='p' component='p' >Gender</Typography>
                            <Typography variant='p' component='p' >Umur</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant='p' component='p' color='rgba(0,0,0,0.6)' >{PersonalInfo.Name}</Typography>
                            <Typography variant='p' component='p' color='rgba(0,0,0,0.6)'>{genderToString(PersonalInfo.Gender)}</Typography>
                            <Typography variant='p' component='p' color='rgba(0,0,0,0.6)'>{calculateAge(new Date(PersonalInfo.Bod))} Tahun</Typography>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} my={1}>
                        <Grid item xs={12}>
                            <Typography mb={1} variant='h5' color='primary'>Contact Information</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant='p' component='p' >Instagram</Typography>
                            <Typography variant='p' component='p' >Twitter</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant='p' component='p' color='rgba(0,0,0,0.6)' >@{ContactInfo.InstagramId}</Typography>
                            <Typography variant='p' component='p' color='rgba(0,0,0,0.6)'>@{ContactInfo.TwitterId}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} my={1}>
                        <Grid item xs={12}>
                            <Typography mb={1} variant='h5' color='primary'>Address Information</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant='p' component='p' >City</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant='p' component='p' color='rgba(0,0,0,0.6)' >{AddressInfo.City}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}

export default ProfilePartner;