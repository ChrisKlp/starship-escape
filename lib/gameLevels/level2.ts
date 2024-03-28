import { LevelDifficulty, LevelInitData, PlateId } from '@/constants/Types'

const level2Data: LevelInitData = {
  id: 'level2',
  name: 'Level 2',
  difficulty: LevelDifficulty.starter,
  data: [
    {
      index: 0,
      plate: PlateId.L,
      rotate: 0,
    },
    {
      index: 1,
      plate: PlateId.X,
      rotate: 1,
    },
    {
      index: 2,
      plate: PlateId.T,
      rotate: 0,
    },
    {
      index: 3,
      plate: PlateId.Y,
      rotate: 0,
    },
    {
      index: 4,
      plate: PlateId.Z,
      rotate: 0,
    },
    {
      index: 5,
      plate: PlateId.B,
      rotate: 0,
    },
    {
      index: 6,
      plate: PlateId.D,
      rotate: 0,
    },
    {
      index: 7,
      plate: PlateId.E,
      rotate: 0,
    },
    {
      index: 8,
      plate: PlateId.S,
      rotate: 0,
    },
  ],
}

export default level2Data
