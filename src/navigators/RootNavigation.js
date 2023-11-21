import { createNavigationContainerRef } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const navigationRef = createNavigationContainerRef()

export const goBack = async () => {
    if (navigationRef.isReady()) {
        const currentRoute = await AsyncStorage.getItem('route')
        const prevRoute = await AsyncStorage.getItem('prevRoute')
        if (!prevRoute) {
            console.log('nowhere to go back to.')
            return
        }

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
        
        console.log(`navigating to ${name} from ${currentRoute}`)
        
        if (name === 'Start') {
            console.log('remove keys: detail, prevRoute, route')
            await AsyncStorage.multiRemove(['detail', 'prevRoute', 'route'])
        } else {

            console.log('currentRoute:', currentRoute)
            
            if (currentRoute && currentRoute !== 'Details') {
                await AsyncStorage.setItem('prevRoute', currentRoute)
            }
            
            await AsyncStorage.setItem('route', name)
        }

            
        navigationRef.navigate(name, params)
    }
}