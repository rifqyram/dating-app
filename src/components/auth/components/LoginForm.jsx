import {Button, FormControl, Grid, InputAdornment, TextField, Typography} from "@mui/material";
import {AccountCircleRounded, PasswordRounded} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {LoadingButton} from "@mui/lab";
import {checkObjectValueIsEmpty, emailChecker} from "../../../utils/util";
import {authLogin, setUserToLocalStorage} from "../services/AuthService";

function LoginForm({setValue}) {

    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {target: {value, name},} = e;
        setValues({...values, [name]: value})
        setError({...error, [name]: ''})

        if (!emailChecker(values.email)) {
            setError({...error, email: 'Invalid Email'})
        }

        if (checkObjectValueIsEmpty(values)) {
            setError({...error, [name]: 'Field Required'})
        }
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();

        handleChange(e);
        if (!checkObjectValueIsEmpty(values) && emailChecker(values.email)) {
            setLoading(true)
            authLogin({userName: values.email, password: values.password})
                .then((r) => {
                    setLoading(false);
                    setUserToLocalStorage(r.data);
                    navigate('/')
                })
                .catch(err => {
                    setLoading(false)
                    console.log(err.response);
                })
        }
    }

    return (
        <>
            <Grid container>
                <Typography variant='h5' textAlign='center' color='primary'>Welcome to Dating App</Typography>
                <Grid item
                      component='form'
                      autoComplete='off'
                      onSubmit={handleOnSubmit}>
                    <FormControl fullWidth margin='dense'>
                        <TextField
                            label="Email"
                            variant='outlined'
                            size='small'
                            onChange={handleChange}
                            error={Boolean(error?.email)}
                            helperText={error?.email}
                            name='email'
                            value={values.email}
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
                            name='password'
                            value={values.password}
                            onChange={handleChange}
                            error={Boolean(error?.password)}
                            helperText={error?.password}
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
                    <Typography variant='p' color='rgba(0,0,0,0.6)'>Don't have any account?
                        <Typography variant='p' sx={{'&:hover': {color: '#E60965', cursor: 'pointer'}}} color='rgba(0,0,0,0.6)' onClick={() => setValue('2')}> Register</Typography>
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default LoginForm;