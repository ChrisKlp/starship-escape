import { LevelInitData } from '@/constants/Types'
import parseLevelData from './gameLevelParser'
import level1Data from './gameLevels/level1'
import level2Data from './gameLevels/level2'
import level3Data from './gameLevels/level3'
import level4Data from './gameLevels/level4'

export const gameLevels: Record<number, LevelInitData> = {
  1: level1Data,
  2: level2Data,
  3: level3Data,
  4: level4Data,
}

export function getGameLevel(levelIndex: number) {
  const levelIdx = levelIndex as keyof typeof gameLevels
  return parseLevelData(gameLevels[levelIdx])
}
