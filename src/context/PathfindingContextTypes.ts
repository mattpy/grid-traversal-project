export const Algorithms = ["BFS", "DFS", "DIJKSTRA", "A_STAR"] as const;

type GridPropertiesType = { colCount: number; rowCount: number };

type GridDataType = number[][];

export type AlgorithmType = (typeof Algorithms)[number];

export interface PathfindingReducerState {
  algorithm: AlgorithmType;
  speed: number;
  gridProperties: GridPropertiesType;
  gridData: GridDataType;
}

export type PathfindingContext = {
  algorithm: AlgorithmType;
  setAlgorithm: (algo: AlgorithmType) => void;
  speed: number;
  setSpeed: (value: number) => void;
  gridProperties: GridPropertiesType;
  gridData: GridDataType;
  setGridData: (row: number, col: number, value: number) => void;
};

export type PathfindingAction =
  | { type: "SET_ALGORITHM"; payload: AlgorithmType }
  | { type: "SET_SPEED"; payload: number }
  | { type: "RESET_GRID"; payload: null }
  | {
      type: "SET_GRID_PROPERTIES";
      payload: Partial<GridPropertiesType>;
    }
  | {
      type: "SET_GRID_DATA";
      payload: { row: number; col: number; value: number };
    };
