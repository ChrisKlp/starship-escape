import Board from '@/components/Board'
import { MoveablePlate } from '@/constants/Types'
import { BOARD_SIZE, MARGIN, PLATE_SIZE } from '@/constants/gameConstants'
import Level from '@/lib/Level'
import { getGameLevel } from '@/lib/gameLevels'
import { LinearGradient } from 'expo-linear-gradient'
import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

const level = new Level(getGameLevel(1))

export default function GamePage() {
  const [isLevelFinished, setIsLevelFinished] = useState(false)
  const [platesData, setPlatesData] = useState(level.platesData)
  const opacity = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(opacity.value),
  }))

  const setEndGame = (isFinished: boolean) => {
    setIsLevelFinished(isFinished)
  }

  const updateGame = (moveablePlate: MoveablePlate) => {
    const updatedLevelData = level.getNewPlatesData(moveablePlate)
    setPlatesData(updatedLevelData)
  }

  useEffect(() => {
    if (isLevelFinished) {
      opacity.value = 0
    }
  }, [isLevelFinished])

  return (
    <LinearGradient
      colors={['#020711', '#142e65', '#020711']}
      style={styles.container}
    >
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaView style={styles.container}>
          <Animated.View style={[styles.container, animatedStyle]}>
            <Board
              level={level}
              platesData={platesData}
              setEndGame={setEndGame}
              updateGame={updateGame}
            />
          </Animated.View>
        </SafeAreaView>
      </GestureHandlerRootView>
    </LinearGradient>
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
