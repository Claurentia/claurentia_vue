<template>
  <nav class="navbar">
    <div class="crt-banner">
      <div class="static-noise"></div>
      <div class="cassette-logo">
        <svg viewBox="0 0 100 60" class="cassette-icon">
          <!-- Cassette body -->
          <rect x="5" y="10" width="90" height="45" fill="var(--color-bg-charcoal)" stroke="var(--color-terminal-green)" stroke-width="2"/>
          <!-- Left reel -->
          <circle cx="25" cy="30" r="12" fill="var(--color-bg-dark)" stroke="var(--color-terminal-green)" stroke-width="2"/>
          <circle cx="25" cy="30" r="5" fill="var(--color-terminal-green)"/>
          <!-- Right reel -->
          <circle cx="75" cy="30" r="12" fill="var(--color-bg-dark)" stroke="var(--color-terminal-green)" stroke-width="2"/>
          <circle cx="75" cy="30" r="5" fill="var(--color-terminal-green)"/>
          <!-- Tape -->
          <path d="M 25 30 Q 50 25 75 30" stroke="var(--color-amber)" stroke-width="2" fill="none"/>
          <!-- Label window -->
          <rect x="15" y="15" width="70" height="12" fill="var(--color-bg-dark)" stroke="var(--color-neon-teal)" stroke-width="1"/>
          <!-- Screws -->
          <circle cx="12" cy="15" r="2" fill="var(--color-earth-mustard)"/>
          <circle cx="88" cy="15" r="2" fill="var(--color-earth-mustard)"/>
          <circle cx="12" cy="50" r="2" fill="var(--color-earth-mustard)"/>
          <circle cx="88" cy="50" r="2" fill="var(--color-earth-mustard)"/>
        </svg>
      </div>
      <div class="site-title glow-text">CARMEL.LAURENTIA.SYS</div>
    </div>
    <div class="nav-content">
      <div class="nav-links">
        <button @click="scrollToSection('home')" class="nav-link">
          <span class="nav-bracket">[</span> HOME <span class="nav-bracket">]</span>
        </button>
        <button @click="scrollToSection('projects')" class="nav-link">
          <span class="nav-bracket">[</span> PROJECTS <span class="nav-bracket">]</span>
        </button>
        <button @click="scrollToSection('minigames')" class="nav-link">
          <span class="nav-bracket">[</span> GAMES <span class="nav-bracket">]</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    scrollToSection(sectionId) {
      const mainElement = document.querySelector('main')
      const section = document.getElementById(sectionId)
      if (mainElement && section) {
        const topOffset = section.offsetTop
        mainElement.scrollTo({
          top: topOffset,
          behavior: 'smooth'
        })
      }
    }
  }
}
</script>

<style scoped>
.navbar {
  background: var(--color-bg-charcoal);
  border: 3px solid var(--color-terminal-green);
  border-left: 8px solid var(--color-earth-olive);
  border-right: 8px solid var(--color-earth-olive);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow:
    0 0 20px rgba(0, 255, 65, 0.3),
    inset 0 0 10px rgba(0, 0, 0, 0.5);
}

/* CRT Banner Section */
.crt-banner {
  background: var(--color-bg-dark);
  border-bottom: 2px solid var(--color-terminal-green);
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  position: relative;
  overflow: hidden;
}

.static-noise {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(255, 255, 255, 0.03) 2px,
      rgba(255, 255, 255, 0.03) 4px
    );
  opacity: 0.1;
}

.cassette-logo {
  width: 80px;
  height: 50px;
  filter: drop-shadow(0 0 10px var(--color-terminal-green));
}

.cassette-icon {
  width: 100%;
  height: 100%;
}

.site-title {
  font-family: var(--font-retro);
  font-size: 1.8rem;
  color: var(--color-terminal-green);
  letter-spacing: 3px;
  text-transform: uppercase;
}

/* Navigation Content */
.nav-content {
  padding: 0.8rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    to bottom,
    var(--color-bg-charcoal),
    var(--color-bg-dark)
  );
}

.nav-links {
  display: flex;
  gap: 0;
}

.nav-link {
  background: none;
  border: none;
  color: var(--color-terminal-green);
  font-family: var(--font-mono);
  font-size: 1rem;
  padding: 0.6rem 1.5rem;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  transition: all 0.1s;
  border-right: 1px solid var(--color-earth-olive);
}

.nav-link:first-child {
  border-left: 1px solid var(--color-earth-olive);
}

.nav-bracket {
  color: var(--color-neon-orange);
  font-weight: bold;
}

.nav-link:hover {
  background: var(--color-earth-olive);
  color: var(--color-yellow-highlight);
  box-shadow:
    inset 0 0 10px rgba(0, 0, 0, 0.5),
    0 0 15px var(--color-terminal-green);
}

.nav-link:hover .nav-bracket {
  color: var(--color-yellow-highlight);
  text-shadow: 0 0 10px var(--color-yellow-highlight);
}

.nav-link:active {
  background: var(--color-terminal-green);
  color: var(--color-bg-dark);
  transform: translateY(2px);
}

/* Tabular alignment */
.nav-links::before {
  content: '>';
  color: var(--color-neon-orange);
  font-family: var(--font-mono);
  font-size: 1.2rem;
  padding: 0.6rem 1rem;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

@media (max-width: 768px) {
  .crt-banner {
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.8rem;
  }

  .cassette-logo {
    width: 60px;
    height: 40px;
  }

  .site-title {
    font-size: 1.2rem;
    letter-spacing: 1px;
  }

  .nav-content {
    padding: 0.5rem 0.5rem;
  }

  .nav-links {
    flex-direction: column;
    width: 100%;
  }

  .nav-link {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--color-earth-olive);
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
  }

  .nav-link:first-child {
    border-left: none;
  }

  .nav-links::before {
    display: none;
  }
}
</style>
