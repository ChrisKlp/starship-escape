import {
  NextMoveValue,
  PlateId,
  PlateInitData,
  PlateType,
} from '@/constants/Types'
import { OBSTACLE_SIZE, PLATE_SIZE } from '@/constants/gameConstants'
import { Image, StyleSheet, View } from 'react-native'
import Animated, {
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'

type Props = {
  data: PlateInitData
  nextMoveValue: SharedValue<NextMoveValue>
  getAnimation: () => number
}

const imageList = {
  [PlateId.B]: require('@/assets/images/plates/plateB.png'),
  [PlateId.D]: require('@/assets/images/plates/plateD.png'),
  [PlateId.L]: require('@/assets/images/plates/plateL.png'),
  [PlateId.S]: require('@/assets/images/plates/plateS.png'),
  [PlateId.T]: require('@/assets/images/plates/plateT.png'),
  [PlateId.X]: require('@/assets/images/plates/plateX.png'),
  [PlateId.Y]: require('@/assets/images/plates/plateY.png'),
  [PlateId.Z]: require('@/assets/images/plates/plateZ.png'),
}

export default function Obstacle({ data, nextMoveValue, getAnimation }: Props) {
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)

  const dataId = data.id as keyof typeof imageList
  const imageSource = imageList[dataId]
  const rotate = `${data.styles.rotate || 0}deg`

  useAnimatedReaction(
    () => nextMoveValue.value,
    (nextMoveValue) => {
      if (
        nextMoveValue.plateIndex > -1 &&
        nextMoveValue.plateIndex === data.index
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
      ],
    }
  })

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {data.type !== PlateType.blank && (
        <View style={styles.wrapper}>
          <Image
            style={[styles.plateImage, { transform: [{ rotate: rotate }] }]}
            source={imageSource}
          />
        </View>
      )}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: PLATE_SIZE,
    height: PLATE_SIZE,
  },
  wrapper: {
    position: 'absolute',
    left: -OBSTACLE_SIZE,
    top: -OBSTACLE_SIZE,
    right: -OBSTACLE_SIZE,
    bottom: -OBSTACLE_SIZE,
  },
  plateImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
})
