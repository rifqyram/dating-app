import {Button, FormControl, Grid, InputAdornment, TextField, Typography} from "@mui/material";
import {PasswordRounded} from "@mui/icons-material";
import {useContext} from "react";
import {LoadingButton} from "@mui/lab";
import {GlobalContext} from "../../../context/GlobalContext";
import {useFormik} from "formik";
import validationSchema from "../../../shared/validation/ValidationSchema";


function RegisterForm({setValue}) {
    const {register, isLoading} = useContext(GlobalContext);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema.authValidation,
        onSubmit: values => {
            register(values, setValue);
        }
    })

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant='h5' color='primary'>Let's get started</Typography>
                    <Typography variant='p' color='rgba(0,0,0,0.6)'>Sign up and find your partner now</Typography>
                </Grid>
                <Grid item xs={12} onSubmit={formik.handleSubmit} component='form'>
                    <FormControl fullWidth margin='dense'>
                        <TextField
                            label="Email"
                            variant='outlined'
                            size='small'
                            name='email'
                            autoComplete='off'
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
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
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
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