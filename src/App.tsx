import { MantineProvider, Stack } from "@mantine/core";
import { Navbar } from "./components/Navbar/Navbar";
import { Grid } from "./components/Grid/Grid";

import classes from "./App.module.scss";
import "@mantine/core/styles.css";

export const App = () => {
  return (
    <MantineProvider>
      <div className={classes.root}>
        <Stack className={classes.stack}>
          <Navbar />
          <Grid />
        </Stack>
      </div>
    </MantineProvider>
  );
};

export default App;
