import {ThemeProvider} from "@emotion/react";
import {Container, CssBaseline} from "@mui/material";
import Router from "../router/router";
import theme from "../utils/theme";
import Header from "./layout/Header";
import {useState} from "react";
import Drawer from "./layout/Drawer";

function App() {
    const [open, setOpen] = useState(false);

    return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header open={open} setOpen={setOpen} />
      <Container>
        <Router />
          <Drawer open={open} setOpen={setOpen} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
