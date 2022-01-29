import './profile-preference.css';
import imageForm from '../../../assets/image/image-interest-form.jpg';
import Header from "../../../shared/header/Header";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";
import {useState} from "react";
import {getListInterest} from "../../auth/services/AuthService";
import Footer from "../../../shared/footer/Footer";

function ProfilePreferenceForm2() {
    const [memberId, setMemberId] = useState('');
    const [genderInterest, setGenderInterest] = useState('M');
    const [domicileInterest, setDomicileInterest] = useState('');
    const [startAgeInterest, setStartAgeInterest] = useState(17);
    const [endAgeInterest, setEndAgeInterest] = useState(18);
    const [interest, setInterest] = useState([]);
    const [interestData, setInterestData] = useState([]);

    function handleChangeInterest(e) {
        let newArray = [...interest, {interestId: e.target.id}]
        if (interest.includes(e.target.name)) {
            newArray = newArray.filter((data) => data.interest !== e.target.name);
        }

        setInterest(newArray);
    }

    useState(() => {
        setInterestData(getListInterest());
    }, [])

    return (
        <>
            <Header/>
            <Grid minHeight='90vh' alignItems='center' my={4} container spacing={0} width='90%' marginX='auto'>
                <Grid item md={8} sx={{display: {xs: 'none', md: 'block'}}}>
                    <img width='100%' src={imageForm} loading="lazy" aria-hidden alt={'image-form'}/>
                </Grid>
                <Grid item md={4} xs={12} component='form'>
                    <Typography variant='h5' color='primary' textAlign='center'>My Preference</Typography>
                    <FormControl fullWidth margin='dense'>
                        <FormLabel id="gender-group-button">Gender</FormLabel>
                        <RadioGroup
                            aria-labelledby="gender-group-button"
                            value={genderInterest}
                            row
                            onChange={(e) => setGenderInterest(e.target.value)}
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
                    <FormControl fullWidth margin='dense'>
                        <TextField variant='outlined' label='Domisili' size='small'
                                   onChange={(e) => setDomicileInterest(e.target.value)}/>
                    </FormControl>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl fullWidth margin='dense'>
                                <TextField variant='outlined'
                                           label='Start Age Interest'
                                           size='small'
                                           type='number'
                                           value={startAgeInterest}
                                           helperText='Tertarik pada umur minimal 17 tahun'
                                           onChange={(e) => {
                                               const newValue = Math.min(Math.max(e.target.value, 17), 40);
                                               setStartAgeInterest(newValue)
                                           }}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth margin='dense'>
                                <TextField variant='outlined'
                                           label='End Age Interest'
                                           size='small'
                                           type='number'
                                           value={endAgeInterest}
                                           helperText='Tertarik pada umur maksimal 40 tahun'
                                           onChange={(e) => {
                                               const newValue = Math.min(Math.max(e.target.value, 17), 40);
                                               setEndAgeInterest(newValue)
                                           }}/>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item>
                        {interestData.map(item => {
                            return (
                                <FormControlLabel sx={{my: 2}} key={item.interest_id} label={item.interest} control={
                                    <Checkbox
                                        key={item.interest_id}
                                        onChange={handleChangeInterest}
                                        id={item.interest_id}
                                        name={item.interest}/>}
                                />)
                        })}
                    </Grid>
                    <Button variant='contained' size='large' type='onsubmit' fullWidth>Submit</Button>
                </Grid>
            </Grid>
            <Footer/>
        </>
    );
}

export default ProfilePreferenceForm2;