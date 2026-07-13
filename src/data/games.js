// Static games data. Edit here to add/remove games without touching any component.
// Each entry's `component` is a dynamic import loader consumed by GameModal via defineAsyncComponent.
import { markRaw } from 'vue'
import TicTacToeIcon from '@/components/icons/TicTacToeIcon.vue'
import SnakeIcon from '@/components/icons/SnakeIcon.vue'
import Game2048Icon from '@/components/icons/Game2048Icon.vue'

const games = [
  {
    title: 'Tic Tac Toe',
    description: "Classic game of X's and O's. Two players, same device — place your marks and claim three in a row.",
    component: () => import('@/games/TicTacToe/TicTacToe.vue'),
    iconComponent: markRaw(TicTacToeIcon)
  },
  {
    title: 'Snake',
    description: "Guide the snake to eat food and grow longer, but don't hit the walls or yourself! A classic arcade game that tests your reflexes.",
    component: () => import('@/games/Snake/Snake.vue'),
    iconComponent: markRaw(SnakeIcon)
  },
  {
    title: '2048',
    description: 'Combine matching numbers to reach 2048! An addictive puzzle game that challenges your strategic thinking.',
    component: () => import('@/games/2048/Game2048.vue'),
    iconComponent: markRaw(Game2048Icon)
  }
]

export default games
