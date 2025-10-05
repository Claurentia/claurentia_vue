<template>
  <div class="game-container">
    <div class="game-header">
      <h2>Snake</h2>
      <div class="game-status">
        <div>Score: {{ score }}</div>
      </div>
    </div>

    <div class="game-layout">
      <!-- Left Column: Game Board -->
      <div class="game-board-wrapper">
        <div class="game-instructions" v-if="!isPlaying && !isGameOver">
          <p>Press any arrow key to start</p>
          <div class="controls-guide">
            <div class="control-row">
              <span>Move: </span>
              <span class="key">↑</span>
              <span class="key">↓</span>
              <span class="key">←</span>
              <span class="key">→</span>
            </div>
            <div class="control-row">
              <span>Pause/Resume: </span>
              <span class="key wide">space</span>
            </div>
          </div>
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

        <div class="mobile-controls" v-if="isMobile">
          <button class="direction-button" @click="changeDirection('ArrowUp')">↑</button>
          <div class="horizontal-controls">
            <button class="direction-button" @click="changeDirection('ArrowLeft')">←</button>
            <button class="direction-button" @click="changeDirection('ArrowRight')">→</button>
          </div>
          <button class="direction-button" @click="changeDirection('ArrowDown')">↓</button>
          <button class="space-button" @click="toggleGame">
            {{ isPlaying ? 'Pause' : 'Resume' }}
          </button>
        </div>
      </div>

      <!-- Right Column: Controls & AI Log -->
      <div class="controls-panel">
        <div class="game-controls">
          <button class="control-button" @click="resetGame">New Game</button>
          <button
            class="control-button"
            :class="{ 'ai-active': isAIEnabled }"
            @click="handlePlayPauseAI">
            {{ getPlayPauseButtonText }}
          </button>
          <button class="control-button" @click="$emit('close')">Exit Game</button>
        </div>

        <!-- AI Decision Log -->
        <div class="ai-log" v-if="isAIEnabled">
          <div class="ai-log-header">
            <span class="ai-log-title">AI Decision Log</span>
            <button class="clear-log-button" @click="clearLog">Clear</button>
          </div>
          <div class="ai-log-content" ref="aiLog">
            <div v-if="aiLogs.length === 0" class="ai-log-empty">
              Waiting for AI decisions...
            </div>
            <div v-for="(log, index) in aiLogs" :key="index" class="ai-log-entry">
              <span class="log-timestamp">{{ log.timestamp }}</span>
              <span class="log-message">{{ log.message }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Game Over Overlay -->
    <div class="game-over-overlay" v-if="isGameOver">
      <div class="game-over-content" :class="{ 'with-log': aiLogs.length > 0 }">
        <h3>Game Over!</h3>
        <p class="final-score">Score: {{ score }}</p>

        <!-- AI Log in Game Over -->
        <div class="game-over-ai-log" v-if="aiLogs.length > 0">
          <div class="game-over-log-header">
            <span class="game-over-log-title">AI Decision Summary</span>
            <span class="game-over-log-count">{{ aiLogs.length }} moves</span>
          </div>
          <div class="game-over-log-content">
            <div v-for="(log, index) in aiLogs" :key="index" class="game-over-log-entry">
              <span class="log-timestamp">{{ log.timestamp }}</span>
              <span class="log-message">{{ log.message }}</span>
            </div>
          </div>
        </div>

        <div class="game-over-controls">
          <button class="control-button" @click="resetGame">Play Again</button>
          <button class="control-button" @click="$emit('close')">Exit</button>
        </div>
      </div>
    </div>

    <!-- Window Too Small Overlay -->
    <div class="window-size-overlay" v-if="isWindowTooSmall">
      <div class="window-size-content">
        <div class="window-size-icon">⚠</div>
        <h3>Screen Too Small</h3>
        <p>This game requires a larger screen for optimal experience.</p>
        <p class="window-size-suggestion">Please open this game on a tablet or desktop device (minimum width: 768px).</p>
        <button class="control-button" @click="$emit('close')">Exit Game</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getNextMove } from './SnakeAI.js'

export default {
  name: 'SnakeGame',
  data() {
    return {
      gridSize: 20,
      snake: [[10, 10]], // Starting position
      direction: 'Right',
      food: null,
      isPlaying: false,
      isGameOver: false,
      gameInterval: null,
      score: 0,
      speed: 150,
      isMobile: false,
      isAIEnabled: false,
      aiLogs: [],
      moveCount: 0,
      isWindowTooSmall: false
    }
  },
  computed: {
    cells() {
      return Array(this.gridSize * this.gridSize).fill(null)
    },
    getPlayPauseButtonText() {
      if (this.isPlaying) {
        return 'Pause Game'
      } else if (this.isAIEnabled) {
        return 'Auto Play'
      } else {
        return 'Auto Play'
      }
    }
  },
  mounted() {
    this.checkMobile()
    this.checkWindowSize()
    this.spawnFood()
    if (this.$refs.board) {
      this.$refs.board.focus()
    }
    window.addEventListener('resize', this.checkMobile)
    window.addEventListener('resize', this.checkWindowSize)
  },
  beforeUnmount() {
    this.stopGame()
    window.removeEventListener('resize', this.checkMobile)
    window.removeEventListener('resize', this.checkWindowSize)
  },
  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth <= 768
    },
    checkWindowSize() {
      this.isWindowTooSmall = window.innerWidth < 768
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
      // Prevent any key handling if game is over
      if (this.isGameOver) return

      if (event.code === 'Space') {
        event.preventDefault()
        this.toggleGame()
        return
      }
      
      this.changeDirection(event.key)
      if (!this.isPlaying && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        this.startGame()
      }
    },
    changeDirection(key) {
      // Prevent direction change if game is over
      if (this.isGameOver) return

      const directions = {
        ArrowUp: 'Up',
        ArrowDown: 'Down',
        ArrowLeft: 'Left',
        ArrowRight: 'Right'
      }
      
      const newDirection = directions[key]
      if (!newDirection) return

      const opposites = {
        Up: 'Down',
        Down: 'Up',
        Left: 'Right',
        Right: 'Left'
      }

      if (opposites[this.direction] !== newDirection) {
        this.direction = newDirection
      }
    },
    moveSnake() {
      // If AI is enabled, calculate the next best move
      if (this.isAIEnabled) {
        const head = this.snake[this.snake.length - 1]
        const oldDirection = this.direction

        const aiDirection = getNextMove({
          snake: this.snake,
          food: this.food,
          gridSize: this.gridSize,
          currentDirection: this.direction
        })

        this.direction = aiDirection
        this.moveCount++

        // Log AI decision
        const distance = Math.abs(head[0] - this.food[0]) + Math.abs(head[1] - this.food[1])
        this.addAILog(
          `Move #${this.moveCount}: ${oldDirection} → ${aiDirection} | ` +
          `Head: (${head[0]}, ${head[1]}) | Food: (${this.food[0]}, ${this.food[1]}) | ` +
          `Distance: ${distance}`
        )
      }

      const head = [...this.snake[this.snake.length - 1]]

      switch (this.direction) {
        case 'Up':    head[1]--; break
        case 'Down':  head[1]++; break
        case 'Left':  head[0]--; break
        case 'Right': head[0]++; break
      }

      // Check collision with walls
      if (head[0] < 0 || head[0] >= this.gridSize ||
          head[1] < 0 || head[1] >= this.gridSize) {
        this.gameOver()
        return
      }

      // Check collision with self
      if (this.snake.some(([x, y]) => x === head[0] && y === head[1])) {
        this.gameOver()
        return
      }

      this.snake.push(head)

      // Check if food is eaten
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
        newFood = [
          Math.floor(Math.random() * this.gridSize),
          Math.floor(Math.random() * this.gridSize)
        ]
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
        this.gameInterval = setInterval(() => {
          this.moveSnake()
        }, this.speed)
      }
    },
    stopGame() {
      this.isPlaying = false
      clearInterval(this.gameInterval)
    },
    toggleGame() {
      if (this.isPlaying) {
        this.stopGame()
      } else {
        this.startGame()
      }
    },
    gameOver() {
      this.stopGame()
      this.isGameOver = true
    },
    resetGame() {
      this.stopGame()
      this.snake = [[10, 10]]
      this.direction = 'Right'
      this.score = 0
      this.speed = 150
      this.isGameOver = false
      this.isAIEnabled = false
      this.aiLogs = []
      this.moveCount = 0
      this.spawnFood()
      this.$refs.board.focus()
    },
    toggleAI() {
      this.isAIEnabled = !this.isAIEnabled

      // If enabling AI and the game hasn't started, start it
      if (this.isAIEnabled && !this.isPlaying && !this.isGameOver) {
        this.startGame()
      }
    },
    handlePlayPauseAI() {
      // If game is playing, pause it
      if (this.isPlaying) {
        this.stopGame()
      } else {
        // If game is not playing, enable AI and start
        this.isAIEnabled = true
        this.addAILog('AI Auto Play enabled - Starting game...')
        this.startGame()
      }
    },
    addAILog(message) {
      const timestamp = new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })

      this.aiLogs.push({ timestamp, message })

      // Keep only last 50 logs
      if (this.aiLogs.length > 50) {
        this.aiLogs.shift()
      }

      // Auto-scroll to bottom
      this.$nextTick(() => {
        if (this.$refs.aiLog) {
          this.$refs.aiLog.scrollTop = this.$refs.aiLog.scrollHeight
        }
      })
    },
    clearLog() {
      this.aiLogs = []
      this.moveCount = 0
    }
  }
}
</script>

<style scoped>
.game-container {
  background: var(--color-bg-charcoal, #2b2b2b);
  border-radius: 4px;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  box-shadow: 0 0 20px rgba(67, 198, 195, 0.3);
  border: 2px solid var(--color-teal, #43C6C3);
  position: relative;
  font-family: var(--font-mono, 'Share Tech Mono', monospace);
}

.game-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.game-layout {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
  align-items: start;
}

.game-board-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.game-header h2 {
  color: var(--color-teal, #43C6C3);
  margin-bottom: 0.5rem;
  text-shadow: 0 0 10px var(--color-teal, #43C6C3);
  text-transform: uppercase;
  letter-spacing: 3px;
  font-family: var(--font-retro, 'VT323', monospace);
}

.game-status {
  color: var(--color-gold, #F2C749);
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
  text-shadow: 0 0 5px var(--color-gold, #F2C749);
}

.game-board {
  display: grid;
  gap: 1px;
  background: var(--color-bg-dark, #1a1a1a);
  padding: 2px;
  border-radius: 2px;
  aspect-ratio: 1;
  outline: none;
  border: 2px solid var(--color-teal, #43C6C3);
  box-shadow: inset 0 0 10px rgba(67, 198, 195, 0.2);
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.cell {
  aspect-ratio: 1;
  background: var(--color-bg-charcoal, #2b2b2b);
  border-radius: 0;
}

.cell.snake {
  background: var(--color-teal, #43C6C3);
  border-radius: 0;
  box-shadow: 0 0 5px var(--color-teal, #43C6C3);
}

.cell.head {
  background: var(--color-gold, #F2C749);
  border-radius: 0;
  position: relative;
  box-shadow: 0 0 8px var(--color-gold, #F2C749);
}

.cell.head::before,
.cell.head::after {
  content: '';
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--color-bg-dark, #1a1a1a);
  border-radius: 0;
}

/* Eyes position based on direction */
.cell.head.up::before { top: 20%; left: 30%; }
.cell.head.up::after { top: 20%; right: 30%; }

.cell.head.down::before { bottom: 20%; left: 30%; }
.cell.head.down::after { bottom: 20%; right: 30%; }

.cell.head.left::before { left: 20%; top: 30%; }
.cell.head.left::after { left: 20%; bottom: 30%; }

.cell.head.right::before { right: 20%; top: 30%; }
.cell.head.right::after { right: 20%; bottom: 30%; }

.cell.food {
  background: var(--color-orange, #F75A33);
  border-radius: 0;
  box-shadow: 0 0 8px var(--color-orange, #F75A33);
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.controls-panel {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.mobile-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.horizontal-controls {
  display: flex;
  gap: 2rem;
}

.direction-button {
  width: 3rem;
  height: 3rem;
  background: var(--color-bg-charcoal, #2b2b2b);
  border: 2px solid var(--color-teal, #43C6C3);
  color: var(--color-teal, #43C6C3);
  border-radius: 0;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono, 'Share Tech Mono', monospace);
}

.direction-button:hover {
  background: var(--color-teal, #43C6C3);
  color: var(--color-bg-dark, #1a1a1a);
  box-shadow: 0 0 10px var(--color-teal, #43C6C3);
}

.direction-button:active {
  transform: translateY(2px);
}

.game-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.control-button {
  background: var(--color-bg-charcoal, #2b2b2b);
  border: 2px solid var(--color-teal, #43C6C3);
  color: var(--color-teal, #43C6C3);
  padding: 0.8rem 1.5rem;
  border-radius: 0;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.1s;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-family: var(--font-mono, 'Share Tech Mono', monospace);
}

.control-button:hover {
  background: var(--color-teal, #43C6C3);
  color: var(--color-bg-dark, #1a1a1a);
  box-shadow: 0 0 10px var(--color-teal, #43C6C3);
}

.control-button:active {
  transform: translateY(2px);
}

.control-button.ai-active {
  background: var(--color-orange, #F75A33);
  border-color: var(--color-orange, #F75A33);
  color: var(--color-cream, #F5F4ED);
  box-shadow: 0 0 15px var(--color-orange, #F75A33);
  animation: ai-pulse 2s infinite;
}

.control-button.ai-active:hover {
  background: var(--color-orange, #F75A33);
  color: var(--color-cream, #F5F4ED);
  filter: brightness(1.2);
}

@keyframes ai-pulse {
  0%, 100% {
    box-shadow: 0 0 15px var(--color-orange, #F75A33);
  }
  50% {
    box-shadow: 0 0 25px var(--color-orange, #F75A33);
  }
}

/* AI Log Styles */
.ai-log {
  background: var(--color-bg-dark, #1a1a1a);
  border: 2px solid var(--color-teal, #43C6C3);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  height: 400px;
  box-shadow: inset 0 0 10px rgba(67, 198, 195, 0.1);
}

.ai-log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 2px solid var(--color-teal, #43C6C3);
  background: var(--color-bg-charcoal, #2b2b2b);
}

.ai-log-title {
  color: var(--color-gold, #F2C749);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 0 5px var(--color-gold, #F2C749);
}

.clear-log-button {
  background: transparent;
  border: 1px solid var(--color-teal, #43C6C3);
  color: var(--color-teal, #43C6C3);
  padding: 0.3rem 0.8rem;
  border-radius: 0;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.1s;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: var(--font-mono, 'Share Tech Mono', monospace);
}

.clear-log-button:hover {
  background: var(--color-teal, #43C6C3);
  color: var(--color-bg-dark, #1a1a1a);
}

.ai-log-content {
  flex: 1;
  overflow-y: auto;
  padding: 0.75rem;
  font-size: 0.75rem;
  line-height: 1.6;
  font-family: var(--font-mono, 'Share Tech Mono', monospace);
}

.ai-log-content::-webkit-scrollbar {
  width: 8px;
}

.ai-log-content::-webkit-scrollbar-track {
  background: var(--color-bg-charcoal, #2b2b2b);
}

.ai-log-content::-webkit-scrollbar-thumb {
  background: var(--color-teal, #43C6C3);
  border-radius: 0;
}

.ai-log-empty {
  color: var(--color-cream, #F5F4ED);
  opacity: 0.5;
  text-align: center;
  padding: 2rem;
  font-style: italic;
}

.ai-log-entry {
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  background: rgba(67, 198, 195, 0.05);
  border-left: 2px solid var(--color-teal, #43C6C3);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.log-timestamp {
  color: var(--color-orange, #F75A33);
  font-size: 0.7rem;
  opacity: 0.8;
}

.log-message {
  color: var(--color-cream, #F5F4ED);
  word-wrap: break-word;
}

@media (max-width: 1024px) {
  .game-layout {
    grid-template-columns: 1fr;
  }

  .controls-panel {
    order: -1;
  }

  .ai-log {
    height: 250px;
  }

  .game-board {
    max-width: 500px;
  }
}

@media (max-width: 768px) {
  .game-container {
    padding: 1rem;
  }

  .game-header h2 {
    font-size: 1.5rem;
  }

  .game-layout {
    gap: 1rem;
  }

  .control-button {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }

  .ai-log {
    height: 200px;
  }

  .ai-log-content {
    font-size: 0.7rem;
  }
}

@media (max-width: 480px) {
  .game-container {
    padding: 0.75rem;
  }

  .game-header h2 {
    font-size: 1.3rem;
  }

  .game-status {
    font-size: 1rem;
  }

  .direction-button {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.3rem;
  }

  .game-board {
    max-width: 100%;
  }

  .ai-log {
    height: 150px;
  }

  .ai-log-title {
    font-size: 0.75rem;
  }

  .ai-log-content {
    font-size: 0.65rem;
  }
}

.game-instructions {
  color: var(--color-cream, #F5F4ED);
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.5rem;
}

.game-instructions p {
  margin: 0 0 0.5rem 0;
  font-size: 0.85rem;
}

.controls-guide {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.key {
  background: var(--color-bg-charcoal, #2b2b2b);
  border: 2px solid var(--color-teal, #43C6C3);
  padding: 0.25rem 0.5rem;
  border-radius: 0;
  font-size: 0.75rem;
  color: var(--color-teal, #43C6C3);
}

@media (max-width: 1024px) {
  .game-instructions {
    font-size: 0.85rem;
  }

  .game-instructions p {
    font-size: 0.8rem;
  }

  .controls-guide {
    gap: 1rem;
  }

  .control-row {
    font-size: 0.75rem;
  }
}

@media (max-width: 768px) {
  .game-instructions {
    font-size: 0.8rem;
  }

  .game-instructions p {
    font-size: 0.75rem;
  }

  .key {
    padding: 0.2rem 0.4rem;
    font-size: 0.7rem;
  }

  .control-row {
    font-size: 0.7rem;
  }
}

.control-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
}

.key.wide {
  padding: 0.25rem 1rem;
  text-transform: uppercase;
  font-size: 0.75rem;
}

.space-button {
  margin-top: 1rem;
  width: 100%;
  background: var(--color-bg-charcoal, #2b2b2b);
  border: 2px solid var(--color-teal, #43C6C3);
  color: var(--color-teal, #43C6C3);
  padding: 0.8rem;
  border-radius: 0;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.1s;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-family: var(--font-mono, 'Share Tech Mono', monospace);
}

.space-button:hover {
  background: var(--color-teal, #43C6C3);
  color: var(--color-bg-dark, #1a1a1a);
  box-shadow: 0 0 10px var(--color-teal, #43C6C3);
}

.space-button:active {
  transform: translateY(2px);
}

.game-over-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(26, 26, 26, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease-out;
  border-radius: 4px;
}

.game-over-content {
  text-align: center;
  padding: 2rem;
  border: 2px solid var(--color-orange, #F75A33);
  background: var(--color-bg-charcoal, #2b2b2b);
  box-shadow: 0 0 20px rgba(247, 90, 51, 0.5);
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.game-over-content.with-log {
  max-width: 700px;
}

.game-over-content h3 {
  color: var(--color-orange, #F75A33);
  font-size: 2rem;
  margin: 0;
  text-shadow: 0 0 10px var(--color-orange, #F75A33);
  text-transform: uppercase;
  letter-spacing: 3px;
  font-family: var(--font-retro, 'VT323', monospace);
}

.final-score {
  color: var(--color-gold, #F2C749);
  font-size: 1.5rem;
  margin: 0;
  text-shadow: 0 0 5px var(--color-gold, #F2C749);
}

.game-over-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Game Over AI Log */
.game-over-ai-log {
  background: var(--color-bg-dark, #1a1a1a);
  border: 2px solid var(--color-teal, #43C6C3);
  border-radius: 4px;
  overflow: hidden;
  text-align: left;
}

.game-over-log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 2px solid var(--color-teal, #43C6C3);
  background: var(--color-bg-charcoal, #2b2b2b);
}

.game-over-log-title {
  color: var(--color-gold, #F2C749);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 0 5px var(--color-gold, #F2C749);
}

.game-over-log-count {
  color: var(--color-teal, #43C6C3);
  font-size: 0.8rem;
  opacity: 0.8;
}

.game-over-log-content {
  max-height: 300px;
  overflow-y: auto;
  padding: 0.75rem;
  font-size: 0.7rem;
  line-height: 1.5;
  font-family: var(--font-mono, 'Share Tech Mono', monospace);
}

.game-over-log-content::-webkit-scrollbar {
  width: 6px;
}

.game-over-log-content::-webkit-scrollbar-track {
  background: var(--color-bg-charcoal, #2b2b2b);
}

.game-over-log-content::-webkit-scrollbar-thumb {
  background: var(--color-teal, #43C6C3);
  border-radius: 0;
}

.game-over-log-entry {
  margin-bottom: 0.4rem;
  padding: 0.4rem;
  background: rgba(67, 198, 195, 0.05);
  border-left: 2px solid var(--color-teal, #43C6C3);
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.game-over-log-entry .log-timestamp {
  color: var(--color-orange, #F75A33);
  font-size: 0.65rem;
  opacity: 0.8;
}

.game-over-log-entry .log-message {
  color: var(--color-cream, #F5F4ED);
  word-wrap: break-word;
  font-size: 0.7rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Game Over Responsive */
@media (max-width: 768px) {
  .game-over-content {
    padding: 1.5rem;
    max-width: 90vw;
  }

  .game-over-content.with-log {
    max-width: 90vw;
  }

  .game-over-content h3 {
    font-size: 1.5rem;
  }

  .final-score {
    font-size: 1.2rem;
  }

  .game-over-log-content {
    max-height: 200px;
    font-size: 0.65rem;
  }

  .game-over-log-title {
    font-size: 0.8rem;
  }

  .game-over-log-count {
    font-size: 0.7rem;
  }
}

@media (max-width: 480px) {
  .game-over-content {
    padding: 1rem;
  }

  .game-over-content h3 {
    font-size: 1.3rem;
  }

  .final-score {
    font-size: 1rem;
  }

  .game-over-log-content {
    max-height: 150px;
    font-size: 0.6rem;
  }

  .game-over-log-entry .log-message {
    font-size: 0.65rem;
  }

  .game-over-controls {
    flex-direction: column;
  }

  .game-over-controls .control-button {
    width: 100%;
  }
}

/* Window Size Warning Overlay */
.window-size-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(26, 26, 26, 0.98);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease-out;
  border-radius: 4px;
  z-index: 200;
}

.window-size-content {
  text-align: center;
  padding: 2rem;
  max-width: 400px;
  border: 2px solid var(--color-orange, #F75A33);
  background: var(--color-bg-charcoal, #2b2b2b);
  box-shadow: 0 0 20px rgba(247, 90, 51, 0.5);
  border-radius: 4px;
}

.window-size-icon {
  font-size: 4rem;
  color: var(--color-orange, #F75A33);
  margin-bottom: 1rem;
  text-shadow: 0 0 15px var(--color-orange, #F75A33);
  animation: pulse-warning 2s infinite;
}

@keyframes pulse-warning {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}

.window-size-content h3 {
  color: var(--color-orange, #F75A33);
  font-size: 1.8rem;
  margin: 0 0 1rem 0;
  text-shadow: 0 0 10px var(--color-orange, #F75A33);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-family: var(--font-retro, 'VT323', monospace);
}

.window-size-content p {
  color: var(--color-cream, #F5F4ED);
  font-size: 1rem;
  margin: 0 0 1rem 0;
  line-height: 1.6;
}

.window-size-suggestion {
  color: var(--color-gold, #F2C749);
  font-size: 0.9rem;
  margin-bottom: 1.5rem !important;
  font-style: italic;
}

.window-size-content .control-button {
  margin-top: 1rem;
  width: 100%;
}
</style> 