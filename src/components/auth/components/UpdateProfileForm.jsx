import {
    Button,
    FormControl,
    FormControlLabel, FormHelperText,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";
import {DesktopDatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {useEffect, useState} from "react";
import {dateFormat} from "../../../shared/date-format";
import {getUserFromLocalStorage, updateUserProfile, uploadAvatar} from "../services/AuthService";
import Header from "../../../shared/header/Header";
import {PhotoCamera} from "@mui/icons-material";
import Footer from "../../../shared/footer/Footer";
import styled from "@emotion/styled";
import {checkObjectValueIsEmpty, validPhoneNumber} from "../../../utils/util";
import {errorAlert, successAlert} from "../../../shared/notification/SweetAlert";
import {useNavigate} from "react-router";

const Input = styled('input')({
    display: 'none',
});

function UpdateProfileForm() {

    const [formValue, setFormValue] = useState({
        memberId: '',
        name: '',
        mobilePhone: '',
        address: '',
        city: '',
        gender: 'M',
        biodata: '',
        instagram: '',
        twitter: '',
    });
    const [error, setError] = useState({});
    const [dob, setDob] = useState(null);
    const [image, setImage] = useState({
        currentFile: null,
        previewImage: null,
    });
    const navigate = useNavigate();


    const validationOnSubmit = () => {
        let errors = {
            name: '',
            mobilePhone: '',
            city: '',
            biodata: '',
            image: '',
        };
        let valid = true;

        if (!formValue.name) {
            valid = false;
            errors.name = 'Nama tidak boleh kosong'
        }

        if (!formValue.mobilePhone) {
            valid = false;
            errors.mobilePhone = 'Nomor Hp tidak boleh kosong'
        }

        if (!formValue.city) {
            valid = false;
            errors.city = 'Kota tidak boleh kosong'
        }

        if (!dob) {
            valid = false;
            errors.dob = 'Tanggal lahir tidak boleh kosong'
        }

        if (!formValue.biodata) {
            valid = false;
            errors.biodata = 'Biodata tidak boleh kosong'
        }

        if (!image.currentFile) {
            valid = false;
            errors.image = 'Avatar tidak boleh kosong'
        }

        setError({...errors});
        return valid;
    }

    const formValidation = (name, value) => {
        let valid = true;
        let message;

        if (!value) {
            valid = false;
            message = "Field tidak boleh kosong";
        }

        if (name === 'mobilePhone' && !validPhoneNumber(value)) {
            valid = false;
            message = "Nomor Hp tidak valid";
        }

        return [valid, message];
    }

    const handleBlur = (e) => {
        const {target: {name, value}} = e;
        const [valid, message] = formValidation(name, value);

        if (!valid) {
            setError({...error, [name]: message})
        }
    }

    const handleUpload = (e) => {
        if (e.target.files.length > 0) {
            setError({...error, image: null})

            const fsize = e.target.files[0].size;
            const file = Math.round((fsize / 1024));
            if (file >= 1024) {
                setError({...error, image: 'Maksimum upload gambar 1mb'})
            } else {
                setImage({
                    currentFile: e.target.files[0],
                    previewImage: URL.createObjectURL(e.target.files[0])
                });
            }

        }
    }

    const handleOnChange = (e) => {
        const {target: {name, value}} = e;
        setFormValue({...formValue, [name]: value});
        setError({...error, [name]: null});

        const [valid, message] = formValidation(name, value);
        if (!valid) {
            setError({...error, [name]: message})
        }
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        validationOnSubmit();

        if (validationOnSubmit()) {
            const data = {
                memberId: formValue.memberId,
                name: formValue.name,
                bod: dateFormat(dob),
                gender: formValue.gender,
                selfDescription: formValue.biodata,
                instagram: formValue.instagram,
                twitter: formValue.twitter,
                mobilePhone: formValue.mobilePhone,
                address: formValue.address,
                city: formValue.city,
            }

            updateUserProfile(data)
                .then(() => {
                    if (image) {
                        uploadAvatar(formValue.memberId, image.currentFile)
                            .then(() => {
                                successAlert('Success', 'Update Profile Success')
                                    .then(() => navigate('/profile-preference'));
                            })
                            .catch(err => {
                                console.log(err.response);
                                errorAlert(err.response.data.ErrorDescription.message)
                            })
                    }
                })
                .catch(err => {
                    errorAlert(err.response.data.ErrorDescription.message)
                })
        }

        // updateUserProfile(data)
        //     .then(r => {
        //         console.log(r)
        //     })
        //     .catch(err => console.log(err));
    }

    useEffect(() => {
        setFormValue({
            ...formValue, memberId: getUserFromLocalStorage().memberId
        })
    }, []);

    return (
        <>
            <Header/>
            <Grid width='90%' minHeight='90vh' mx='auto'>
                <Typography variant='h4' my={4} color='primary'>Update Profile Kamu</Typography>
                <Grid container spacing={3} component='form' onSubmit={handleOnSubmit}>
                    <Grid container item md={4} xs={12} display='flex' alignItems='center' direction='column'>
                        {image.previewImage ?
                            <img width='300' height='300' style={{borderRadius: '50%', objectFit: 'cover'}}
                                 src={image.previewImage}
                                 aria-hidden alt=''/> :
                            <img width='300' height='300' style={{borderRadius: '50%', objectFit: 'cover'}}
                                 src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
                                 aria-hidden alt=''/>
                        }
                        <label htmlFor="contained-button-file">
                            <Input onChange={handleUpload} accept="image/*" id="contained-button-file" type="file"/>
                            <Button sx={{mt: 1}} variant="contained" component="span">
                                <PhotoCamera sx={{mr: 1}}/> Choose Avatar
                            </Button>
                            <FormHelperText error={Boolean(error?.image)}>{error?.image}</FormHelperText>
                        </label>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Typography variant='h6' color='primary'>Personal Information</Typography>
                        <FormControl margin='dense' fullWidth>
                            <TextField
                                label="Name"
                                variant='outlined'
                                size='small'
                                name='name'
                                onBlur={handleBlur}
                                autoComplete='off'
                                error={Boolean(error?.name)}
                                helperText={error?.name ? error?.name : "Nama tidak bisa diubah setelah disubmit"}
                                value={formValue.name}
                                onChange={handleOnChange}
                            />
                        </FormControl>
                        <FormControl margin='dense' fullWidth autoComplete='off'>
                            <TextField
                                label="Mobile Phone Number"
                                variant='outlined'
                                size='small'
                                name='mobilePhone'
                                autoComplete='off'
                                onBlur={handleBlur}
                                error={Boolean(error?.mobilePhone)}
                                helperText={error?.mobilePhone ? error?.mobilePhone : "No Handphone: Contoh: 0812xxxxxxx"}
                                value={formValue.mobilePhone}
                                onChange={handleOnChange}
                            />
                        </FormControl>
                        <FormControl margin='dense' fullWidth autoComplete='off'>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Birthdate"
                                    value={dob}
                                    disableFuture
                                    onChange={(e) => {
                                        setDob(e)
                                        setError({...error, dob: ''})
                                    }}
                                    renderInput={(params) => <TextField {...params} size='small'
                                                                        error={Boolean(error?.dob)}
                                                                        helperText={error?.dob ? error?.dob : "Tanggal Lahir Anda"}/>}/>
                            </LocalizationProvider>
                        </FormControl>
                        <FormControl margin='dense' fullWidth>
                            <TextField
                                label='Address'
                                variant='outlined'
                                size='small'
                                onBlur={handleBlur}
                                name='address'
                                multiline
                                maxRows={4}
                                minRows={4}
                                error={Boolean(error?.address)}
                                helperText={error?.address ? error?.address : "Alamat Anda"}
                                value={formValue.address}
                                onChange={handleOnChange}
                            />
                        </FormControl>
                        <FormControl margin='dense' fullWidth>
                            <TextField
                                label='City'
                                variant='outlined'
                                size='small'
                                onBlur={handleBlur}
                                name='city'
                                error={Boolean(error?.city)}
                                helperText={error?.city ? error?.city : "Kota tempat tinggal Anda"}
                                value={formValue.city}
                                onChange={handleOnChange}
                            />
                        </FormControl>
                        <FormControl
                            margin='dense'
                            fullWidth>
                            <FormLabel id="gender-group-button">Gender</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="gender"
                                value={formValue.gender}
                                onChange={handleOnChange}
                                name="gender">
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
                    <Grid item md={4} xs={12} sx={{mb: {xs: 4}}}>
                        <Typography variant='h6' color='primary'>About Me</Typography>
                        <FormControl
                            margin='dense'
                            fullWidth>
                            <TextField
                                multiline
                                label='Biodata'
                                size='small'
                                name='biodata'
                                onBlur={handleBlur}
                                error={Boolean(error?.biodata)}
                                helperText={error?.biodata ? error?.biodata : "Biodata, ceritakan tentang diri anda"}
                                value={formValue.biodata}
                                onChange={handleOnChange}
                                minRows={5}
                                maxRows={5}/>
                        </FormControl>
                        <FormControl margin='dense' fullWidth>
                            <TextField
                                label='Instagram'
                                variant='outlined'
                                name='instagram'
                                helperText={"Akun Instagram Anda"}
                                value={formValue.instagram}
                                onChange={handleOnChange}
                                size='small'/>
                        </FormControl>
                        <FormControl margin='dense' fullWidth>
                            <TextField
                                label='Twitter'
                                variant='outlined'
                                name='twitter'
                                helperText={"Akun Twitter Anda"}
                                value={formValue.twitter}
                                onChange={handleOnChange}
                                size='small'/>
                        </FormControl>
                        <Button variant='outlined' size='large'
                                type='submit' fullWidth sx={{mt: 1}}>Submit</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Footer/>
        </>
    )
}

export default UpdateProfileForm;