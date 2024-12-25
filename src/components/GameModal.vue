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

export default {
  name: 'GameModal',
  components: {
    TicTacToe,
    SnakeGame
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
        'Snake': 'SnakeGame'
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
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  width: 100%;
  max-width: 800px;
  margin: 2rem;
  animation: modal-in 0.3s ease-out;
}

@keyframes modal-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .modal-content {
    margin: 1rem;
  }
}
</style> 