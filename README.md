# Claurentia — Personal Portfolio Website

A retro-themed personal portfolio site built with **Vue 3**, styled as a vintage CRT terminal / cassette-tape aesthetic. Live at **[claurentia.github.io/claurentia_vue](https://claurentia.github.io/claurentia_vue/)**.

---

## ✨ Features

| Section | What's inside |
|---|---|
| **Home** | Terminal-style bento grid — profile photo, identity, contact info with one-click clipboard copy, tech-stack skill bars, and experience |
| **Projects** | Horizontally-scrolling cassette "track list" of portfolio projects with expandable descriptions and source/live links |
| **Career** | Terminal-style timeline of current and past roles |
| **Minigames** | Arcade-style launcher for three browser games: Tic Tac Toe, Snake (with AI mode + decision log), and 2048 |

---

## 🗂 Project Structure

```
claurentia_vue/
├── public/
│   ├── index.html          # App shell, metadata, favicon link
│   └── Cl_brand.png        # Favicon / brand logo
├── src/
│   ├── main.js             # App entry point
│   ├── App.vue             # Root component — global styles, CSS vars, CRT overlay
│   ├── router/
│   │   └── index.js        # Empty hash router reserved for future routes
│   ├── data/               # Static content for contacts, skills, projects, career, games
│   ├── assets/             # Project images (logos, profile photo)
│   ├── components/
│   │   ├── NavBar.vue          # Fixed top nav with smooth-scroll section buttons
│   │   ├── GameModal.vue       # Modal wrapper that renders async game components
│   │   └── FooterSection.vue   # Fixed status bar and return-to-top control
│   ├── views/
│   │   ├── HomePage.vue        # Landing section — bento grid + bio terminal
│   │   ├── ProjectsPage.vue    # Horizontal scrolling project cards
│   │   ├── CareerPage.vue      # Career timeline
│   │   └── MinigamesPage.vue   # Game launcher grid
│   └── games/
│       ├── TicTacToe/
│       │   └── TicTacToe.vue   # 2-player, client-side logic
│       ├── Snake/
│       │   ├── Snake.vue       # Game loop, keyboard + mobile controls, AI mode
│       │   └── SnakeAI.js      # Distance scoring plus flood-fill safety checks
│       └── 2048/
│           └── Game2048.vue    # Board rotation merge algorithm, swipe + keyboard
├── vue.config.js           # publicPath for GitHub Pages, dev server on :3030
├── babel.config.js
├── jsconfig.json           # @ alias → src/
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 14
- npm ≥ 6

### Install dependencies
```bash
npm install
```

### Run locally (hot-reload on port 3030)
```bash
npm run serve
```
Open [http://localhost:3030/claurentia_vue/](http://localhost:3030/claurentia_vue/)

### Build for production
```bash
npm run build
# Output: dist/
```

### Lint & fix
```bash
npm run lint
```

---

## 🌐 Deployment (GitHub Pages)

The site is deployed to the `gh-pages` branch via the [`gh-pages`](https://www.npmjs.com/package/gh-pages) package.

```bash
npm run deploy
# Runs: npm run build → gh-pages -d dist
```

**Important:** `vue.config.js` sets `publicPath: "/claurentia_vue/"` — this must match the GitHub repo name exactly.

> The `dist/` folder is gitignored on `main` but published to `gh-pages` automatically by the deploy script.

### Automatic Deployment via GitHub Actions

If you want every push to `main` to auto-deploy, the repo includes a workflow at `.github/workflows/deploy.yml`.  
Just enable **GitHub Actions** in your repo settings — no secrets needed (uses `GITHUB_TOKEN` automatically).

---

## 🎨 Design System

All colors and fonts are defined as CSS variables in `App.vue`:

| Variable | Value | Used for |
|---|---|---|
| `--color-bg-dark` | `#1a1a1a` | Page backgrounds |
| `--color-bg-charcoal` | `#2b2b2b` | Card / nav backgrounds |
| `--color-terminal-green` | `#43C6C3` | Primary text, borders, glow |
| `--color-neon-orange` | `#F75A33` | Labels, brackets, accents |
| `--color-gold` | `#F2C749` | Highlights, score text |
| `--color-brown` | `#804D37` | Structural borders |
| `--color-cream` | `#F5F4ED` | Secondary readable text |
| `--font-mono` | Share Tech Mono | Body / terminal text |
| `--font-retro` | VT323 | Headings / game titles |

Global utility classes: `.retro-btn`, `.glow-text`

---

## 🎮 Adding a New Game

1. Create a self-contained `.vue` SFC in `src/games/YourGame/YourGame.vue`
2. The component must emit `close` when the player exits: `@click="$emit('close')"`
3. Add a card entry to the `games` array in `src/data/games.js`
4. Set `component` to a dynamic import loader, for example `() => import('@/games/YourGame/YourGame.vue')`
5. Add the card metadata there too: `title`, `description`, and icon markup

`MinigamesPage.vue` reads from `src/data/games.js`, and `GameModal.vue` wraps loader functions with Vue's `defineAsyncComponent`, so new games do not need a hard-coded import in the modal.

---

## 📦 Key Dependencies

| Package | Version | Purpose |
|---|---|---|
| `vue` | ^3.2 | UI framework |
| `vue-router` | ^4.4 | Router (scroll-snap navigation) |
| `core-js` | ^3.8 | Polyfills |
| `gh-pages` | ^6.2 | GitHub Pages deployment |
| `@vue/cli-service` | ~5.0 | Build tooling |

---

## 📄 License

Personal project — Carmel Laurentia. Not licensed for redistribution.
