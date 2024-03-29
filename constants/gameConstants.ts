import { Dimensions } from 'react-native'

export const BOARD_GRID_SIZE = 3
export const GAME_GRID_SIZE = 8
export const OBSTACLE_GRID_SIZE = 4
export const MOVE_GRID_VALUE = 2

export const OBSTACLE_SIZE = Math.round(
  Dimensions.get('window').width / GAME_GRID_SIZE
)
export const PLATE_SIZE = OBSTACLE_SIZE * 2
export const BOARD_SIZE = PLATE_SIZE * BOARD_GRID_SIZE
export const MARGIN = 4

export const LEVEL_ICON_WIDTH = Math.floor(
  (Dimensions.get('window').width - 16) / 4
)

export const directionValues = {
  right: {
    value: 1,
    axis: 'x',
  },
  left: {
    value: -1,
    axis: 'x',
  },
  up: {
    value: -1,
    axis: 'y',
  },
  down: {
    value: 1,
    axis: 'y',
  },
  disabled: {
    value: 0,
    axis: 'x',
  },
}
