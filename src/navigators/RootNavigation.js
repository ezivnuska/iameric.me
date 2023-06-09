import { createNavigationContainerRef } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const navigationRef = createNavigationContainerRef()

export const navigate = async (name, params) => {
    if (navigationRef.isReady()) {
        if (name !== 'auth') {
            await AsyncStorage
                .setItem('route', name)
                .then(() => null)
                .catch(err => alert('Error saving route name while navigating:', err))
        }
        navigationRef.navigate(name)
    }
}