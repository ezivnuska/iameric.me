import { createNavigationContainerRef } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const navigationRef = createNavigationContainerRef()

export const goBack = async () => {
    if (navigationRef.isReady()) {
        
        const currentRoute = await AsyncStorage.getItem('route')
        const prevRoute = await AsyncStorage.getItem('prevRoute')
        
        if (currentRoute && currentRoute === 'Details') {
            await AsyncStorage.multiRemove(['prevRoute', 'detail'])
        }

        if (!prevRoute) {
            console.log('nowhere to go back to.')
            return
        }
        const routes = navigationRef.getCurrentRoute()
        const state = navigationRef.getState()
        console.log('state', state)
        console.log('routes', routes)
        console.log('going back to prevRoute', prevRoute)
        navigationRef.navigate(prevRoute)
    }
}

export const navigate = async (name, params) => {
    
    if (navigationRef.isReady()) {

        const currentRoute = await AsyncStorage.getItem('route')
        
        if (name === 'Start') {
            await AsyncStorage.multiRemove(['detail', 'prevRoute', 'route'])
        } else {
            
            if (currentRoute && currentRoute !== 'Details') {
                await AsyncStorage.setItem('prevRoute', currentRoute)
            }
            
            await AsyncStorage.setItem('route', name)
        }
        
        if (name !== currentRoute) {
            console.log(`navigating to ${name} from ${currentRoute}`)
            navigationRef.navigate(name, params)
        }
    }
}