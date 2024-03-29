import { LevelInitData } from '@/constants/Types'
import parseLevelData from './gameLevelParser'
import level1Data from './gameLevels/level1'
import level2Data from './gameLevels/level2'
import level3Data from './gameLevels/level3'
import level4Data from './gameLevels/level4'
import level5Data from './gameLevels/level5'
import level6Data from './gameLevels/level6'
import level7Data from './gameLevels/level7'
import level8Data from './gameLevels/level8'

export const gameLevels: Record<number, LevelInitData> = {
  1: level1Data,
  2: level2Data,
  3: level3Data,
  4: level4Data,
  5: level5Data,
  6: level6Data,
  7: level7Data,
  8: level8Data,
}

export function getGameLevel(levelIndex: number) {
  const levelIdx = levelIndex as keyof typeof gameLevels
  return parseLevelData(gameLevels[levelIdx])
}
