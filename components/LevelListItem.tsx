import { LEVEL_ICON_WIDTH } from '@/constants/gameConstants'
import { Link } from 'expo-router'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import LevelItemStars from './LevelItemStars'

type Props = {
  id: number
  isActive?: boolean
}

const imageList = {
  1: require('@/assets/images/asteroid1.png'),
  2: require('@/assets/images/asteroid2.png'),
  3: require('@/assets/images/asteroid3.png'),
}

export default function LevelListItem({ id, isActive = false }: Props) {
  const dataId = (id % 3 || 3) as keyof typeof imageList
  const imageSource = imageList[dataId]
  return (
    <Link
      href={`/level/${id}`}
      disabled={!isActive}
      style={{ marginBottom: 20 }}
    >
      <View style={[styles.container, { opacity: isActive ? 1 : 0.4 }]}>
        <ImageBackground style={[styles.backgroundImage]} source={imageSource}>
          <Text style={styles.levelName}>{id}</Text>
          {isActive && <LevelItemStars />}
        </ImageBackground>
      </View>
    </Link>
  )
}

const styles = StyleSheet.create({
  container: {
    width: LEVEL_ICON_WIDTH,
    height: LEVEL_ICON_WIDTH,
    padding: 0.05 * LEVEL_ICON_WIDTH,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelName: {
    marginTop: 5,
    fontFamily: 'Teko500',
    fontSize: 36,
    color: '#fff',
  },
})
