<template>
  <div class="game-container">
    <div class="game-header">
      <h2>2048</h2>
      <div class="game-status">
        <div>Score: {{ score }}</div>
        <div>Best: {{ bestScore }}</div>
      </div>
      <div class="game-instructions" v-if="!isPlaying">
        <p>Use arrow keys to move tiles</p>
        <div class="controls-guide">
          <div class="control-row">
            <span>Move: </span>
            <span class="key">↑</span>
            <span class="key">↓</span>
            <span class="key">←</span>
            <span class="key">→</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="game-board" 
         ref="board"
         tabindex="0" 
         @keydown="handleKeyPress"
         @touchstart="handleTouchStart"
         @touchend="handleTouchEnd"
         :style="{ gridTemplateColumns: `repeat(${size}, 1fr)` }">
      <div v-for="(tile, index) in flattenedBoard" 
           :key="index"
           class="tile"
           :class="[
             tile ? `tile-${tile}` : '',
             tile ? 'tile-active' : ''
           ]">
        {{ tile || '' }}
      </div>
    </div>

    <div class="mobile-controls" v-if="isMobile">
      <button class="direction-button" @click="move('ArrowUp')">↑</button>
      <div class="horizontal-controls">
        <button class="direction-button" @click="move('ArrowLeft')">←</button>
        <button class="direction-button" @click="move('ArrowRight')">→</button>
      </div>
      <button class="direction-button" @click="move('ArrowDown')">↓</button>
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
        <p class="best-score">Best Score: {{ bestScore }}</p>
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
  name: 'TwentyFortyEight',
  data() {
    return {
      size: 4,
      board: [],
      score: 0,
      bestScore: 0,
      isGameOver: false,
      isPlaying: false,
      isMobile: false,
      touchStart: null,
      touchEnd: null
    }
  },
  computed: {
    flattenedBoard() {
      return this.board.flat()
    }
  },
  mounted() {
    this.checkMobile()
    this.initGame()
    this.$refs.board.focus()
    window.addEventListener('resize', this.checkMobile)
    
    // Load best score from localStorage
    const savedBestScore = localStorage.getItem('2048_best_score')
    if (savedBestScore) {
      this.bestScore = parseInt(savedBestScore)
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile)
  },
  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth <= 768
    },
    initGame() {
      // Initialize empty board
      this.board = Array(this.size).fill().map(() => Array(this.size).fill(0))
      this.score = 0
      this.isGameOver = false
      this.isPlaying = false
      
      // Add two initial tiles
      this.addNewTile()
      this.addNewTile()
    },
    addNewTile() {
      const emptyCells = []
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          if (this.board[i][j] === 0) {
            emptyCells.push([i, j])
          }
        }
      }
      
      if (emptyCells.length > 0) {
        const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        this.board[row][col] = Math.random() < 0.9 ? 2 : 4
      }
    },
    handleKeyPress(event) {
      if (this.isGameOver) return
      
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.preventDefault()
        this.move(event.key)
      }
    },
    move(direction) {
      if (this.isGameOver) return
      
      this.isPlaying = true
      const previousBoard = JSON.stringify(this.board)
      
      // Create a copy of the board for manipulation
      let newBoard = this.board.map(row => [...row])
      
      // Rotate board to always process left-to-right
      switch (direction) {
        case 'ArrowUp':
          newBoard = this.rotateBoard(this.rotateBoard(this.rotateBoard(newBoard)))
          break
        case 'ArrowDown':
          newBoard = this.rotateBoard(newBoard)
          break
        case 'ArrowRight':
          newBoard = this.rotateBoard(this.rotateBoard(newBoard))
          break
      }
      
      // Process each row
      for (let i = 0; i < this.size; i++) {
        let row = newBoard[i]
        let newRow = this.processRow(row)
        newBoard[i] = newRow
      }
      
      // Rotate back
      switch (direction) {
        case 'ArrowUp':
          newBoard = this.rotateBoard(newBoard)
          break
        case 'ArrowDown':
          newBoard = this.rotateBoard(this.rotateBoard(this.rotateBoard(newBoard)))
          break
        case 'ArrowRight':
          newBoard = this.rotateBoard(this.rotateBoard(newBoard))
          break
      }
      
      // Update board if it changed
      if (JSON.stringify(newBoard) !== previousBoard) {
        this.board = newBoard
        this.addNewTile()
        
        // Update best score
        if (this.score > this.bestScore) {
          this.bestScore = this.score
          localStorage.setItem('2048_best_score', this.bestScore.toString())
        }
        
        // Check for game over
        if (!this.canMove()) {
          this.isGameOver = true
        }
      }
    },
    processRow(row) {
      // Remove zeros
      let newRow = row.filter(cell => cell !== 0)
      
      // Merge tiles
      for (let i = 0; i < newRow.length - 1; i++) {
        if (newRow[i] === newRow[i + 1]) {
          newRow[i] *= 2
          this.score += newRow[i]
          newRow.splice(i + 1, 1)
        }
      }
      
      // Add zeros back
      while (newRow.length < this.size) {
        newRow.push(0)
      }
      
      return newRow
    },
    rotateBoard(board) {
      const newBoard = Array(this.size).fill().map(() => Array(this.size).fill(0))
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          newBoard[i][j] = board[this.size - 1 - j][i]
        }
      }
      return newBoard
    },
    canMove() {
      // Check for empty cells
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          if (this.board[i][j] === 0) return true
        }
      }
      
      // Check for possible merges
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          const current = this.board[i][j]
          
          // Check right neighbor
          if (j < this.size - 1 && current === this.board[i][j + 1]) return true
          
          // Check bottom neighbor
          if (i < this.size - 1 && current === this.board[i + 1][j]) return true
        }
      }
      
      return false
    },
    resetGame() {
      this.initGame()
      this.$refs.board.focus()
    },
    handleTouchStart(event) {
      if (this.isGameOver) return
      this.touchStart = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      }
    },
    handleTouchEnd(event) {
      if (!this.touchStart || this.isGameOver) return
      
      this.touchEnd = {
        x: event.changedTouches[0].clientX,
        y: event.changedTouches[0].clientY
      }
      
      const deltaX = this.touchEnd.x - this.touchStart.x
      const deltaY = this.touchEnd.y - this.touchStart.y
      
      // Minimum swipe distance to trigger move
      const minSwipeDistance = 30
      
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (Math.abs(deltaX) > minSwipeDistance) {
          if (deltaX > 0) {
            this.move('ArrowRight')
          } else {
            this.move('ArrowLeft')
          }
        }
      } else {
        // Vertical swipe
        if (Math.abs(deltaY) > minSwipeDistance) {
          if (deltaY > 0) {
            this.move('ArrowDown')
          } else {
            this.move('ArrowUp')
          }
        }
      }
      
      this.touchStart = null
      this.touchEnd = null
    }
  }
}
</script>

<style scoped>
.game-container {
  background: var(--color-bg-charcoal, #2b2b2b);
  border-radius: 4px;
  padding: 2rem;
  max-width: 480px;
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

.game-header h2 {
  color: var(--color-teal, #43C6C3);
  margin-bottom: 0.5rem;
  text-shadow: 0 0 10px var(--color-teal, #43C6C3);
  text-transform: uppercase;
  letter-spacing: 3px;
  font-family: var(--font-retro, 'VT323', monospace);
}

.game-status {
  display: flex;
  justify-content: center;
  gap: 2rem;
  color: var(--color-gold, #F2C749);
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 5px var(--color-gold, #F2C749);
}

.game-board {
  display: grid;
  gap: 0.5rem;
  background: var(--color-bg-dark, #1a1a1a);
  padding: 0.5rem;
  border-radius: 2px;
  margin-bottom: 2rem;
  aspect-ratio: 1;
  outline: none;
  position: relative;
  transition: all 0.15s ease-in-out;
  touch-action: none;
  border: 2px solid var(--color-teal, #43C6C3);
  box-shadow: inset 0 0 10px rgba(67, 198, 195, 0.2);
}

.tile {
  aspect-ratio: 1;
  background: var(--color-bg-charcoal, #2b2b2b);
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-bg-dark, #1a1a1a);
  transition: all 0.15s ease-in-out;
  position: relative;
  animation: tile-appear 0.2s ease-in-out;
  font-family: var(--font-retro, 'VT323', monospace);
  border: 1px solid var(--color-bg-dark, #1a1a1a);
}

@keyframes tile-appear {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.tile-active {
  animation: pop 0.15s ease-in-out;
  z-index: 1;
}

@keyframes pop {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.tile-merged {
  animation: merge 0.2s ease-in-out;
}

@keyframes merge {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.tile-new {
  animation: tile-appear 0.2s ease-in-out;
}

.tile-2 {
  background: var(--color-brown, #804D37);
  color: var(--color-cream, #F5F4ED);
  box-shadow: 0 0 5px var(--color-brown, #804D37);
}
.tile-4 {
  background: var(--color-brown, #804D37);
  color: var(--color-cream, #F5F4ED);
  box-shadow: 0 0 8px var(--color-brown, #804D37);
  filter: brightness(1.1);
}
.tile-8 {
  background: var(--color-gold, #F2C749);
  color: var(--color-bg-dark, #1a1a1a);
  box-shadow: 0 0 10px var(--color-gold, #F2C749);
}
.tile-16 {
  background: var(--color-gold, #F2C749);
  color: var(--color-bg-dark, #1a1a1a);
  box-shadow: 0 0 12px var(--color-gold, #F2C749);
  filter: brightness(1.1);
}
.tile-32 {
  background: var(--color-orange, #F75A33);
  color: var(--color-cream, #F5F4ED);
  box-shadow: 0 0 15px var(--color-orange, #F75A33);
}
.tile-64 {
  background: var(--color-orange, #F75A33);
  color: var(--color-cream, #F5F4ED);
  box-shadow: 0 0 18px var(--color-orange, #F75A33);
  filter: brightness(1.15);
}
.tile-128 {
  background: var(--color-teal, #43C6C3);
  color: var(--color-bg-dark, #1a1a1a);
  box-shadow: 0 0 20px var(--color-teal, #43C6C3);
  font-size: 1.3rem;
}
.tile-256 {
  background: var(--color-teal, #43C6C3);
  color: var(--color-bg-dark, #1a1a1a);
  box-shadow: 0 0 22px var(--color-teal, #43C6C3);
  font-size: 1.3rem;
  filter: brightness(1.2);
}
.tile-512 {
  background: var(--color-gold, #F2C749);
  color: var(--color-bg-dark, #1a1a1a);
  box-shadow: 0 0 25px var(--color-gold, #F2C749);
  font-size: 1.3rem;
  filter: brightness(1.3);
}
.tile-1024 {
  background: var(--color-orange, #F75A33);
  color: var(--color-cream, #F5F4ED);
  box-shadow: 0 0 30px var(--color-orange, #F75A33);
  font-size: 1.1rem;
  animation: pulse-glow 1s infinite;
}
.tile-2048 {
  background: var(--color-teal, #43C6C3);
  color: var(--color-bg-dark, #1a1a1a);
  box-shadow: 0 0 35px var(--color-teal, #43C6C3);
  font-size: 1.1rem;
  animation: pulse-glow 1s infinite;
}

@keyframes pulse-glow {
  0%, 100% { filter: brightness(1.2); }
  50% { filter: brightness(1.5); }
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
  gap: 1rem;
  justify-content: center;
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

.game-instructions {
  color: var(--color-cream, #F5F4ED);
  font-size: 1rem;
  margin-top: 0.5rem;
}

.controls-guide {
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
}

.control-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.key {
  background: var(--color-bg-charcoal, #2b2b2b);
  border: 2px solid var(--color-teal, #43C6C3);
  padding: 0.3rem 0.6rem;
  border-radius: 0;
  font-size: 0.8rem;
  color: var(--color-teal, #43C6C3);
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
  z-index: 100;
  backdrop-filter: blur(4px);
}

.game-over-content {
  text-align: center;
  padding: 2rem;
  background: var(--color-bg-charcoal, #2b2b2b);
  border-radius: 0;
  border: 2px solid var(--color-orange, #F75A33);
  box-shadow: 0 0 20px rgba(247, 90, 51, 0.5);
  min-width: 280px;
}

.game-over-content h3 {
  color: var(--color-orange, #F75A33);
  font-size: 2rem;
  margin-bottom: 1rem;
  text-shadow: 0 0 10px var(--color-orange, #F75A33);
  text-transform: uppercase;
  letter-spacing: 3px;
  font-family: var(--font-retro, 'VT323', monospace);
}

.final-score {
  color: var(--color-gold, #F2C749);
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 5px var(--color-gold, #F2C749);
}

.best-score {
  color: var(--color-teal, #43C6C3);
  font-size: 1.2rem;
  margin-bottom: 2rem;
  text-shadow: 0 0 5px var(--color-teal, #43C6C3);
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

@media (max-width: 768px) {
  .game-container {
    padding: 1rem;
  }

  .game-header h2 {
    font-size: 1.5rem;
  }

  .game-status {
    font-size: 1rem;
    gap: 1rem;
  }

  .tile {
    font-size: 1.2rem;
  }

  .tile-128,
  .tile-256,
  .tile-512 {
    font-size: 1rem;
  }

  .tile-1024,
  .tile-2048 {
    font-size: 0.9rem;
  }

  .game-over-content h3 {
    font-size: 1.5rem;
  }

  .final-score {
    font-size: 1.2rem;
  }

  .best-score {
    font-size: 1rem;
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

@media (max-width: 480px) {
  .game-container {
    padding: 0.75rem;
  }

  .game-header h2 {
    font-size: 1.3rem;
  }

  .game-status {
    font-size: 0.9rem;
    gap: 0.8rem;
  }

  .tile {
    font-size: 1rem;
  }

  .tile-128,
  .tile-256,
  .tile-512 {
    font-size: 0.85rem;
  }

  .tile-1024,
  .tile-2048 {
    font-size: 0.75rem;
  }

  .direction-button {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.3rem;
  }

  .game-board {
    margin-bottom: 1.5rem;
  }
}
</style> 