import {Button, FormControl, Grid, InputAdornment, TextField, Typography} from "@mui/material";
import {PasswordRounded} from "@mui/icons-material";
import {useContext, useState} from "react";
import {authRegister, userActivation} from "../services/AuthService";
import {LoadingButton} from "@mui/lab";
import {validEmail} from "../../../utils/util";
import {errorAlert, successAlert} from "../../../shared/notification/SweetAlert";
import {AuthContext} from "../reducers/AuthContext";

function RegisterForm({setValue}) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState({});
    const {register, isLoading} = useContext(AuthContext);

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
            register({email: formValue.email, password: formValue.password}, setValue);
        }
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant='h5' color='primary'>Let's get started</Typography>
                    <Typography variant='p' color='rgba(0,0,0,0.6)'>Sign up and find your partner now</Typography>
                </Grid>
                <Grid item xs={12} onSubmit={handleOnSubmit} component='form'>
                    <FormControl fullWidth margin='dense'>
                        <TextField
                            label="Email"
                            variant='outlined'
                            size='small'
                            name='email'
                            autoComplete='off'
                            onChange={handleOnChange}
                            onBlur={handleOnBlur}
                            value={formValue.email}
                            error={Boolean(error?.email)}
                            helperText={error?.email}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <PasswordRounded/>
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
                            onChange={handleOnChange}
                            onBlur={handleOnBlur}
                            value={formValue.password}
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
                    {isLoading && <LoadingButton fullWidth loading variant='contained'
                                               sx={{my: 2, borderRadius: 2}}>Submit</LoadingButton>}
                    {!isLoading &&
                        <Button fullWidth variant='contained' type='submit'
                                sx={{my: 2, borderRadius: 2}}>Create new
                            account</Button>}
                    <Typography variant='p' color='rgba(0,0,0,0.6)'>Already have an account?
                        <Typography variant='p' sx={{'&:hover': {color: '#E60965', cursor: 'pointer'}}}
                                    color='rgba(0,0,0,0.6)' onClick={() => setValue('2')}> Login</Typography>
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default RegisterForm