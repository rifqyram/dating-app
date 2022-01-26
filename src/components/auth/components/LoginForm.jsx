import {Box, Button, Container, FormControl, Grid, InputAdornment, TextField, Typography} from "@mui/material";
import {AccountCircleRounded, PasswordRounded} from "@mui/icons-material";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {authLogin, setUserToLocalStorage} from "../services/AuthService";
import {LoadingButton} from "@mui/lab";
import Header from "../../../shared/header/Header";

function LoginForm() {

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

    const emailValidation = (email) => {
        const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        return pattern.test(email);
    }

    const resetForm = () => {
        setEmail({value: '', error: false, errorMessage: ''})
        setPassword({value: '', error: false, errorMessage: ''})
    }

    const resetValidation = () => {
        if (emailValidation(email.value)) {
            setEmail({...email, error: false, errorMessage: ''})
        }
        if (password.value.length > 6) {
            setPassword({...password, error: false, errorMessage: ''})
        }
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();

        const data = {
            userName: email.value,
            password: password.value
        }

        if (!emailValidation(data.userName)) {
            setEmail({...email, error: true, errorMessage: 'Email tidak valid'});
        }
        if (data.password.length < 6) {
            setPassword({...password, error: true, errorMessage: 'Password tidak boleh kurang dari 6 karakter'});
        } else {
            setLoading(true);
            authLogin(data)
                .then(r => {
                    console.log(r)
                    setUserToLocalStorage(r.data);
                    resetValidation();
                    resetForm();
                    navigate("/")
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false)
                })
        }
    }

    useEffect(() => {
        resetValidation();
    }, [email.value, password.value]);

    return (
        <>
            <Header/>
            <Container>
                <Grid container height='50vh' justifyContent='center' alignItems='center'>
                    <Grid item
                          md={6}
                          component='form'
                          autoComplete='off'
                          onSubmit={handleOnSubmit}>
                        <Box my={2}>
                            <Typography textAlign='center' variant='h4' color='primary'>
                                Hello Again!
                            </Typography>
                            <Typography textAlign='center' variant='h6'>
                                Welcome back you've been missed
                            </Typography>
                        </Box>
                        <FormControl fullWidth margin='dense'>
                            <TextField
                                label="Email"
                                variant='outlined'
                                size='small'
                                onChange={(e) => setEmail(
                                    {...email, value: e.target.value})}
                                value={email.value}
                                error={email.error}
                                helperText={email.errorMessage}
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
                                value={password.value}
                                error={password.error}
                                helperText={password.errorMessage}
                                onChange={(e) => setPassword({
                                    ...password, value: e.target.value
                                })}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <PasswordRounded/>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </FormControl>
                        {loading &&
                            <LoadingButton
                                fullWidth
                                loading
                                variant='contained'
                                sx={{my: 2, borderRadius: 2}}>Submit</LoadingButton>}
                        {!loading &&
                            <Button
                                fullWidth
                                variant='contained'
                                type='submit'
                                sx={{my: 2, borderRadius: 2}}>Sign in</Button>}
                        <Typography variant='p' sx={{my: '1em',}}>
                            Don't have any account?
                            <Link to='/register'>
                                <Typography ml={1} color='primary' sx={{textDecoration: 'underline'}} variant='span'>
                                    Register
                                </Typography>
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default LoginForm;