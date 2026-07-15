<template>
  <nav class="navbar" aria-label="Main navigation">
    <div class="nav-bar">
      <div class="brand">
        <span class="brand-glyph" aria-hidden="true"><span class="glyph-chevron">&gt;</span><span class="glyph-cursor">_</span></span>
        <h1 class="site-title glow-text">CARMEL.LAURENTIA.SYS</h1>
      </div>

      <!-- Desktop nav -->
      <div class="nav-links desktop-nav">
        <span class="nav-prompt" aria-hidden="true">&gt;</span>
        <a href="#home" @click="scrollToSection($event, 'home')" class="nav-link" :class="{ active: activeSection === 'home' }" :aria-current="activeSection === 'home' ? 'location' : undefined" aria-label="Scroll to Home section">
          <span class="nav-bracket">[</span> HOME <span class="nav-bracket">]</span>
        </a>
        <a href="#projects" @click="scrollToSection($event, 'projects')" class="nav-link" :class="{ active: activeSection === 'projects' }" :aria-current="activeSection === 'projects' ? 'location' : undefined" aria-label="Scroll to Projects section">
          <span class="nav-bracket">[</span> PROJECTS <span class="nav-bracket">]</span>
        </a>
        <a href="#career" @click="scrollToSection($event, 'career')" class="nav-link" :class="{ active: activeSection === 'career' }" :aria-current="activeSection === 'career' ? 'location' : undefined" aria-label="Scroll to Career section">
          <span class="nav-bracket">[</span> CAREER <span class="nav-bracket">]</span>
        </a>
        <a href="#minigames" @click="scrollToSection($event, 'minigames')" class="nav-link" :class="{ active: activeSection === 'minigames' }" :aria-current="activeSection === 'minigames' ? 'location' : undefined" aria-label="Scroll to Games section">
          <span class="nav-bracket">[</span> GAMES <span class="nav-bracket">]</span>
        </a>
      </div>

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

    <!-- Mobile dropdown menu -->
    <div class="mobile-menu" :class="{ open: menuOpen }" :aria-hidden="!menuOpen" :inert="!menuOpen || undefined">
      <a href="#home" @click="scrollToSection($event, 'home')" class="nav-link" :class="{ active: activeSection === 'home' }" :aria-current="activeSection === 'home' ? 'location' : undefined">
        <span class="nav-bracket">[</span> HOME <span class="nav-bracket">]</span>
      </a>
      <a href="#projects" @click="scrollToSection($event, 'projects')" class="nav-link" :class="{ active: activeSection === 'projects' }" :aria-current="activeSection === 'projects' ? 'location' : undefined">
        <span class="nav-bracket">[</span> PROJECTS <span class="nav-bracket">]</span>
      </a>
      <a href="#career" @click="scrollToSection($event, 'career')" class="nav-link" :class="{ active: activeSection === 'career' }" :aria-current="activeSection === 'career' ? 'location' : undefined">
        <span class="nav-bracket">[</span> CAREER <span class="nav-bracket">]</span>
      </a>
      <a href="#minigames" @click="scrollToSection($event, 'minigames')" class="nav-link" :class="{ active: activeSection === 'minigames' }" :aria-current="activeSection === 'minigames' ? 'location' : undefined">
        <span class="nav-bracket">[</span> GAMES <span class="nav-bracket">]</span>
      </a>
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
    const hashSection = window.location.hash.slice(1)
    if (['home', 'projects', 'career', 'minigames'].includes(hashSection)) {
      this.activeSection = hashSection
    }

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
    scrollToSection(event, sectionId) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return
      }

      event.preventDefault()
      this.$emit('scroll-to', sectionId)
      this.activeSection = sectionId
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
  border-bottom: 2px solid var(--color-terminal-green);
  border-left: 4px solid var(--color-earth-olive);
  border-right: 4px solid var(--color-earth-olive);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
}

/* Amber accent line at the very bottom of the navbar */
.navbar::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent 0%,
    var(--color-amber) 20%,
    var(--color-neon-teal) 50%,
    var(--color-amber) 80%,
    transparent 100%
  );
  opacity: 0.5;
}

/* Single-row bar: brand left, nav right */
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.25rem;
  height: calc(var(--nav-height) - 2px);
  gap: 1rem;
}

/* Brand: glyph mark + title */
.brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-shrink: 0;
}

.brand-glyph {
  font-family: var(--font-mono);
  font-weight: bold;
  font-size: 1.4rem;
  line-height: 1;
  flex-shrink: 0;
  display: inline-flex;
  align-items: baseline;
}

.glyph-chevron {
  color: var(--color-neon-orange);
}

.glyph-cursor {
  color: var(--color-terminal-green);
  text-shadow: 0 0 6px var(--color-terminal-green);
}

.site-title {
  font-family: var(--font-retro);
  font-size: 1.25rem;
  color: var(--color-terminal-green);
  letter-spacing: 3px;
  text-transform: uppercase;
  margin: 0;
  white-space: nowrap;
}

/* Desktop nav links */
.nav-links {
  display: flex;
  align-items: center;
  gap: 0;
}

.nav-prompt {
  color: var(--color-neon-orange);
  font-family: var(--font-mono);
  font-size: 1rem;
  padding: 0 0.5rem 0 0;
  animation: blink 1s infinite;
  line-height: 1;
}

.nav-link {
  background: none;
  border: none;
  border-left: 1px solid var(--color-earth-olive);
  color: var(--color-terminal-green);
  font-family: var(--font-mono);
  font-size: 0.85rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-decoration: none;
  transition: background 0.1s, color 0.1s, border-color 0.1s;
  height: calc(var(--nav-height) - 2px);
  display: flex;
  align-items: center;
  gap: 0.2rem;
}

.nav-links .nav-link:last-child {
  border-right: 1px solid var(--color-earth-olive);
}

.nav-bracket {
  color: var(--color-neon-orange);
  font-weight: bold;
}

.nav-link:hover,
.nav-link.active {
  background: var(--color-earth-olive);
  color: var(--color-yellow-highlight);
  border-color: var(--color-earth-olive);
}

.nav-link:hover .nav-bracket,
.nav-link.active .nav-bracket {
  color: var(--color-yellow-highlight);
}

.nav-link:active {
  background: var(--color-terminal-green);
  color: var(--color-bg-dark);
}

/* Hamburger — hidden on desktop */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  background: none;
  border: 1px solid var(--color-terminal-green);
  padding: 6px 8px;
  cursor: pointer;
  flex-shrink: 0;
  width: 38px;
  height: 34px;
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

/* Mobile dropdown */
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
  border-left: none;
  border-bottom: 1px solid var(--color-earth-olive);
  border-right: none;
  text-align: left;
  padding: 0.8rem 1.5rem;
  font-size: 0.9rem;
  height: auto;
}

/* Responsive */
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

  .site-title {
    font-size: 0.95rem;
    letter-spacing: 1px;
  }

  .brand-glyph {
    font-size: 1.1rem;
  }
}
</style>
