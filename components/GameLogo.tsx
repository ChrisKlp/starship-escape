import { View, Text, StyleSheet } from 'react-native'

export default function GameLogo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spaceship</Text>
      <Text style={styles.subtitle}>Escape</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Teko500',
    fontSize: 90,
    color: '#fff',
  },
  subtitle: {
    fontFamily: 'Teko500',
    fontSize: 70,
    color: '#fff',
    marginTop: -52,
  },
})
