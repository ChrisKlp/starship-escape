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
  'disabled',
  'movable',
  'blankPlateNeighbor',
}

export type Plate = {
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

export type PlateInitData = {
  id: PlateId
  index: number
  type: PlateType
  obstacles: ObstacleInitData
  styles: { [key: string]: number }
}

export type MoveablePlate = {
  plate: Plate
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
}

export type BoardGrid = Plate[][]
export type PlateObstacle = Cell | null
export type PlateObstacles = PlateObstacle[]
export type ObstacleGrid = PlateObstacles[]
export type MoveablePlates = MoveablePlate[]
export type LevelData = PlateInitData[]
