import Board from '@/components/Board'
import { BOARD_SIZE, MARGIN, PLATE_SIZE } from '@/constants/gameConstants'
import { levelInitData } from '@/lib/gameLevels'
import { LinearGradient } from 'expo-linear-gradient'
import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function GamePage() {
  const [isLevelFinished, setIsLevelFinished] = useState(false)
  const opacity = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(opacity.value),
  }))

  const setEndGame = (isFinished: boolean) => {
    setIsLevelFinished(isFinished)
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
            <Board levelInitData={levelInitData} setEndGame={setEndGame} />
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
