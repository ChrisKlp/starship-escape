import { LevelDifficulty, LevelInitData, PlateId } from '@/constants/Types'
import gamePlates from '../gamePlates'

const level7Data: LevelInitData = {
  id: 7,
  difficulty: LevelDifficulty.starter,
  data: [
    {
      index: 0,
      plate: PlateId.X,
      rotate: 2,
    },
    {
      index: 1,
      plate: PlateId.L,
      rotate: 0,
    },
    {
      index: 2,
      plate: PlateId.B,
      rotate: 0,
    },
    {
      index: 3,
      plate: PlateId.Z,
      rotate: 0,
    },
    {
      index: 4,
      plate: PlateId.Y,
      rotate: 3,
    },
    {
      index: 5,
      plate: PlateId.S,
      rotate: 0,
    },
    {
      index: 6,
      plate: PlateId.D,
      rotate: 1,
    },
    {
      index: 7,
      plate: PlateId.E,
      rotate: 0,
    },
    {
      index: 8,
      plate: PlateId.T,
      rotate: 2,
    },
  ],
}

export default level7Data
