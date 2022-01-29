import {Button, Container, FormControl, Grid, InputAdornment, TextField, Typography} from "@mui/material";
import {AccountCircleRounded, PasswordRounded} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {authRegister} from "../services/AuthService";
import {LoadingButton} from "@mui/lab";
import Header from "../../../shared/header/Header";
import {useNavigate} from "react-router";

function RegisterForm() {

    const navigate = useNavigate();
    const [email, setEmail] = useState({
        value: '',
        error: false,
        errorMessage: ''
    });

    const [password, setPassword] = useState({
        value: '',
        error: false,
        errorMessage: ''
    });

    const [loading, setLoading] = useState(false);

    const handleOnSubmit = (e) => {
        e.preventDefault();

        const user = {
            email: email.value,
            password: password.value
        }
        if (!emailValidation(user.userName)) {
            setEmail({...email, error: true, errorMessage: 'Email tidak valid'});
        }
        if (user.password.length < 6) {
            setPassword({...password, error: true, errorMessage: 'Password tidak boleh kurang dari 6 karakter'});
        } else {
            setLoading(true);
            authRegister(user)
                .then(res => {
                    console.log(res)
                    setLoading(false)
                    resetForm()
                    resetValidation();
                    navigate('/login');
                })
                .catch(err => {
                    setLoading(false);
                    console.log(err.message)
                })
        }
    }

    const emailValidation = (email) => {
        const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        return pattern.test(email);
    }

    const resetValidation = () => {
        if (emailValidation(email.value)) {
            setEmail({...email, error: false, errorMessage: ''})
        }
        if (password.value.length > 6) {
            setPassword({...password, error: false, errorMessage: ''})
        }
    }

    const resetForm = () => {
        setEmail({value: '', error: false, errorMessage: ''})
        setPassword({value: '', error: false, errorMessage: ''})
    }

    useEffect(() => {
        resetValidation();
    }, [email.value, password.value]);


    return (
        <>
            <Grid container
                  onSubmit={handleOnSubmit}
                  component='form'
                  autoComplete='off'>
                <FormControl fullWidth margin='dense'>
                    <TextField
                        label="Email"
                        variant='outlined'
                        size='small'
                        error={email.error}
                        helperText={email.errorMessage}
                        onChange={(e) => setEmail({...email, value: e.target.value})}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <AccountCircleRounded/>
                                </InputAdornment>
                            )
                        }}
                    />
                </FormControl>
                <FormControl fullWidth margin='dense'>
                    <TextField
                        label="Password"
                        variant='outlined'
                        size='small'
                        type='password'
                        error={password.error}
                        helperText={password.errorMessage}
                        onChange={(e) => setPassword({...password, value: e.target.value})}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <PasswordRounded/>
                                </InputAdornment>
                            )
                        }}
                    />
                </FormControl>
                {loading && <LoadingButton fullWidth loading variant='contained'
                                           sx={{my: 2, borderRadius: 2}}>Submit</LoadingButton>}
                {!loading &&
                    <Button fullWidth variant='contained' type='submit' sx={{my: 2, borderRadius: 2}}>Create new
                        account</Button>}
            </Grid>
        </>
    )
}

export default RegisterForm