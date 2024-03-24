import {
  LevelData,
  NextMoveValue,
  PlateNextMoveTypes,
  PressedValue,
  TDirections,
} from '@/constants/Types'
import {
  BOARD_SIZE,
  MARGIN,
  OBSTACLE_SIZE,
  PLATE_SIZE,
} from '@/constants/gameConstants'
import {
  getBlankPlateAdjacent,
  sortLevelData,
  updateLevelData,
} from '@/lib/game'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import Plate from './Plate'
import PressablePlate from './PressablePlate'
import { print } from '@/utils/utils'

type Props = {
  levelInitData: LevelData
}

export const initPressedValue = {
  plateIndex: -1,
  direction: TDirections.disabled,
}

export const initNextMoveValue = {
  plateIndex: -1,
  axis: 'z',
  toValue: 0,
}

export default function Board({ levelInitData }: Props) {
  const [levelData, setLevelData] = useState(sortLevelData(levelInitData))
  const pressedValue = useSharedValue<PressedValue>(initPressedValue)
  const nextMoveValue = useSharedValue<NextMoveValue>(initNextMoveValue)

  const adjacentPlates = getBlankPlateAdjacent(levelData)
  // print(
  //   adjacentPlates.map((i) => ({ plate: i.plate, isMoveable: i.isMoveable }))
  // )
  const moveablePlatesIndexes = adjacentPlates
    .filter((p) => p.isMoveable)
    .map((i) => i.plate.index)
  // console.log('moveablePlatesIndexes')
  // print(moveablePlatesIndexes)

  const isMoveable = (index: number) => {
    'worklet'
    return moveablePlatesIndexes.includes(index)
  }

  const onFlingAnimationEnd = (plateIndex: number) => {
    const moveablePlate = adjacentPlates.find(
      (p) => p.plate.index === plateIndex
    )
    if (moveablePlate) {
      const newLevelData = updateLevelData(levelData, moveablePlate)
      setLevelData(newLevelData)
    }
  }

  const getBlockedAnimation = () => {
    'worklet'
    return withSequence(
      withSpring(MARGIN / 2, { duration: 100 }),
      withSpring(0, { duration: 100 })
    )
  }

  const getHalfwayAnimation = () => {
    'worklet'
    return withSequence(
      withSpring(PLATE_SIZE / 2, { duration: 200 }),
      withSpring(0, { duration: 200 })
    )
  }

  const getFlingAnimation = (toValue: number) => {
    'worklet'
    return withTiming(toValue, { duration: 200 }, (isFinished) => {
      if (isFinished) {
        runOnJS(onFlingAnimationEnd)(nextMoveValue.value.plateIndex)
        pressedValue.value = initPressedValue
        nextMoveValue.value = initNextMoveValue
      }
    })
  }

  const handleFling = (pressedValue: PressedValue) => {
    'worklet'
    // console.log('handleFling', pressedValue.plateIndex)
    const moveablePlate = adjacentPlates.find(
      (p) => p.plate.index === pressedValue.plateIndex
    )
    if (moveablePlate?.moveDirection.direction === pressedValue.direction) {
      const toValue = moveablePlate.moveDirection.value * PLATE_SIZE
      nextMoveValue.value = {
        plateIndex: pressedValue.plateIndex,
        axis: moveablePlate.moveDirection.axis,
        toValue,
      }
    }
  }

  const handleBlockedFling = (pressedValue: PressedValue) => {
    'worklet'
    // console.log('handleBlockedFling', pressedValue.plateIndex)
  }

  const handleBlock = (pressedValue: PressedValue) => {
    'worklet'
    // console.log('handleBlock', pressedValue.plateIndex)
  }

  const getPlateNextMoveType = (plateIndex: number) => {
    'worklet'
    let plateNextMoveType = PlateNextMoveTypes.disabled
    const adjacentPlate = adjacentPlates.find(
      (p) => p.plate.index === plateIndex
    )
    if (adjacentPlate) {
      plateNextMoveType = isMoveable(plateIndex)
        ? PlateNextMoveTypes.movable
        : PlateNextMoveTypes.blankPlateNeighbor
    }
    return plateNextMoveType
  }

  const handlePress = (pressedValue: PressedValue) => {
    'worklet'
    const nextMoveType = getPlateNextMoveType(pressedValue.plateIndex)
    switch (nextMoveType) {
      case PlateNextMoveTypes.movable:
        return handleFling(pressedValue)
      case PlateNextMoveTypes.blankPlateNeighbor:
        return handleBlockedFling(pressedValue)
      default:
        return handleBlock(pressedValue)
    }
  }

  useAnimatedReaction(
    () => pressedValue.value,
    (pressedValue) => {
      if (pressedValue.plateIndex > -1) {
        // console.log('pressedValue', pressedValue)
        handlePress(pressedValue)
      }
    }
  )

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={[styles.board]}>
          {levelData.map((plate) => {
            const isMoveablePlate = moveablePlatesIndexes.includes(plate.index)
            return (
              <PressablePlate
                key={`${plate.id}-${plate.index}`}
                data={plate}
                isMoveable={isMoveablePlate}
                pressedValue={pressedValue}
                nextMoveValue={nextMoveValue}
                getFlingAnimation={getFlingAnimation}
              >
                <Plate data={plate} isMoveable={isMoveablePlate} />
              </PressablePlate>
            )
          })}
        </View>
      </View>
    </View>
  )
}

// function Obstacle({ data }: { data: PlateInitData }) {
//   const dataId = data.id as keyof typeof plateImages
//   const imageSource = plateImages[dataId]
//   const rotate = `${data.styles.rotate || 0}deg`
//   return (
//     <View style={styles.plateContainer}>
//       {data.type !== PlateType.blank && (
//         <View pointerEvents="box-none" style={styles.plateObstaclesWrapper}>
//           <Image
//             style={[styles.plateImage, { transform: [{ rotate: rotate }] }]}
//             source={imageSource}
//           />
//         </View>
//       )}
//     </View>
//   )
// }

const borderRadius = 8

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    width: BOARD_SIZE + MARGIN,
    height: BOARD_SIZE + MARGIN,
    padding: MARGIN / 2,
    backgroundColor: '#050d1d90',
    borderRadius,
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: BOARD_SIZE,
    height: BOARD_SIZE,
  },
  absoluteBoard: {
    position: 'absolute',
    top: MARGIN / 2,
    left: MARGIN / 2,
    opacity: 0,
  },
  plateContainer: {
    width: PLATE_SIZE,
    height: PLATE_SIZE,
  },
  plateObstaclesWrapper: {
    position: 'absolute',
    left: -OBSTACLE_SIZE,
    top: -OBSTACLE_SIZE,
    right: -OBSTACLE_SIZE,
    bottom: -OBSTACLE_SIZE,
  },
  plateImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    transform: [{ scale: 1 }],
  },
  plateWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: MARGIN / 2,
    backgroundColor: '#1e386c',
    borderRadius: borderRadius / 2,
  },
  blankPlate: {
    backgroundColor: '',
  },
})
