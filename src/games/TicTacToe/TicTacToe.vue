<template>
  <div class="game-container">
    <div class="game-header">
      <h2>Tic Tac Toe</h2>
      <div class="game-status">{{ status }}</div>
    </div>
    
    <div class="game-board">
      <div v-for="(row, rowIndex) in board" 
           :key="rowIndex" 
           class="board-row">
        <button v-for="(cell, colIndex) in row" 
                :key="colIndex"
                class="board-cell"
                :class="{ 'x': cell === 'X', 'o': cell === 'O' }"
                @click="makeMove(rowIndex, colIndex)"
                :disabled="cell !== null || winner">
          {{ cell }}
        </button>
      </div>
    </div>

    <div class="game-controls">
      <button class="control-button" @click="resetGame">New Game</button>
      <button class="control-button" @click="$emit('close')">Exit Game</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TicTacToe',
  data() {
    return {
      board: Array(3).fill(null).map(() => Array(3).fill(null)),
      currentPlayer: 'X',
      winner: null,
      isDraw: false
    }
  },
  computed: {
    status() {
      if (this.winner) {
        return `Winner: ${this.winner}!`
      } else if (this.isDraw) {
        return "It's a draw!"
      } else {
        return `Current player: ${this.currentPlayer}`
      }
    }
  },
  methods: {
    makeMove(row, col) {
      if (this.board[row][col] === null && !this.winner) {
        this.board[row][col] = this.currentPlayer
        
        if (this.checkWinner(row, col)) {
          this.winner = this.currentPlayer
        } else if (this.checkDraw()) {
          this.isDraw = true
        } else {
          this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'
        }
      }
    },
    checkWinner(row, col) {
      const lines = [
        // Check row
        [[row, 0], [row, 1], [row, 2]],
        // Check column
        [[0, col], [1, col], [2, col]],
        // Check diagonals
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
      ]

      return lines.some(line => {
        const [a, b, c] = line
        return this.board[a[0]][a[1]] === this.currentPlayer &&
               this.board[b[0]][b[1]] === this.currentPlayer &&
               this.board[c[0]][c[1]] === this.currentPlayer
      })
    },
    checkDraw() {
      return this.board.every(row => row.every(cell => cell !== null))
    },
    resetGame() {
      this.board = Array(3).fill(null).map(() => Array(3).fill(null))
      this.currentPlayer = 'X'
      this.winner = null
      this.isDraw = false
    }
  }
}
</script>

<style scoped>
.game-container {
  background: rgba(1, 0, 18, 0.95);
  border-radius: 15px;
  padding: 2rem;
  max-width: 500px;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(163, 255, 187, 0.1);
  backdrop-filter: blur(8px);
}

.game-header {
  text-align: center;
  margin-bottom: 2rem;
}

.game-header h2 {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1rem;
}

.game-status {
  color: rgba(163, 255, 187, 0.9);
  font-size: 1.2rem;
}

.game-board {
  display: grid;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.board-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.board-cell {
  aspect-ratio: 1;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(163, 255, 187, 0.2);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.board-cell:not(:disabled):hover {
  background: rgba(163, 255, 187, 0.1);
  transform: translateY(-2px);
}

.board-cell:disabled {
  cursor: not-allowed;
  opacity: 0.8;
}

.board-cell.x {
  color: #ff6b6b;
}

.board-cell.o {
  color: #4ecdc4;
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
</style> 