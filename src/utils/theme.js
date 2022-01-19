import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: '#E60965',
            "400": '#ff5992',
            "900": '#ad003b'
        },
        secondary: {
            main: '#ff6363',
            "400": '#ff9691',
            "900": '#c62e39'
        },
        error: {
            main: red[400]
        },
    },
});

export default theme;