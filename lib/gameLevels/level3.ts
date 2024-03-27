import { LevelData, LevelDifficulty, PlateId } from '@/constants/Types'
import gamePlates from '../gamePlates'

const level3Data: LevelData = {
  id: 'level3',
  name: 'Level 3',
  difficulty: LevelDifficulty.starter,
  data: [
    {
      index: 0,
      plate: gamePlates[PlateId.L],
      rotate: 2,
    },
    {
      index: 1,
      plate: gamePlates[PlateId.T],
      rotate: 1,
    },
    {
      index: 2,
      plate: gamePlates[PlateId.Z],
      rotate: 0,
    },
    {
      index: 3,
      plate: gamePlates[PlateId.Y],
      rotate: 3,
    },
    {
      index: 4,
      plate: gamePlates[PlateId.X],
      rotate: 1,
    },
    {
      index: 5,
      plate: gamePlates[PlateId.B],
      rotate: 1,
    },
    {
      index: 6,
      plate: gamePlates[PlateId.S],
      rotate: 0,
    },
    {
      index: 7,
      plate: gamePlates[PlateId.E],
      rotate: 0,
    },
    {
      index: 8,
      plate: gamePlates[PlateId.D],
      rotate: 0,
    },
  ],
}

export default level3Data
