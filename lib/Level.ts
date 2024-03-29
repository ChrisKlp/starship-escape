import {
  BoardGrid,
  Cell,
  Coordinates,
  LevelData,
  LevelDifficulty,
  MoveDirection,
  MoveablePlate,
  ObstacleGrid,
  PlateObstacles,
  PlateType,
  PlatesInitData,
  TDirections,
} from '@/constants/Types'
import {
  BOARD_GRID_SIZE,
  GAME_GRID_SIZE,
  MOVE_GRID_VALUE,
  directionValues,
} from '@/constants/gameConstants'
import { chunkArray, compareArrays, convertIndexToBoardXY } from '@/utils/utils'

export default class Level {
  private movesCount = 0
  private platesData: PlatesInitData = []
  private boardGrid: BoardGrid = []
  private obstacleGrid: ObstacleGrid = []
  private blankPlateIndex = -1
  private isGameFinished = false

  constructor(levelInitData: LevelData) {
    this.platesData = levelInitData.data
    this.updateData()
  }

  private updateData() {
    this.sortPlates()
    this.updateBoardGrid()
    this.updateObstacleGrid()
    this.updateBlankPlateIndex()
    this.updateIsGameFinished()
  }

  getIsGameFinished() {
    return this.isGameFinished
  }

  getPlatesData() {
    return this.platesData
  }

  getGameStatus() {
    const readyToMovePlates = this.getReadyToMovePlates()
    const readyToMoveIndexes = readyToMovePlates
      .filter((p) => p.isMoveable)
      .map((i) => i.plate.index)

    return {
      readyToMoveIndexes,
      readyToMovePlates,
      isGameFinished: this.isGameFinished,
      movesCount: this.movesCount,
    }
  }

  getMovedPlatesData(movedPlate: MoveablePlate) {
    const newPlates = this.getUpdatedPlatesData(movedPlate)
    this.movesCount += 1
    this.platesData = newPlates
    this.updateData()
    return this.platesData
  }

  private getUpdatedPlatesData(movedPlate: MoveablePlate): PlatesInitData {
    const platesData = this.platesData
    const { plate, moveDirection } = movedPlate
    const currentPlate = platesData[plate.index]
    const currentBlankIndex = platesData.findIndex(
      (data) => data.plate.type === PlateType.blank
    )

    const newObstacles = currentPlate.plate.obstacles.map((obstacle) => {
      let indexToChange = 0
      if (moveDirection.axis === 'y') indexToChange = 1
      const newObstacle = [...obstacle]
      newObstacle[indexToChange] += moveDirection.value * MOVE_GRID_VALUE
      return newObstacle
    })

    const newBlankPlate = {
      ...platesData[currentBlankIndex],
      index: plate.index,
    }
    const newPlate = {
      ...currentPlate,
      index: currentBlankIndex,
      plate: {
        ...currentPlate.plate,
        obstacles: newObstacles,
      },
    }

    const newLevelData = JSON.parse(
      JSON.stringify(platesData)
    ) as PlatesInitData

    newLevelData[plate.index] = newBlankPlate
    newLevelData[currentBlankIndex] = newPlate
    return newLevelData
  }

  private updateIsGameFinished() {
    let isGameFinished = false
    const winnerIndex = 7
    const centerIndex = 4
    const shipPlate = this.boardGrid
      .flat()
      .find((i) => i.type === PlateType.ship)

    if (shipPlate?.index === winnerIndex || shipPlate?.index === centerIndex) {
      const plateObstacles = this.getPlateObstacles(shipPlate.index)
      const moveDirection: MoveDirection = {
        direction: TDirections.down,
        axis: 'y',
        value: 1,
      }
      if (shipPlate?.index === centerIndex) moveDirection.value = 2
      isGameFinished = this.getIsMoveable(
        plateObstacles,
        moveDirection,
        shipPlate.index
      )
    }
    this.isGameFinished = isGameFinished
  }

  private getReadyToMovePlates(): MoveablePlate[] {
    const blankXY = convertIndexToBoardXY(this.blankPlateIndex, BOARD_GRID_SIZE)
    const adjacentPlatesXY = this.getAdjacentPlatesCoordinates(blankXY)

    return adjacentPlatesXY.map((plateXY) => {
      const plate = this.boardGrid[plateXY.y][plateXY.x]
      const moveDirection = this.getMoveDirection(blankXY, plateXY)
      const plateObstacles = this.getPlateObstacles(plate.index)
      const isMoveable = this.getIsMoveable(
        plateObstacles,
        moveDirection,
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

  private getIsMoveable(
    plateObstacles: PlateObstacles,
    moveDirection: MoveDirection,
    plateIdx: number
  ) {
    return plateObstacles.every((obstacle) => {
      if (obstacle) {
        let moves = 0
        const axis = moveDirection.axis as keyof Cell
        const isSubtraction = moveDirection.value < 0
        const moveGridValue = moveDirection.value * MOVE_GRID_VALUE

        while (isSubtraction ? moves > moveGridValue : moves < moveGridValue) {
          isSubtraction ? moves-- : moves++
          const obstacleInitPosition = obstacle[axis] as number
          const obstacleNextPosition = obstacleInitPosition + moves

          if (obstacleNextPosition < 8 && obstacleNextPosition >= 0) {
            let nextCell: Cell | null = null

            if (axis === 'x') {
              nextCell = this.obstacleGrid[obstacle.y][obstacleNextPosition]
            } else if (axis === 'y') {
              nextCell = this.obstacleGrid[obstacleNextPosition][obstacle.x]
            }

            if (nextCell !== null && nextCell.plateIndex !== plateIdx) {
              return false
            }
          }
        }
      }
      return true
    })
  }

  private updateBoardGrid() {
    const board = [...Array(BOARD_GRID_SIZE * BOARD_GRID_SIZE).keys()].map(
      (_, i) => ({
        type: this.platesData[i].plate.type,
        index: this.platesData[i].index,
      })
    )
    this.boardGrid = chunkArray(board, BOARD_GRID_SIZE)
  }

  private updateObstacleGrid() {
    const grid = []

    for (let y = 0; y < GAME_GRID_SIZE; y++) {
      const row = []
      for (let x = 0; x < GAME_GRID_SIZE; x++) {
        const plate = this.platesData.find((p) =>
          p.plate.obstacles.find((c) => compareArrays(c, [x, y]))
        )
        let cell: Cell | null = null
        if (plate) {
          cell = { x, y, plateType: plate.plate.type, plateIndex: plate.index }
        }
        row.push(cell)
      }
      grid.push(row)
    }
    this.obstacleGrid = grid
  }

  private updateBlankPlateIndex() {
    this.blankPlateIndex = this.boardGrid
      .flat()
      .findIndex((i) => i.type === PlateType.blank)
  }

  private getAdjacentPlatesCoordinates(plateXY: Coordinates): Coordinates[] {
    const plateIndexes = []
    const { x, y } = plateXY
    if (x - 1 >= 0) plateIndexes.push({ x: x - 1, y })
    if (x + 1 < BOARD_GRID_SIZE) plateIndexes.push({ x: x + 1, y })
    if (y - 1 >= 0) plateIndexes.push({ x, y: y - 1 })
    if (y + 1 < BOARD_GRID_SIZE) plateIndexes.push({ x, y: y + 1 })
    return plateIndexes
  }

  private getMoveDirection(
    blankXY: Coordinates,
    plateXY: Coordinates
  ): MoveDirection {
    let direction = TDirections.disabled
    if (blankXY.x !== plateXY.x) {
      if (blankXY.x > plateXY.x) {
        direction = TDirections.right
      } else if (blankXY.x < plateXY.x) {
        direction = TDirections.left
      }
    } else {
      if (blankXY.y > plateXY.y) {
        direction = TDirections.down
      } else if (blankXY.y < plateXY.y) {
        direction = TDirections.up
      }
    }
    return {
      direction,
      value: directionValues[direction].value,
      axis: directionValues[direction].axis,
    }
  }

  private getPlateObstacles(plateIndex: number): PlateObstacles {
    return this.obstacleGrid
      .flat()
      .filter((cell) => cell?.plateIndex === plateIndex)
  }

  private sortPlates() {
    const sortedPlates = [...this.platesData].sort((a, b) => a.index - b.index)
    this.platesData = sortedPlates
  }
}
