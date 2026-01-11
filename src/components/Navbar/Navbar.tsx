import React from "react";
import { Container, SegmentedControl } from "@mantine/core";
import {
  Algorithms,
  type AlgorithmType,
} from "../../context/PathfindingContextTypes";
import { IterationSpeedControl } from "./IterationSpeedControl";
import { usePathfinding } from "../../context/PathfindingContext";

import classes from "./Navbar.module.scss";

export const Navbar: React.FC = () => {
  const { algorithm: activeAlgorithm, setAlgorithm } = usePathfinding();

  const handleClick = (algo: AlgorithmType) => {
    setAlgorithm(algo);
  };

  return (
    <Container className={classes.root}>
      <SegmentedControl
        radius="xl"
        size="xs"
        data={Algorithms.map((algo) => algo)}
        classNames={classes}
        onClick={() => console.log("hi")}
      />
      <IterationSpeedControl />
    </Container>
  );
};
