import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  NodeType,
  type AlgorithmsUnion,
  type GridNode,
  type GridStoreType,
} from "./types";
import { createObjectGrid } from "./helpers";

export const DEFAULT_SPEED = 100;
export const DEFAULT_GRID_WIDTH = 80;
export const DEFAULT_GRID_HEIGHT = 30;

export const useGridStore = create<GridStoreType>()(
  immer((set) => ({
    grid: createObjectGrid(DEFAULT_GRID_WIDTH, DEFAULT_GRID_HEIGHT),
    algorithm: "A*",
    speed: DEFAULT_SPEED,
    isMouseDown: false,
    isUILocked: false,
    actions: {
      updateNode: (node: GridNode) =>
        set((state) => {
          const key = `${node.row}-${node.col}`;

          if (node.type === NodeType.Start) {
            for (const key in state.grid) {
              if (state.grid[key].type === NodeType.Start)
                state.grid[key].type = NodeType.Empty;
            }
          } else if (node.type === NodeType.End) {
            for (const key in state.grid) {
              if (state.grid[key].type === NodeType.End)
                state.grid[key].type = NodeType.Empty;
            }
          }

          state.grid[key] = { ...state.grid[key], ...node };
        }),
      batchUpdateNode: (nodes: GridNode[]) =>
        set((state) => {
          nodes.forEach((node) => {
            const key = `${node.row}-${node.col}`;
            state.grid[key] = { ...state.grid[key], ...node };
          });
        }),
      setAlgorithm: (algo: AlgorithmsUnion) => {
        set((state) => {
          state.algorithm = algo;
        });
      },
      setSpeed: (newSpeed: number) => {
        set((state) => {
          state.speed = newSpeed;
        });
      },
      setMouseDown: (value: boolean) =>
        set((state) => {
          state.isMouseDown = value;
        }),
      setIsUILocked: (value: boolean) =>
        set((state) => {
          state.isUILocked = value;
        }),
      reset: () => {
        set((state) => {
          state.grid = createObjectGrid(
            DEFAULT_GRID_WIDTH,
            DEFAULT_GRID_HEIGHT
          );
        });
      },
    },
  }))
);
