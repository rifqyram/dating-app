import {useState} from "react";
import {useNavigate} from "react-router";
import {useFormik} from "formik";

import {
    Button,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid, IconButton,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";
import {DesktopDatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {DeleteOutline, PhotoCamera} from "@mui/icons-material";
import {getUserFromLocalStorage, updateUserProfile, uploadAvatar} from "../services/AuthService";
import styled from "@emotion/styled";

import {errorAlert, successAlert} from "../../../shared/notification/SweetAlert";
import validationSchema from "../../../shared/validation/ValidationSchema";
import Header from "../../../shared/header/Header";
import Footer from "../../../shared/footer/Footer";
import {dateFormat} from "../../../utils/util";

const Input = styled('input')({
    display: 'none',
});

function UpdateProfileForm() {
    const [error, setError] = useState({});
    const [image, setImage] = useState({
        currentFile: null,
        previewImage: null,
    });
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            memberId: '',
            name: '',
            mobilePhone: '',
            bod: null,
            address: '',
            city: '',
            gender: 'M',
            bio: '',
            instagram: '',
            twitter: '',
        },
        validationSchema: validationSchema.updateProfileValidation,
        onSubmit: values => {
            if (image.currentFile === null) {
                setError({...error, image: 'Avatar tidak boleh kosong'})
                return;
            }

            const data = {
                ...values,
                memberId: getUserFromLocalStorage().memberId,
                selfDescription: values.bio,
                bod: dateFormat(values.bod),
            }

            updateUserProfile(data)
                .then(() => {
                    uploadAvatar(data.memberId, image.currentFile)
                        .then(() => {
                            successAlert('Success', 'Update Profile Success')
                                .then(() => navigate('/profile-preference'));
                        })
                        .catch(err => {
                            errorAlert(err)
                        })
                })
                .catch(err => {
                    errorAlert(err)
                })
        }
    });

    const handleUpload = (e) => {
        if (e.target.files.length === 0) return;

        setError({...error, image: null})
        const fileSize = e.target.files[0].size;
        const file = Math.round((fileSize / 1024));

        if (file >= 1024) {
            setError({...error, image: 'Maksimum upload gambar 1mb'})
        } else {
            setImage({
                currentFile: e.target.files[0],
                previewImage: URL.createObjectURL(e.target.files[0])
            });
        }
    }

    return (
        <>
            <Header/>
            <Grid container width='90%' minHeight='100vh' alignContent="flex-start" mx='auto'>
                <Grid item xs={12} my={4}>
                    <Typography variant='h4' color='primary' align='center'>Update Profile</Typography>
                </Grid>
                <Grid item container xs={12} spacing={3} mt={4} component='form' onSubmit={formik.handleSubmit}>
                    <Grid container item md={4} xs={12} alignItems='center' direction='column'>
                        {image.previewImage ?
                            <img width='300' height='300' style={{borderRadius: '50%', objectFit: 'cover'}}
                                 src={image.previewImage}
                                 aria-hidden alt=''/> :
                            <img width='300' height='300' style={{borderRadius: '50%', objectFit: 'cover'}}
                                 src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
                                 aria-hidden alt=''/>
                        }
                        <label htmlFor="contained-button-file">
                            <Input
                                onChange={handleUpload}
                                accept="image/*"
                                id="contained-button-file"
                                type="file"/>
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
                                id='name'
                                autoComplete='off'
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name ? formik.errors.name : 'Nama tidak bisa diubah setelah disubmit'}
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />
                        </FormControl>
                        <FormControl margin='dense' fullWidth autoComplete='off'>
                            <TextField
                                label="Mobile Phone Number"
                                variant='outlined'
                                size='small'
                                name='mobilePhone'
                                id='mobilePhone'
                                autoComplete='off'
                                error={formik.touched.mobilePhone && Boolean(formik.errors.mobilePhone)}
                                helperText={formik.touched.mobilePhone && formik.errors.mobilePhone ? formik.errors.mobilePhone : 'No Handphone: Contoh: 0812xxxxxxx'}
                                value={formik.values.mobilePhone}
                                onChange={formik.handleChange}
                            />
                        </FormControl>
                        <FormControl margin='dense' fullWidth autoComplete='off'>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Birthdate"
                                    value={formik.values.bod}
                                    disableFuture
                                    onChange={(date) => formik.setFieldValue('bod', date)}
                                    renderInput={(params) => <TextField
                                        {...params}
                                        size='small'
                                        name='bod'
                                        id='bod'
                                        error={formik.touched.dob && Boolean(formik.errors.bod)}
                                        helperText={formik.touched.dob && formik.errors.bod ? formik.errors.bod : 'Tanggal Lahir harus minimal 18 tahun'}/>}/>
                            </LocalizationProvider>
                        </FormControl>
                        <FormControl margin='dense' fullWidth>
                            <TextField
                                label='Address'
                                variant='outlined'
                                size='small'
                                name='address'
                                id='address'
                                multiline
                                maxRows={4}
                                minRows={4}
                                error={formik.touched.address && Boolean(formik.errors.address)}
                                helperText={formik.touched.address && formik.errors.address ? formik.errors.address : 'Alamat Anda'}
                                value={formik.values.address}
                                onChange={formik.handleChange}
                            />
                        </FormControl>
                        <FormControl margin='dense' fullWidth>
                            <TextField
                                label='City'
                                variant='outlined'
                                size='small'
                                name='city'
                                id='city'
                                error={formik.touched.city && Boolean(formik.errors.city)}
                                helperText={formik.touched.city && formik.errors.city ? formik.errors.city : 'Kota tempat tinggal Anda'}
                                value={formik.values.city}
                                onChange={formik.handleChange}
                            />
                        </FormControl>
                        <FormControl
                            margin='dense'
                            fullWidth>
                            <FormLabel id="gender-group-button">Gender</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="gender"
                                value={formik.values.gender}
                                onChange={formik.handleChange}
                                id='gender'
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
                                label='Bio'
                                size='small'
                                name='bio'
                                id='bio'
                                error={formik.touched.bio && Boolean(formik.errors.bio)}
                                helperText={formik.touched.bio && formik.errors.bio ? formik.errors.bio : 'Bio, ceritakan tentang diri anda'}
                                value={formik.values.bio}
                                onChange={formik.handleChange}
                                minRows={5}
                                maxRows={5}/>
                        </FormControl>
                        <FormControl margin='dense' fullWidth>
                            <TextField
                                label='Instagram'
                                variant='outlined'
                                name='instagram'
                                id='instagram'
                                helperText={"Akun Instagram Anda"}
                                value={formik.values.instagram}
                                onChange={formik.handleChange}
                                size='small'/>
                        </FormControl>
                        <FormControl margin='dense' fullWidth>
                            <TextField
                                label='Twitter'
                                variant='outlined'
                                name='twitter'
                                id='twitter'
                                helperText={"Akun Twitter Anda"}
                                value={formik.values.twitter}
                                onChange={formik.handleChange}
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