import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

export const cleanStorage = () => AsyncStorage.multiRemove(['userToken', 'route', 'detail'])
export const clearStorage = () => AsyncStorage.multiRemove(['userToken', 'route', 'detail', 'email'])

const storeToken = async token => await AsyncStorage.setItem('userToken', token)

export const authenticate = async token => {
    
    const { data } = await axios.
        post('/api/authenticate', { token })
    
    if (!data) {
        console.log('Error authenticating token')
        await clearStorage()
        return null
    }

    const { user } = data
    
    await storeToken(user.token)
    
    return user
}