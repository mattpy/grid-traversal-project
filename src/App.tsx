import { MantineProvider, Stack } from "@mantine/core";
import { Navbar } from "./components/Navbar/Navbar.tsx";
import { Grid } from "./components/Grid/Grid.tsx";
import { Info } from "./components/Info/Info.tsx";

import classes from "./App.module.scss";
import "@mantine/core/styles.css";

export const App = () => {
  return (
    <MantineProvider>
      <div className={classes.root}>
        <Stack>
          <Navbar />
          <Grid />
          <Info />
        </Stack>
      </div>
    </MantineProvider>
  );
};

export default App;
