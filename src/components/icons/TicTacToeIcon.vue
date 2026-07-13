<template>
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <rect x="3" y="3" width="18" height="18" rx="2" class="muted" />
    <path d="M9 3v18M15 3v18M3 9h18M3 15h18" class="muted grid" />
    <path d="m5 5 2.5 2.5M7.5 5 5 7.5M16.5 16.5 19 19M19 16.5 16.5 19" />
    <circle cx="12" cy="12" r="1.5" />
  </svg>
</template>

<style scoped>
svg { stroke: rgba(163, 255, 187, 0.9); stroke-width: 1; }
.muted { stroke: rgba(163, 255, 187, 0.4); }
.grid { stroke-dasharray: 2 2; }
</style>
