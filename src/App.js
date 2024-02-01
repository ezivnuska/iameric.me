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
import { AppProvider } from './AppContext'
import { PaperProvider } from 'react-native-paper'
import { getLocally, saveLocally } from './utils/storage'
import { dark, light } from './styles/colors'
import { PreferencesContext } from './PreferencesContext'
import merge from 'deepmerge'

export default () => {

  const defaultTheme = merge(MD2LightTheme, NavigationDefaultTheme)
  const darkTheme = merge(MD2DarkTheme, NavigationDarkTheme)
  
  const CombinedDefaultTheme = merge(defaultTheme, light)
  const CombinedDarkTheme = merge(darkTheme, dark)

  const [isThemeDark, setIsThemeDark] = useState(false)

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme

  useEffect(() => {
    initTheme()
  }, [])
  
  const initTheme = async () => {

    let localDarkValue = await getLocally('dark')
    if (!localDarkValue) await saveDarkValue(false)
  }

  const saveDarkValue = async darkValue => {
    try {
      await saveLocally('dark', darkValue)
    } catch (err) {
      console.log('error saving isThemeDark to local value', err)
    }
  }

  useEffect(() => {
    theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme
  }, [isThemeDark])

  const toggleTheme = useCallback(async () => {
    await saveDarkValue(!isThemeDark)
    return setIsThemeDark(!isThemeDark)
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