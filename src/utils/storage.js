import AsyncStorage from '@react-native-async-storage/async-storage'

export const getItem = async key => {
    const value = await AsyncStorage.getItem(key)
    return value || null
}

export const setItem = async (key, value) => {
    return AsyncStorage.setItem(key, value)
}

export const getToken = async () => {
    const value = await AsyncStorage.getItem('userToken')
    return value || null
}

export const setToken = async value => {
    return AsyncStorage.setItem('userToken', value)
}

export const removeToken = async () => {
    return AsyncStorage.removeItem('userToken')
}

export const removeItem = async key => {
    return AsyncStorage.removeItem(key)
}

export const removeItems = async keys => {
    return AsyncStorage.multiRemove(keys)
}

export const cleanStorage = async () => {
    return removeItems(['userToken', 'route'])
}

export const clearStorage = async () => {
    return AsyncStorage.multiRemove(['userToken', 'route', 'email'])
}