import { gameLevels } from '@/lib/gameLevels'
import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

export default function LevelListPage() {
  return (
    <LinearGradient
      colors={['#020711', '#142e65', '#020711']}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.levelWrapper}>
          {/* <Link href={`/level/1`}>
            <View>
              <Text style={styles.buttonText}>Level 1</Text>
            </View>
          </Link> */}
          {Object.entries(gameLevels).map(([key, levelData]) => (
            <Link key={`${key}-${levelData.id}`} href={`/level/${key}`}>
              <View>
                <Text style={styles.buttonText}>{levelData.name}</Text>
              </View>
            </Link>
          ))}
        </View>
        <Link href={'/'}>
          <Text style={styles.buttonText}>{`<- Back`}</Text>
        </Link>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  levelWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 30,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: '#fb9b00',
    borderRadius: 100,
  },
  buttonText: {
    marginTop: 5,
    fontFamily: 'Teko500',
    fontSize: 36,
    color: '#fff',
  },
})
