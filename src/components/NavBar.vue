<template>
  <nav class="navbar" aria-label="Main navigation">
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

      <!-- Hamburger button — mobile only -->
      <button
        class="hamburger"
        :class="{ open: menuOpen }"
        @click="menuOpen = !menuOpen"
        :aria-expanded="menuOpen"
        aria-label="Toggle navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Desktop nav -->
    <div class="nav-content desktop-nav">
      <div class="nav-links">
        <button @click="scrollToSection('home')" class="nav-link" :class="{ active: activeSection === 'home' }" :aria-current="activeSection === 'home' ? 'page' : undefined" aria-label="Scroll to Home section">
          <span class="nav-bracket">[</span> HOME <span class="nav-bracket">]</span>
        </button>
        <button @click="scrollToSection('projects')" class="nav-link" :class="{ active: activeSection === 'projects' }" :aria-current="activeSection === 'projects' ? 'page' : undefined" aria-label="Scroll to Projects section">
          <span class="nav-bracket">[</span> PROJECTS <span class="nav-bracket">]</span>
        </button>
        <button @click="scrollToSection('career')" class="nav-link" :class="{ active: activeSection === 'career' }" :aria-current="activeSection === 'career' ? 'page' : undefined" aria-label="Scroll to Career section">
          <span class="nav-bracket">[</span> CAREER <span class="nav-bracket">]</span>
        </button>
        <button @click="scrollToSection('minigames')" class="nav-link" :class="{ active: activeSection === 'minigames' }" :aria-current="activeSection === 'minigames' ? 'page' : undefined" aria-label="Scroll to Games section">
          <span class="nav-bracket">[</span> GAMES <span class="nav-bracket">]</span>
        </button>
      </div>
    </div>

    <!-- Mobile dropdown menu -->
    <div class="mobile-menu" :class="{ open: menuOpen }" aria-hidden="!menuOpen">
      <button @click="scrollToSection('home')" class="nav-link" :class="{ active: activeSection === 'home' }" :aria-current="activeSection === 'home' ? 'page' : undefined">
        <span class="nav-bracket">[</span> HOME <span class="nav-bracket">]</span>
      </button>
      <button @click="scrollToSection('projects')" class="nav-link" :class="{ active: activeSection === 'projects' }" :aria-current="activeSection === 'projects' ? 'page' : undefined">
        <span class="nav-bracket">[</span> PROJECTS <span class="nav-bracket">]</span>
      </button>
      <button @click="scrollToSection('career')" class="nav-link" :class="{ active: activeSection === 'career' }" :aria-current="activeSection === 'career' ? 'page' : undefined">
        <span class="nav-bracket">[</span> CAREER <span class="nav-bracket">]</span>
      </button>
      <button @click="scrollToSection('minigames')" class="nav-link" :class="{ active: activeSection === 'minigames' }" :aria-current="activeSection === 'minigames' ? 'page' : undefined">
        <span class="nav-bracket">[</span> GAMES <span class="nav-bracket">]</span>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  emits: ['scroll-to'],
  data() {
    return {
      menuOpen: false,
      activeSection: 'home'
    }
  },
  mounted() {
    const main = document.querySelector('main')
    if (main) {
      main.addEventListener('scroll', this.handleScroll)
    }
  },
  beforeUnmount() {
    const main = document.querySelector('main')
    if (main) {
      main.removeEventListener('scroll', this.handleScroll)
    }
  },
  methods: {
    scrollToSection(sectionId) {
      this.$emit('scroll-to', sectionId)
      this.menuOpen = false
    },
    handleScroll(e) {
      const scrollTop = e.target.scrollTop
      const sections = ['home', 'projects', 'career', 'minigames']
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.offsetTop <= scrollTop + 200) {
          this.activeSection = sections[i]
          break
        }
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
  padding: 0.6rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
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
  pointer-events: none;
}

.cassette-logo {
  width: 64px;
  height: 40px;
  flex-shrink: 0;
  filter: drop-shadow(0 0 10px var(--color-terminal-green));
}

.cassette-icon {
  width: 100%;
  height: 100%;
}

.site-title {
  font-family: var(--font-retro);
  font-size: 1.6rem;
  color: var(--color-terminal-green);
  letter-spacing: 3px;
  text-transform: uppercase;
  flex: 1;
  text-align: center;
}

/* Hamburger — hidden on desktop */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  background: none;
  border: 2px solid var(--color-terminal-green);
  padding: 6px 8px;
  cursor: pointer;
  flex-shrink: 0;
  width: 40px;
  height: 36px;
}

.hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--color-terminal-green);
  transition: all 0.2s ease;
  transform-origin: center;
}

.hamburger.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.hamburger.open span:nth-child(2) {
  opacity: 0;
}
.hamburger.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Navigation Content */
.nav-content {
  padding: 0.6rem 2rem;
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
  font-size: 0.95rem;
  padding: 0.5rem 1.2rem;
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

.nav-link:hover,
.nav-link.active {
  background: var(--color-earth-olive);
  color: var(--color-yellow-highlight);
  box-shadow:
    inset 0 0 10px rgba(0, 0, 0, 0.5),
    0 0 15px var(--color-terminal-green);
}

.nav-link:hover .nav-bracket,
.nav-link.active .nav-bracket {
  color: var(--color-yellow-highlight);
  text-shadow: 0 0 10px var(--color-yellow-highlight);
}

.nav-link:active {
  background: var(--color-terminal-green);
  color: var(--color-bg-dark);
  transform: translateY(2px);
}

/* Blinking cursor before nav links */
.nav-links::before {
  content: '>';
  color: var(--color-neon-orange);
  font-family: var(--font-mono);
  font-size: 1.2rem;
  padding: 0.5rem 0.8rem;
  animation: blink 1s infinite;
}

/* Mobile dropdown — hidden by default */
.mobile-menu {
  display: none;
  flex-direction: column;
  background: var(--color-bg-dark);
  border-top: 1px solid var(--color-earth-olive);
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.25s ease;
}

.mobile-menu .nav-link {
  border-right: none;
  border-bottom: 1px solid var(--color-earth-olive);
  text-align: left;
  padding: 0.8rem 1.5rem;
  font-size: 0.95rem;
}

.mobile-menu .nav-link:first-child {
  border-left: none;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }

  .hamburger {
    display: flex;
  }

  .mobile-menu {
    display: flex;
  }

  .mobile-menu.open {
    max-height: 300px;
  }

  .crt-banner {
    justify-content: space-between;
    padding: 0.5rem 0.8rem;
  }

  .cassette-logo {
    width: 48px;
    height: 32px;
  }

  .site-title {
    font-size: 1rem;
    letter-spacing: 1px;
  }
}
</style>
