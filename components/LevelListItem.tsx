import { LevelData } from '@/constants/Types'
import { LEVEL_ICON_WIDTH } from '@/constants/gameConstants'
import { Link } from 'expo-router'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import LevelItemStars from './LevelItemStars'

type Props = {
  data: Omit<LevelData, 'data'>
  isActive?: boolean
  index: string
}

const imageList = {
  1: require('@/assets/images/asteroid1.png'),
  2: require('@/assets/images/asteroid2.png'),
  3: require('@/assets/images/asteroid3.png'),
  4: require('@/assets/images/asteroid4.png'),
}

export default function LevelListItem({
  data,
  index,
  isActive = false,
}: Props) {
  const { difficulty, id, name } = data
  const dataId = (+index % 4 || 4) as keyof typeof imageList
  const imageSource = imageList[dataId]
  return (
    <Link href={`/level/${index}`} disabled={!isActive}>
      <View style={[styles.container, { opacity: isActive ? 1 : 0.4 }]}>
        <ImageBackground style={[styles.backgroundImage]} source={imageSource}>
          <Text style={styles.levelName}>{index}</Text>
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
