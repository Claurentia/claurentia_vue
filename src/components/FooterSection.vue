<template>
  <footer class="footer">
    <div class="footer-content">
      <button @click="scrollToTop" class="scroll-top-button" :class="{ visible: showButton }">
        <span class="btn-icon">▲</span>
        <span class="btn-text">[ RETURN_TO_TOP ]</span>
      </button>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterSection',
  data() {
    return {
      showButton: false
    }
  },
  mounted() {
    const mainElement = document.querySelector('main')
    if (mainElement) {
      mainElement.addEventListener('scroll', this.handleScroll)
    }
  },
  beforeUnmount() {
    const mainElement = document.querySelector('main')
    if (mainElement) {
      mainElement.removeEventListener('scroll', this.handleScroll)
    }
  },
  methods: {
    handleScroll(event) {
      this.showButton = event.target.scrollTop > 200
    },
    scrollToTop() {
      const mainElement = document.querySelector('main')
      if (mainElement) {
        mainElement.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
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
  padding: 1.5rem;
  z-index: 100;
  pointer-events: none;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

.scroll-top-button {
  background: var(--color-bg-charcoal);
  border: 3px solid var(--color-terminal-green);
  color: var(--color-terminal-green);
  padding: 0.8rem 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  letter-spacing: 1px;
  transition: all 0.1s ease;
  transform: translateY(100px);
  opacity: 0;
  pointer-events: auto;
  box-shadow:
    0 0 20px rgba(0, 255, 65, 0.3),
    inset 0 0 10px rgba(0, 0, 0, 0.5);
}

.scroll-top-button.visible {
  transform: translateY(0);
  opacity: 1;
}

.scroll-top-button:hover {
  background: var(--color-earth-olive);
  color: var(--color-yellow-highlight);
  box-shadow:
    0 0 30px rgba(0, 255, 65, 0.5),
    inset 0 0 10px rgba(0, 0, 0, 0.5);
  transform: translateY(-3px);
}

.scroll-top-button:active {
  transform: translateY(1px);
}

.btn-icon {
  font-size: 1.2rem;
  color: var(--color-neon-orange);
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.btn-text {
  text-transform: uppercase;
}

@media (max-width: 768px) {
  .footer {
    padding: 1rem;
  }

  .scroll-top-button {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
  }
}
</style> 