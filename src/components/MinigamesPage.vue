<template>
  <div class="minigames-container" id="minigames">
    <h2 class="section-title">Minigames</h2>
    <div class="minigames-grid">
      <div class="game-card" v-for="(game, index) in games" :key="index" @click="playGame(game)">
        <div class="game-icon">
          <div v-html="game.icon"></div>
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
import { defineComponent } from 'vue'

export default defineComponent({
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
          icon: `
            <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke-width="1">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="rgba(163, 255, 187, 0.4)" fill="none"/>
              <line x1="9" y1="3" x2="9" y2="21" stroke="rgba(163, 255, 187, 0.4)" stroke-dasharray="2,2"/>
              <line x1="15" y1="3" x2="15" y2="21" stroke="rgba(163, 255, 187, 0.4)" stroke-dasharray="2,2"/>
              <line x1="3" y1="9" x2="21" y2="9" stroke="rgba(163, 255, 187, 0.4)" stroke-dasharray="2,2"/>
              <line x1="3" y1="15" x2="21" y2="15" stroke="rgba(163, 255, 187, 0.4)" stroke-dasharray="2,2"/>
              <path d="M5 5l2.5 2.5M7.5 5L5 7.5" stroke="rgba(163, 255, 187, 0.9)" stroke-width="1"/>
              <circle cx="12" cy="12" r="1.5" stroke="rgba(163, 255, 187, 0.9)" fill="none"/>
              <path d="M16.5 16.5l2.5 2.5M19 16.5l-2.5 2.5" stroke="rgba(163, 255, 187, 0.9)" stroke-width="1"/>
            </svg>
          `
        },
        {
          title: 'Snake',
          description: 'Guide the snake to eat food and grow longer, but don\'t hit the walls or yourself! A classic arcade game that tests your reflexes.',
          icon: `
            <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke-width="1">
              <rect x="3" y="3" width="18" height="18" rx="1" stroke="rgba(163, 255, 187, 0.4)" fill="none"/>
              <path d="M7 17 L7 13 L11 13 L11 11 L15 11 L15 13" 
                    stroke="rgba(163, 255, 187, 0.9)" 
                    stroke-width="1.2" 
                    fill="none" 
                    stroke-linecap="square"
                    stroke-linejoin="round"/>
              <circle cx="7" cy="17" r="1.2" fill="rgba(163, 255, 187, 0.9)"/>
              <circle cx="16" cy="8" r="0.8" fill="rgba(163, 255, 187, 0.6)"/>
            </svg>
          `
        },
        {
          title: '2048',
          description: 'Combine matching numbers to reach 2048! A addictive puzzle game that challenges your strategic thinking.',
          icon: `
            <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke-width="1">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="rgba(163, 255, 187, 0.4)" fill="none"/>
            <rect x="5" y="5" width="6" height="6" rx="1" fill="rgba(163, 255, 187, 0.1)"/>
            <text x="8" y="9.5" font-size="4" fill="rgba(163, 255, 187, 0.9)" text-anchor="middle" font-family="sans-serif">2</text>
            <rect x="13" y="5" width="6" height="6" rx="1" fill="rgba(163, 255, 187, 0.2)"/>
            <text x="16" y="9.5" font-size="4" fill="rgba(163, 255, 187, 0.9)" text-anchor="middle" font-family="sans-serif">4</text>
            <rect x="5" y="13" width="6" height="6" rx="1" fill="rgba(163, 255, 187, 0.3)"/>
            <text x="8" y="17.5" font-size="4" fill="rgba(163, 255, 187, 0.9)" text-anchor="middle" font-family="sans-serif">8</text>
            <rect x="13" y="13" width="6" height="6" rx="1" fill="rgba(163, 255, 187, 0.4)"/>
            <text x="16" y="17.5" font-size="3.5" fill="rgba(163, 255, 187, 0.9)" text-anchor="middle" font-family="sans-serif">16</text>
          </svg>
          `
        },
        {
          title: 'Memory Match',
          description: 'Find matching pairs of cards in this classic memory game. Test and improve your memory skills!',
          icon: `
            <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke-width="1">
              <rect x="4" y="4" width="6" height="7" rx="1" stroke="rgba(163, 255, 187, 0.9)" fill="rgba(163, 255, 187, 0.1)"/>
              <path d="M5.5 7.5h3M7 6v3" stroke="rgba(163, 255, 187, 0.9)" stroke-width="0.8"/>
              <rect x="14" y="4" width="6" height="7" rx="1" stroke="rgba(163, 255, 187, 0.9)" fill="rgba(163, 255, 187, 0.1)"/>
              <circle cx="17" cy="7.5" r="1.5" stroke="rgba(163, 255, 187, 0.9)" fill="none"/>
              <rect x="4" y="13" width="6" height="7" rx="1" stroke="rgba(163, 255, 187, 0.9)" fill="rgba(163, 255, 187, 0.1)"/>
              <circle cx="7" cy="16.5" r="1.5" stroke="rgba(163, 255, 187, 0.9)" fill="none"/>
              <rect x="14" y="13" width="6" height="7" rx="1" stroke="rgba(163, 255, 187, 0.9)" fill="rgba(163, 255, 187, 0.1)"/>
              <path d="M15.5 16.5h3M17 15v3" stroke="rgba(163, 255, 187, 0.9)" stroke-width="0.8"/>
            </svg>
          `
        },
        {
          title: 'Tetris',
          description: 'Arrange falling blocks to create complete lines. The ultimate test of spatial awareness and quick thinking.',
          icon: `
            <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke-width="1">
            <rect x="3" y="3" width="18" height="18" stroke="rgba(163, 255, 187, 0.4)" fill="none"/>
            <rect x="7" y="5" width="3" height="3" fill="rgba(163, 255, 187, 0.9)"/>
            <rect x="10" y="5" width="3" height="3" fill="rgba(163, 255, 187, 0.9)"/>
            <rect x="13" y="5" width="3" height="3" fill="rgba(163, 255, 187, 0.9)"/>
            <rect x="10" y="8" width="3" height="3" fill="rgba(163, 255, 187, 0.9)"/>
            <rect x="7" y="13" width="3" height="3" fill="rgba(163, 255, 187, 0.2)"/>
            <rect x="10" y="13" width="3" height="3" fill="rgba(163, 255, 187, 0.2)"/>
            <line x1="3" y1="18" x2="21" y2="18" stroke="rgba(163, 255, 187, 0.4)" stroke-dasharray="2,2"/>
          </svg>
          `
        },
        {
          title: 'Pong',
          description: 'The original arcade classic! Keep the ball in play and score points in this simple yet addictive game.',
          icon: `
            <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke-width="1">
            <rect x="3" y="3" width="18" height="18" stroke="rgba(163, 255, 187, 0.4)" fill="none"/>
            <rect x="4" y="8" width="1.5" height="8" fill="rgba(163, 255, 187, 0.9)"/>
            <rect x="18.5" y="8" width="1.5" height="8" fill="rgba(163, 255, 187, 0.9)"/>
            <circle cx="12" cy="12" r="1" fill="rgba(163, 255, 187, 0.9)"/>
            <path d="M12 12L14 10" stroke="rgba(163, 255, 187, 0.4)" stroke-width="0.8" stroke-dasharray="0.8,0.8"/>
            <text x="8" y="7" font-size="3" fill="rgba(163, 255, 187, 0.4)" font-family="sans-serif">0</text>
            <text x="16" y="7" font-size="3" fill="rgba(163, 255, 187, 0.4)" font-family="sans-serif">0</text>
          </svg>
          `
        }
      ]
    }
  },
  methods: {
    playGame(game) {
      this.activeGame = game.title
    }
  }
})
</script>

<style scoped>
.minigames-container {
  min-height: 100dvh;
  padding: 6rem 2rem;
  background:rgba(18, 24, 38, 0.95)
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
  aspect-ratio: 16/9;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  overflow: hidden;
  box-sizing: border-box;
}

.game-icon > div {
  width: min(100%, 120px);
  aspect-ratio: 1/1;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.game-icon svg {
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
}

.game-card:hover .game-icon svg {
  transform: scale(1.1);
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