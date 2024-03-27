import { LevelData, LevelDifficulty, PlateId } from '@/constants/Types'
import gamePlates from '../gamePlates'

const level4Data: LevelData = {
  id: 'level4',
  name: 'Level 4',
  difficulty: LevelDifficulty.starter,
  data: [
    {
      index: 0,
      plate: gamePlates[PlateId.X],
      rotate: 3,
    },
    {
      index: 1,
      plate: gamePlates[PlateId.Y],
      rotate: 2,
    },
    {
      index: 2,
      plate: gamePlates[PlateId.E],
      rotate: 0,
    },
    {
      index: 3,
      plate: gamePlates[PlateId.Z],
      rotate: 0,
    },
    {
      index: 4,
      plate: gamePlates[PlateId.D],
      rotate: 0,
    },
    {
      index: 5,
      plate: gamePlates[PlateId.B],
      rotate: 1,
    },
    {
      index: 6,
      plate: gamePlates[PlateId.T],
      rotate: 0,
    },
    {
      index: 7,
      plate: gamePlates[PlateId.L],
      rotate: 3,
    },
    {
      index: 8,
      plate: gamePlates[PlateId.S],
      rotate: 0,
    },
  ],
}

export default level4Data
