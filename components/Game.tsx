import Board from '@/components/Board'
import { MoveablePlate, PlatesInitData } from '@/constants/Types'
import { BOARD_SIZE, MARGIN, PLATE_SIZE } from '@/constants/gameConstants'
import Level from '@/lib/Level'
import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'

type Props = {
  level: Level
}

export default function Game({ level }: Props) {
  const opacity = useSharedValue(0)
  const scale = useSharedValue(0.8)

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(opacity.value, { duration: 200 }),
    transform: [
      {
        scale: withTiming(scale.value, { duration: 200 }),
      },
    ],
  }))

  useEffect(() => {
    opacity.value = 1
    scale.value = 1
  }, [])

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Board level={level} />
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
