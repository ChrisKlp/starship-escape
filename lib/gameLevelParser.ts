import { LevelData, LevelInitData, PlateInitData } from '@/constants/Types'
import {
  BOARD_GRID_SIZE,
  MOVE_GRID_VALUE,
  OBSTACLE_GRID_SIZE,
} from '@/constants/gameConstants'
import {
  convertIndexToBoardXY,
  convertXYToIndex,
  rotateArrNTimes,
} from '@/utils/utils'
import getGamePlate from './gamePlates'

export default function parseLevelData(
  levelInitData: LevelInitData
): LevelData {
  return {
    ...levelInitData,
    data: levelInitData.data.map((plateData) => {
      const plate = {
        ...plateData,
        plate: getGamePlate(plateData.plate),
      }
      return parsePlateData(plate)
    }),
  }
}

function parsePlateData(plateData: PlateInitData) {
  let newObstacles = [...plateData.plate.obstacles]

  if (plateData.rotate > 0) {
    const gridArr = [...Array(16).keys()]
    const obstaclesIndexes = plateData.plate.obstacles.map((o) =>
      convertXYToIndex(o, OBSTACLE_GRID_SIZE)
    )
    const obstaclesArr = gridArr.map((i) => obstaclesIndexes.includes(i))
    const rotatedObstaclesArr = rotateArrNTimes(obstaclesArr, plateData.rotate)

    newObstacles = rotatedObstaclesArr
      .map((isObstacle, i) => {
        const { x, y } = convertIndexToBoardXY(i, OBSTACLE_GRID_SIZE)
        return { isObstacle, x, y }
      })
      .filter((o) => o.isObstacle)
      .map(({ x, y }) => [x, y])
  }

  const plateXY = convertIndexToBoardXY(plateData.index, BOARD_GRID_SIZE)
  const boardPlateObstacles = newObstacles.map(([x, y]) => [
    x + MOVE_GRID_VALUE * plateXY.x,
    y + MOVE_GRID_VALUE * plateXY.y,
  ])

  const newPlate = { ...plateData }
  newPlate.plate.obstacles = boardPlateObstacles

  return newPlate
}
