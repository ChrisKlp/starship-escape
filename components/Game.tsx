import Board from '@/components/Board'
import { MoveablePlate, PlatesInitData } from '@/constants/Types'
import { BOARD_SIZE, MARGIN, PLATE_SIZE } from '@/constants/gameConstants'
import Level from '@/lib/Level'
import { useState } from 'react'
import { StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'

type Props = {
  level: Level
}

export default function Game({ level }: Props) {
  const [platesData, setPlatesData] = useState<PlatesInitData>(
    level.getPlatesData()
  )
  const updateGame = (movedPlate: MoveablePlate) => {
    const updatedLevelData = level.getMovedPlatesData(movedPlate)
    setPlatesData(updatedLevelData)
  }

  return (
    <Animated.View style={[styles.container]}>
      <Board level={level} platesData={platesData} updateGame={updateGame} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: MARGIN - 8,
    paddingVertical: 4,
    width: BOARD_SIZE * PLATE_SIZE + 8,
    backgroundColor: '#050d1d90',
    borderRadius: 8,
  },
})
