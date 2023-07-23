import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

export const cleanStorage = () => AsyncStorage.multiRemove(['userToken', 'route'])
export const clearStorage = () => AsyncStorage.multiRemove(['userToken', 'route', 'email'])

const storeToken = async token => {
    console.log('Storing user token...')
    await AsyncStorage
        .setItem('userToken', token)
        .then(() => console.log('User token stored.'))
        .catch(err => console.log('Error caught while storing token:', err))
}

export const authenticate = async () => {
    return await AsyncStorage.getItem('userToken')
        .then(token => {
            if (!token) return null
            
            return axios
                .post('/api/authenticate', { token })
                .then(async ({ data }) => {
                    const { error, user } = data

                    if (error) {
                        console.log('Error authenticating token', error)
                        await clearStorage()
                        return null
                    }
                    
                    if (user) {
                        console.log(`${user.username} verified`)
                        await storeToken(user.token)
                        return user
                    }

                    // else
                    console.log('no user found. clearing local storage.')
                        
                    await clearStorage() 

                    // setFormVisible(true)
                    
                    return null
                })
                .catch(err => {
                    console.log('Error getting user', err)
                    return null
                })
        })
        .catch(err => reject(err))
}