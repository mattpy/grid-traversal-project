import { memo, type ReactNode } from "react";

import classes from "./Cell.module.scss";

interface CellProps {
  row: number;
  col: number;
  value: ReactNode;
  onCellClicked: (row: number, col: number) => void;
}

export const Cell: React.FC<CellProps> = memo(
  ({ row, col, value, onCellClicked }) => {
    console.log("cell rendering");

    const handleClick = () => {
      onCellClicked(row, col);
    };

    return (
      <div className={classes.root} onClick={handleClick}>
        {value}
      </div>
    );
  }
);
