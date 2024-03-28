import { PlateId, PlateModel, PlateType } from '@/constants/Types'

const plateS: PlateModel = {
  id: PlateId.S,
  type: PlateType.ship,
  obstacles: [
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1],
  ],
}

const plateB: PlateModel = {
  id: PlateId.B,
  type: PlateType.plate,
  obstacles: [
    [1, 0],
    [2, 0],
    [1, 1],
    [2, 1],
  ],
}

const plateL: PlateModel = {
  id: PlateId.L,
  type: PlateType.plate,
  obstacles: [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
  ],
}

const plateD: PlateModel = {
  id: PlateId.D,
  type: PlateType.plate,
  obstacles: [
    [1, 1],
    [2, 2],
  ],
}

const plateT: PlateModel = {
  id: PlateId.T,
  type: PlateType.plate,
  obstacles: [
    [1, 1],
    [2, 1],
  ],
}

const plateX: PlateModel = {
  id: PlateId.X,
  type: PlateType.plate,
  obstacles: [[1, 1]],
}

const plateY: PlateModel = {
  id: PlateId.Y,
  type: PlateType.plate,
  obstacles: [[1, 1]],
}

const plateZ: PlateModel = {
  id: PlateId.Z,
  type: PlateType.plate,
  obstacles: [[1, 1]],
}

const plateE: PlateModel = {
  id: PlateId.E,
  type: PlateType.blank,
  obstacles: [],
}

const gamePlates = {
  [PlateId.B]: plateB,
  [PlateId.L]: plateL,
  [PlateId.D]: plateD,
  [PlateId.T]: plateT,
  [PlateId.X]: plateX,
  [PlateId.Y]: plateY,
  [PlateId.Z]: plateZ,
  [PlateId.S]: plateS,
  [PlateId.E]: plateE,
}

function getGamePlate(id: PlateId): PlateModel {
  return { ...gamePlates[id] }
}

export default getGamePlate
