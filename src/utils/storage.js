import AsyncStorage from '@react-native-async-storage/async-storage'

export const cleanStorage = async () => await AsyncStorage.multiRemove(['userToken', 'route', 'detail', 'prevRoute'])
export const clearStorage = async () => await AsyncStorage.multiRemove(['userToken', 'route', 'detail', 'prevRoute', 'email'])

export const getSavedRoute = async () => {
    const route = await AsyncStorage.getItem('route')
    // if (!route || route === 'Start') return null
    const prevRoute = await AsyncStorage.getItem('prevRoute')
    const detail = await AsyncStorage.getItem('detail')
    return { prevRoute, route, detail }
}