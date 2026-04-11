<template>
  <div id="app">
    <header>
      <NavBar @scroll-to="scrollToSection" />
    </header>
    <main ref="mainScroll">
      <HomePage />
      <ProjectsPage />
      <MinigamesPage />
    </main>
    <FooterSection @scroll-to-top="scrollToTop" />
  </div>
</template>

<script>
import HomePage from './views/HomePage.vue'
import NavBar from './components/NavBar.vue'
import ProjectsPage from './views/ProjectsPage.vue'
import MinigamesPage from './views/MinigamesPage.vue'
import FooterSection from './components/FooterSection.vue'

export default {
  name: 'App',
  components: {
    HomePage,
    NavBar,
    ProjectsPage,
    MinigamesPage,
    FooterSection
  },
  methods: {
    scrollToSection(sectionId) {
      const main = this.$refs.mainScroll
      const section = document.getElementById(sectionId)
      if (main && section) {
        main.scrollTo({ top: section.offsetTop, behavior: 'smooth' })
      }
    },
    scrollToTop() {
      const main = this.$refs.mainScroll
      if (main) {
        main.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=VT323&display=swap');

:root {
  /* Primary Palette */
  --color-bg-dark: #1a1a1a;
  --color-bg-charcoal: #2b2b2b;
  --color-brown: #804D37;
  --color-teal: #43C6C3;
  --color-cream: #F5F4ED;
  --color-gold: #F2C749;
  --color-orange: #F75A33;

  /* Semantic aliases (all resolve to primary palette) */
  --color-earth-olive: var(--color-brown);
  --color-earth-mustard: var(--color-gold);
  --color-neon-orange: var(--color-orange);
  --color-neon-teal: var(--color-teal);
  --color-crt-green: var(--color-teal);
  --color-terminal-green: var(--color-teal);
  --color-amber: var(--color-gold);
  --color-red-error: var(--color-orange);
  --color-yellow-highlight: var(--color-gold);
  --color-phosphor-green: var(--color-teal);
  --color-phosphor-amber: var(--color-gold);
  --color-scan-line: rgba(0, 0, 0, 0.1);

  /* Typography */
  --font-mono: 'Share Tech Mono', 'Courier New', monospace;
  --font-retro: 'VT323', monospace;
}

* {
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}

#app {
  font-family: var(--font-mono);
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: grayscale;
  color: var(--color-terminal-green);
  background: var(--color-bg-dark);
  position: relative;
}

/* CRT Scanline Overlay */
#app::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 2px,
    var(--color-scan-line) 2px,
    var(--color-scan-line) 4px
  );
  pointer-events: none;
  z-index: 9999;
  opacity: 0.3;
}

/* CRT Screen Flicker */
#app::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.02);
  pointer-events: none;
  z-index: 9998;
  animation: flicker 0.15s infinite;
}

@keyframes flicker {
  0% { opacity: 0.97; }
  50% { opacity: 1; }
  100% { opacity: 0.97; }
}

@media (prefers-reduced-motion: reduce) {
  #app::after {
    animation: none;
  }
  #app::before {
    animation: none;
  }
  .scan-overlay {
    animation: none;
  }
  .glow-text {
    text-shadow: none;
  }
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  position: relative;
  overscroll-behavior: none;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  background: var(--color-bg-dark);
}

main {
  scroll-snap-type: y mandatory;
  height: 100vh;
  overflow-y: scroll;
  background: var(--color-bg-dark);
}

main > * {
  scroll-snap-align: start;
  scroll-snap-stop: normal;
}

/* Retro Button Styles */
.retro-btn {
  background: var(--color-bg-charcoal);
  border: 2px solid var(--color-terminal-green);
  color: var(--color-terminal-green);
  font-family: var(--font-mono);
  padding: 0.5rem 1rem;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  transition: all 0.1s;
}

.retro-btn:hover {
  background: var(--color-terminal-green);
  color: var(--color-bg-dark);
  box-shadow: 0 0 10px var(--color-terminal-green);
}

.retro-btn:active {
  transform: translateY(2px);
}

/* Shared utility animations */
@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

/* Glowing Text Effect */
.glow-text {
  text-shadow:
    0 0 5px currentColor,
    0 0 10px currentColor,
    0 0 20px currentColor;
}
</style>