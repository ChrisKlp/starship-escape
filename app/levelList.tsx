import LevelListItem from '@/components/LevelListItem'
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
          {Object.entries(gameLevels).map(([key, { id, difficulty, name }]) => (
            <LevelListItem
              key={`${key}-${id}`}
              data={{ id, difficulty, name }}
              index={key}
              isActive={+key < 3}
            />
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
    marginHorizontal: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
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
