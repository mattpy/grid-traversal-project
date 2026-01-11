import { useEffect, useMemo, type ReactNode } from "react";
import { Container } from "@mantine/core";
import { Cell } from "./Cell";
import {
  DEFAULT_GRID_HEIGHT,
  DEFAULT_GRID_WIDTH,
  useGridStore,
} from "../../store/useGridStore";

import classes from "./Grid.module.scss";

export const Grid: React.FC = () => {
  const setMouseDown = useGridStore.getState().actions.setMouseDown;

  useEffect(() => {
    const handleUp = () => setMouseDown(false);
    window.addEventListener("mouseenter", handleUp);
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mouseenter", handleUp);
      window.removeEventListener("mouseup", handleUp);
    };
  }, []);

  const cells = useMemo(() => {
    const collection: ReactNode[] = new Array(DEFAULT_GRID_HEIGHT);

    for (let row = 0; row < DEFAULT_GRID_HEIGHT; row++) {
      const cellRow: ReactNode[] = new Array(DEFAULT_GRID_WIDTH);
      for (let col = 0; col < DEFAULT_GRID_WIDTH; col++) {
        const key = `${row}-${col}`;
        cellRow[col] = <Cell key={key} row={row} col={col} />;
      }
      collection[row] = (
        <div key={row} className={classes.cellRow}>
          {cellRow}
        </div>
      );
    }

    return collection;
  }, []);

  return <Container className={classes.root}>{cells}</Container>;
};
