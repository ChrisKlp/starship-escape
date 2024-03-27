import { LevelData } from '@/constants/Types'
import level1Data from './gameLevels/level1'
import parseLevelData from './gameLevelParser'

export const gameLevels: Record<number, LevelData> = {
  1: level1Data,
}

export function getGameLevel(levelIndex: number) {
  const levelIdx = levelIndex as keyof typeof gameLevels
  return parseLevelData(gameLevels[levelIdx])
}
