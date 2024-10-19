import AsyncStorage from '@react-native-async-storage/async-storage'

export const getItem = async key => {
    const value = await AsyncStorage.getItem(key)
    return value || null
}

export const setItem = async (key, value) => {
    return AsyncStorage.setItem(key, value)
}

export const getStoredToken = async () => {
    const value = await AsyncStorage.getItem('userToken')
    return value || null
}

export const storeToken = async value => {
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
    console.log('cleaning storage')
    return removeItems(['userToken'])
}

export const clearStorage = async () => {
    return AsyncStorage.multiRemove(['userToken', 'email'])
}