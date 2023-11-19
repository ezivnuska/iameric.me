import { createNavigationContainerRef } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const navigationRef = createNavigationContainerRef()

export const navigate = async (name, params) => {
    
    if (navigationRef.isReady()) {
        
        if (name !== 'Start') {

            await AsyncStorage.setItem('route', name)
            
            if (params && params.detail) {
                await AsyncStorage.setItem('detail', params.detail)
            }
            else await AsyncStorage.removeItem('detail')
        }

        navigationRef.navigate(name, params)
    }
}