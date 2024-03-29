import { LevelDifficulty, LevelInitData, PlateId } from '@/constants/Types'

const level1Data: LevelInitData = {
  id: 1,
  difficulty: LevelDifficulty.starter,
  data: [
    {
      index: 0,
      plate: PlateId.B,
      rotate: 0,
    },
    {
      index: 1,
      plate: PlateId.X,
      rotate: 3,
    },
    {
      index: 2,
      plate: PlateId.D,
      rotate: 0,
    },
    {
      index: 3,
      plate: PlateId.S,
      rotate: 0,
    },
    {
      index: 4,
      plate: PlateId.L,
      rotate: 3,
    },
    {
      index: 5,
      plate: PlateId.Y,
      rotate: 2,
    },
    {
      index: 6,
      plate: PlateId.T,
      rotate: 3,
    },
    {
      index: 7,
      plate: PlateId.E,
      rotate: 0,
    },
    {
      index: 8,
      plate: PlateId.Z,
      rotate: 1,
    },
  ],
}

export default level1Data
