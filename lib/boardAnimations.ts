import {
  Easing,
  ReduceMotion,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

export function getBlockedAnimation(toValue: number) {
  'worklet'
  return withRepeat(
    withTiming(toValue, { duration: 100, reduceMotion: ReduceMotion.System }),
    2,
    true
  )
}

export function getBlockedFlingAnimation(toValue: number) {
  'worklet'
  return withRepeat(
    withTiming(toValue, { duration: 100, reduceMotion: ReduceMotion.System }),
    2,
    true
  )
}

export function getFlingAnimation(toValue: number, callback: () => void) {
  'worklet'
  return withTiming(
    toValue,
    { duration: 200, reduceMotion: ReduceMotion.System },
    (isFinished) => {
      if (isFinished) {
        callback()
      }
    }
  )
}

export function getEscapeAnimation(toValue: number) {
  'worklet'
  return withTiming(toValue, {
    duration: 1000,
    easing: Easing.in(Easing.exp),
    reduceMotion: ReduceMotion.System,
  })
}
