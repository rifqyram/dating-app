import Header from "../../../shared/header/Header";
import {
    Button,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel, FormHelperText,
    FormLabel,
    Grid,
    InputLabel,
    Radio,
    RadioGroup,
    TextField, Typography
} from "@mui/material";
import {createPreference, getListInterest, getUserFromLocalStorage} from "../services/AuthService";
import {useEffect, useState} from "react";
import imageForm from "../../../assets/image/image-interest-form.jpg";
import Footer from "../../../shared/footer/Footer";
import {useNavigate} from "react-router";
import {errorAlert, successAlert} from "../../../shared/notification/SweetAlert";

function PreferenceForm() {
    // const [memberId, setMemberId] = useState('');
    // const [genderInterest, setGenderInterest] = useState('M');
    // const [domicileInterest, setDomicileInterest] = useState('');
    // const [startAgeInterest, setStartAgeInterest] = useState('');
    // const [endAgeInterest, setEndAgeInterest] = useState('');
    // const [interest, setInterest] = useState([]);
    const [formValue, setFormValue] = useState({
        memberId: '',
        genderInterest: 'M',
        domicileInterest: '',
        startAgeInterest: '',
        endAgeInterest: '',
        interests: []
    });
    const [error, setError] = useState(null);
    const [interestData, setInterestData] = useState([]);
    const navigate = useNavigate();

    const handleChangeInterest = (e) => {
        setError({...error, interests: ''})

        let newArray = [...formValue.interests, {interestId: e.target.id}]
        const find = formValue.interests.find(element => e.target.id === element.interestId);

        if (find) {
            newArray = newArray.filter((data) => data.interestId !== e.target.id);
        }

        if (newArray.length === 0) {
            setError({...error, interests: 'Pilih minimal 1'})
        }

        setFormValue({...formValue, interests: newArray});
    }
    const validationOnSubmit = () => {
        let errors = {
            domisileInterest: '',
            startAgeInterest: '',
            endAgeInterest: '',
            interests: ''
        };
        let valid = true;

        if (!formValue.domicileInterest) {
            valid = false;
            errors.domisileInterest = 'Domisili tidak boleh kosong'
        }

        if (!formValue.startAgeInterest) {
            valid = false;
            errors.startAgeInterest = 'Range Umur tidak boleh kosong'
        }

        if (!formValue.endAgeInterest) {
            valid = false;
            errors.endAgeInterest = 'Range Umur tidak boleh kosong'
        }

        if (formValue.interests.length === 0) {
            valid = false;
            errors.interests = 'Pilih minimal 1'
        }

        setError({...errors});
        return valid;
    }

    const formValidation = (name, value) => {
        let valid = true;
        let message;

        if (!value) {
            valid = false;
            message = `${name} tidak boleh kosong`;
        }

        return [valid, message];
    }

    const handleOnBlur = (e) => {
        const {target: {name, value}} = e
        const [valid, message] = formValidation(name, value);

        if (!valid) {
            setError({...error, [name]: message});
        }

    }

    const handleOnChange = (e) => {
        const {target: {name, value}} = e;
        setFormValue({...formValue, [name]: value});
        const [valid, message] = formValidation(name, value);

        if (!valid) {
            setError({...error, [name]: message})
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        validationOnSubmit();

        if (validationOnSubmit()) {
            const data = {
                memberId: formValue.memberId,
                genderInterest: formValue.genderInterest,
                domicileInterest: formValue.domicileInterest,
                startAgeInterest: parseInt(formValue.startAgeInterest),
                endAgeInterest: parseInt(formValue.endAgeInterest),
                interests: formValue.interests
            }

            createPreference(data)
                .then((r) => {
                    successAlert('Success Update Preference', r.message);
                    navigate('/find');
                })
                .catch((err) => {
                    errorAlert(err.response.data.ErrorDescription.message);
                })
        }

    }

    useEffect(() => {
        if (getUserFromLocalStorage() !== null) {
            setFormValue({...formValue, memberId: getUserFromLocalStorage().memberId});
        }
    }, []);

    useEffect(() => {
        getListInterest()
            .then(r => {
                setInterestData(r.data)
            })
    }, [])

    return (
        <>
            <Header/>
            <Grid minHeight='90vh' alignItems='center' my={4} container spacing={0} width='90%' marginX='auto'>
                <Grid item md={8} sx={{display: {xs: 'none', md: 'block'}}}>
                    <img width='100%' src={imageForm} loading="lazy" aria-hidden alt={'image-form'}/>
                </Grid>
                <Grid item md={4} xs={12} component='form' onSubmit={handleSubmit}>
                    <Typography variant='h5' color='primary' textAlign='center'>My Preference</Typography>
                    <FormControl fullWidth margin='dense'>
                        <FormLabel id="genderInterest">Interest to</FormLabel>
                        <RadioGroup
                            aria-labelledby="genderInterest"
                            value={formValue.genderInterest}
                            onChange={handleOnChange}
                            onBlur={handleOnBlur}
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
                            error={Boolean(error?.domisileInterest)}
                            helperText={error?.domisileInterest ? error?.domisileInterest : 'Domisili untuk pencarian partner anda'}
                            onChange={handleOnChange}
                            onBlur={handleOnBlur}
                            value={formValue.domicileInterest}
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
                                           error={Boolean(error?.startAgeInterest)}
                                           helperText={error?.startAgeInterest ? error?.startAgeInterest : 'Tertarik pada umur minimal 17 tahun'}
                                           value={formValue.startAgeInterest}
                                           onBlur={handleOnBlur}
                                           onChange={handleOnChange}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth margin='dense'>
                                <TextField variant='outlined'
                                           label='End Age Interest'
                                           size='small'
                                           type='number'
                                           name='endAgeInterest'
                                           value={formValue.endAgeInterest}
                                           onChange={handleOnChange}
                                           onBlur={handleOnBlur}
                                           error={Boolean(error?.endAgeInterest)}
                                           helperText={error?.endAgeInterest ? error?.endAgeInterest : 'Tertarik pada umur maksimal 40 tahun'}/>
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