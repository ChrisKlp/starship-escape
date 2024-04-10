import Obstacle from '@/components/Obstacle'
import Plate from '@/components/Plate'
import {
  MoveablePlate,
  NextMoveValue,
  PlateNextMoveTypes,
  PlateType,
  PlatesInitData,
  PressedValue,
  TDirections,
} from '@/constants/Types'
import {
  BOARD_SIZE,
  MARGIN,
  PLATE_SIZE,
  directionValues,
} from '@/constants/gameConstants'
import Level from '@/lib/Level'
import {
  getBlockedAnimation,
  getBlockedFlingAnimation,
  getEscapeAnimation,
  getFlingAnimation,
} from '@/lib/boardAnimations'
import { useEffect, useRef, useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated'
import PressablePlate from './PressablePlate'
import { router } from 'expo-router'

type Props = {
  level: Level
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

export default function Board({ level }: Props) {
  const [platesData, setPlatesData] = useState<PlatesInitData>(
    level.getPlatesData()
  )
  const pressedValue = useSharedValue<PressedValue>(initPressedValue)
  const nextMoveValue = useSharedValue<NextMoveValue>(initNextMoveValue)

  const { isGameFinished, readyToMoveIndexes, readyToMovePlates, movesCount } =
    level.getGameStatus()

  const updateGame = (movedPlate: MoveablePlate) => {
    const updatedLevelData = level.getMovedPlatesData(movedPlate)
    setPlatesData(updatedLevelData)
  }

  const findPlate = (plateIndex: number) => {
    'worklet'
    return readyToMovePlates.find((p) => p.plate.index === plateIndex)
  }

  const onAnimationEnd = () => {
    'worklet'
    pressedValue.value = initPressedValue
    nextMoveValue.value = initNextMoveValue
  }

  const onFlingAnimationEnd = (plateIndex: number) => {
    'worklet'
    const moveablePlate = findPlate(plateIndex)
    if (moveablePlate) {
      runOnJS(updateGame)(moveablePlate)
      onAnimationEnd()
    }
  }

  const onEscapeAnimationEnd = () => {
    'worklet'
    runOnJS(router.navigate)('/levelList/')
  }

  const getAnimation = () => {
    'worklet'
    switch (nextMoveValue.value.type) {
      case PlateNextMoveTypes.fling:
        return getFlingAnimation(nextMoveValue.value.toValue, () =>
          onFlingAnimationEnd(nextMoveValue.value.plateIndex)
        )
      case PlateNextMoveTypes.blockedFling:
        return getBlockedFlingAnimation(
          nextMoveValue.value.toValue,
          onAnimationEnd
        )
      case PlateNextMoveTypes.escape:
        return getEscapeAnimation(
          nextMoveValue.value.toValue,
          onEscapeAnimationEnd
        )
      default:
        return getBlockedAnimation(nextMoveValue.value.toValue, onAnimationEnd)
    }
  }

  const handleFling = (pressedValue: PressedValue) => {
    'worklet'
    const moveablePlate = findPlate(pressedValue.plateIndex)
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
    const adjacentPlate = findPlate(pressedValue.plateIndex)
    if (adjacentPlate?.moveDirection.direction === pressedValue.direction) {
      const isMoveable = readyToMoveIndexes.includes(pressedValue.plateIndex)
      plateNextMoveType = isMoveable
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

  const handleEndGame = () => {
    const shipIndex = platesData.findIndex(
      (p) => p.plate.type === PlateType.ship
    )
    nextMoveValue.value = {
      plateIndex: shipIndex,
      axis: 'y',
      toValue: Dimensions.get('window').height,
      type: PlateNextMoveTypes.escape,
    }
  }

  useAnimatedReaction(
    () => pressedValue.value,
    (pressedValue) => {
      if (pressedValue.plateIndex > -1 && !isGameFinished) {
        handlePress(pressedValue)
      }
    }
  )

  useEffect(() => {
    if (isGameFinished) handleEndGame()
  }, [isGameFinished])

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={[styles.board]}>
          {platesData.map((data) => {
            const isMoveablePlate =
              readyToMoveIndexes.includes(data.index) && !isGameFinished
            return (
              <PressablePlate
                key={`${data.plate.id}-${data.index}`}
                data={data}
                isMoveable={isMoveablePlate}
                pressedValue={pressedValue}
                nextMoveValue={nextMoveValue}
                getAnimation={getAnimation}
                movesCount={movesCount}
              >
                <Plate data={data} isMoveable={isMoveablePlate} />
              </PressablePlate>
            )
          })}
        </View>
        <View style={[styles.board, styles.absoluteBoard]} pointerEvents="none">
          {platesData.map((data) => {
            return (
              <Obstacle
                key={`${data.plate.id}-${data.index}`}
                data={data}
                nextMoveValue={nextMoveValue}
                getAnimation={getAnimation}
                movesCount={movesCount}
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
