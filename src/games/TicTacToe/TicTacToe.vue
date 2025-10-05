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
  background: var(--color-bg-charcoal, #2b2b2b);
  border-radius: 4px;
  padding: 2rem;
  max-width: 400px;
  margin: 0 auto;
  box-shadow: 0 0 20px rgba(67, 198, 195, 0.3);
  border: 2px solid var(--color-teal, #43C6C3);
  font-family: var(--font-mono, 'Share Tech Mono', monospace);
}

.game-header {
  text-align: center;
  margin-bottom: 2rem;
}

.game-header h2 {
  color: var(--color-teal, #43C6C3);
  margin-bottom: 1rem;
  text-shadow: 0 0 10px var(--color-teal, #43C6C3);
  text-transform: uppercase;
  letter-spacing: 3px;
  font-family: var(--font-retro, 'VT323', monospace);
}

.game-status {
  color: var(--color-gold, #F2C749);
  font-size: 1.2rem;
  text-shadow: 0 0 5px var(--color-gold, #F2C749);
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
  background: var(--color-bg-dark, #1a1a1a);
  border: 2px solid var(--color-teal, #43C6C3);
  border-radius: 0;
  color: var(--color-cream, #F5F4ED);
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.1s;
  font-family: var(--font-retro, 'VT323', monospace);
  text-shadow: 0 0 8px currentColor;
}

.board-cell:not(:disabled):hover {
  background: var(--color-teal, #43C6C3);
  color: var(--color-bg-dark, #1a1a1a);
  box-shadow: 0 0 15px var(--color-teal, #43C6C3);
}

.board-cell:not(:disabled):active {
  transform: translateY(2px);
}

.board-cell:disabled {
  cursor: not-allowed;
  opacity: 0.9;
}

.board-cell.x {
  color: var(--color-orange, #F75A33);
  text-shadow: 0 0 10px var(--color-orange, #F75A33);
}

.board-cell.o {
  color: var(--color-teal, #43C6C3);
  text-shadow: 0 0 10px var(--color-teal, #43C6C3);
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

/* Responsive styles */
@media (max-width: 768px) {
  .game-container {
    padding: 1.5rem;
  }

  .game-header h2 {
    font-size: 1.5rem;
  }

  .game-status {
    font-size: 1rem;
  }

  .board-cell {
    font-size: 1.8rem;
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
    padding: 1rem;
  }

  .game-header h2 {
    font-size: 1.3rem;
  }

  .board-cell {
    font-size: 1.5rem;
  }

  .board-row {
    gap: 0.4rem;
  }

  .game-board {
    gap: 0.4rem;
  }
}
</style> 