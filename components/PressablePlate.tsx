import {
  NextMoveValue,
  PlateInitData,
  PlateNextMoveTypes,
  PlateType,
  PressedValue,
  TDirections,
} from '@/constants/Types'
import { useEffect } from 'react'
import {
  Directions,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler'
import Animated, {
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'

type Props = {
  data: PlateInitData
  isMoveable: boolean
  children: React.ReactNode
  pressedValue: SharedValue<PressedValue>
  nextMoveValue: SharedValue<NextMoveValue>
  getAnimation: () => number
  movesCount: number
}

export default function PressablePlate({
  data,
  isMoveable,
  children,
  pressedValue,
  nextMoveValue,
  getAnimation,
  movesCount,
}: Props) {
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const scale = useSharedValue(1)
  const opacity = useSharedValue(1)

  const updatePressedValue = (direction: TDirections) => {
    'worklet'
    if (
      pressedValue.value.plateIndex === -1 &&
      nextMoveValue.value.plateIndex === -1
    ) {
      pressedValue.value = { plateIndex: data.index, direction }
    }
  }

  const flingDown = Gesture.Fling()
    .direction(Directions.DOWN)
    .onStart(() => {
      updatePressedValue(TDirections.down)
    })

  const flingUp = Gesture.Fling()
    .direction(Directions.UP)
    .onStart(() => {
      updatePressedValue(TDirections.up)
    })

  const flingLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onStart(() => {
      updatePressedValue(TDirections.left)
    })

  const flingRight = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onStart(() => {
      updatePressedValue(TDirections.right)
    })

  useAnimatedReaction(
    () => nextMoveValue.value,
    (nextMoveValue) => {
      if (
        nextMoveValue.plateIndex > -1 &&
        nextMoveValue.plateIndex === data.index &&
        nextMoveValue.type !== PlateNextMoveTypes.escape
      ) {
        if (nextMoveValue.axis === 'x') {
          translateX.value = getAnimation()
        } else if (nextMoveValue.axis === 'y') {
          translateY.value = getAnimation()
        }
      }
    }
  )

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
        {
          scale: scale.value,
        },
      ],
      opacity: opacity.value,
    }
  })

  useEffect(() => {
    if (movesCount === 0) {
      scale.value = 0.8
      opacity.value = 0
      scale.value = withDelay(data.index * 100, withTiming(1))
      opacity.value = withDelay(data.index * 100, withTiming(1))
    }
  }, [])

  return data.plate.type !== PlateType.blank ? (
    <GestureDetector
      gesture={Gesture.Race(flingDown, flingUp, flingLeft, flingRight)}
    >
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </GestureDetector>
  ) : (
    <>{children}</>
  )
}
