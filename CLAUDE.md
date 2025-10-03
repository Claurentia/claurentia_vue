# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Carmel Laurentia built with Vue 3, featuring a single-page application with scroll-snap navigation and embedded minigames. The site is deployed to GitHub Pages at https://claurentia.github.io/claurentia_vue/.

## Development Commands

### Local Development
```bash
npm run serve      # Starts dev server on http://localhost:3030
npm run build      # Build for production
npm run lint       # Lint and fix files
```

### Deployment
```bash
npm run deploy     # Build and deploy to GitHub Pages (runs predeploy script automatically)
```

## Architecture

### Application Structure

The app uses a **single-page scroll-snap layout** rather than traditional routing. While Vue Router is installed and configured, the main app ([App.vue](src/App.vue)) renders all page components simultaneously in a vertical scroll container with `scroll-snap-type: y mandatory`.

**Key architectural pattern:**
- [App.vue](src/App.vue) renders HomePage, ProjectsPage, and MinigamesPage as direct children
- Each page component fills 100vh and uses `scroll-snap-align: start`
- Navigation is handled via smooth scrolling to anchor links, not route changes
- Vue Router exists for future route-based features but is not actively used for main navigation

### Component Organization

**Main Pages** ([src/components/](src/components/)):
- [HomePage.vue](src/components/HomePage.vue) - Landing section with bio and contact info with clipboard copy functionality
- [ProjectsPage.vue](src/components/ProjectsPage.vue) - Portfolio projects showcase
- [MinigamesPage.vue](src/components/MinigamesPage.vue) - Interactive games grid with modal launcher
- [NavBar.vue](src/components/NavBar.vue) - Fixed navigation header
- [FooterSection.vue](src/components/FooterSection.vue) - Footer with social links

**Shared Components:**
- [GameModal.vue](src/components/GameModal.vue) - Modal wrapper that dynamically loads game components

**Games** ([src/games/](src/games/)):
- Each game is a self-contained Vue SFC (Single File Component)
- Games: [Snake.vue](src/games/Snake/Snake.vue), [TicTacToe.vue](src/games/TicTacToe/TicTacToe.vue), [Game2048.vue](src/games/2048/Game2048.vue)
- Launched via GameModal component from MinigamesPage

### Path Aliases

The project uses `@/` as an alias for the [src/](src/) directory (configured in [jsconfig.json](jsconfig.json)):
```javascript
import Component from '@/components/Component.vue'  // Resolves to src/components/Component.vue
```

### Build Configuration

**Important settings in [vue.config.js](vue.config.js):**
- `publicPath: "/claurentia_vue/"` - Required for GitHub Pages deployment (matches repo name)
- Dev server runs on port 3030 with WebSocket disabled
- `transpileDependencies: true` - Ensures compatibility with older browsers

When adding new routes or changing the base path, update the publicPath to match the GitHub Pages URL structure.

### Deployment Process

The site deploys to GitHub Pages using the `gh-pages` package:
1. `npm run build` compiles to [dist/](dist/) directory
2. `npm run deploy` pushes [dist/](dist/) to `gh-pages` branch
3. GitHub Pages serves from `gh-pages` branch at https://claurentia.github.io/claurentia_vue/

**Important:** The [dist/](dist/) directory is gitignored on main branch but published to `gh-pages` branch during deployment.

## Working with Games

When adding new games:
1. Create game as standalone Vue component in [src/games/](src/games/)
2. Add game entry to `games` array in [MinigamesPage.vue](src/components/MinigamesPage.vue)
3. Import game component in [GameModal.vue](src/components/GameModal.vue) dynamic component mapping
4. Game should handle its own state, controls, and rendering within the modal

## Styling Approach

- Global styles in [App.vue](src/App.vue) handle scroll behavior and layout
- Component styles are scoped within each `.vue` file
- Main color scheme uses green accent colors (rgba(163, 255, 187, ...))
- Font: Avenir, Helvetica, Arial, sans-serif
