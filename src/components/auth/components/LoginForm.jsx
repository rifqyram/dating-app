import React from 'react';
import {Box, FormControl, Input, InputLabel} from "@mui/material";

function LoginForm() {
    return (
        <Box component='form' autoComplete='off'>
            <FormControl variant='outlined'>
                <InputLabel htmlFor='email'>Email</InputLabel>
                <Input id='email'/>
            </FormControl>
        </Box>)
}

export default LoginForm;