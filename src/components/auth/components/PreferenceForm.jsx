import Header from "../../../shared/header/Header";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";
import {createPreference, getListInterest, getUserFromLocalStorage} from "../services/AuthService";
import {useEffect, useState} from "react";
import imageForm from "../../../assets/image/image-interest-form.jpg";
import Footer from "../../../shared/footer/Footer";
import {useNavigate} from "react-router";
import {errorAlert, successAlert} from "../../../shared/notification/SweetAlert";
import {useFormik} from "formik";
import validationSchema from "../../../shared/validation/ValidationSchema";

function PreferenceForm() {
    const [error, setError] = useState(null);
    const [interestData, setInterestData] = useState([]);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            memberId: '',
            genderInterest: 'M',
            domicileInterest: '',
            startAgeInterest: '',
            endAgeInterest: '',
            interests: []
        },
        validationSchema: validationSchema.profilePreferenceValidation,
        onSubmit: values => {
            if (getUserFromLocalStorage() === null) return;

            const data = {
                ...values,
                memberId: getUserFromLocalStorage().memberId
            }

            createPreference(data)
                .then(response => {
                    successAlert('Success', 'Your preference has been created');
                    navigate('/');
                })
                .catch(error => {
                    errorAlert('Error', 'Your preference has not been created');
                });
        }
    });

    const handleChangeInterest = (e) => {
        setError({...error, interests: ''})

        let newArray = [formik.values.interests, {interestId: e.target.id}]
        const find = formik.values.interests.find(element => e.target.id === element.interestId);

        if (find) {
            newArray = newArray.filter((data) => data.interestId !== e.target.id);
        }

        if (newArray.length === 0) {
            setError({...error, interests: 'Pilih minimal 1'})
        }

        formik.setFieldValue('interests', newArray);
    }

    useEffect(() => {
        getListInterest()
            .then(r => {
                setInterestData(r.data)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <>
            <Header/>
            <Grid minHeight='90vh' alignItems='center' my={4} container spacing={0} width='90%' marginX='auto'>
                <Grid item md={8} sx={{display: {xs: 'none', md: 'block'}}}>
                    <img width='100%' src={imageForm} loading="lazy" aria-hidden alt={'image-form'}/>
                </Grid>
                <Grid item md={4} xs={12} component='form' onSubmit={formik.handleSubmit}>
                    <Typography variant='h5' color='primary' textAlign='center'>My Preference</Typography>
                    <FormControl fullWidth margin='dense'>
                        <FormLabel id="genderInterest">Interest to</FormLabel>
                        <RadioGroup
                            aria-labelledby="genderInterest"
                            value={formik.values.genderInterest}
                            onChange={formik.handleChange}
                            row
                            name="genderInterest">
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
                    <FormControl fullWidth margin='dense'>
                        <TextField
                            variant='outlined'
                            label='Domicile'
                            name='domicileInterest'
                            autoComplete='off'
                            error={formik.touched.domicileInterest && Boolean(formik.errors.domicileInterest)}
                            helperText={formik.touched.domicileInterest && formik.errors.domicileInterest ? formik.errors.domicileInterest : 'Domisili untuk pencarian partner anda'}
                            value={formik.values.domicileInterest}
                            onChange={formik.handleChange}
                            size='small'/>
                    </FormControl>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl fullWidth margin='dense'>
                                <TextField variant='outlined'
                                           label='Start Age Interest'
                                           size='small'
                                           type='number'
                                           name='startAgeInterest'
                                           autoComplete='off'
                                           error={formik.touched.startAgeInterest && Boolean(formik.errors.startAgeInterest)}
                                           helperText={formik.touched.startAgeInterest && formik.errors.startAgeInterest ? formik.errors.startAgeInterest : 'Minimal umur 18 tahun'}
                                           value={formik.values.startAgeInterest}
                                           onChange={formik.handleChange}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth margin='dense'>
                                <TextField variant='outlined'
                                           label='End Age Interest'
                                           size='small'
                                           type='number'
                                           name='endAgeInterest'
                                           autoComplete='off'
                                           error={formik.touched.endAgeInterest && Boolean(formik.errors.endAgeInterest)}
                                           helperText={formik.touched.endAgeInterest && formik.errors.endAgeInterest ? formik.errors.endAgeInterest : 'Maksimal umur 40 tahun'}
                                           value={formik.values.endAgeInterest}
                                           onChange={formik.handleChange}/>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item>
                        {interestData.map(item => {
                            return (
                                <FormControlLabel key={item.InterestId} label={item.Interest} control={
                                    <Checkbox
                                        key={item.InterestId}
                                        onChange={handleChangeInterest}
                                        id={item.InterestId}
                                        name={item.Interest}/>}
                                />)
                        })}
                        <FormHelperText
                            error={Boolean(error?.interests)}>{error?.interests ? error?.interests : 'Pilih Minimal 1 yang merarik untuk anda'}</FormHelperText>
                    </Grid>
                    <Button variant='contained' sx={{my: 2}} size='large' type='onsubmit' fullWidth>Submit</Button>
                </Grid>
            </Grid>
            <Footer/>
        </>
    )
}

export default PreferenceForm;