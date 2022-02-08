import {Button, FormControl, Grid, InputAdornment, TextField, Typography} from "@mui/material";
import {AccountCircleRounded, PasswordRounded} from "@mui/icons-material";
import {useContext, useState} from "react";
import {LoadingButton} from "@mui/lab";
import {validEmail} from "../../../utils/util";
import {useNavigate} from "react-router";
import {GlobalContext} from "../../../context/GlobalContext";

function LoginForm({setValue}) {

    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState({});
    const navigate = useNavigate();
    const {login, isLoading} = useContext(GlobalContext);

    const validationForm = (name, value) => {
        let valid = true;
        let message;

        if (name === 'email' && !validEmail(value)) {
            message = "Email tidak valid";
            valid = false;
        }
        if (value.length === 0) {
            message = `${name} tidak boleh kosong`;
            valid = false
        }

        return [message, valid];
    }

    const validationOnSubmit = () => {
        let errors = {
            email: '',
            password: ''
        };
        let valid = true

        if (!validEmail(formValue.email)) {
            errors.email = 'Email tidak valid'
            valid = false;

        } else if (!formValue.email) {
            errors.email = 'Email tidak boleh kosong'
            valid = false;
        }

        if (!formValue.password) {
            errors.password = 'Password tidak boleh kosong';
            valid = false;
        }

        setError({...errors});
        return valid;
    }

    const handleOnBlur = (e) => {
        const {target: {name, value}} = e;
        const [message, valid] = validationForm(name, value)

        if (!valid) {
            setError({...error, [name]: message})
        }
    }

    const handleOnChange = (e) => {
        const {target: {name, value}} = e;
        const [message, valid] = validationForm(name, value)

        setError({...error, [name]: null})
        setFormValue({...formValue, [name]: value});
        if (!valid) {
            setError({...error, [name]: message});
        }
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (validationOnSubmit()) {
            login({
                userName: formValue.email,
                password: formValue.password
            }, navigate)
        }
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant='h5' color='primary'>Log in</Typography>
                    <Typography variant='p' color='rgba(0,0,0,0.6)'>Enter your credential to access your account</Typography>
                </Grid>
                <Grid item xs={12}
                      component='form'
                      onSubmit={handleOnSubmit}>
                    <FormControl fullWidth margin='dense'>
                        <TextField
                            label="Email"
                            variant='outlined'
                            size='small'
                            autoComplete='off'
                            name='email'
                            onBlur={handleOnBlur}
                            onChange={handleOnChange}
                            error={Boolean(error?.email)}
                            helperText={error?.email}
                            value={formValue.email}
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
                            autoComplete='off'
                            onBlur={handleOnBlur}
                            value={formValue.password}
                            onChange={handleOnChange}
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
                    {isLoading &&
                        <LoadingButton
                            fullWidth
                            loading
                            variant='contained'
                            sx={{my: 2, borderRadius: 2}}>Submit</LoadingButton>}
                    {!isLoading &&
                        <Button
                            fullWidth
                            variant='contained'
                            type='submit'
                            sx={{my: 2, borderRadius: 2}}>Sign in</Button>}
                    <Typography variant='p' color='rgba(0,0,0,0.6)'>Don't have any account?
                        <Typography variant='p' sx={{'&:hover': {color: '#E60965', cursor: 'pointer'}}} color='rgba(0,0,0,0.6)' onClick={() => setValue('1')}> Register</Typography>
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default LoginForm;