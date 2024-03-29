import DelayedComponent from '@/components/DelayedComponent'
import Game from '@/components/Game'
import Level from '@/lib/Level'
import { getGameLevel } from '@/lib/gameLevels'
import { LinearGradient } from 'expo-linear-gradient'
import { useLocalSearchParams } from 'expo-router'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function LevelPage() {
  const { id } = useLocalSearchParams()
  const levelData = getGameLevel(Number(id))
  const level = new Level(levelData)

  return (
    <LinearGradient
      colors={['#020711', '#142e65', '#020711']}
      style={styles.container}
    >
      <GestureHandlerRootView style={styles.container}>
        <DelayedComponent>
          <Game level={level} />
        </DelayedComponent>
      </GestureHandlerRootView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
