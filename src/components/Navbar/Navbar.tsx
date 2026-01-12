import React from "react";
import {
  Button,
  ButtonGroup,
  Container,
  SegmentedControl,
} from "@mantine/core";
import { IterationSpeedControl } from "./IterationSpeedControl.tsx";
import { useGridStore } from "../../store/useGridStore/index.ts";
import {
  Algorithms,
  type AlgorithmsUnion,
} from "../../store/useGridStore/types";
import { useShallow } from "zustand/shallow";
import {
  traverseAStar,
  traverseBFSOrDFS,
} from "../../store/useGridStore/helpers";

import classes from "./Navbar.module.scss";

export const Navbar: React.FC = () => {
  const { algorithm, isUILocked, reset, setAlgorithm, setIsUILocked } =
    useGridStore(
      useShallow((state) => ({
        algorithm: state.algorithm,
        isUILocked: state.isUILocked,
        reset: state.actions.reset,
        setAlgorithm: state.actions.setAlgorithm,
        setIsUILocked: state.actions.setIsUILocked,
      }))
    );

  const handleChange = (value: string) => {
    setAlgorithm(value as AlgorithmsUnion);
  };

  const handleResetButtonClick = () => {
    reset();
  };

  const handleRunButtonClick = async () => {
    const algo = useGridStore.getState().algorithm;

    setIsUILocked(true);
    if (algo === "BFS") {
      await traverseBFSOrDFS("BFS");
    } else if (algo === "DFS") {
      await traverseBFSOrDFS("DFS");
    } else if (algo === "A*") {
      await traverseAStar();
    }
    setIsUILocked(false);
  };

  return (
    <Container className={classes.root}>
      <SegmentedControl
        radius="xs"
        size="xs"
        data={[...Algorithms]}
        onChange={handleChange}
        value={algorithm}
        disabled={isUILocked}
      />
      <IterationSpeedControl />
      <ButtonGroup className={classes.rightButtonGroup}>
        <Button
          color="indigo"
          disabled={isUILocked}
          onClick={handleRunButtonClick}
          size="xs"
        >
          Find Path
        </Button>
        <Button
          disabled={isUILocked}
          onClick={handleResetButtonClick}
          size="xs"
        >
          Reset
        </Button>
      </ButtonGroup>
    </Container>
  );
};
