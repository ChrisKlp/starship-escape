import {
  Easing,
  ReduceMotion,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

export function getBlockedAnimation(toValue: number, callback: () => void) {
  'worklet'
  return withRepeat(
    withTiming(toValue, { duration: 100, reduceMotion: ReduceMotion.System }),
    2,
    true,
    (isFinished) => {
      if (isFinished) callback()
    }
  )
}

export function getBlockedFlingAnimation(
  toValue: number,
  callback: () => void
) {
  'worklet'
  return withRepeat(
    withTiming(toValue, { duration: 100, reduceMotion: ReduceMotion.System }),
    2,
    true,
    (isFinished) => {
      if (isFinished) callback()
    }
  )
}

export function getFlingAnimation(toValue: number, callback: () => void) {
  'worklet'
  return withTiming(
    toValue,
    { duration: 200, reduceMotion: ReduceMotion.System },
    (isFinished) => {
      if (isFinished) callback()
    }
  )
}

export function getEscapeAnimation(toValue: number, callback: () => void) {
  'worklet'
  return withTiming(
    toValue,
    {
      duration: 1000,
      easing: Easing.in(Easing.exp),
      reduceMotion: ReduceMotion.System,
    },
    (isFinished) => {
      if (isFinished) callback()
    }
  )
}
