/**
 * Calculates the next best move for the snake AI.
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

  let bestDirection = currentDirection;
  let minDistance = Infinity;

  for (const dir of directions) {
    // Prevent the snake from reversing on itself
    if (opposites[currentDirection] === dir) continue;

    const newHead = getNextPosition(head, dir);

    // Check if the move is valid (doesn't hit walls or itself)
    if (!isValidMove(newHead, snake, gridSize)) continue;

    // Calculate Manhattan distance to the food
    const distance = Math.abs(newHead[0] - food[0]) + Math.abs(newHead[1] - food[1]);

    // Choose the direction that gets closer to the food
    if (distance < minDistance) {
      minDistance = distance;
      bestDirection = dir;
    }
  }

  return bestDirection;
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