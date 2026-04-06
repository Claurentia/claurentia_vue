import { createRouter, createWebHashHistory } from 'vue-router'

// NOTE: Main navigation uses scroll-snap (see App.vue + NavBar.vue).
// This router is kept for potential future route-based features only.
// createWebHashHistory is used instead of createWebHistory to prevent
// 404 errors on GitHub Pages when users refresh or deep-link.

const routes = []

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
