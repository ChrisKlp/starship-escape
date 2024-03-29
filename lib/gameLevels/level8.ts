import { LevelDifficulty, LevelInitData, PlateId } from '@/constants/Types'
import gamePlates from '../gamePlates'

const level8Data: LevelInitData = {
  id: 8,
  difficulty: LevelDifficulty.starter,
  data: [
    {
      index: 0,
      plate: PlateId.D,
      rotate: 1,
    },
    {
      index: 1,
      plate: PlateId.Z,
      rotate: 0,
    },
    {
      index: 2,
      plate: PlateId.T,
      rotate: 1,
    },
    {
      index: 3,
      plate: PlateId.S,
      rotate: 0,
    },
    {
      index: 4,
      plate: PlateId.E,
      rotate: 0,
    },
    {
      index: 5,
      plate: PlateId.Y,
      rotate: 2,
    },
    {
      index: 6,
      plate: PlateId.L,
      rotate: 2,
    },
    {
      index: 7,
      plate: PlateId.X,
      rotate: 1,
    },
    {
      index: 8,
      plate: PlateId.B,
      rotate: 1,
    },
  ],
}

export default level8Data
