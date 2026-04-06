/**
 * Calculates the next best move for the snake AI.
 * Uses Manhattan distance to target food, but validates each candidate direction
 * with a BFS flood-fill to avoid committing to moves that trap the snake.
 * @param {object} gameState - The current state of the game.
 * @param {Array<Array<number>>} gameState.snake - The snake's body coordinates.
 * @param {Array<number>} gameState.food - The food's coordinates.
 * @param {number} gameState.gridSize - The size of the game board.
 * @param {string} gameState.currentDirection - The snake's current direction.
 * @returns {string} The best direction to move ('Up', 'Down', 'Left', 'Right').
 */
export function getNextMove({ snake, food, gridSize, currentDirection }) {
  if (!food) return currentDirection;

  const head = snake[snake.length - 1];
  const directions = ['Up', 'Down', 'Left', 'Right'];
  const opposites = {
    Up: 'Down',
    Down: 'Up',
    Left: 'Right',
    Right: 'Left'
  };

  // Minimum reachable cells required to commit to a direction.
  // Using snake.length ensures the snake always has room to manoeuvre.
  const MIN_SAFE_CELLS = Math.max(snake.length, 8);

  let bestDirection = null;
  let bestScore = -Infinity;

  for (const dir of directions) {
    // Prevent the snake from reversing on itself
    if (opposites[currentDirection] === dir) continue;

    const newHead = getNextPosition(head, dir);

    // Check if the move is valid (doesn't hit walls or itself)
    if (!isValidMove(newHead, snake, gridSize)) continue;

    // Flood-fill from newHead to count reachable empty cells
    const reachable = floodFill(newHead, snake, gridSize);

    // Skip moves that leave too few reachable cells (dead-end avoidance)
    if (reachable < MIN_SAFE_CELLS) continue;

    // Score = large bonus for open space, minus Manhattan distance to food
    const distance = Math.abs(newHead[0] - food[0]) + Math.abs(newHead[1] - food[1]);
    const score = reachable * 2 - distance;

    if (score > bestScore) {
      bestScore = score;
      bestDirection = dir;
    }
  }

  // If no safe move found (all lead to dead-ends), fall back to the
  // direction with the most reachable cells regardless of threshold.
  if (!bestDirection) {
    let maxReachable = -1;
    for (const dir of directions) {
      if (opposites[currentDirection] === dir) continue;
      const newHead = getNextPosition(head, dir);
      if (!isValidMove(newHead, snake, gridSize)) continue;
      const reachable = floodFill(newHead, snake, gridSize);
      if (reachable > maxReachable) {
        maxReachable = reachable;
        bestDirection = dir;
      }
    }
  }

  return bestDirection || currentDirection;
}

/**
 * A helper function to get the next coordinates based on a direction.
 * @param {Array<number>} head - The current head coordinates [x, y].
 * @param {string} direction - The direction of movement.
 * @returns {Array<number>} The new coordinates [x, y].
 */
function getNextPosition([x, y], direction) {
  switch (direction) {
    case 'Up':    return [x, y - 1];
    case 'Down':  return [x, y + 1];
    case 'Left':  return [x - 1, y];
    case 'Right': return [x + 1, y];
    default:      return [x, y];
  }
}

/**
 * BFS flood-fill: counts how many cells are reachable from `start`
 * without crossing walls or the snake body (excluding the tail, which moves).
 * This is used to detect dead-ends before the snake commits to a direction.
 * @param {Array<number>} start - Starting coordinates [x, y].
 * @param {Array<Array<number>>} snake - The snake's body.
 * @param {number} gridSize - The size of the board.
 * @returns {number} Number of reachable empty cells.
 */
function floodFill(start, snake, gridSize) {
  // Build a Set of blocked cells from the snake body (excluding tail — it moves away)
  const blocked = new Set();
  const body = snake.slice(0, -1);
  for (const [bx, by] of body) {
    blocked.add(`${bx},${by}`);
  }

  const visited = new Set();
  const queue = [start];
  const startKey = `${start[0]},${start[1]}`;
  visited.add(startKey);

  const neighborDirs = [[0, -1], [0, 1], [-1, 0], [1, 0]];

  while (queue.length > 0) {
    const [cx, cy] = queue.shift();
    for (const [dx, dy] of neighborDirs) {
      const nx = cx + dx;
      const ny = cy + dy;
      // Skip out-of-bounds
      if (nx < 0 || nx >= gridSize || ny < 0 || ny >= gridSize) continue;
      const key = `${nx},${ny}`;
      if (visited.has(key) || blocked.has(key)) continue;
      visited.add(key);
      queue.push([nx, ny]);
    }
  }

  // visited includes the start cell itself, so subtract 1 for "empty neighbours"
  return visited.size;
}

/**
 * A helper function to check if a move is valid.
 * @param {Array<number>} newHead - The proposed new head coordinates.
 * @param {Array<Array<number>>} snake - The snake's body.
 * @param {number} gridSize - The size of the board.
 * @returns {boolean} True if the move is valid.
 */
function isValidMove([x, y], snake, gridSize) {
  // Check for wall collision
  if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) {
    return false;
  }

  // Check for self-collision (the tail will move, so we don't check the last segment)
  const snakeBody = snake.slice(0, -1);
  return !snakeBody.some(([sX, sY]) => sX === x && sY === y);
}

/**
 * Calculates the Manhattan distance between snake head and food.
 * Exported for use in the UI modal.
 * @param {Array<number>} head - The snake's head coordinates.
 * @param {Array<number>} food - The food's coordinates.
 * @returns {number} The distance.
 */
export function calculateManhattanDistance(head, food) {
    if (!food || !head) return 0;
    return Math.abs(head[0] - food[0]) + Math.abs(head[1] - food[1]);
}