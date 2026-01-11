import { useCallback } from "react";
import { Slider } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import throttle from "lodash.throttle";
import { usePathfinding } from "../../context/PathfindingContext";

import classes from "./IterationSpeedControl.module.scss";

export const IterationSpeedControl: React.FC = () => {
  const { hovered, ref } = useHover();
  const { setSpeed } = usePathfinding();

  const handleChange = useCallback(
    throttle(
      (value: number) => {
        setSpeed(value);
      },
      200,
      { trailing: true }
    ),
    []
  );

  return (
    <Slider
      className={classes.slider}
      defaultValue={20}
      min={0}
      max={100}
      ref={ref}
      onChange={handleChange}
      label="Speed"
      labelAlwaysOn
      styles={{
        label: {
          position: "relative",
          top: "25px",
        },
        thumb: {
          transition: "opacity 150ms ease",
          opacity: hovered ? 1 : 0,
        },
      }}
    />
  );
};
