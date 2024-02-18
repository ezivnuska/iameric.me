import { createNavigationContainerRef } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import { cleanStorage } from 'src/utils/storage'

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
    console.log('checking route...')
    const savedRoute = await AsyncStorage.getItem('route')
    const detail = await AsyncStorage.getItem('detail')
    
    if (savedRoute && savedRoute !== 'Start') {
        console.log('savedRoute found', savedRoute)
        if (savedRoute === 'User' && detail) {
            navigate(savedRoute, { id: detail })
            return
        }
        console.log('navigating to savedRoute', savedRoute)
        navigate(savedRoute)
        return
    }
    // navigate('Home')
}

// const handleRouteChange = async (currentRoute, nextRoute, params) => {
    
//     if (nextRoute !== 'User') {
//         await AsyncStorage.removeItem('detail')
//     } else {
//         if (params && params.id)
//             await AsyncStorage.setItem('detail', params.id)
//     }
    
//     if (
//         currentRoute === 'Start' ||
//         currentRoute === 'User' ||
//         nextRoute !== 'User'
//     ) {
//         await AsyncStorage.removeItem('prevRoute')
//     } else {
//         await AsyncStorage.setItem('prevRoute', currentRoute)
//     }
    
//     if (nextRoute === 'Start') {
//         await AsyncStorage.removeItem('route')
//         await cleanStorage()
//     } else {
//         await AsyncStorage.setItem('route', nextRoute)
//     }
// }

export const navigate = async (nextRoute, params) => {
    console.log('navigating', nextRoute, params)
    if (navigationRef.isReady()) {
        
        // const { name } = navigationRef.getCurrentRoute()

        // if (nextRoute !== name) await handleRouteChange(name, nextRoute, params)
        if (params) navigationRef.navigate(nextRoute, params)
        else navigationRef.navigate(nextRoute)
        return
        // if (params && params.id)
        //     navigationRef.navigate(nextRoute, params)
        // else
        //     navigationRef.navigate(nextRoute)
    }
}