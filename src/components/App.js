import {ThemeProvider} from "@emotion/react";
import {Container, CssBaseline} from "@mui/material";
import Router from "../router/router";
import theme from "../utils/theme";
import Header from "./layout/Header";
import {useState} from "react";
import Drawer from "./layout/Drawer";

function App() {
    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Header openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}/>
            <Container>
                <Router/>
                <Drawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}/>
            </Container>
        </ThemeProvider>
    );
}

export default App;
