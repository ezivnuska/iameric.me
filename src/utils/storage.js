import AsyncStorage from '@react-native-async-storage/async-storage'

export const cleanStorage = async () => await AsyncStorage.multiRemove(['userToken', 'route', 'detail', 'prevRoute'])
export const clearStorage = async () => await AsyncStorage.multiRemove(['userToken', 'route', 'detail', 'prevRoute', 'email'])

export const saveLocally = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (err) {
        console.log(`Error storing ${key}.`, err)
        return false
    }
    return true
}

export const getLocally = async key => {
    try {
        const item = await AsyncStorage.getItem(key)
        return item
    } catch (err) {
        console.log(`Error storing ${key}.`, err)
        return false
    }
}

export const getSavedEmail = async () => await AsyncStorage.getItem('email')

export const setUserToken = async token => {
    return await AsyncStorage.setItem('userToken', token)
}
export const getUserToken = async () => await AsyncStorage.getItem('userToken')

