import { LevelDifficulty, LevelInitData, PlateId } from '@/constants/Types'
import gamePlates from '../gamePlates'

const level6Data: LevelInitData = {
  id: 6,
  difficulty: LevelDifficulty.starter,
  data: [
    {
      index: 0,
      plate: PlateId.L,
      rotate: 1,
    },
    {
      index: 1,
      plate: PlateId.D,
      rotate: 1,
    },
    {
      index: 2,
      plate: PlateId.B,
      rotate: 1,
    },
    {
      index: 3,
      plate: PlateId.Z,
      rotate: 0,
    },
    {
      index: 4,
      plate: PlateId.Y,
      rotate: 0,
    },
    {
      index: 5,
      plate: PlateId.S,
      rotate: 0,
    },
    {
      index: 6,
      plate: PlateId.T,
      rotate: 2,
    },
    {
      index: 7,
      plate: PlateId.E,
      rotate: 0,
    },
    {
      index: 8,
      plate: PlateId.X,
      rotate: 3,
    },
  ],
}

export default level6Data
