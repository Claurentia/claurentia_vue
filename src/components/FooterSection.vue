<template>
  <footer class="footer">
    <div class="footer-content">
      <button @click="scrollToTop" class="scroll-top-button" :class="{ visible: showButton }">
        <svg class="arrow-up" viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
        </svg>
        Return to Top
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
  padding: 1rem;
  z-index: 1000;
  pointer-events: none;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

.scroll-top-button {
  background: linear-gradient(
    to right,
    rgba(163, 255, 187, 0.2),
    rgba(115, 255, 160, 0.2)
  );
  border: 1px solid rgba(163, 255, 187, 0.3);
  color: rgba(163, 255, 187, 0.9);
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  transform: translateY(100px);
  opacity: 0;
  pointer-events: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.scroll-top-button.visible {
  transform: translateY(0);
  opacity: 1;
}

.scroll-top-button:hover {
  background: linear-gradient(
    to right,
    rgba(163, 255, 187, 0.3),
    rgba(115, 255, 160, 0.3)
  );
  transform: translateY(-2px);
}

.arrow-up {
  transition: transform 0.3s ease;
}

.scroll-top-button:hover .arrow-up {
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .footer {
    padding: 0.8rem;
  }

  .scroll-top-button {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
}
</style> 