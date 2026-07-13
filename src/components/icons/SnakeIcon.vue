<template>
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <rect x="3" y="3" width="18" height="18" rx="1" class="frame" />
    <path d="M7 17v-4h4v-2h4v2" />
    <circle cx="7" cy="17" r="1.2" class="snake-head" />
    <circle cx="16" cy="8" r="0.8" class="food" />
  </svg>
</template>

<style scoped>
svg { stroke: rgba(163, 255, 187, 0.9); stroke-width: 1.2; stroke-linecap: square; stroke-linejoin: round; }
.frame { stroke: rgba(163, 255, 187, 0.4); stroke-width: 1; }
.snake-head { fill: rgba(163, 255, 187, 0.9); stroke: none; }
.food { fill: rgba(163, 255, 187, 0.6); stroke: none; }
</style>
