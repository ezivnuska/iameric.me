import React, { createContext, useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  useTheme,
} from '@react-navigation/native'
import {
  MD2DarkTheme,
  MD2LightTheme,
} from 'react-native-paper'
import { Layout } from './layout'
import { AppProvider } from './AppContext'
import { PaperProvider } from 'react-native-paper'
import { getLocally, saveLocally } from './utils/storage'

const App = () => {
    
  const [isThemeDark, setIsThemeDark] = useState(false)

  const CombinedDefaultTheme = merge(MD2LightTheme, NavigationDefaultTheme, light)
  const CombinedDarkTheme = merge(MD2DarkTheme, NavigationDarkTheme, dark)

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme

  useEffect(() => {
    initTheme()
}, [])

const initTheme = async () => {
    const themeIsDark = await getLocally('dark')
    setIsThemeDark(themeIsDark)
}

const toggleTheme = useCallback(async () => {
    console.log('toggleTheme', isThemeDark)
    await saveLocally('dark', !isThemeDark)
    return setIsThemeDark(!isThemeDark)
}, [isThemeDark])const preferences = useMemo(
  () => ({
      toggleTheme,
      isThemeDark,
  }),
  [toggleTheme, isThemeDark]
)

return (
    <PaperProvider theme={theme}>
      <AppProvider>
        <Layout />
      </AppProvider>
    </PaperProvider>
  )
}

export default App