import AsyncStorage from '@react-native-async-storage/async-storage'

export const cleanStorage = async () => await AsyncStorage.multiRemove(['userToken', 'route', 'detail', 'prevRoute'])
export const clearStorage = async () => await AsyncStorage.multiRemove(['userToken', 'route', 'detail', 'prevRoute', 'email'])

export const storeEmail = async email => {
    try {
        await AsyncStorage.setItem('email', email)
    } catch (err) {
        console.log('Error storing email.', err)
    }
}

export const getSavedEmail = async () => await AsyncStorage.getItem('email')

export const setUserToken = async token => {
    return await AsyncStorage.setItem('userToken', token)
}
export const getUserToken = async () => await AsyncStorage.getItem('userToken')

