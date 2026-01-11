import { MantineProvider, SimpleGrid, Stack } from "@mantine/core";
import { PathfindingProvider } from "./context/PathfindingContext";
import { Navbar } from "./components/Navbar/Navbar";
import { Grid } from "./components/Grid/Grid";

import classes from "./App.module.scss";
import "@mantine/core/styles.css";

export const App = () => {
  return (
    <MantineProvider>
      <PathfindingProvider>
        <SimpleGrid className={classes.root} spacing="md">
          <Stack>
            <Navbar />
            <Grid />
          </Stack>
        </SimpleGrid>
      </PathfindingProvider>
    </MantineProvider>
  );
};

export default App;
