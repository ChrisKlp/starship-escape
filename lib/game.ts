import {
  BOARD_GRID_SIZE,
  directionValues,
  GAME_GRID_SIZE,
} from '@/constants/gameConstants'
import {
  BoardGrid,
  Cell,
  Coordinates,
  LevelData,
  MoveablePlate,
  MoveablePlates,
  MoveDirection,
  ObstacleGrid,
  PlateObstacles,
  PlateType,
  TDirections,
} from '@/constants/Types'
import { chunkArray, compareArrays } from '@/utils/utils'

export function getIsGameFinished(levelData: LevelData) {
  const winnerIndex = 7
  const centerIndex = 4
  const obstacleGrid = createObstacleGrid(levelData)
  const boardGrid = createBoardGrid(levelData)
  const shipPlate = boardGrid.flat().find((i) => i.type === PlateType.ship)

  if (shipPlate?.index === winnerIndex || shipPlate?.index === centerIndex) {
    const plateObstacles = getPlateObstacles(obstacleGrid, shipPlate.index)
    const moveDirection: MoveDirection = {
      direction: TDirections.down,
      axis: 'y',
      value: 1,
    }
    if (shipPlate?.index === centerIndex) moveDirection.value = 2
    return getIsMoveable(
      plateObstacles,
      moveDirection,
      obstacleGrid,
      shipPlate.index
    )
  }
  return false
}

export function updateLevelData(
  levelData: LevelData,
  moveablePlate: MoveablePlate
) {
  'worklet'
  const { plate, moveDirection } = moveablePlate
  const moveGridValue = 2
  const newPlate = { ...levelData[plate.index] }
  const currentBlankIndex = levelData.findIndex(
    (p) => p.type === PlateType.blank
  )
  const newBlankPlate = { ...levelData[currentBlankIndex] }

  newPlate.index = newBlankPlate.index
  newBlankPlate.index = plate.index

  newPlate.obstacles = newPlate.obstacles.map((obstacle) => {
    let indexToChange = 0
    if (moveDirection.axis === 'y') indexToChange = 1
    const newObstacle = [...obstacle]
    newObstacle[indexToChange] += moveDirection.value * moveGridValue
    return newObstacle
  })

  const newLevelData = JSON.parse(JSON.stringify(levelData)) as LevelData

  newLevelData[plate.index] = newBlankPlate
  newLevelData[currentBlankIndex] = newPlate
  return newLevelData
}

export function getBlankPlateAdjacent(levelData: LevelData): MoveablePlate[] {
  const obstacleGrid = createObstacleGrid(levelData)
  const boardGrid = createBoardGrid(levelData)

  const blankIdx = getBlankPlateIdx(boardGrid)
  const blankXY = convertIndexToBoardXY(blankIdx)
  const adjacentPlatesXY = getAdjacentPlatesCoordinates(blankXY)

  return adjacentPlatesXY.map((plateXY) => {
    const plate = boardGrid[plateXY.y][plateXY.x]
    const moveDirection = getMoveDirection(blankXY, plateXY)
    const plateObstacles = getPlateObstacles(obstacleGrid, plate.index)
    const isMoveable = getIsMoveable(
      plateObstacles,
      moveDirection,
      obstacleGrid,
      plate.index
    )
    return {
      plate,
      moveDirection,
      plateObstacles,
      isMoveable,
    }
  })
}

function createObstacleGrid(levelData: LevelData): ObstacleGrid {
  const grid = []

  for (let y = 0; y < GAME_GRID_SIZE; y++) {
    const row = []
    for (let x = 0; x < GAME_GRID_SIZE; x++) {
      const plate = levelData.find((plate) =>
        plate.obstacles.find((c) => compareArrays(c, [x, y]))
      )
      let cell: Cell | null = null
      if (plate) {
        cell = { x, y, plateType: plate.type, plateIndex: plate.index }
      }
      row.push(cell)
    }
    grid.push(row)
  }

  return grid
}

function createBoardGrid(levelData: LevelData): BoardGrid {
  const board = Array.from(
    { length: BOARD_GRID_SIZE * BOARD_GRID_SIZE },
    (_, i) => ({
      type: levelData[i].type,
      index: levelData[i].index,
    })
  )
  return chunkArray(board, BOARD_GRID_SIZE)
}

function getIsMoveable(
  plateObstacles: PlateObstacles,
  moveDirection: MoveDirection,
  obstacleGrid: ObstacleGrid,
  plateIdx: number
) {
  let isMovable = true
  plateObstacles.forEach((obstacle) => {
    if (obstacle) {
      let moves = 0
      const axis = moveDirection.axis as keyof Cell
      const isSubtraction = moveDirection.value < 0
      const moveGridValue = moveDirection.value * 2

      while (isSubtraction ? moves > moveGridValue : moves < moveGridValue) {
        isSubtraction ? moves-- : moves++
        const obstacleInitPosition = obstacle[axis] as number
        const obstacleNextPosition = obstacleInitPosition + moves

        if (obstacleNextPosition < 8 && obstacleNextPosition >= 0) {
          let nextCell = null

          if (axis === 'x') {
            nextCell = obstacleGrid[obstacle.y][obstacleNextPosition]
          } else if (axis === 'y') {
            nextCell = obstacleGrid[obstacleNextPosition][obstacle.x]
          }

          if (nextCell?.plateIndex !== plateIdx && isMovable) {
            isMovable = nextCell === null
          }
        }
      }
    }
  })
  return isMovable
}

//
// GAME UTILS
//

export function findMoveablePlate(
  plateIndex: number,
  moveablePlates: MoveablePlates
) {
  return moveablePlates.find((plate) => plate.plate.index === plateIndex)
}

function getBlankPlateIdx(boardGrid: BoardGrid) {
  return boardGrid.flat().findIndex((i) => i.type === PlateType.blank)
}

function getAdjacentPlatesCoordinates(plateXY: Coordinates): Coordinates[] {
  const plateIndexes = []
  const { x, y } = plateXY
  if (x - 1 >= 0) plateIndexes.push({ x: x - 1, y })
  if (x + 1 < BOARD_GRID_SIZE) plateIndexes.push({ x: x + 1, y })
  if (y - 1 >= 0) plateIndexes.push({ x, y: y - 1 })
  if (y + 1 < BOARD_GRID_SIZE) plateIndexes.push({ x, y: y + 1 })
  return plateIndexes
}

export function getMoveDirection(
  blank: Coordinates,
  plate: Coordinates
): MoveDirection {
  let direction = TDirections.disabled
  if (blank.x !== plate.x) {
    if (blank.x > plate.x) {
      direction = TDirections.right
    } else if (blank.x < plate.x) {
      direction = TDirections.left
    }
  } else {
    if (blank.y > plate.y) {
      direction = TDirections.down
    } else if (blank.y < plate.y) {
      direction = TDirections.up
    }
  }
  return {
    direction,
    value: directionValues[direction].value,
    axis: directionValues[direction].axis,
  }
}

function convertIndexToBoardXY(plateIdx: number): Coordinates {
  return {
    x: plateIdx % BOARD_GRID_SIZE,
    y: Math.floor(plateIdx / BOARD_GRID_SIZE),
  }
}

export function getPlateObstacles(
  obstacleGrid: ObstacleGrid,
  plateIndex: number
): PlateObstacles {
  return obstacleGrid.flat().filter((cell) => cell?.plateIndex === plateIndex)
}

export function sortLevelData(levelData: LevelData): LevelData {
  return [...levelData.sort((a, b) => a.index - b.index)]
}
