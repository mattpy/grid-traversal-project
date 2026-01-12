export const Algorithms = ["BFS", "DFS", "A*"] as const;
export type AlgorithmsUnion = (typeof Algorithms)[number];

export enum NodeType {
  Empty = "EMPTY",
  Visited = "VISITED",
  Path = "PATH",
  Wall = "WALL",
  Start = "START",
  End = "END",
}

export interface GridNode {
  row: number;
  col: number;
  type: NodeType;
  prev: GridNode | null;
}

export type GridType = Record<string, GridNode>;

export interface GridStoreType {
  grid: GridType;
  greed: number;
  algorithm: AlgorithmsUnion;
  speed: number;
  isMouseDown: boolean;
  isUILocked: boolean;
  actions: {
    updateNode: (node: GridNode) => void;
    batchUpdateNode: (nodes: GridNode[]) => void;
    setAlgorithm: (algo: AlgorithmsUnion) => void;
    setGreed: (greed: number) => void;
    setMouseDown: (value: boolean) => void;
    setIsUILocked: (value: boolean) => void;
    reset: () => void;
  };
}
