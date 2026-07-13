<template>
  <div class="minigames-container" id="minigames">
    <div class="arcade-header">
      <div class="header-line"></div>
      <h2 class="section-title glow-text">[ ARCADE.SYS ]</h2>
      <div class="header-line"></div>
    </div>

    <p class="boot-line">
      <span class="prompt">SYS&gt;</span> LOADING ARCADE PROCESSES... <span class="blink-cursor">_</span>
    </p>

    <div class="minigames-grid">
      <div class="game-card" v-for="(game, index) in games" :key="index" @click="playGame(game)">
        <div class="game-icon" v-html="game.icon"></div>

        <div class="game-content">
          <div class="game-meta">
            <span class="game-number">{{ './' + game.title.toLowerCase().replace(/\s+/g, '_') }}</span>
            <h3 class="game-title">{{ game.title.toUpperCase() }}</h3>
          </div>
          <p class="game-desc">{{ game.description }}</p>
          <button class="play-button">
            <span class="play-bracket">[</span> RUN <span class="play-bracket">]</span>
          </button>
        </div>
      </div>
    </div>

    <GameModal 
      v-if="activeGame"
      :gameComponent="activeGame.component"
      :title="activeGame.title"
      @close="activeGame = null"
    />
  </div>
</template>

<script>
import GameModal from '../components/GameModal.vue'
import games from '@/data/games'

export default {
  name: 'MinigamesPage',
  components: {
    GameModal
  },
  data() {
    return {
      activeGame: null,
      games
    }
  },
  methods: {
    playGame(game) {
      this.activeGame = game
    }
  }
}
</script>

<style scoped>
.minigames-container {
  min-height: 100dvh;
  padding: calc(var(--nav-height) + 2rem) 2rem var(--section-bottom-padding);
  background:
    repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 18px,
      rgba(247, 90, 51, 0.07) 18px,
      rgba(247, 90, 51, 0.07) 19px
    ),
    radial-gradient(ellipse 70% 40% at 50% 100%, rgba(247, 90, 51, 0.14) 0%, transparent 70%),
    var(--color-bg-dark);
  background-size: 100% 100%, 100% 100%, 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Arcade Header */
.arcade-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 0.75rem;
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
  margin: 0;
}

/* Boot line (matches CareerPage style) */
.boot-line {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-terminal-green);
  opacity: 0.55;
  text-align: center;
  margin: 0 0 2.5rem;
  letter-spacing: 0.05em;
}

.prompt {
  color: var(--color-neon-orange);
}

.blink-cursor {
  animation: blink 1s step-end infinite;
}

.minigames-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

/* Game Card */
.game-card {
  background: var(--color-bg-dark);
  border: 2px solid var(--color-terminal-green);
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
  border-color: var(--color-neon-teal);
  box-shadow:
    0 0 25px rgba(0, 255, 65, 0.35),
    inset 0 0 20px rgba(0, 0, 0, 0.9);
  transform: translateY(-4px);
}

.game-icon {
  width: 100%;
  aspect-ratio: 16/7;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-charcoal);
  border-bottom: 1px solid var(--color-earth-olive);
  background-image:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 4px,
      rgba(0, 255, 65, 0.02) 4px,
      rgba(0, 255, 65, 0.02) 8px
    );
  padding: 0.75rem;
  box-sizing: border-box;
}

.game-icon > :deep(svg) {
  width: min(100%, 72px);
  height: 72px;
  display: block;
  margin: 0 auto;
  filter: drop-shadow(0 0 8px rgba(0, 255, 65, 0.5));
  transition: transform 0.3s ease;
}

.game-card:hover .game-icon > :deep(svg) {
  transform: scale(1.1) rotate(4deg);
  filter: drop-shadow(0 0 12px var(--color-terminal-green));
}

/* Game Content */
.game-content {
  padding: 1.1rem 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  font-family: var(--font-mono);
}

.game-meta {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-bottom: 0.7rem;
}

.game-number {
  color: var(--color-neon-orange);
  font-size: 0.7rem;
  letter-spacing: 0.5px;
  opacity: 0.8;
}

.game-title {
  color: var(--color-terminal-green);
  margin: 0;
  font-size: 1.15rem;
  font-family: var(--font-retro);
  letter-spacing: 1.5px;
  text-shadow: 0 0 5px var(--color-terminal-green);
}

.game-desc {
  color: var(--color-terminal-green);
  opacity: 0.85;
  margin: 0 0 1.1rem;
  line-height: 1.6;
  flex-grow: 1;
  font-size: 0.8rem;
}

.play-button {
  background: var(--color-bg-charcoal);
  border: 1px solid var(--color-terminal-green);
  color: var(--color-terminal-green);
  padding: 0.6rem 1.25rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
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
    padding: calc(var(--nav-height) + 1rem) 1rem var(--section-bottom-padding);
  }

  .arcade-header {
    gap: 0.75rem;
  }

  .section-title {
    font-size: 1.5rem;
    letter-spacing: 2px;
  }

  .minigames-grid {
    grid-template-columns: 1fr;
    gap: 1.1rem;
    padding: 0.5rem 0;
  }
}

@media (max-width: 480px) {
  .minigames-container {
    padding: calc(var(--nav-height) + 0.75rem) 0.75rem calc(var(--footer-safe-height) + 1.5rem);
  }

  .boot-line {
    font-size: 0.65rem;
    margin-bottom: 1.5rem;
  }

  .game-icon {
    aspect-ratio: 16/6;
  }

  .game-icon > :deep(svg) {
    width: min(100%, 56px);
    height: 56px;
  }

  .game-content {
    padding: 0.9rem 1rem;
  }

  .game-title {
    font-size: 1.05rem;
  }

  .game-desc {
    font-size: 0.75rem;
    margin-bottom: 0.9rem;
  }

  .play-button {
    width: 100%;
  }
}
</style>
