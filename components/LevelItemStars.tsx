import { View, Text, StyleSheet } from 'react-native'
import StarSvg from './StarSvg'

const arr = [...Array(3).keys()]

type Props = {
  points?: number
}

export default function LevelItemStars({ points = 0 }: Props) {
  return (
    <View style={styles.container}>
      {arr.map((i) => (
        <View key={i} style={{ width: '24%' }}>
          <StarSvg isActive={points > i} />
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: '5%',
    width: '70%',
    height: '20%',
    borderRadius: 20,
    backgroundColor: '#df8600',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffb53d',
  },
  star: {},
})
