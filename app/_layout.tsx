import FontAwesome from '@expo/vector-icons/FontAwesome'
import { DarkTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { LinearGradient } from 'expo-linear-gradient'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'

import { SafeAreaProvider } from 'react-native-safe-area-context'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Teko400: require('../assets/fonts/Teko-Regular.ttf'),
    Teko500: require('../assets/fonts/Teko-Medium.ttf'),
    Teko700: require('../assets/fonts/Teko-Bold.ttf'),
    ...FontAwesome.font,
  })

  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return <RootLayoutNav />
}

function RootLayoutNav() {
  return (
    <SafeAreaProvider>
      <ThemeProvider value={DarkTheme}>
        <Stack
          screenOptions={{
            gestureEnabled: true,
          }}
        >
          <Stack.Screen name="index" options={{ gestureEnabled: true }} />
          <Stack.Screen name="levelList" options={{ gestureEnabled: true }} />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
