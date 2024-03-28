import FontAwesome from '@expo/vector-icons/FontAwesome'
import { DarkTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { LinearGradient } from 'expo-linear-gradient'
import { Slot, Stack, useLocalSearchParams } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

function levelLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider value={DarkTheme}>
        <Slot />
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
