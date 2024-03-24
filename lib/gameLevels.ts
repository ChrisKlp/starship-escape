import { LevelData, PlateId, PlateType } from '@/constants/Types'

export const levelInitData: LevelData = [
  {
    id: PlateId.B,
    index: 0,
    type: PlateType.plate,
    obstacles: [
      [1, 0],
      [2, 0],
      [1, 1],
      [2, 1],
    ],
    styles: {},
  },
  {
    id: PlateId.X,
    index: 1,
    type: PlateType.plate,
    obstacles: [[3, 2]],
    styles: {
      rotate: 270,
    },
  },
  {
    id: PlateId.D,
    index: 2,
    obstacles: [
      [5, 1],
      [6, 2],
    ],
    type: PlateType.plate,
    styles: {},
  },
  {
    id: PlateId.S,
    index: 3,
    type: PlateType.ship,
    obstacles: [
      [0, 3],
      [1, 3],
      [2, 3],
      [3, 3],
    ],
    styles: {},
  },
  {
    id: PlateId.Y,
    index: 5,
    type: PlateType.plate,
    obstacles: [[6, 4]],
    styles: {
      rotate: 180,
    },
  },
  {
    id: PlateId.T,
    index: 6,
    type: PlateType.plate,
    obstacles: [
      [1, 5],
      [1, 6],
    ],
    styles: {
      rotate: 270,
    },
  },
  {
    id: PlateId.E,
    index: 7,
    type: PlateType.blank,
    obstacles: [],
    styles: {},
  },
  {
    id: PlateId.Z,
    index: 8,
    type: PlateType.plate,
    obstacles: [[6, 5]],
    styles: {
      rotate: 90,
    },
  },
  {
    id: PlateId.L,
    index: 4,
    type: PlateType.plate,
    obstacles: [
      [2, 4],
      [3, 4],
      [2, 5],
      [3, 5],
    ],
    styles: {
      rotate: 270,
    },
  },
]
