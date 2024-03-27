import { PlateInitData, PlateType } from '@/constants/Types'
import { MARGIN, PLATE_SIZE } from '@/constants/gameConstants'
import { StyleSheet, View } from 'react-native'

type Props = {
  data: PlateInitData
  isMoveable?: boolean
}

export default function Plate({ data, isMoveable }: Props) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.wrapper,
          data.plate.type === PlateType.blank && styles.blank,
          isMoveable && styles.moveable,
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: PLATE_SIZE,
    height: PLATE_SIZE,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: MARGIN / 2,
    backgroundColor: '#1e386c',
    borderRadius: 4,
  },
  blank: {
    opacity: 0,
  },
  moveable: {
    backgroundColor: '#305398',
  },
})
