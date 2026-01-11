import { useCallback, useMemo } from "react";
import { Container } from "@mantine/core";
import { usePathfinding } from "../../context/PathfindingContext";
import { Cell } from "./Cell";

import classes from "./Grid.module.scss";

export const Grid: React.FC = () => {
  const { gridProperties, gridData, setGridData } = usePathfinding();

  const onCellClicked = useCallback((row: number, col: number) => {
    setGridData(row, col, 2);
  }, []);

  const cells = useMemo(() => {
    console.log("useMemo running");
    const { rowCount, colCount } = gridProperties;

    return Array.from({ length: rowCount }).map((_, rowIndex) => (
      <div className={classes.gridRow} key={rowIndex}>
        {Array.from({ length: colCount }).map((_, colIndex) => {
          return (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              value={gridData[rowIndex][colIndex]}
              onCellClicked={onCellClicked}
            />
          );
        })}
      </div>
    ));
  }, [gridData]);

  console.log("grid render");

  return <Container className={classes.root}>{cells}</Container>;
};
