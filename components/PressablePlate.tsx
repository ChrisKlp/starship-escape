import {
  NextMoveValue,
  PlateInitData,
  PlateType,
  PressedValue,
  TDirections,
} from '@/constants/Types'
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
} from 'react-native-reanimated'

type Props = {
  data: PlateInitData
  isMoveable: boolean
  children: React.ReactNode
  pressedValue: SharedValue<PressedValue>
  nextMoveValue: SharedValue<NextMoveValue>
  getFlingAnimation: (toValue: number) => number
}

export default function PressablePlate({
  data,
  isMoveable,
  children,
  pressedValue,
  nextMoveValue,
  getFlingAnimation,
}: Props) {
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)

  const updatePressedValue = (direction: TDirections) => {
    'worklet'
    pressedValue.value = { plateIndex: data.index, direction }
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
        nextMoveValue.plateIndex === data.index
      ) {
        // console.log('nextMoveValue', nextMoveValue)
        if (nextMoveValue.axis === 'x') {
          translateX.value = getFlingAnimation(nextMoveValue.toValue)
        } else if (nextMoveValue.axis === 'y') {
          translateY.value = getFlingAnimation(nextMoveValue.toValue)
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
      ],
    }
  })

  return data.type !== PlateType.blank ? (
    <GestureDetector
      gesture={Gesture.Exclusive(flingDown, flingUp, flingLeft, flingRight)}
    >
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </GestureDetector>
  ) : (
    <>{children}</>
  )
}
