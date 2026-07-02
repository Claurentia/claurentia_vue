<template>
  <footer class="footer">
    <div class="status-bar">
      <div class="status-left">
        <span class="status-item hide-mobile">[SESSION_END]</span>
        <span class="status-divider hide-mobile">|</span>
        <span class="status-item">uptime: {{ uptime }}</span>
        <span class="status-divider hide-mobile">|</span>
        <span class="status-item status-ok hide-mobile">status: 200 OK</span>
      </div>
      <div class="status-right">
        <button
          @click="scrollToTop"
          class="scroll-top-button"
          :class="{ visible: showButton }"
          aria-label="Return to top"
        >
          <span class="btn-bracket">[</span> ^^ RETURN_TO_TOP <span class="btn-bracket">]</span>
        </button>
        <span class="status-divider hide-mobile">|</span>
        <span class="status-item hide-mobile">CARMEL.LAURENTIA.SYS v2026</span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterSection',
  emits: ['scroll-to-top'],
  data() {
    return {
      showButton: false,
      uptime: '00:00:00',
      uptimeInterval: null,
      startTime: Date.now()
    }
  },
  mounted() {
    const mainElement = document.querySelector('main')
    if (mainElement) {
      mainElement.addEventListener('scroll', this.handleScroll)
    }
    this.uptimeInterval = setInterval(this.updateUptime, 1000)
  },
  beforeUnmount() {
    const mainElement = document.querySelector('main')
    if (mainElement) {
      mainElement.removeEventListener('scroll', this.handleScroll)
    }
    clearInterval(this.uptimeInterval)
  },
  methods: {
    handleScroll(event) {
      this.showButton = event.target.scrollTop > 200
    },
    scrollToTop() {
      this.$emit('scroll-to-top')
    },
    updateUptime() {
      const elapsed = Math.floor((Date.now() - this.startTime) / 1000)
      const h = String(Math.floor(elapsed / 3600)).padStart(2, '0')
      const m = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0')
      const s = String(elapsed % 60).padStart(2, '0')
      this.uptime = `${h}:${m}:${s}`
    }
  }
}
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  min-height: var(--footer-safe-height);
  pointer-events: none;
}

.status-bar {
  background: var(--color-bg-charcoal);
  border-top: 2px solid var(--color-earth-olive);
  min-height: var(--footer-safe-height);
  box-sizing: border-box;
  padding: 0.4rem 1.5rem calc(0.4rem + env(safe-area-inset-bottom, 0px));
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.05em;
  pointer-events: auto;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.6);
}

.status-left,
.status-right {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.status-item {
  color: var(--color-earth-olive);
  white-space: nowrap;
}

.status-ok {
  color: var(--color-terminal-green);
  text-shadow: 0 0 4px rgba(0, 255, 65, 0.4);
}

.status-divider {
  color: var(--color-earth-olive);
  opacity: 0.4;
}

.scroll-top-button {
  background: transparent;
  border: none;
  color: var(--color-earth-olive);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.05em;
  cursor: pointer;
  padding: 0;
  opacity: 0;
  pointer-events: none;
  transition: color 0.15s ease, opacity 0.2s ease;
  white-space: nowrap;
}

.scroll-top-button.visible {
  opacity: 1;
  pointer-events: auto;
}

.scroll-top-button:hover {
  color: var(--color-terminal-green);
  text-shadow: 0 0 6px rgba(0, 255, 65, 0.5);
}

.btn-bracket {
  color: var(--color-neon-orange);
}

@media (max-width: 768px) {
  .status-bar {
    padding: 0.4rem 0.75rem calc(0.4rem + env(safe-area-inset-bottom, 0px));
    font-size: 0.65rem;
  }

  .hide-mobile {
    display: none;
  }
}
</style>
