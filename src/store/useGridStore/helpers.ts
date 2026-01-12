import { NodeType, type GridNode, type GridType } from "./types";
import { DEFAULT_SPEED, useGridStore } from "./index.ts";
import { Yallist as LinkedList } from "yallist";
import { Heap } from "heap-js";

export const createArrayGrid = (width: number, height: number): number[][] => {
  return Array.from({ length: height }, () =>
    Array.from({ length: width }, () => 0)
  );
};

export const createObjectGrid = (width: number, height: number): GridType => {
  const grid: GridType = {};

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const key = `${row}-${col}`;
      const node: GridNode = {
        row,
        col,
        type: NodeType.Empty,
        prev: null,
      };
      grid[key] = node;
    }
  }

  return grid;
};

export const traverseBFSOrDFS = async (method: "BFS" | "DFS") => {
  const updateNode = useGridStore.getState().actions.updateNode;
  const grid = useGridStore.getState().grid;

  let startNode = null;
  let endNode = null;

  for (const key in grid) {
    if (grid[key].type === NodeType.Start) {
      startNode = grid[key];
    } else if (grid[key].type === NodeType.End) {
      endNode = grid[key];
    }
  }

  if (!startNode || !endNode) {
    alert("Please select a start and end node.");
    return;
  }

  const queue = new LinkedList<GridNode>([startNode]);
  const visited = new Set();

  let lastNode: GridNode | null = null;

  outer: while (queue.length > 0) {
    const node = method === "BFS" ? queue.shift() : queue.pop();
    if (!node) continue;

    const { row, col, type } = node;
    // We're done.
    if (type === NodeType.End) {
      break;
    }

    const key = `${row}-${col}`;
    if (visited.has(key)) continue;
    visited.add(key);

    const directions = [
      [-1, 0], // Up
      [1, 0], // Down
      [0, -1], // Left
      [0, 1], // Right
    ];

    for (const [dRow, dCol] of directions) {
      const speed = DEFAULT_SPEED;
      const neighborRow = row + dRow;
      const neighborCol = col + dCol;
      const neighborKey = `${neighborRow}-${neighborCol}`;

      const n = grid[neighborKey];
      if (!n) continue;
      const neighbor = { ...n };
      neighbor.prev = node;

      if (neighbor.type === NodeType.End) {
        lastNode = neighbor;
        break outer;
      }
      if (visited.has(neighborKey) || neighbor.type === NodeType.Wall) continue;

      neighbor.type = NodeType.Visited;
      queue.push(neighbor);
      updateNode(neighbor);
      await sleep(calculateDelay(speed));
    }
  }

  traceBackPathBFS(lastNode?.prev ?? null);
};

const traceBackPathBFS = async (endNode: GridNode | null) => {
  const queue = new LinkedList([endNode]);
  while (endNode !== null && endNode.type !== NodeType.Start) {
    queue.push({ ...endNode });
    endNode = endNode.prev ?? null;
  }

  const updateNode = useGridStore.getState().actions.updateNode;
  const speed = DEFAULT_SPEED;
  while (queue.length > 0) {
    const node = queue.shift();
    if (!node) continue;
    updateNode({
      row: node.row,
      col: node.col,
      type: NodeType.Path,
      prev: node.prev,
    });
    await sleep(calculateDelay(speed));
  }
};

const calculateDelay = (speed: number) => {
  if (speed > 95) return 0;
  else if (speed > 80) return 25;
  else if (speed > 60) return 50;
  else if (speed > 40) return 100;
  else if (speed > 20) return 150;
  else return 200;
};

const sleep = (delay: number) => {
  if (delay === 0) {
    return new Promise((resolve) => requestAnimationFrame(() => resolve(null)));
  }
  return new Promise((resolve) => setTimeout(resolve, delay));
};

export const traverseAStar = async () => {
  const updateNode = useGridStore.getState().actions.updateNode;
  const grid = useGridStore.getState().grid;

  let startNode: GridNode | null = null;
  let endNode: GridNode | null = null;

  for (const key in grid) {
    if (grid[key].type === NodeType.Start) startNode = grid[key];
    else if (grid[key].type === NodeType.End) endNode = grid[key];
  }

  if (!startNode || !endNode) {
    alert("Please select both a start and end node.");
    return;
  }

  const startKey = `${startNode.row}-${startNode.col}`;

  const gScore: Record<string, number> = {};
  const fScore: Record<string, number> = {};
  const visited = new Set<string>();
  const prev: Record<string, string | null> = {};

  for (const key in grid) {
    gScore[key] = Infinity;
    fScore[key] = Infinity;
  }

  gScore[startKey] = 0;
  fScore[startKey] = getManhattanDistance(startNode, endNode);

  const customPriorityComparator = (a: GridNode, b: GridNode) => {
    const aKey = `${a.row}-${a.col}`;
    const bKey = `${b.row}-${b.col}`;
    return fScore[aKey] - fScore[bKey];
  };

  const pq = new Heap(customPriorityComparator);
  pq.init([startNode]);

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  let foundPath = false;

  while (!pq.isEmpty()) {
    const current = pq.poll()!;
    const currentKey = `${current.row}-${current.col}`;

    if (visited.has(currentKey)) continue;
    visited.add(currentKey);

    if (current.type === NodeType.End) {
      foundPath = true;
      reconstructAStarPath(current, prev);
      break;
    }

    for (const [dRow, dCol] of directions) {
      const neighborRow = current.row + dRow;
      const neighborCol = current.col + dCol;
      const neighborKey = `${neighborRow}-${neighborCol}`;
      const neighbor = grid[neighborKey];

      if (!neighbor || neighbor.type === NodeType.Wall) continue;

      const currentGScore = gScore[currentKey] + 1;

      if (currentGScore < gScore[neighborKey]) {
        prev[neighborKey] = currentKey;
        gScore[neighborKey] = currentGScore;
        const greediness = useGridStore.getState().greed;
        fScore[neighborKey] =
          currentGScore + getManhattanDistance(neighbor, endNode) * greediness;

        if (!visited.has(neighborKey)) {
          pq.offer(neighbor);

          if (neighbor.type !== NodeType.End) {
            updateNode({ ...neighbor, type: NodeType.Visited });
          }
        }
      }
    }

    const speed = DEFAULT_SPEED;
    await sleep(calculateDelay(speed));
  }

  if (!foundPath) {
    alert("No path could be found");
  }
};

const reconstructAStarPath = async (
  endNode: GridNode,
  prev: Record<string, string | null>
) => {
  const grid = useGridStore.getState().grid;
  const updateNode = useGridStore.getState().actions.updateNode;

  const endNodeKey = `${endNode.row}-${endNode.col}`;

  for (
    let node = grid[prev[endNodeKey]!];
    node !== null && node.type !== NodeType.Start;
    node = grid[prev[`${node.row}-${node.col}`]!]
  ) {
    const newNode = { ...node, type: NodeType.Path };
    updateNode(newNode);
    const speed = DEFAULT_SPEED;
    await sleep(calculateDelay(speed));
  }
};

const getManhattanDistance = (nodeA: GridNode, nodeB: GridNode): number => {
  const deltaRow = Math.abs(nodeA.row - nodeB.row);
  const deltaCol = Math.abs(nodeA.col - nodeB.col);

  return deltaRow + deltaCol;
};
