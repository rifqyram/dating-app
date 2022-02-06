import {ThemeProvider} from "@emotion/react";
import {CssBaseline} from "@mui/material";
import Router from "../router/router";
import theme from "../utils/theme";
import {useState} from "react";
import Drawer from "./layout/Drawer";
import {AuthProvider} from "./auth/reducers/AuthContext";

function App() {
    const [openDrawer, setOpenDrawer] = useState(false);
    return (
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Router/>
                <Drawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}/>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
