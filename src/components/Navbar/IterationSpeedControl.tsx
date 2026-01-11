import { useCallback } from "react";
import { Slider } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import throttle from "lodash.throttle";
import { DEFAULT_SPEED, useGridStore } from "../../store/useGridStore/index.ts";

import classes from "./IterationSpeedControl.module.scss";

export const IterationSpeedControl: React.FC = () => {
  const setSpeed = useGridStore((state) => state.actions.setSpeed);
  const { hovered, ref } = useHover();

  const handleChange = useCallback(
    throttle(
      (value: number) => {
        setSpeed(value);
      },
      500,
      { trailing: true }
    ),
    []
  );

  return (
    <Slider
      className={classes.slider}
      defaultValue={DEFAULT_SPEED}
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
