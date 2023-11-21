import { createNavigationContainerRef } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const navigationRef = createNavigationContainerRef()

export const goBack = async () => {
    if (navigationRef.isReady()) {
        
        const prevRoute = await AsyncStorage.getItem('prevRoute')
        if (!prevRoute) {
            console.log('nowhere to go back to.')
            return
        }
        console.log('going back to', prevRoute)
        const currentRoute = await AsyncStorage.getItem('route')
        if (currentRoute && currentRoute === 'Details') {
            console.log('currentRoute is Details... removing prevRoute, detail')
            await AsyncStorage.multiRemove(['prevRoute', 'detail'])
        }
        
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