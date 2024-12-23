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
          <div class="game-stats">
            <span class="stat">
              <i class="fas fa-trophy"></i> High Score: {{ game.highScore }}
            </span>
            <span class="stat">
              <i class="fas fa-clock"></i> Best Time: {{ game.bestTime }}
            </span>
          </div>
          <button class="play-button">
            Play Now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MinigamesPage',
  data() {
    return {
      games: [
        {
          title: 'Memory Match',
          description: 'Test your memory by matching pairs of cards in this classic game.',
          icon: '../assets/memory-game-icon.png',
          highScore: 0,
          bestTime: '--:--',
        },
        // Add more games here
      ]
    }
  },
  methods: {
    playGame(game) {
      // Implement game launch logic here
      console.log(`Starting ${game.title}`);
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
    rgba(18, 24, 38, 0.95),
    rgba(28, 36, 54, 0.95)
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
}

.game-stats {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.stat {
  color: rgba(163, 255, 187, 0.9);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

  .game-stats {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style> 