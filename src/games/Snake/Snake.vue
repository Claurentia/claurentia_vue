<!-- src/games/Snake.vue -->
<template>
  <div class="game-container">
    <div class="game-layout-grid">
      <div class="terminal-header header-area">
        <div class="header-line">
          <span class="terminal-prompt">SNAKE.EXE</span>
          <span class="terminal-version">v1.0</span>
        </div>
        <div class="status-bar">
          <span class="status-item">
            <span class="label">SCORE:</span>
            <span class="value glow-text">{{ score.toString().padStart(4, '0') }}</span>
          </span>
          <span class="status-led" :class="{ active: isPlaying, paused: !isPlaying && !isGameOver }"></span>
          <span class="status-item">
            <span class="label">MODE:</span>
            <span class="value">{{ isAutoPlay ? '[AI]' : '[MANUAL]' }}</span>
          </span>
        </div>
      </div>

      <div class="game-board-wrapper board-area">
        <div class="crt-overlay"></div>
        <div class="countdown-overlay" v-if="isCountingDown">
          {{ countdownValue }}
        </div>
        <div class="game-board"
             ref="board"
             tabindex="0"
             @keydown="handleKeyPress"
             :style="{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }">
          <div v-for="(cell, index) in cells"
               :key="index"
               class="cell"
               :class="{
                 'snake': isSnake(index),
                 'food': isFood(index),
                 'head': isHead(index),
                 [direction.toLowerCase()]: isHead(index)
               }">
          </div>
        </div>
      </div>

      <div class="sidebar-controls controls-area">
        <div class="instructions" v-if="isAtStart">
          <div class="instruction-line">
            > PRESS ARROW KEYS TO START MANUAL MODE
          </div>
          <div class="instruction-line">
            > OR CLICK [ENABLE_AI] FOR AUTO-PLAY
          </div>
        </div>

        <div class="control-panel">
          <div class="control-section">
            <div class="section-label">[GAME_CONTROLS]</div>
            <div class="button-row">
              <button class="retro-btn" @click="resetGame">
                <span class="btn-bracket">[</span> NEW_GAME <span class="btn-bracket">]</span>
              </button>
              <button class="retro-btn" @click="toggleGame" v-if="!isGameOver" :disabled="isAtStart">
                <span class="btn-bracket">[</span> {{ isPlaying ? 'PAUSE' : 'RESUME' }} <span class="btn-bracket">]</span>
              </button>
            </div>
          </div>

          <div class="control-section">
            <div class="section-label">[AI_CONTROLS]</div>
            <div class="button-row">
              <button class="retro-btn ai-btn" @click="toggleAutoPlay" :disabled="isGameOver">
                <span class="btn-bracket">[</span> {{ isAutoPlay ? 'DISABLE_AI' : 'ENABLE_AI' }} <span class="btn-bracket">]</span>
              </button>
              <button class="retro-btn info-btn" @click="showAIExplanation = true" v-if="isAutoPlay" :disabled="isGameOver">
                <span class="btn-bracket">[</span> SHOW_INFO <span class="btn-bracket">]</span>
              </button>
            </div>
          </div>

          <div class="control-section">
            <button class="retro-btn exit-btn" @click="$emit('close')">
              <span class="btn-bracket">[</span> EXIT <span class="btn-bracket">]</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="ai-modal" v-if="showAIExplanation">
      <div class="modal-content">
        <div class="modal-header">
          <span class="modal-title">[AI_ALGORITHM.TXT]</span>
          <button class="close-btn" @click="showAIExplanation = false">×</button>
        </div>
        <div class="modal-body">
          <div class="modal-sidebar">
            <div class="explanation-section">
              <div class="section-title">CURRENT STATE</div>
              <div class="terminal-text">
                SNAKE_HEAD: [{{ snake[snake.length - 1][0] }}, {{ snake[snake.length - 1][1] }}]<br>
                FOOD_POS: [{{ food ? food[0] : 'N/A' }}, {{ food ? food[1] : 'N/A' }}]<br>
                DISTANCE: {{ getManhattanDistance() }}
              </div>
            </div>
          </div>
          <div class="modal-main-content">
            <div class="explanation-section">
              <div class="section-title">ALGORITHM: A* PATHFINDING</div>
              <div class="terminal-text">
                > The AI uses A* (A-star) search algorithm to find the optimal path from the snake's head to the food.
              </div>
            </div>
            <div class="explanation-section">
              <div class="section-title">INSPIRATION</div>
              <div class="terminal-text">
                > Based on UC Berkeley's Pacman AI project used in CS188: Artificial Intelligence course
                <br>> Implements heuristic search with Manhattan distance
              </div>
            </div>
            <div class="explanation-section">
              <div class="section-title">HOW IT WORKS</div>
              <div class="terminal-text">
                1. CALCULATE Manhattan distance to food<br>
                2. EVALUATE all possible moves (up, down, left, right)<br>
                3. AVOID walls and self-collision<br>
                4. SELECT path with minimum cost (distance + steps)<br>
                5. MOVE toward optimal direction
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="game-over-overlay" v-if="isGameOver">
      <div class="game-over-content">
        <div class="game-over-title">[ GAME_OVER ]</div>
        <div class="final-score">
          <span class="label">FINAL_SCORE:</span>
          <span class="value glow-text">{{ score.toString().padStart(4, '0') }}</span>
        </div>
        <div class="game-over-controls">
          <button class="retro-btn" @click="resetGame">
            <span class="btn-bracket">[</span> PLAY_AGAIN <span class="btn-bracket">]</span>
          </button>
          <button class="retro-btn" @click="$emit('close')">
            <span class="btn-bracket">[</span> EXIT <span class="btn-bracket">]</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNextMove, calculateManhattanDistance } from './SnakeAI.js'

export default {
  name: 'SnakeGame',
  data() {
    return {
      gridSize: 20,
      snake: [[10, 10]],
      direction: 'Right',
      food: null,
      isPlaying: false,
      isGameOver: false,
      isAutoPlay: false,
      showAIExplanation: false,
      gameInterval: null,
      score: 0,
      speed: 150,
      isMobile: false,
      isCountingDown: false,
      countdownValue: 3,
      touchStartX: 0,
      touchStartY: 0,
      touchEndX: 0,
      touchEndY: 0,
    }
  },
  computed: {
    cells() {
      return Array(this.gridSize * this.gridSize).fill(null)
    },
    isAtStart() {
      return !this.isPlaying && this.score === 0 && this.snake.length === 1 && !this.isGameOver;
    }
  },
  mounted() {
    this.checkMobile()
    this.spawnFood()
    this.$refs.board.focus()
    window.addEventListener('resize', this.checkMobile)
  },
  beforeUnmount() {
    this.stopGame()
    window.removeEventListener('resize', this.checkMobile)
  },
  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth <= 1024
    },
    onTouchStart(event) {
      this.touchEndX = 0;
      this.touchEndY = 0;
      this.touchStartX = event.touches[0].clientX;
      this.touchStartY = event.touches[0].clientY;
    },

    onTouchMove(event) {
      this.touchEndX = event.touches[0].clientX;
      this.touchEndY = event.touches[0].clientY;
    },

    onTouchEnd() {
      // Only process swipes in manual mobile mode
      if (!this.isMobile || this.isAutoPlay) return;

      const minSwipeDistance = 30;
      if (!this.touchEndX || !this.touchEndY) return;

      const deltaX = this.touchEndX - this.touchStartX;
      const deltaY = this.touchEndY - this.touchStartY;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (Math.abs(deltaX) > minSwipeDistance) {
          this.changeDirection(deltaX > 0 ? 'ArrowRight' : 'ArrowLeft');
        }
      } else {
        if (Math.abs(deltaY) > minSwipeDistance) {
          this.changeDirection(deltaY > 0 ? 'ArrowDown' : 'ArrowUp');
        }
      }
    },
    isSnake(index) {
      const [x, y] = this.indexToCoords(index)
      return this.snake.some(([sX, sY]) => sX === x && sY === y)
    },
    isHead(index) {
      const [x, y] = this.indexToCoords(index)
      const [headX, headY] = this.snake[this.snake.length - 1]
      return x === headX && y === headY
    },
    isFood(index) {
      const [x, y] = this.indexToCoords(index)
      return this.food && x === this.food[0] && y === this.food[1]
    },
    indexToCoords(index) {
      return [index % this.gridSize, Math.floor(index / this.gridSize)]
    },
    coordsToIndex([x, y]) {
      return y * this.gridSize + x
    },
    handleKeyPress(event) {
      if (this.isGameOver || this.isAutoPlay) return

      if (event.code === 'Space') {
        event.preventDefault()
        if (!this.isAtStart) this.toggleGame()
        return
      }

      this.changeDirection(event.key)
    },
    changeDirection(key) {
      if (this.isGameOver || this.isAutoPlay || this.isCountingDown) return

      const directions = {
        ArrowUp: 'Up', ArrowDown: 'Down', ArrowLeft: 'Left', ArrowRight: 'Right'
      }
      const newDirection = directions[key]
      if (!newDirection) return

      const opposites = {
        Up: 'Down', Down: 'Up', Left: 'Right', Right: 'Left'
      }

      if (this.snake.length === 1 || opposites[this.direction] !== newDirection) {
        this.direction = newDirection
      }

      if (this.isAtStart) {
        this.startGame()
      }
    },
    toggleAutoPlay() {
      this.isAutoPlay = !this.isAutoPlay
      if (this.isAutoPlay && !this.isPlaying) {
        this.startGame()
      }
    },
    getManhattanDistance() {
      const head = this.snake[this.snake.length - 1];
      return calculateManhattanDistance(head, this.food);
    },
    moveSnake() {
      if (this.isAutoPlay) {
        this.direction = getNextMove({
          snake: this.snake,
          food: this.food,
          gridSize: this.gridSize,
          currentDirection: this.direction
        });
      }

      const head = [...this.snake[this.snake.length - 1]]
      switch (this.direction) {
        case 'Up': head[1]--; break
        case 'Down': head[1]++; break
        case 'Left': head[0]--; break
        case 'Right': head[0]++; break
      }

      if (head[0] < 0 || head[0] >= this.gridSize || head[1] < 0 || head[1] >= this.gridSize) {
        this.gameOver()
        return
      }
      if (this.snake.some(([x, y]) => x === head[0] && y === head[1])) {
        this.gameOver()
        return
      }

      this.snake.push(head)
      if (this.food && head[0] === this.food[0] && head[1] === this.food[1]) {
        this.score += 10
        this.spawnFood()
        this.increaseSpeed()
      } else {
        this.snake.shift()
      }
    },
    spawnFood() {
      let newFood
      do {
        newFood = [ Math.floor(Math.random() * this.gridSize), Math.floor(Math.random() * this.gridSize) ]
      } while (this.snake.some(([x, y]) => x === newFood[0] && y === newFood[1]))
      this.food = newFood
    },
    increaseSpeed() {
      if (this.speed > 50) {
        this.speed = Math.max(50, this.speed - 5)
        if (this.isPlaying) {
          this.stopGame()
          this.startGame()
        }
      }
    },
    startGame() {
      if (!this.isPlaying) {
        this.isPlaying = true
        this.gameInterval = setInterval(this.moveSnake, this.speed)
      }
    },
    stopGame() {
      this.isPlaying = false
      clearInterval(this.gameInterval)
    },
    toggleGame() {
      if (this.isPlaying) {
        this.stopGame(); // Pause the game
      } else if (!this.isAtStart) { // Only resume if not at the start
        if (this.isAutoPlay) {
          this.startGame(); // AI resumes instantly
        } else {
          // Manual mode resumes with a countdown
          this.isCountingDown = true;
          this.countdownValue = 3;
          const countdownInterval = setInterval(() => {
            this.countdownValue--;
            if (this.countdownValue === 0) {
              clearInterval(countdownInterval);
              this.isCountingDown = false;
              this.startGame();
            }
          }, 1000);
        }
      }
    },
    gameOver() {
      this.stopGame()
      this.isGameOver = true
      this.isAutoPlay = false
    },
    resetGame() {
      this.stopGame()
      this.snake = [[10, 10]]
      this.direction = 'Right'
      this.score = 0
      this.speed = 150
      this.isGameOver = false
      this.isAutoPlay = false
      this.isCountingDown = false;
      this.spawnFood()
      this.$refs.board.focus()
    }
  }
}
</script>

<style scoped>

.game-container {
  background: var(--color-bg-dark);
  border: 3px solid var(--color-terminal-green);
  padding: 2rem;
  max-width: 1200px; /* Increased max-width for new layout */
  margin: 0 auto;
  box-shadow:
    0 0 20px rgba(0, 255, 65, 0.3),
    inset 0 0 30px rgba(0, 0, 0, 0.9);
  font-family: var(--font-mono);
  position: relative;

  display: flex;       /* Use flexbox for layout */
  flex-direction: column; /* Stack children vertically */
  width: 100%;
  max-height: 95vh;    /* Respect viewport height */
}

.game-layout-grid {
  display: grid;
  /* Mobile-first: single column layout */
  grid-template-areas:
    "header"
    "board"
    "controls";
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto; /* Let the board area take up the most space */
  gap: 1.5rem;

  flex-grow: 1; /* Allow the grid to grow and fill the flex container */
  min-height: 0; /* Prevents overflow issues in flex children */
}

.header-area { grid-area: header; }
.board-area { 
  grid-area: board;

  /* -- Add these lines to center the board -- */
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0; /* Prevents overflow issues in grid children */
}
.controls-area { grid-area: controls; }

/* Desktop: two-column layout */
@media (min-width: 1025px) {
  .game-layout-grid {
    grid-template-areas:
      "header header"
      "board controls";
    grid-template-columns: minmax(0, 1fr) 350px; /* Flexible board, fixed sidebar */

    grid-template-rows: auto minmax(0, 1fr); 
  }
}

.sidebar-controls {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
  background: var(--color-bg-charcoal);
  border: 2px solid var(--color-earth-olive);
}

.control-panel {
  margin-bottom: 0; /* Remove margin as gap is now handled by grid */
}

.countdown-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8rem;
  color: var(--color-terminal-green);
  font-family: var(--font-retro);
  text-shadow: 0 0 20px var(--color-terminal-green);
  z-index: 500;
  animation: fadeIn 0.3s;
}

.modal-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

@media (min-width: 769px) {
  .modal-body {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1.5rem;
    align-items: start;
  }
}

.modal-sidebar {
  order: 1;
}

.modal-main-content {
  order: 2;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.terminal-header {
  background: var(--color-bg-charcoal);
  border: 2px solid var(--color-earth-olive);
  padding: 1rem;
  margin-bottom: 0;
}

.header-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-earth-olive);
}

.terminal-prompt {
  color: var(--color-neon-orange);
  font-size: 1.2rem;
  letter-spacing: 2px;
  font-family: var(--font-retro);
}

.terminal-version {
  color: var(--color-terminal-green);
  font-size: 0.8rem;
}

.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-terminal-green);
}

.status-item {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.label {
  color: var(--color-neon-orange);
  font-size: 0.9rem;
}

.value {
  color: var(--color-terminal-green);
  font-size: 1rem;
}

.status-led {
  width: 12px;
  height: 12px;
  background: var(--color-red-error);
  border-radius: 50%;
  box-shadow: 0 0 5px var(--color-red-error);
}

.status-led.active {
  background: var(--color-terminal-green);
  box-shadow: 0 0 10px var(--color-terminal-green);
  animation: pulse-led 1.5s infinite;
}

.status-led.paused {
  background: var(--color-amber);
  box-shadow: 0 0 10px var(--color-amber);
}

@keyframes pulse-led {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.game-board-wrapper {
  position: relative;
  margin-bottom: 0;
  background: var(--color-bg-charcoal);
  border: 3px solid var(--color-earth-olive);
  padding: 0.5rem;
  box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.8);

  /* Maintain square aspect ratio and scale responsively */
  aspect-ratio: 1;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.crt-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 2px,
    rgba(0, 255, 65, 0.03) 2px,
    rgba(0, 255, 65, 0.03) 4px
  );
  pointer-events: none;
  z-index: 1;
}

.game-board {
  display: grid;
  gap: 1px;
  background: var(--color-bg-dark);
  aspect-ratio: 1;
  outline: none;
  position: relative;

  /* Fill wrapper while maintaining square aspect ratio */
  width: 100%;
  height: 100%;
}

.cell {
  aspect-ratio: 1;
  background: var(--color-bg-charcoal);
  border: 1px solid rgba(107, 124, 62, 0.1);
}

.cell.snake {
  background: var(--color-terminal-green);
  box-shadow: inset 0 0 5px rgba(0, 255, 65, 0.5);
  border: 1px solid var(--color-earth-olive);
}

.cell.head {
  background: var(--color-terminal-green);
  box-shadow: 0 0 10px var(--color-terminal-green);
  position: relative;
  animation: head-glow 1s infinite alternate;
}

@keyframes head-glow {
  from { box-shadow: 0 0 10px var(--color-terminal-green); }
  to { box-shadow: 0 0 20px var(--color-terminal-green); }
}

.cell.head::before,
.cell.head::after {
  content: '';
  position: absolute;
  width: 25%;
  height: 25%;
  background: var(--color-bg-dark);
  border-radius: 50%;
}

.cell.head.up::before { top: 20%; left: 25%; }
.cell.head.up::after { top: 20%; right: 25%; }

.cell.head.down::before { bottom: 20%; left: 25%; }
.cell.head.down::after { bottom: 20%; right: 25%; }

.cell.head.left::before { left: 20%; top: 25%; }
.cell.head.left::after { left: 20%; bottom: 25%; }

.cell.head.right::before { right: 20%; top: 25%; }
.cell.head.right::after { right: 20%; bottom: 25%; }

.cell.food {
  background: var(--color-neon-orange);
  border-radius: 50%;
  box-shadow: 0 0 15px var(--color-neon-orange);
  animation: food-pulse 1s infinite;
}

@keyframes food-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.ai-modal {
  position: fixed; /* Use fixed to cover viewport */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s;
  padding: 1rem;
}

.modal-content {
  background: var(--color-bg-dark);
  border: 3px solid var(--color-terminal-green);
  box-shadow: 0 0 30px rgba(0, 255, 65, 0.5);
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  background: var(--color-bg-charcoal);
  border-bottom: 2px solid var(--color-terminal-green);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  color: var(--color-terminal-green);
  font-size: 1.1rem;
  letter-spacing: 1px;
  font-family: var(--font-retro);
}

.close-btn {
  background: none;
  border: 2px solid var(--color-terminal-green);
  color: var(--color-terminal-green);
  width: 30px;
  height: 30px;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.1s;
}

.close-btn:hover {
  background: var(--color-terminal-green);
  color: var(--color-bg-dark);
}

.explanation-section {
  padding: 1rem;
  background: var(--color-bg-charcoal);
  border: 1px solid var(--color-earth-olive);
}
.modal-main-content .explanation-section {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .explanation-section {
    margin-bottom: 1rem;
  }
}

.section-title {
  color: var(--color-neon-orange);
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
  letter-spacing: 2px;
  border-bottom: 1px solid var(--color-earth-olive);
  padding-bottom: 0.5rem;
}

.terminal-text {
  color: var(--color-terminal-green);
  font-size: 0.85rem;
  line-height: 1.6;
}

.control-section {
  margin-bottom: 1rem;
}

.section-label {
  color: var(--color-neon-orange);
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
}

.button-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.retro-btn {
  background: var(--color-bg-charcoal);
  border: 2px solid var(--color-terminal-green);
  color: var(--color-terminal-green);
  padding: 0.7rem 1.2rem;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.1s;
  letter-spacing: 1px;
  flex: 1;
  min-width: 140px;
}

.retro-btn:hover:not(:disabled) {
  background: var(--color-earth-olive);
  color: var(--color-yellow-highlight);
  box-shadow: 0 0 15px var(--color-terminal-green);
}

.retro-btn:active:not(:disabled) {
  transform: translateY(2px);
}

.retro-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-bracket {
  color: var(--color-neon-orange);
  font-weight: bold;
}

.ai-btn:hover:not(:disabled) {
  background: var(--color-neon-teal);
  color: var(--color-bg-dark);
  border-color: var(--color-neon-teal);
}

.info-btn {
  background: var(--color-earth-olive);
  border-color: var(--color-neon-orange);
}

.exit-btn {
  border-color: var(--color-red-error);
  color: var(--color-red-error);
}

.exit-btn:hover {
  background: var(--color-red-error);
  color: var(--color-bg-dark);
}

.instructions {
  background: var(--color-bg-charcoal);
  border: 1px solid var(--color-earth-olive);
  padding: 1rem;
  text-align: center;
}

.instruction-line {
  color: var(--color-terminal-green);
  font-size: 0.85rem;
  margin: 0.3rem 0;
}

.game-over-overlay {
  position: fixed; /* Use fixed to cover viewport */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s;
}

.game-over-content {
  text-align: center;
  padding: 2rem;
  background: var(--color-bg-dark);
  border: 3px solid var(--color-red-error);
  box-shadow: 0 0 30px rgba(255, 51, 51, 0.5);
}

.game-over-title {
  color: var(--color-red-error);
  font-size: 2rem;
  font-family: var(--font-retro);
  margin-bottom: 1.5rem;
  text-shadow: 0 0 10px var(--color-red-error);
  letter-spacing: 3px;
}

.final-score {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  font-size: 1.2rem;
}

.game-over-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (max-width: 1024px) {
  .game-container {
    padding: 0.75rem;
    max-height: 98vh;
  }

  .game-layout-grid {
    gap: 1rem;
  }

  .terminal-prompt {
    font-size: 1rem;
  }

  .button-row {
    flex-direction: column;
  }

  .retro-btn {
    min-width: auto;
  }

  .game-over-title {
    font-size: 1.5rem;
  }

  .modal-content {
    /* width is now handled by padding on .ai-modal */
  }

  .explanation-section {
    padding: 0.8rem;
  }

  .terminal-text {
    font-size: 0.75rem;
  }



  .sidebar-controls {
    padding: 0.75rem;
  }
}
</style>