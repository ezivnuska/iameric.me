import { createNavigationContainerRef } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { cleanStorage } from '@utils/storage'

export const navigationRef = createNavigationContainerRef()

export const goBack = async () => {
    
    if (navigationRef.isReady()) {
        const currentRoute = await AsyncStorage.getItem('route')
        const prevRoute = await AsyncStorage.getItem('prevRoute')
        // console.log('currentRoute', currentRoute)
        // console.log('prevRoute', prevRoute)
        // if (currentRoute === 'Details') {
            navigate(prevRoute || 'Home')
        // }

        
        // if (prevRoute) {
        //     navigate(prevRoute)
        // } else {
        //     navigate('Home')
        // }
    }
}

export const navigate = async (name, params) => {
    // console.log('navigating to..', name, params)
    if (navigationRef.isReady()) {
        const currentRoute = await AsyncStorage.getItem('route')
        let detail = await AsyncStorage.getItem('detail')
        if (currentRoute === 'Details') {
            // console.log('removing detail from storage')
            await AsyncStorage.removeItem('detail')
        }
        // console.log('from:', currentRoute)
        if (currentRoute && currentRoute !== name) {
            await AsyncStorage.setItem('prevRoute', currentRoute)
        }
        if (name !== 'Start') {
            await AsyncStorage.setItem('route', name)
        }
        let prevRoute = await AsyncStorage.getItem('prevRoute')
        if (prevRoute === 'Details') {
            await AsyncStorage.removeItem('prevRoute')
        }
        // if (currentRoute && currentRoute !== name) {
        //     console.log('setting prevRoute on navigate, currentRoute/name', currentRoute, name)
        // }
        
        // if (name === prevRoute) {
        //     await AsyncStorage.removeItem('prevRoute')
        // }

        detail = (params && params.id) ? params.id : null
        if (!detail) detail = await AsyncStorage.getItem('detail')
        // console.log('detail on navigate', detail)
        if (!detail) {
            // console.log('removing detail')
            await AsyncStorage.removeItem('detail')
        }
        else {
            // console.log('setting detail', detail)
            await AsyncStorage.setItem('detail', detail)
        }
        
        
        // const nextRoute = name
        // let currentSavedRoute = await AsyncStorage.getItem('route')
        // if (nextRoute !== 'Home') {
        
        //     if (currentSavedRoute) {
        //         await AsyncStorage.setItem('prevRoute', currentSavedRoute)
        //     }

        //     console.log('current saved route, now prevRoute:', currentSavedRoute)

        //     if (nextRoute === currentSavedRoute) return null

        //     console.log(`navigating from ${currentSavedRoute} to ${nextRoute}`)
        //     console.log('setting next route', nextRoute)
        //     await AsyncStorage.setItem('route', nextRoute)

        //     if (params && params.id)
        //         await AsyncStorage.setItem('detail', params.id)
        //     else await AsyncStorage.removeItem('detail')
            
        //     if (nextRoute === 'Start') {
        //         console.log('navigating to Start. cleaning storage...')
        //         await cleanStorage()
        //     }
        // } else {
        //     await AsyncStorage.setItem('route', nextRoute)
        //     if (currentSavedRoute) {
        //         await AsyncStorage.setItem('prevRoute', currentSavedRoute)
        //         const detail = await AsyncStorage.getItem('detail')
        //         if (detail) AsyncStorage.removeItem('detail')
        //     }
        // }

        navigationRef.navigate(name, params)
        
    }
}