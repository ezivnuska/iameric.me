import axios from 'axios'
import { setItem, storeToken } from '@utils/storage'

const signup = async (email, password, username) => {

    const { data } = await axios.post('/api/signup', { email, password, username })
    
    if (data.user) {

        await setItem('email', email)
        await storeToken(data.user.token)
        
    } else if (data.error) {

        console.log('Error creating new account.', data.name, data.message)
    }
    
    return data
}

export default signup