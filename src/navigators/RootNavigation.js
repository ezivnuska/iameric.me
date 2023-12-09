import { createNavigationContainerRef } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const navigationRef = createNavigationContainerRef()

export const goBack = async () => {
    
    if (navigationRef.isReady()) {
        const prevRoute = await AsyncStorage.getItem('prevRoute') || 'Home'
        const detail = await AsyncStorage.getItem('detail')
        if (detail && prevRoute !== 'Home' && prevRoute !== 'Forum') navigate(prevRoute, { id: detail })
        else navigate(prevRoute)
    }
}

export const checkRoute = async () => {
    const savedRoute = await AsyncStorage.getItem('route')
    const detail = await AsyncStorage.getItem('detail')
    
    if (savedRoute && savedRoute !== 'Start') {
        if (savedRoute === 'Details' && detail) {
            navigate(savedRoute, { id: detail })
            return
        }
        navigate(savedRoute)
        return
    }
    navigate('Home')
}

const handleRouteChange = async (currentRoute, nextRoute, params) => {
    
    if (nextRoute !== 'Details') {
        await AsyncStorage.removeItem('detail')
    } else {
        if (params && params.id)
            await AsyncStorage.setItem('detail', params.id)
    }
    
    if (
        currentRoute === 'Start' ||
        currentRoute === 'Details' ||
        nextRoute !== 'Details'
    ) {
        await AsyncStorage.removeItem('prevRoute')
    } else {
        await AsyncStorage.setItem('prevRoute', currentRoute)
    }
    
    await AsyncStorage.setItem('route', nextRoute)
}

export const navigate = async (nextRoute, params) => {

    if (navigationRef.isReady()) {
        
        const { name } = navigationRef.getCurrentRoute()

        if (nextRoute !== name) await handleRouteChange(name, nextRoute, params)

        if (params && params.id)
            navigationRef.navigate(nextRoute, params)
        else
            navigationRef.navigate(nextRoute)
    }
}