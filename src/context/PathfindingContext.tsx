import { createContext, useContext, useReducer, type ReactNode } from "react";
import {
  type AlgorithmType,
  type PathfindingAction,
  type PathfindingContext,
  type PathfindingReducerState,
} from "./PathfindingContextTypes";
import { createMatrix } from "../utils/helpers";
import {
  INITIAL_CELL_COL_COUNT,
  INITIAL_CELL_ROW_COUNT,
  INITIAL_SPEED,
} from "../utils/constants";

const initialState: PathfindingReducerState = {
  algorithm: "BFS",
  speed: INITIAL_SPEED,
  gridProperties: {
    colCount: INITIAL_CELL_COL_COUNT,
    rowCount: INITIAL_CELL_ROW_COUNT,
  },
  gridData: createMatrix(INITIAL_CELL_ROW_COUNT, INITIAL_CELL_COL_COUNT, 0),
};

const PathfindingContext = createContext<PathfindingContext | undefined>(
  undefined
);

const pathfindingReducer = (
  state: PathfindingReducerState,
  action: PathfindingAction
) => {
  switch (action.type) {
    case "SET_ALGORITHM":
      return { ...state, algorithm: action.payload };
    case "SET_SPEED":
      return { ...state, speed: action.payload };
    case "SET_GRID_PROPERTIES":
      return { ...state, gridProperties: action.payload };
    case "SET_GRID_DATA":
      const { row, col, value } = action.payload;

      const newGrid = [...state.gridData];
      const newRow = [...newGrid[row]];

      newRow[col] = value;
      newGrid[row] = newRow;

      return { ...state, gridData: newGrid };
    default:
      return state;
  }
};

export const PathfindingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(pathfindingReducer, initialState);

  const setAlgorithm = (algo: AlgorithmType) => {
    dispatch({ type: "SET_ALGORITHM", payload: algo });
  };

  const setSpeed = (value: number) => {
    dispatch({ type: "SET_SPEED", payload: value });
  };

  const setGridData = (row: number, col: number, value: number) => {
    dispatch({ type: "SET_GRID_DATA", payload: { row, col, value } });
  };

  const value: PathfindingContext = {
    algorithm: state.algorithm,
    setAlgorithm,
    speed: state.speed,
    setSpeed,
    gridProperties: state.gridProperties,
    gridData: state.gridData,
    setGridData,
  };

  return (
    <PathfindingContext.Provider value={value}>
      {children}
    </PathfindingContext.Provider>
  );
};

export const usePathfinding = () => {
  const context = useContext(PathfindingContext);

  if (!context) {
    throw new Error(
      "usePathfinding must be used within a PathfindingProvider."
    );
  }

  return context;
};
