import Header from "../../../shared/header/Header";
import {
    Button,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputLabel,
    Radio,
    RadioGroup,
    TextField
} from "@mui/material";
import {createPreference, getListInterest, getUserFromLocalStorage} from "../services/AuthService";
import {useEffect, useState} from "react";

function PreferenceForm() {
    const [memberId, setMemberId] = useState('');
    const [genderInterest, setGenderInterest] = useState('M');
    const [domicileInterest, setDomicileInterest] = useState('');
    const [startAgeInterest, setStartAgeInterest] = useState('');
    const [endAgeInterest, setEndAgeInterest] = useState('');
    const [interest, setInterest] = useState([]);
    const [interestData, setInterestData] = useState([]);

    function handleChangeInterest(e) {
        let newArray = [...interest, {interestId: e.target.id}]
        if (interest.includes(e.target.name)) {
            newArray = newArray.filter((data) => data.interest !== e.target.name);
        }

        setInterest(newArray);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const data = {
            memberId: memberId,
            genderInterest: genderInterest,
            domicileInterest: domicileInterest,
            startAgeInterest: parseInt(startAgeInterest),
            endAgeInterest: parseInt(endAgeInterest),
            interests: interest
        }

        createPreference(data)
            .then((r) => {
                console.log(r)
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    useEffect(() => {
        if (getUserFromLocalStorage() !== null) {
            setMemberId(getUserFromLocalStorage().memberId);
        }
    }, []);

    useEffect(() => {
        setInterestData(getListInterest());
    }, [])

    return (
        <>
            <Header/>
            <Container>
                <Grid container component='form' onSubmit={handleSubmit}>
                    <FormControl fullWidth margin='dense'>
                        <TextField
                            value={memberId}
                            onChange={(e) => setMemberId(e.target.value)}
                            variant='outlined'
                            size='small'
                            label='Member Id'
                            disabled/>
                    </FormControl>
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
                        <TextField
                            value={domicileInterest}
                            onChange={(e) => setDomicileInterest(e.target.value)}
                            size='small'
                            variant='outlined'
                            label='Domisili'
                        />
                    </FormControl>
                    <InputLabel>Tertarik pada umur?</InputLabel>
                    <Grid container spacing={2}>
                        <Grid item>
                            <FormControl fullWidth margin='dense'>
                                <TextField
                                    value={startAgeInterest}
                                    onChange={(e) => setStartAgeInterest(e.target.value)}
                                    size='small'
                                    variant='outlined'
                                    type='number'
                                    autoComplete='off'
                                />
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl fullWidth margin='dense'>
                                <TextField
                                    value={endAgeInterest}
                                    onChange={(e) => setEndAgeInterest(e.target.value)}
                                    size='small'
                                    variant='outlined'
                                    type='number'
                                    autoComplete='off'
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    {interestData.map(item => {
                        return <FormControlLabel key={item.interest_id} label={item.interest} control={
                            <Checkbox
                                key={item.interest_id}
                                onChange={handleChangeInterest}
                                id={item.interest_id}
                                name={item.interest}/>}
                        />
                    })}
                    <Button fullWidth variant='outlined' size='large' type='submit'>Submit</Button>
                </Grid>
            </Container>
        </>
    )
}

export default PreferenceForm;