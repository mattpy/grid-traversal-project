import { memo, type MouseEvent } from "react";
import { useGridStore } from "../../store/useGridStore";
import { NodeType } from "../../store/useGridStore/types";

import classes from "./Cell.module.scss";

interface CellProps {
  row: number;
  col: number;
}

const getCellBackgroundColorFromType = (type: NodeType) => {
  switch (type) {
    case NodeType.Empty:
      return "white";
    case NodeType.Start:
      return "limegreen";
    case NodeType.End:
      return "red";
    case NodeType.Visited:
      return "blue";
    case NodeType.Wall:
      return "black";
    case NodeType.Path:
      return "yellow";
  }
};

const getNodeTypeFromEvent = (event: MouseEvent): NodeType => {
  if (event.shiftKey) return NodeType.Start;
  else if (event.ctrlKey) return NodeType.End;
  else if (event.altKey) return NodeType.Empty;
  else return NodeType.Wall;
};

export const Cell: React.FC<CellProps> = memo(({ row, col }) => {
  const data = useGridStore((state) => state.grid[`${row}-${col}`]);
  const updateNode = useGridStore.getState().actions.updateNode;
  const setMouseDown = useGridStore.getState().actions.setMouseDown;

  const handleMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
    const isMouseDown = useGridStore.getState().isMouseDown;
    if (isMouseDown) {
      const type = getNodeTypeFromEvent(event);
      updateNode({ ...data, row, col, type });
    }
  };

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    const type = getNodeTypeFromEvent(event);
    updateNode({ ...data, row, col, type });
    setMouseDown(true);
  };

  return (
    <div
      className={classes.root}
      onMouseEnter={handleMouseEnter}
      onMouseDown={handleMouseDown}
      style={{ backgroundColor: getCellBackgroundColorFromType(data.type) }}
    />
  );
});
