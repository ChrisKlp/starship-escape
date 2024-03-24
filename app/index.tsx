import Board from '@/components/Board'
import { BOARD_SIZE, MARGIN, PLATE_SIZE } from '@/constants/gameConstants'
import { levelInitData } from '@/lib/gameLevels'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function GamePage() {
  return (
    <LinearGradient
      colors={['#0b111e', '#263452', '#0b111e']}
      style={styles.container}
    >
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaView style={styles.container}>
          <Board levelInitData={levelInitData} />
        </SafeAreaView>
      </GestureHandlerRootView>
    </LinearGradient>
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
