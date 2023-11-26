import { createNavigationContainerRef } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { cleanStorage } from '@utils/storage'

export const navigationRef = createNavigationContainerRef()

export const goBack = async () => {
    
    if (navigationRef.isReady()) {
        const currentRoute = await AsyncStorage.getItem('route')
        if (currentRoute === 'Details') {
            await AsyncStorage.removeItem('detail')
        }

        const prevRoute = await AsyncStorage.getItem('prevRoute')
        
        if (prevRoute) {
            navigate(prevRoute)
        } else {
            navigate('Home')
        }
    }
}

export const navigate = async (name, params) => {
    
    if (navigationRef.isReady()) {
        const route = await AsyncStorage.getItem('route')
        if (route && route !== 'Details') {
            if (route !== name && name === 'Details') {
                await AsyncStorage.setItem('prevRoute', route)
            }
        } else {
            await AsyncStorage.multiRemove(['prevRoute', 'detail'])
        }

        await AsyncStorage.setItem('route', name)
        if (name === 'Details' && params && params.id) {
            await AsyncStorage.setItem('detail', params.id)
        } else await AsyncStorage.removeItem('detail')
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