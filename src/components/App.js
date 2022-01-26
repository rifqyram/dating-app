import {ThemeProvider} from "@emotion/react";
import {CssBaseline} from "@mui/material";
import Router from "../router/router";
import theme from "../utils/theme";
import {useState} from "react";
import Drawer from "./layout/Drawer";

function App() {
    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Router/>
            <Drawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}/>
        </ThemeProvider>
    );
}

export default App;
