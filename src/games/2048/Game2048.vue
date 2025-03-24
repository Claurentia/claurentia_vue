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
  display: flex;
  justify-content: center;
  gap: 2rem;
  color: rgba(163, 255, 187, 0.9);
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.game-board {
  display: grid;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  aspect-ratio: 1;
  outline: none;
  position: relative;
  transition: all 0.15s ease-in-out;
  touch-action: none; /* Prevent browser default touch actions */
}

.tile {
  aspect-ratio: 1;
  background: rgba(1, 0, 18, 0.95);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.9);
  transition: all 0.15s ease-in-out;
  position: relative;
  animation: tile-appear 0.2s ease-in-out;
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

.tile-2 { background: rgba(163, 255, 187, 0.1); }
.tile-4 { background: rgba(163, 255, 187, 0.2); }
.tile-8 { background: rgba(163, 255, 187, 0.3); }
.tile-16 { background: rgba(163, 255, 187, 0.4); }
.tile-32 { background: rgba(163, 255, 187, 0.5); }
.tile-64 { background: rgba(163, 255, 187, 0.6); }
.tile-128 { 
  background: rgba(163, 255, 187, 0.7);
  font-size: 1.3rem;
}
.tile-256 { 
  background: rgba(163, 255, 187, 0.8);
  font-size: 1.3rem;
}
.tile-512 { 
  background: rgba(163, 255, 187, 0.9);
  font-size: 1.3rem;
}
.tile-1024 { 
  background: rgba(115, 255, 160, 0.9);
  font-size: 1.1rem;
}
.tile-2048 { 
  background: rgba(36, 243, 200, 0.9);
  font-size: 1.1rem;
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

.game-instructions {
  color: rgba(163, 255, 187, 0.9);
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
  background: rgba(163, 255, 187, 0.1);
  border: 1px solid rgba(163, 255, 187, 0.3);
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.game-over-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(1, 0, 18, 0.98);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease-out;
  border-radius: 15px;
  z-index: 100;
  backdrop-filter: blur(4px);
}

.game-over-content {
  text-align: center;
  padding: 2rem;
  background: rgba(1, 0, 18, 0.95);
  border-radius: 15px;
  border: 1px solid rgba(163, 255, 187, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  min-width: 280px;
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
  margin-bottom: 0.5rem;
}

.best-score {
  color: rgba(163, 255, 187, 0.7);
  font-size: 1.2rem;
  margin-bottom: 2rem;
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
}
</style> 