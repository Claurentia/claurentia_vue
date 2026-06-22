<template>
  <div class="modal-backdrop" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <component :is="currentGame" @close="$emit('close')" />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'GameModal',
  emits: ['close'],
  props: {
    // Accept either a string name (legacy) or a component loader function
    gameComponent: {
      type: [Function, Object],
      default: null
    }
  },
  mounted() {
    document.addEventListener('keydown', this.handleKeydown)
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeydown)
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
    handleKeydown(e) {
      if (e.key === 'Escape') this.$emit('close')
    }
  }
}
</script>

<style scoped>
/*
  Backdrop spans only the safe zone between the fixed navbar (52px)
  and the fixed footer (~40px). align-items: center is always on —
  no padding-top hacks needed. Content height is driven by children;
  max-height: 100% just prevents overflow of the safe zone.
*/
.modal-backdrop {
  position: fixed;
  top: 52px;
  bottom: 40px;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  overflow-y: auto;
}

.modal-content {
  width: 100%;
  max-width: 800px;
  max-height: 100%;
  margin: auto;
  animation: modal-in 0.3s ease-out;
  overflow-y: auto;
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