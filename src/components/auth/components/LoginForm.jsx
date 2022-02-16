import {Button, FormControl, Grid, InputAdornment, TextField, Typography} from "@mui/material";
import {AccountCircleRounded, PasswordRounded} from "@mui/icons-material";
import {useContext} from "react";
import {LoadingButton} from "@mui/lab";
import {useNavigate} from "react-router";
import {GlobalContext} from "../../../context/GlobalContext";
import {useFormik} from "formik";
import validationSchema from "../../../shared/validation/ValidationSchema";

function LoginForm({setValue}) {
    const navigate = useNavigate();
    const {login, isLoading} = useContext(GlobalContext);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema.authValidation,
        onSubmit: (values) => {
            login({userName: values.email, password: values.password}, navigate)
        }
    })

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant='h5' color='primary'>Log in</Typography>
                    <Typography variant='p' color='rgba(0,0,0,0.6)'>Enter your credential to access your
                        account</Typography>
                </Grid>
                <Grid item xs={12}
                      component='form'
                      onSubmit={formik.handleSubmit}>
                    <FormControl fullWidth margin='dense'>
                        <TextField
                            label="Email"
                            variant='outlined'
                            size='small'
                            autoComplete='off'
                            name='email'
                            id='email'
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            value={formik.values.email}
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
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            value={formik.values.password}
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
                        <Typography variant='p' sx={{'&:hover': {color: '#E60965', cursor: 'pointer'}}}
                                    color='rgba(0,0,0,0.6)' onClick={() => setValue('1')}> Register</Typography>
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default LoginForm;