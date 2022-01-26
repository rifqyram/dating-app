import {
    Box,
    Button,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField
} from "@mui/material";
import {DesktopDatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {useEffect, useState} from "react";
import {dateFormat} from "../../../shared/date-format";
import {getUserFromLocalStorage, updateUserProfile} from "../services/AuthService";
import Header from "../../../shared/header/Header";

function UpdateProfileForm() {
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

    function handleOnSubmit(e) {
        e.preventDefault();

        const data = {
            memberId: memberId,
            name: fullName,
            bod: dateFormat(dob),
            gender: gender,
            selfDescription: biodata,
            instagram: instagram,
            twitter: twitter,
            mobilePhone: mobilePhone,
            address: address,
            city: city,
            postalCode: postalCode
        }

        updateUserProfile(data)
            .then(r => {
                console.log(r)
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        setMemberId(getUserFromLocalStorage().memberId)
    }, []);
    

    return (
        <>
            <Header />
            <Container>
                <Grid container>
                    <Container>
                        <Grid item xs={12} my={4} component='form' onSubmit={handleOnSubmit}>
                            <FormLabel required>Personal Data</FormLabel>
                            <FormControl fullWidth autoComplete='off' margin='dense' required>
                                <TextField
                                    label="Member Id"
                                    variant='outlined'
                                    size='small'
                                    margin='dense'
                                    disabled
                                    value={memberId}
                                    onChange={(e) => setMemberId(e.target.value)}
                                />
                            </FormControl>
                            <FormControl fullWidth autoComplete='off' margin='dense' required>
                                <TextField
                                    label="Nama Lengkap"
                                    variant='outlined'
                                    size='small'
                                    margin='dense'
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </FormControl>
                            <FormControl fullWidth autoComplete='off' margin='dense' required>
                                <TextField
                                    label="No Handphone"
                                    variant='outlined'
                                    size='small'
                                    onChange={(e) => setMobilePhone(e.target.value)}
                                />
                            </FormControl>
                            <FormControl fullWidth autoComplete='off' margin='dense'>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DesktopDatePicker
                                        label="Tanggal Lahir"
                                        value={dob}
                                        disableFuture
                                        onChange={(e) => setDob(e)}
                                        renderInput={(params) => <TextField {...params} size='small'/>}/>
                                </LocalizationProvider>
                            </FormControl>
                            <FormControl fullWidth margin='dense'>
                                <TextField
                                    onChange={(e) => setAddress(e.target.value)}
                                    label='Alamat'
                                    variant='outlined'
                                    size='small'/>
                            </FormControl>
                            <FormControl fullWidth margin='dense'>
                                <TextField
                                    onChange={(e) => setCity(e.target.value)}
                                    label='Kota'
                                    variant='outlined'
                                    size='small'/>
                            </FormControl>
                            <FormControl fullWidth margin='dense'>
                                <TextField
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    label='Kode Pos'
                                    variant='outlined'
                                    size='small'/>
                            </FormControl>
                            <FormControl
                                fullWidth
                                margin='dense'
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
                            <FormLabel id="social-media">Media Sosial</FormLabel>
                            <FormControl margin='dense' fullWidth>
                                <TextField
                                    label='Instagram'
                                    variant='outlined'
                                    onChange={(e) => setInstagram(e.target.value)}
                                    size='small'/>
                            </FormControl>
                            <FormControl fullWidth margin='dense'>
                                <TextField
                                    onChange={(e) => setTwitter(e.target.value)}
                                    label='Twitter'
                                    variant='outlined'
                                    size='small'/>
                            </FormControl>
                            <Box my={2}>
                                <Button
                                    fullWidth
                                    variant='outlined'
                                    size='large'
                                    type='submit'>Submit</Button>
                            </Box>
                        </Grid>
                    </Container>
                </Grid>
            </Container>
        </>
    )
}

export default UpdateProfileForm;