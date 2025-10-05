<template>
  <div class="minigames-container" id="minigames">
    <div class="arcade-header">
      <div class="header-line"></div>
      <h2 class="section-title glow-text">[ ARCADE.SYS ]</h2>
      <div class="header-line"></div>
    </div>

    <div class="insert-coin">
      <span class="coin-icon">◉</span>
      <span class="coin-text">INSERT_COIN_TO_CONTINUE</span>
      <span class="coin-icon blink">◉</span>
    </div>

    <div class="minigames-grid">
      <div class="game-card" v-for="(game, index) in games" :key="index" @click="playGame(game)">
        <div class="game-terminal">
          <div class="terminal-top">
            <span class="game-number">{{ 'GAME_' + (index + 1).toString().padStart(2, '0') }}</span>
            <span class="game-status">[ READY ]</span>
          </div>
          
          <div class="game-icon" v-html="game.icon"></div>
        </div>

        <div class="game-content">
          <h3 class="game-title">{{ game.title.toUpperCase() }}</h3>
          <p class="game-desc">
            <span class="desc-arrow">></span> {{ game.description }}
          </p>
          <button class="play-button">
            <span class="play-bracket">[</span> EXECUTE <span class="play-bracket">]</span>
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
          // MODIFIED: Whitespace and newlines trimmed from string
          icon: `<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2" stroke="rgba(163, 255, 187, 0.4)" fill="none"/><line x1="9" y1="3" x2="9" y2="21" stroke="rgba(163, 255, 187, 0.4)" stroke-dasharray="2,2"/><line x1="15" y1="3" x2="15" y2="21" stroke="rgba(163, 255, 187, 0.4)" stroke-dasharray="2,2"/><line x1="3" y1="9" x2="21" y2="9" stroke="rgba(163, 255, 187, 0.4)" stroke-dasharray="2,2"/><line x1="3" y1="15" x2="21" y2="15" stroke="rgba(163, 255, 187, 0.4)" stroke-dasharray="2,2"/><path d="M5 5l2.5 2.5M7.5 5L5 7.5" stroke="rgba(163, 255, 187, 0.9)" stroke-width="1"/><circle cx="12" cy="12" r="1.5" stroke="rgba(163, 255, 187, 0.9)" fill="none"/><path d="M16.5 16.5l2.5 2.5M19 16.5l-2.5 2.5" stroke="rgba(163, 255, 187, 0.9)" stroke-width="1"/></svg>`
        },
        {
          title: 'Snake',
          description: 'Guide the snake to eat food and grow longer, but don\'t hit the walls or yourself! A classic arcade game that tests your reflexes.',
          // MODIFIED: Whitespace and newlines trimmed from string
          icon: `<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="1" stroke="rgba(163, 255, 187, 0.4)" fill="none"/><path d="M7 17 L7 13 L11 13 L11 11 L15 11 L15 13" stroke="rgba(163, 255, 187, 0.9)" stroke-width="1.2" fill="none" stroke-linecap="square" stroke-linejoin="round"/><circle cx="7" cy="17" r="1.2" fill="rgba(163, 255, 187, 0.9)"/><circle cx="16" cy="8" r="0.8" fill="rgba(163, 255, 187, 0.6)"/></svg>`
        },
        {
          title: '2048',
          description: 'Combine matching numbers to reach 2048! A addictive puzzle game that challenges your strategic thinking.',
          // MODIFIED: Whitespace and newlines trimmed from string
          icon: `<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2" stroke="rgba(163, 255, 187, 0.4)" fill="none"/><rect x="5" y="5" width="6" height="6" rx="1" fill="rgba(163, 255, 187, 0.1)"/><text x="8" y="9.5" font-size="4" fill="rgba(163, 255, 187, 0.9)" text-anchor="middle" font-family="sans-serif">2</text><rect x="13" y="5" width="6" height="6" rx="1" fill="rgba(163, 255, 187, 0.2)"/><text x="16" y="9.5" font-size="4" fill="rgba(163, 255, 187, 0.9)" text-anchor="middle" font-family="sans-serif">4</text><rect x="5" y="13" width="6" height="6" rx="1" fill="rgba(163, 255, 187, 0.3)"/><text x="8" y="17.5" font-size="4" fill="rgba(163, 255, 187, 0.9)" text-anchor="middle" font-family="sans-serif">8</text><rect x="13" y="13" width="6" height="6" rx="1" fill="rgba(163, 255, 187, 0.4)"/><text x="16" y="17.5" font-size="3.5" fill="rgba(163, 255, 187, 0.9)" text-anchor="middle" font-family="sans-serif">16</text></svg>`
        },
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
  padding: 10rem 2rem 4rem;
  background:
    radial-gradient(circle at 20% 50%, var(--color-bg-charcoal) 0%, transparent 50%),
    radial-gradient(circle at 80% 50%, var(--color-bg-charcoal) 0%, transparent 50%),
    var(--color-bg-dark);
}

/* Arcade Header */
.arcade-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.header-line {
  flex: 1;
  height: 2px;
  background: linear-gradient(
    to right,
    transparent,
    var(--color-terminal-green),
    transparent
  );
  box-shadow: 0 0 10px var(--color-terminal-green);
}

.section-title {
  font-family: var(--font-retro);
  color: var(--color-terminal-green);
  font-size: 2.5rem;
  letter-spacing: 5px;
  white-space: nowrap;
}

/* Insert Coin Message */
.insert-coin {
  text-align: center;
  font-family: var(--font-mono);
  color: var(--color-neon-orange);
  font-size: 1.2rem;
  margin-bottom: 3rem;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.coin-icon {
  color: var(--color-amber);
  font-size: 1.5rem;
}

.coin-icon.blink {
  animation: blink 1.5s infinite;
}

.minigames-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

/* Game Card */
.game-card {
  background: var(--color-bg-dark);
  border: 3px solid var(--color-terminal-green);
  box-shadow:
    0 0 15px rgba(0, 255, 65, 0.2),
    inset 0 0 20px rgba(0, 0, 0, 0.9);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  overflow: hidden;
}

.game-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow:
    0 0 30px rgba(0, 255, 65, 0.4),
    inset 0 0 20px rgba(0, 0, 0, 0.9);
}

/* Game Terminal */
.game-terminal {
  background: var(--color-bg-charcoal);
  border-bottom: 2px solid var(--color-terminal-green);
}

.terminal-top {
  display: flex;
  justify-content: space-between;
  padding: 0.8rem 1rem;
  border-bottom: 1px solid var(--color-earth-olive);
  font-family: var(--font-mono);
  font-size: 0.8rem;
}

.game-number {
  color: var(--color-neon-orange);
  letter-spacing: 1px;
}

.game-status {
  color: var(--color-terminal-green);
  text-shadow: 0 0 5px var(--color-terminal-green);
}

.game-icon {
  width: 100%;
  aspect-ratio: 16/9;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 4px,
      rgba(0, 255, 65, 0.02) 4px,
      rgba(0, 255, 65, 0.02) 8px
    );
  padding: 2rem;
}

.game-icon > :deep(svg) {
  width: min(100%, 120px);
  height: 120px;
  filter: drop-shadow(0 0 10px rgba(0, 255, 65, 0.5));
  transition: transform 0.3s ease;
  transform: translateX(-24px);
}

.game-card:hover .game-icon > :deep(svg) {
  transform: scale(1.15) rotate(5deg);
  filter: drop-shadow(0 0 15px var(--color-terminal-green));
}

/* Game Content */
.game-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  font-family: var(--font-mono);
}

.game-title {
  color: var(--color-terminal-green);
  margin: 0 0 1rem 0;
  font-size: 1.3rem;
  font-family: var(--font-retro);
  letter-spacing: 2px;
  text-shadow: 0 0 5px var(--color-terminal-green);
}

.game-desc {
  color: var(--color-terminal-green);
  margin-bottom: 1.5rem;
  line-height: 1.8;
  flex-grow: 1;
  font-size: 0.85rem;
}

.desc-arrow {
  color: var(--color-neon-orange);
  margin-right: 0.5rem;
}

.play-button {
  background: var(--color-bg-charcoal);
  border: 2px solid var(--color-terminal-green);
  color: var(--color-terminal-green);
  padding: 0.8rem 1.5rem;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.1s ease;
  letter-spacing: 2px;
}

.play-button:hover {
  background: var(--color-terminal-green);
  color: var(--color-bg-dark);
  box-shadow: 0 0 20px var(--color-terminal-green);
  transform: translateY(-2px);
}

.play-button:active {
  transform: translateY(1px);
}

.play-bracket {
  color: var(--color-neon-orange);
  font-weight: bold;
}

/* Responsive */
@media (max-width: 768px) {
  .minigames-container {
    padding: 8rem 1rem 2rem;
  }

  .arcade-header {
    gap: 1rem;
  }

  .section-title {
    font-size: 1.8rem;
    letter-spacing: 3px;
  }

  .insert-coin {
    font-size: 0.9rem;
    flex-direction: column;
    gap: 0.5rem;
  }

  .minigames-grid {
    grid-template-columns: 1fr;
  }
}
</style>