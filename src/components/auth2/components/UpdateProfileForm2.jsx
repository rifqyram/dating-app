import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";
import styled from "@emotion/styled";
import './profile.css';
import {useState} from "react";
import {PhotoCamera} from "@mui/icons-material";
import Header from "../../../shared/header/Header";
import {DesktopDatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Footer from "../../../shared/footer/Footer";

const Input = styled('input')({
    display: 'none',
});

function UpdateProfileForm2() {
    const [memberId, setMemberId] = useState('');
    const [fullName, setFullName] = useState('');
    const [mobilePhone, setMobilePhone] = useState('');
    const [dob, setDob] = useState(null);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [gender, setGender] = useState('M');
    const [biodata, setBiodata] = useState('');
    const [instagram, setInstagram] = useState('');
    const [twitter, setTwitter] = useState('');

    return (
        <>
            <Header/>
            <Grid width='90%' minHeight='90vh' mx='auto'>
            <Typography variant='h4' my={4} color='primary'>Update Profile Kamu</Typography>
                <Grid container justifyContent='space-between' component='form'>
                    <Grid item md={2} xs={12} display='flex' alignItems='center' direction='column'>
                        <img width='300' height='300' style={{borderRadius: '50%', objectFit: 'cover'}}
                             src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
                             aria-hidden alt=''/>
                        <Button variant='contained' size='large' sx={{mt: 1}}>
                            <PhotoCamera sx={{mr: 1}}/>
                            Choose Photo
                        </Button>
                    </Grid>
                    <Grid item md={5} xs={12}>
                        <Typography variant='h6' color='primary'>Data Pribadi</Typography>
                        <FormControl sx={{display: 'none'}} margin='dense' fullWidth autoComplete='off' required>
                            <TextField
                                label="Member Id"
                                variant='outlined'
                                size='small'
                                disabled
                                value={memberId}
                                onChange={(e) => setMemberId(e.target.value)}
                            />
                        </FormControl>
                        <FormControl margin='dense' fullWidth autoComplete='off' required>
                            <TextField
                                label="Nama Lengkap"
                                variant='outlined'
                                size='small'
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl margin='dense' fullWidth autoComplete='off' required>
                            <TextField
                                label="No Handphone"
                                variant='outlined'
                                size='small'
                                onChange={(e) => setMobilePhone(e.target.value)}
                            />
                        </FormControl>
                        <FormControl margin='dense' fullWidth autoComplete='off'>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Tanggal Lahir"
                                    value={dob}
                                    disableFuture
                                    onChange={(e) => setDob(e)}
                                    renderInput={(params) => <TextField {...params} size='small'/>}/>
                            </LocalizationProvider>
                        </FormControl>
                        <FormControl margin='dense' fullWidth>
                            <TextField
                                onChange={(e) => setAddress(e.target.value)}
                                label='Alamat'
                                variant='outlined'
                                size='small'/>
                        </FormControl>
                        <FormControl margin='dense' fullWidth>
                            <TextField
                                onChange={(e) => setCity(e.target.value)}
                                label='Kota'
                                variant='outlined'
                                size='small'/>
                        </FormControl>
                        <FormControl
                            margin='dense'
                            fullWidth
                            required>
                            <FormLabel id="gender-group-button">Gender</FormLabel>
                            <RadioGroup
                                aria-labelledby="gender-group-button"
                                value={gender}
                                row
                                onChange={(e) => setGender(e.target.value)}
                                name="gender-button-groups">
                                <FormControlLabel
                                    value="M"
                                    control={<Radio size='small'/>}
                                    label="Male"/>
                                <FormControlLabel
                                    value="F"
                                    control={<Radio size='small'/>}
                                    label="Female"/>
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Typography variant='h6' color='primary'>Tentang Saya</Typography>
                        <FormControl
                            margin='dense'
                            fullWidth>
                            <TextField
                                onChange={(e) => setBiodata(e.target.value)}
                                multiline
                                label='Biodata'
                                required
                                size='small'
                                minRows={5}
                                maxRows={5}/>
                        </FormControl>
                        <FormControl margin='dense' fullWidth>
                            <TextField
                                label='Instagram'
                                variant='outlined'
                                onChange={(e) => setInstagram(e.target.value)}
                                size='small'/>
                        </FormControl>
                        <FormControl margin='dense' fullWidth>
                            <TextField
                                onChange={(e) => setTwitter(e.target.value)}
                                label='Twitter'
                                variant='outlined'
                                size='small'/>
                        </FormControl>
                        <Button variant='outlined' size='large' fullWidth sx={{mt: 1}}>Submit</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Footer/>
        </>
    )
}

export default UpdateProfileForm2;