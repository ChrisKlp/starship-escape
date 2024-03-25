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
  PLATE_SIZE,
  directionValues,
} from '@/constants/gameConstants'
import {
  getBlankPlateAdjacent,
  getIsGameFinished,
  sortLevelData,
  updateLevelData,
} from '@/lib/game'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import Plate from './Plate'
import PressablePlate from './PressablePlate'
import Obstacle from './Obstacle'

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
  const isGameFinished = getIsGameFinished(levelData)

  console.log(isGameFinished)

  const moveablePlatesIndexes = adjacentPlates
    .filter((p) => p.isMoveable)
    .map((i) => i.plate.index)

  const isMoveable = (index: number) => {
    'worklet'
    return moveablePlatesIndexes.includes(index)
  }

  const onFlingAnimationEnd = (plateIndex: number) => {
    'worklet'
    const moveablePlate = adjacentPlates.find(
      (p) => p.plate.index === plateIndex
    )
    if (moveablePlate) {
      const newLevelData = updateLevelData(levelData, moveablePlate)
      runOnJS(setLevelData)(newLevelData)
    }
  }

  const getBlockedAnimation = (toValue: number) => {
    'worklet'
    return withRepeat(withTiming(toValue, { duration: 100 }), 2, true)
  }

  const getBlockedFlingAnimation = (toValue: number) => {
    'worklet'
    return withRepeat(withTiming(toValue, { duration: 100 }), 2, true)
  }

  const getFlingAnimation = (toValue: number) => {
    'worklet'
    return withTiming(toValue, { duration: 200 }, (isFinished) => {
      if (isFinished) {
        onFlingAnimationEnd(nextMoveValue.value.plateIndex)
        pressedValue.value = initPressedValue
        nextMoveValue.value = initNextMoveValue
      }
    })
  }

  const getAnimation = () => {
    'worklet'
    switch (nextMoveValue.value.type) {
      case PlateNextMoveTypes.fling:
        return getFlingAnimation(nextMoveValue.value.toValue)
      case PlateNextMoveTypes.blockedFling:
        return getBlockedFlingAnimation(nextMoveValue.value.toValue)
      default:
        return getBlockedAnimation(nextMoveValue.value.toValue)
    }
  }

  const handleFling = (pressedValue: PressedValue) => {
    'worklet'
    const moveablePlate = adjacentPlates.find(
      (p) => p.plate.index === pressedValue.plateIndex
    )
    if (moveablePlate?.moveDirection.direction === pressedValue.direction) {
      const toValue = moveablePlate.moveDirection.value * PLATE_SIZE
      nextMoveValue.value = {
        plateIndex: pressedValue.plateIndex,
        axis: moveablePlate.moveDirection.axis,
        toValue,
        type: PlateNextMoveTypes.fling,
      }
    }
  }

  const handleBlockedFling = (pressedValue: PressedValue) => {
    'worklet'
    const directionValue = directionValues[pressedValue.direction]
    nextMoveValue.value = {
      plateIndex: pressedValue.plateIndex,
      axis: directionValue.axis,
      toValue: (PLATE_SIZE / 3) * directionValue.value,
      type: PlateNextMoveTypes.blockedFling,
    }
  }

  const handleBlock = (pressedValue: PressedValue) => {
    'worklet'
    const directionValue = directionValues[pressedValue.direction]
    nextMoveValue.value = {
      plateIndex: pressedValue.plateIndex,
      axis: directionValue.axis,
      toValue: MARGIN * directionValue.value,
      type: PlateNextMoveTypes.blocked,
    }
  }

  const getPlateNextMoveType = (pressedValue: PressedValue) => {
    'worklet'
    let plateNextMoveType = PlateNextMoveTypes.blocked
    const adjacentPlate = adjacentPlates.find(
      (p) => p.plate.index === pressedValue.plateIndex
    )
    if (adjacentPlate?.moveDirection.direction === pressedValue.direction) {
      plateNextMoveType = isMoveable(pressedValue.plateIndex)
        ? PlateNextMoveTypes.fling
        : PlateNextMoveTypes.blockedFling
    }
    return plateNextMoveType
  }

  const handlePress = (pressedValue: PressedValue) => {
    'worklet'
    const nextMoveType = getPlateNextMoveType(pressedValue)
    switch (nextMoveType) {
      case PlateNextMoveTypes.fling:
        return handleFling(pressedValue)
      case PlateNextMoveTypes.blockedFling:
        return handleBlockedFling(pressedValue)
      default:
        return handleBlock(pressedValue)
    }
  }

  useAnimatedReaction(
    () => pressedValue.value,
    (pressedValue) => {
      if (pressedValue.plateIndex > -1) {
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
                getAnimation={getAnimation}
              >
                <Plate data={plate} isMoveable={isMoveablePlate} />
              </PressablePlate>
            )
          })}
        </View>
        <View style={[styles.board, styles.absoluteBoard]} pointerEvents="none">
          {levelData.map((plate) => {
            return (
              <Obstacle
                key={`${plate.id}-${plate.index}`}
                data={plate}
                nextMoveValue={nextMoveValue}
                getAnimation={getAnimation}
              ></Obstacle>
            )
          })}
        </View>
      </View>
    </View>
  )
}

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
  },
})
