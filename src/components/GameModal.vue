<template>
  <div class="modal-backdrop" @click="$emit('close')">
    <div
      ref="dialog"
      class="modal-content"
      role="dialog"
      aria-modal="true"
      aria-labelledby="game-dialog-title"
      tabindex="-1"
      @click.stop
    >
      <h2 id="game-dialog-title" class="visually-hidden">{{ title }}</h2>
      <div
        ref="gameViewport"
        class="game-viewport"
        :style="{ height: scaledGameHeight }"
      >
        <component
          :is="currentGame"
          class="scaled-game"
          :style="{ transform: `scale(${gameScale})` }"
          @close="$emit('close')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'GameModal',
  emits: ['close'],
  props: {
    title: {
      type: String,
      default: 'Game'
    },
    // Accept either a string name (legacy) or a component loader function
    gameComponent: {
      type: [Function, Object],
      default: null
    }
  },
  data() {
    return {
      gameScale: 1,
      scaledGameHeight: 'auto'
    }
  },
  mounted() {
    this._previouslyFocused = document.activeElement
    this.inertBackground()
    document.addEventListener('keydown', this.handleKeydown)
    this.$nextTick(() => {
      this.$refs.dialog?.focus()
      this.observeGameSize()
    })
    window.addEventListener('resize', this.scheduleGameScale)
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeydown)
    window.removeEventListener('resize', this.scheduleGameScale)
    cancelAnimationFrame(this._scaleFrame)
    this._gameResizeObserver?.disconnect()
    this._gameMutationObserver?.disconnect()
    this.restoreBackground()
    if (this._previouslyFocused?.isConnected) {
      this._previouslyFocused.focus()
    }
  },
  computed: {
    currentGame() {
      if (!this.gameComponent) return null
      // If it's already a resolved component/object, use it directly.
      // If it's a loader function, wrap with defineAsyncComponent.
      if (typeof this.gameComponent === 'function') {
        return defineAsyncComponent(this.gameComponent)
      }
      return this.gameComponent
    }
  },
  methods: {
    observeGameSize() {
      const viewport = this.$refs.gameViewport
      if (!viewport) return

      const observeGame = () => {
        this._gameResizeObserver?.disconnect()
        const game = viewport.firstElementChild
        if (game) {
          this._gameResizeObserver = new ResizeObserver(this.scheduleGameScale)
          this._gameResizeObserver.observe(game)
        }
        this.scheduleGameScale()
      }

      this._gameMutationObserver = new MutationObserver(observeGame)
      this._gameMutationObserver.observe(viewport, { childList: true })
      observeGame()
    },
    scheduleGameScale() {
      cancelAnimationFrame(this._scaleFrame)
      this._scaleFrame = requestAnimationFrame(this.updateGameScale)
    },
    updateGameScale() {
      const viewport = this.$refs.gameViewport
      const game = viewport?.firstElementChild
      const backdrop = this.$el
      if (!viewport || !game || !backdrop) return

      const naturalWidth = game.offsetWidth
      const naturalHeight = game.offsetHeight
      if (!naturalWidth || !naturalHeight) return

      const backdropStyles = getComputedStyle(backdrop)
      const availableHeight = backdrop.clientHeight -
        parseFloat(backdropStyles.paddingTop) -
        parseFloat(backdropStyles.paddingBottom)
      const availableWidth = viewport.clientWidth
      const scale = Math.min(
        1,
        availableWidth / naturalWidth,
        availableHeight / naturalHeight
      )

      this.gameScale = Math.max(0.1, scale)
      this.scaledGameHeight = `${naturalHeight * this.gameScale}px`
    },
    getFocusableElements() {
      return Array.from(this.$el.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), ' +
        'textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ))
    },
    inertBackground() {
      this._inertedElements = []
      let current = this.$el

      while (current?.parentElement) {
        const parent = current.parentElement
        Array.from(parent.children).forEach((sibling) => {
          if (sibling !== current && !sibling.inert) {
            sibling.inert = true
            this._inertedElements.push(sibling)
          }
        })
        if (parent === document.body) break
        current = parent
      }
    },
    restoreBackground() {
      this._inertedElements?.forEach((element) => {
        element.inert = false
      })
      this._inertedElements = []
    },
    handleKeydown(e) {
      if (e.key === 'Escape') { this.$emit('close'); return }
      if (e.key !== 'Tab') return

      const focusable = this.getFocusableElements()
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!first) {
        e.preventDefault()
        this.$refs.dialog?.focus()
      } else if (e.shiftKey && (document.activeElement === first || document.activeElement === this.$refs.dialog)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }
}
</script>

<style scoped>
/*
  Backdrop spans only the safe zone between the fixed navbar and footer.
  Content height is driven by children; max-height: 100% prevents overflow
  of the safe zone.
*/
.modal-backdrop {
  position: fixed;
  top: var(--nav-height);
  bottom: var(--footer-safe-height);
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  overflow: hidden;
}

.modal-content {
  width: 100%;
  max-width: 800px;
  max-height: 100%;
  margin: auto;
  animation: modal-in 0.3s ease-out;
  overflow: hidden;
}

.game-viewport {
  position: relative;
  width: 100%;
  overflow: visible;
}

.scaled-game {
  transform-origin: top center;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@keyframes modal-in {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 1024px) {
  .modal-content {
    max-width: 700px;
  }
}

@media (max-width: 768px) {
  .modal-backdrop {
    padding: 0.75rem;
  }

  .modal-content {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .modal-backdrop {
    padding: 0.5rem;
  }
}

@media (max-height: 600px) and (orientation: landscape) {
  .modal-backdrop {
    padding: 0.5rem 0.75rem;
  }
}
</style>
