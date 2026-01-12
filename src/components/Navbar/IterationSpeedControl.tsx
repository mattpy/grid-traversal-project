import { useCallback } from "react";
import { Slider } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import throttle from "lodash.throttle";
import { DEFAULT_GREED, useGridStore } from "../../store/useGridStore/index.ts";

import classes from "./IterationSpeedControl.module.scss";

export const IterationSpeedControl: React.FC = () => {
  const setGreed = useGridStore((state) => state.actions.setGreed);
  const { hovered, ref } = useHover();

  const handleChange = useCallback(
    throttle(
      (value: number) => {
        setGreed(value);
      },
      500,
      { trailing: true }
    ),
    []
  );

  return (
    <Slider
      className={classes.slider}
      defaultValue={DEFAULT_GREED}
      min={1}
      max={10}
      ref={ref}
      onChange={handleChange}
      label="A* Greediness"
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
