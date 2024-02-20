import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native'
import {
  MD2DarkTheme,
  MD2LightTheme,
} from 'react-native-paper'
import { Layout } from './layout'
import {
  AppProvider,
} from './AppContext'
import {
  PreferencesContext,
} from './PreferencesContext'
import { PaperProvider } from 'react-native-paper'
import { getLocally, saveLocally } from '@utils/storage'
import { dark, light } from '@styles/colors'
import merge from 'deepmerge'

export default () => {

  const defaultTheme = merge(MD2LightTheme, NavigationDefaultTheme)
  const darkTheme = merge(MD2DarkTheme, NavigationDarkTheme)
  
  const CombinedDefaultTheme = merge(defaultTheme, light)
  const CombinedDarkTheme = merge(darkTheme, dark)

  const [isThemeDark, setIsThemeDark] = useState(true)

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme

  useEffect(() => {
    initTheme()
  }, [])
  
  const initTheme = async () => {
    let dark = await getLocally('dark')
    const isDark = dark === 'true'
    if (isDark !== isThemeDark) {
      console.log('switching theme')
      setIsThemeDark(isDark)
    }
  }

  useEffect(() => {
    theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme
  }, [isThemeDark])

  const toggleTheme = useCallback(async () => {
    const value = !isThemeDark
    await saveLocally('dark', value)
    setIsThemeDark(value)
  }, [isThemeDark])

  const preferences = useMemo(
    () => ({
        toggleTheme,
        isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  )

  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <AppProvider preferences={preferences}>
          <Layout />
        </AppProvider>
      </PaperProvider>
    </PreferencesContext.Provider>
  )
}