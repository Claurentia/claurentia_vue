// Static games data. Edit here to add/remove games without touching any component.
// Each entry's `component` is a dynamic import loader consumed by GameModal via defineAsyncComponent.

const games = [
  {
    title: 'Tic Tac Toe',
    description: "Classic game of X's and O's. Challenge the computer or play with a friend in this timeless strategy game.",
    component: () => import('@/games/TicTacToe/TicTacToe.vue'),
    icon: `<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2" stroke="rgba(163, 255, 187, 0.4)" fill="none"/><line x1="9" y1="3" x2="9" y2="21" stroke="rgba(163, 255, 187, 0.4)" stroke-dasharray="2,2"/><line x1="15" y1="3" x2="15" y2="21" stroke="rgba(163, 255, 187, 0.4)" stroke-dasharray="2,2"/><line x1="3" y1="9" x2="21" y2="9" stroke="rgba(163, 255, 187, 0.4)" stroke-dasharray="2,2"/><line x1="3" y1="15" x2="21" y2="15" stroke="rgba(163, 255, 187, 0.4)" stroke-dasharray="2,2"/><path d="M5 5l2.5 2.5M7.5 5L5 7.5" stroke="rgba(163, 255, 187, 0.9)" stroke-width="1"/><circle cx="12" cy="12" r="1.5" stroke="rgba(163, 255, 187, 0.9)" fill="none"/><path d="M16.5 16.5l2.5 2.5M19 16.5l-2.5 2.5" stroke="rgba(163, 255, 187, 0.9)" stroke-width="1"/></svg>`
  },
  {
    title: 'Snake',
    description: "Guide the snake to eat food and grow longer, but don't hit the walls or yourself! A classic arcade game that tests your reflexes.",
    component: () => import('@/games/Snake/Snake.vue'),
    icon: `<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="1" stroke="rgba(163, 255, 187, 0.4)" fill="none"/><path d="M7 17 L7 13 L11 13 L11 11 L15 11 L15 13" stroke="rgba(163, 255, 187, 0.9)" stroke-width="1.2" fill="none" stroke-linecap="square" stroke-linejoin="round"/><circle cx="7" cy="17" r="1.2" fill="rgba(163, 255, 187, 0.9)"/><circle cx="16" cy="8" r="0.8" fill="rgba(163, 255, 187, 0.6)"/></svg>`
  },
  {
    title: '2048',
    description: 'Combine matching numbers to reach 2048! An addictive puzzle game that challenges your strategic thinking.',
    component: () => import('@/games/2048/Game2048.vue'),
    icon: `<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2" stroke="rgba(163, 255, 187, 0.4)" fill="none"/><rect x="5" y="5" width="6" height="6" rx="1" fill="rgba(163, 255, 187, 0.1)"/><text x="8" y="9.5" font-size="4" fill="rgba(163, 255, 187, 0.9)" text-anchor="middle" font-family="sans-serif">2</text><rect x="13" y="5" width="6" height="6" rx="1" fill="rgba(163, 255, 187, 0.2)"/><text x="16" y="9.5" font-size="4" fill="rgba(163, 255, 187, 0.9)" text-anchor="middle" font-family="sans-serif">4</text><rect x="5" y="13" width="6" height="6" rx="1" fill="rgba(163, 255, 187, 0.3)"/><text x="8" y="17.5" font-size="4" fill="rgba(163, 255, 187, 0.9)" text-anchor="middle" font-family="sans-serif">8</text><rect x="13" y="13" width="6" height="6" rx="1" fill="rgba(163, 255, 187, 0.4)"/><text x="16" y="17.5" font-size="3.5" fill="rgba(163, 255, 187, 0.9)" text-anchor="middle" font-family="sans-serif">16</text></svg>`
  }
]

export default games
