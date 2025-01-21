// import { Appearance } from 'react-native'
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useState,
} from 'react'
import { useWindowDimensions } from 'react-native'
import { getItem, setItem } from '@utils/storage'
import {
    dark as darkTheme,
    light as lightTheme,
} from '@styles/colors'
// import {
//     DarkTheme as NavigationDarkTheme,
//     DefaultTheme as NavigationDefaultTheme,
// } from '@react-navigation/native'
// import { MD2DarkTheme, MD2LightTheme } from 'react-native-paper'
// import merge from 'deepmerge'
import { getStyles } from 'src/styles'

// const defaultTheme = merge(MD2LightTheme, NavigationDefaultTheme)
// const darkTheme = merge(MD2DarkTheme, NavigationDarkTheme)

// const CombinedDefaultTheme = merge(defaultTheme, light)
// const CombinedDarkTheme = merge(darkTheme, dark)

const initialState = {
    dark: false,
    theme: lightTheme,
    // theme: CombinedDefaultTheme,
    themeLoaded: false,
    toggleTheme: () => {},
}

export const ThemeContext = createContext(initialState)

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) throw new Error()
    return context
}

export const ThemeContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const dims = useWindowDimensions()

    const [landscape, setLandscape] = useState(dims && dims.width > dims.height)
    const [styles, setStyles] = useState(null)
    // const landscape = useMemo(() => dims && dims.width > dims.height, [dims])

    useEffect(() => {
        init()
    }, [])

    useEffect(() => {
        // console.log('theme', state.theme)
        if (state.theme) {
            setStyles(getStyles(state.theme))
        }
    }, [state.theme])

    useEffect(() => {
        // console.log('dims', dims)
        if (dims) setLandscape(dims.width > dims.height)
    }, [dims])

    // useEffect(() => {
    //     console.log('landscape', landscape)
    // }, [landscape])
    
    const init = async () => {
            
        let storedValue = await getItem('dark')

        if (storedValue && storedValue === 'true') toggleTheme()
        else await setItem('dark', false)
        
        dispatch({ type: 'THEME_LOADED' })
        console.log('theme loaded')
    }
        
    const toggleTheme = async () => {
        const dark = !state.dark
        const payload = {
            dark,
            theme: dark ? darkTheme : lightTheme,
        }
        setItem('dark', dark)
        dispatch({ type: 'SET_THEME', payload })
    }

    const actions = useMemo(() => ({
        toggleTheme,
    }), [state, dispatch])

    return (
        <ThemeContext.Provider
            value={{
                ...state,
                dims,
                landscape,
                styles,
                ...actions,
            }}
        >
            {state.themeLoaded && children}
        </ThemeContext.Provider>
    )
}

const reducer = (state, action) => {
    const { type, payload } = action
    console.log('action', action)
    switch(type) {
        case 'THEME_LOADED': return { ...state, themeLoaded: true }; break
        case 'SET_THEME':
            const { dark, theme } = payload
            return {
                ...state,
                dark,
                theme,
            }
            break
        default: throw new Error()
    }
}

// export const ThemeProvider = ({ children }) => {

    // const [theme, setTheme] = useState(Appearance.getColorScheme())

    // const setAppMode = () => {
    //     setTheme(Appearance.getColorScheme())
    // }

    // const themeChangeListener = useCallback(() => {
    //     setTheme(Appearance.getColorScheme())
    // }, [])

    // useEffect(() => {
    //     const themeListener = Appearance.addChangeListener(themeChangeListener)
    //     return () => themeListener.remove()
    // }, [themeChangeListener])

    // const MemoizedValue = useMemo(() => ({
    //     theme,
    //     setAppMode,
    // }), [theme])

    // return (
    //     <ThemeContext.Provider value={MemoizedValue}>
    //         {children}
    //     </ThemeContext.Provider>
    // )
// }

    // 2. Wrapping the App with ThemeProvider
    // To ensure the theme is accessible throughout the app, wrap the root of your app with ThemeProvider in App.js:
    // import React from 'react'
    // import { Provider } from 'react-redux' // Assuming you're using Redux
    // import { ThemeProvider } from './src/contexts/ThemeContext'

    // const App = () => {
    // return (
    // <Provider store={store}>
    //     <ThemeProvider>
    //     {/* Other components */}
    //     </ThemeProvider>
    // </Provider>
    // )
    // }

    // export default App

    // Now, the entire app has access to the theme and can react to changes in theme mode.

    // 3. Using the ThemeContext in Components
    // Let’s modify a component to dynamically change based on the theme.
    // import React, { useContext } from 'react'
    // import { StatusBar } from 'react-native'
    // import { ThemeContext } from '../src/contexts/ThemeContext'

    // const MyComponent = () => {
    // const { theme = 'light' } = useContext(ThemeContext)

    // return (
    // <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
    // )
    // }

    // export default MyComponent

    // In this example, the StatusBar changes its barStyle based on whether the app is in dark mode or light mode.

    // 4. Applying Theme to the Entire UI
    // You can apply the theme to other components to change their styles dynamically:
    // import React, { useContext } from 'react'
    // import { View, Text, StyleSheet } from 'react-native'
    // import { ThemeContext } from '../src/contexts/ThemeContext'

    // const ThemedView = () => {
    // const { theme } = useContext(ThemeContext)

    // return (
    // <View style={theme === 'dark' ? styles.darkContainer : styles.lightContainer}>
    //     <Text style={theme === 'dark' ? styles.darkText : styles.lightText}>
    //     Hello, {theme === 'dark' ? 'Dark' : 'Light'} Theme!
    //     </Text>
    // </View>
    // )
    // }

    // const styles = StyleSheet.create({
    // darkContainer: {
    // backgroundColor: '#333',
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // },
    // lightContainer: {
    // backgroundColor: '#fff',
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // },
    // darkText: {
    // color: '#fff',
    // },
    // lightText: {
    // color: '#000',
    // },
    // })
