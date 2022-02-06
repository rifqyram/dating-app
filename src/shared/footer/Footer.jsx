import {Box, Grid, Typography} from "@mui/material";

function Footer() {
    return (
        <Box sx={{bgcolor: '#E60965', color: 'white'}} >
            <Grid width='90%' mx='auto' container height={50} justifyContent='center' alignItems='center'>
                <Typography variant='p'>&copy;2022 - Find Friends</Typography>
            </Grid>
        </Box>
    )
}

export default Footer;