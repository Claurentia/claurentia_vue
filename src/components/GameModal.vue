<template>
  <div class="modal-backdrop" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <component :is="currentGame" @close="$emit('close')" />
    </div>
  </div>
</template>

<script>
import TicTacToe from '../games/TicTacToe/TicTacToe.vue'
import SnakeGame from '../games/Snake/Snake.vue'
import TwentyFortyEight from '../games/2048/Game2048.vue'

export default {
  name: 'GameModal',
  components: {
    TicTacToe,
    SnakeGame,
    TwentyFortyEight
  },
  props: {
    gameName: {
      type: String,
      required: true
    }
  },
  computed: {
    currentGame() {
      const games = {
        'Tic Tac Toe': 'TicTacToe',
        'Snake': 'SnakeGame',
        '2048': 'TwentyFortyEight'
      }
      return games[this.gameName]
    }
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  overflow-y: auto;
}

.modal-content {
  width: 100%;
  max-width: 800px;
  max-height: calc(100vh - 2rem);
  margin: auto;
  animation: modal-in 0.3s ease-out;
  overflow-y: auto;
}

@keyframes modal-in {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Tablet responsive */
@media (max-width: 1024px) {
  .modal-content {
    max-width: 700px;
  }
}

@media (max-width: 768px) {
  .modal-backdrop {
    padding: 0.5rem;
  }

  .modal-content {
    max-width: 100%;
    max-height: calc(100vh - 1rem);
  }
}

/* Mobile responsive */
@media (max-width: 480px) {
  .modal-backdrop {
    padding: 0.25rem;
    align-items: flex-start;
  }

  .modal-content {
    max-height: calc(100vh - 0.5rem);
    margin-top: 0.25rem;
  }
}

/* Landscape mobile */
@media (max-height: 600px) and (orientation: landscape) {
  .modal-backdrop {
    align-items: flex-start;
    padding: 0.5rem;
  }

  .modal-content {
    max-height: calc(100vh - 1rem);
    margin: 0.5rem auto;
  }
}
</style> 