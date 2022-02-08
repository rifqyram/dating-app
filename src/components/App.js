import {ThemeProvider} from "@emotion/react";
import {CssBaseline} from "@mui/material";
import Router from "../router/router";
import theme from "../utils/theme";
import {GlobalProvider} from "../context/GlobalContext";

function App() {
    return (
        <GlobalProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Router/>
            </ThemeProvider>
        </GlobalProvider>
    );
}

export default App;
