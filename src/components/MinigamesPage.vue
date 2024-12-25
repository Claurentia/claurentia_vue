<template>
  <div class="minigames-container" id="minigames">
    <h2 class="section-title">Minigames</h2>
    <div class="minigames-grid">
      <div class="game-card" v-for="(game, index) in games" :key="index" @click="playGame(game)">
        <div class="game-icon">
          <img :src="game.icon" :alt="game.title">
        </div>
        <div class="game-content">
          <h3>{{ game.title }}</h3>
          <p>{{ game.description }}</p>
          <button class="play-button">
            Play Now
          </button>
        </div>
      </div>
    </div>

    <GameModal 
      v-if="activeGame"
      :gameName="activeGame"
      @close="activeGame = null"
    />
  </div>
</template>

<script>
import GameModal from './GameModal.vue'

export default {
  name: 'MinigamesPage',
  components: {
    GameModal
  },
  data() {
    return {
      activeGame: null,
      games: [
        {
          title: 'Tic Tac Toe',
          description: 'Classic game of X\'s and O\'s. Challenge the computer or play with a friend in this timeless strategy game.',
          icon: '../assets/tictactoe-icon.png',
        },
        {
          title: 'Snake',
          description: 'Guide the snake to eat food and grow longer, but don\'t hit the walls or yourself! A classic arcade game that tests your reflexes.',
          icon: '../assets/snake-icon.png',
        },
        {
          title: '2048',
          description: 'Combine matching numbers to reach 2048! A addictive puzzle game that challenges your strategic thinking.',
          icon: '../assets/2048-icon.png',
        },
        {
          title: 'Memory Match',
          description: 'Find matching pairs of cards in this classic memory game. Test and improve your memory skills!',
          icon: '../assets/memory-icon.png',
        },
        {
          title: 'Tetris',
          description: 'Arrange falling blocks to create complete lines. The ultimate test of spatial awareness and quick thinking.',
          icon: '../assets/tetris-icon.png',
        },
        {
          title: 'Pong',
          description: 'The original arcade classic! Keep the ball in play and score points in this simple yet addictive game.',
          icon: '../assets/pong-icon.png',
        }
      ]
    }
  },
  methods: {
    playGame(game) {
      this.activeGame = game.title
    }
  }
}
</script>

<style scoped>
.minigames-container {
  min-height: 100dvh;
  padding: 6rem 2rem;
  background: linear-gradient(
    to bottom,
    rgba(1, 0, 18, 0.95),
    rgba(28, 36, 54, 0.95) 50%,
    rgba(18, 24, 38, 0.95)
  );
}

.section-title {
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.minigames-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.game-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(163, 255, 187, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.game-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.game-icon {
  width: 100%;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
  padding: 1rem;
}

.game-icon img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.game-content {
  padding: 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
}

.game-content h3 {
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 1rem 0;
  font-size: 1.4rem;
}

.game-content p {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1.5rem;
  line-height: 1.6;
  flex-grow: 1;
}

.play-button {
  background: linear-gradient(
    to right,
    rgba(163, 255, 187, 0.2),
    rgba(115, 255, 160, 0.2)
  );
  border: 1px solid rgba(163, 255, 187, 0.3);
  color: rgba(163, 255, 187, 0.9);
  padding: 0.8rem 2rem;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.play-button:hover {
  background: linear-gradient(
    to right,
    rgba(163, 255, 187, 0.3),
    rgba(115, 255, 160, 0.3)
  );
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .minigames-container {
    padding: 4rem 1rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .minigames-grid {
    grid-template-columns: 1fr;
  }
}
</style> 