export enum TDirections {
  'right' = 'right',
  'left' = 'left',
  'up' = 'up',
  'down' = 'down',
  'disabled' = 'disabled',
}

export enum PlateType {
  'plate',
  'ship',
  'blank',
}

export enum PlateId {
  'X' = 'X',
  'Y' = 'Y',
  'Z' = 'Z',
  'D' = 'D',
  'T' = 'T',
  'B' = 'B',
  'L' = 'L',
  'S' = 'S',
  'E' = 'E',
}

export enum PlateNextMoveTypes {
  'blocked',
  'blockedFling',
  'fling',
  'escape',
}

export enum LevelDifficulty {
  'starter',
  'junior',
  'expert',
  'master',
  'wizard',
}

export type BoardGridItem = {
  type: PlateType
  index: number
}

export type Coordinates = {
  x: number
  y: number
}

export type MoveDirection = {
  direction: TDirections
  value: number
  axis: string
}

export type Cell = {
  x: number
  y: number
  plateType: PlateType
  plateIndex: number
}

export type ObstacleInitData = number[][]

export type PlateModel = {
  id: PlateId
  type: PlateType
  obstacles: ObstacleInitData
}

export type PlateInitData = {
  index: number
  plate: PlateModel
  rotate: number
}

export type LevelData = {
  id: number
  difficulty: LevelDifficulty
  data: PlateInitData[]
}

export type LevelInitData = {
  id: number
  difficulty: LevelDifficulty
  data: {
    index: number
    plate: PlateId
    rotate: number
  }[]
}

export type MoveablePlate = {
  plate: BoardGridItem
  moveDirection: MoveDirection
  plateObstacles: PlateObstacles
  isMoveable: boolean
}

export type PressedValue = {
  plateIndex: number
  direction: TDirections
}

export type NextMoveValue = {
  plateIndex: number
  axis: string
  toValue: number
  type?: PlateNextMoveTypes
}

export type BoardGrid = BoardGridItem[][]
export type PlateObstacle = Cell | null
export type PlateObstacles = PlateObstacle[]
export type ObstacleGrid = PlateObstacle[][]
export type MoveablePlates = MoveablePlate[]
export type PlatesInitData = PlateInitData[]
