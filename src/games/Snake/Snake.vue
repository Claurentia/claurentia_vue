<template>
  <div class="game-container">
    <div class="game-header">
      <h2>Snake</h2>
      <div class="game-status">
        <div>Score: {{ score }}</div>
      </div>
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

    <div class="game-controls">
      <button class="control-button" @click="resetGame">New Game</button>
      <button class="control-button" @click="$emit('close')">Exit Game</button>
    </div>

    <!-- Game Over Overlay -->
    <div class="game-over-overlay" v-if="isGameOver">
      <div class="game-over-content">
        <h3>Game Over!</h3>
        <p class="final-score">Score: {{ score }}</p>
        <div class="game-over-controls">
          <button class="control-button" @click="resetGame">Play Again</button>
          <button class="control-button" @click="$emit('close')">Exit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      isMobile: false
    }
  },
  computed: {
    cells() {
      return Array(this.gridSize * this.gridSize).fill(null)
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
      this.isMobile = window.innerWidth <= 768
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
      this.spawnFood()
      this.$refs.board.focus()
    }
  }
}
</script>

<style scoped>
.game-container {
  background: rgba(1, 0, 18, 0.95);
  border-radius: 15px;
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(163, 255, 187, 0.1);
  backdrop-filter: blur(8px);
}

.game-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.game-header h2 {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.5rem;
}

.game-status {
  color: rgba(163, 255, 187, 0.9);
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
}

.game-board {
  display: grid;
  gap: 1px;
  background: rgba(255, 255, 255, 0.1);
  padding: 1px;
  border-radius: 8px;
  margin-bottom: 2rem;
  aspect-ratio: 1;
  outline: none;
}

.cell {
  aspect-ratio: 1;
  background: rgba(1, 0, 18, 0.95);
  border-radius: 2px;
}

.cell.snake {
  background: rgba(163, 255, 187, 0.5);
  border-radius: 4px;
}

.cell.head {
  background: rgba(163, 255, 187, 0.8);
  border-radius: 6px;
  position: relative;
}

.cell.head::before,
.cell.head::after {
  content: '';
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(1, 0, 18, 0.95);
  border-radius: 50%;
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
  background: rgba(255, 107, 107, 0.8);
  border-radius: 50%;
}

.mobile-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.horizontal-controls {
  display: flex;
  gap: 2rem;
}

.direction-button {
  width: 3rem;
  height: 3rem;
  background: rgba(163, 255, 187, 0.1);
  border: 1px solid rgba(163, 255, 187, 0.3);
  color: rgba(163, 255, 187, 0.9);
  border-radius: 8px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.direction-button:hover {
  background: rgba(163, 255, 187, 0.2);
  transform: translateY(-2px);
}

.game-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.control-button {
  background: linear-gradient(
    to right,
    rgba(163, 255, 187, 0.2),
    rgba(115, 255, 160, 0.2)
  );
  border: 1px solid rgba(163, 255, 187, 0.3);
  color: rgba(163, 255, 187, 0.9);
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.control-button:hover {
  background: linear-gradient(
    to right,
    rgba(163, 255, 187, 0.3),
    rgba(115, 255, 160, 0.3)
  );
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .game-container {
    padding: 1rem;
  }

  .game-header h2 {
    font-size: 1.5rem;
  }

  .game-controls {
    flex-wrap: wrap;
  }

  .control-button {
    flex: 1;
    min-width: 120px;
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
}

.game-instructions {
  color: rgba(163, 255, 187, 0.9);
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.game-instructions p {
  margin-bottom: 0.25rem;
}

.controls-guide {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-top: 0.25rem;
}

.key {
  background: rgba(163, 255, 187, 0.1);
  border: 1px solid rgba(163, 255, 187, 0.3);
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .game-instructions p {
    font-size: 0.9rem;
  }
  
  .key {
    padding: 0.2rem 0.4rem;
    font-size: 0.8rem;
  }
}

.control-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.key.wide {
  padding: 0.3rem 1.2rem;
  text-transform: uppercase;
  font-size: 0.8rem;
}

.space-button {
  margin-top: 1rem;
  width: 100%;
  background: rgba(163, 255, 187, 0.1);
  border: 1px solid rgba(163, 255, 187, 0.3);
  color: rgba(163, 255, 187, 0.9);
  padding: 0.8rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.space-button:hover {
  background: rgba(163, 255, 187, 0.2);
  transform: translateY(-2px);
}

.game-over-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(1, 0, 18, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease-out;
  border-radius: 15px;
}

.game-over-content {
  text-align: center;
  padding: 2rem;
}

.game-over-content h3 {
  color: #ff6b6b;
  font-size: 2rem;
  margin-bottom: 1rem;
  text-shadow: 0 0 10px rgba(255, 107, 107, 0.3);
}

.final-score {
  color: rgba(163, 255, 187, 0.9);
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.game-over-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .game-over-content h3 {
    font-size: 1.5rem;
  }

  .final-score {
    font-size: 1.2rem;
  }
}
</style> 