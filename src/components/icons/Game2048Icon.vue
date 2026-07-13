<template>
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <rect x="3" y="3" width="18" height="18" rx="2" class="frame" />
    <g v-for="tile in tiles" :key="tile.value">
      <rect :x="tile.x" :y="tile.y" width="6" height="6" rx="1" :opacity="tile.opacity" />
      <text :x="tile.x + 3" :y="tile.y + 4.5" :class="{ small: tile.value === '16' }">{{ tile.value }}</text>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'Game2048Icon',
  data() {
    return {
      tiles: [
        { x: 5, y: 5, value: '2', opacity: 0.1 },
        { x: 13, y: 5, value: '4', opacity: 0.2 },
        { x: 5, y: 13, value: '8', opacity: 0.3 },
        { x: 13, y: 13, value: '16', opacity: 0.4 }
      ]
    }
  }
}
</script>

<style scoped>
.frame { stroke: rgba(163, 255, 187, 0.4); }
rect:not(.frame) { fill: rgba(163, 255, 187, 0.8); }
text {
  fill: rgba(163, 255, 187, 0.9);
  font: 4px sans-serif;
  text-anchor: middle;
  stroke: none;
}
text.small { font-size: 3.5px; }
</style>
